import { ref, computed } from "vue"

export function useWordPressQuotes() {
    const quotes = ref([])
    const loading = ref(false)
    const error = ref(null)

    const API_BASE = import.meta.env.VITE_WORDPRESS_API_SHORT

    const initialized = ref(false)
    if (!initialized.value) {
        initialized.value = true
        fetchQuotes()
    }

    async function fetchQuotes() {
        loading.value = true
        error.value = null

        try {
            let allData = []
            let page = 1
            let totalPages = 1

            while (page <= totalPages) {
                const res = await fetch(`${API_BASE}/quotes?per_page=100&page=${page}`)
                if (!res.ok) throw new Error(res.statusText)

                if (page === 1) {
                    totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1', 10)
                }

                const data = await res.json()
                if (Array.isArray(data)) {
                    allData = allData.concat(data)
                }
                page++
            }

            quotes.value = await Promise.all(
                allData.map(transformQuote)
            )
        } catch (e) {
            error.value = e.message
            console.error("Error loading quotes:", e)
        } finally {
            loading.value = false
        }
    }

    async function transformQuote(item) {
        const acf = item.acf || {}
        let photoUrl = null

        if (acf.expert_image) {
            photoUrl = await loadMediaUrl(acf.expert_image)
        }

        return {
            id: item.id,
            text: acf.quote || "",
            expertName: acf.expert_name || "",
            expertPosition: acf.expert_position || "",
            expertImage: photoUrl,
            slug: item.slug,
        }
    }

    async function loadMediaUrl(id) {
        try {
            const res = await fetch(`${API_BASE}/media/${id}`)
            if (!res.ok) return null
            const data = await res.json()
            return data.source_url || null
        } catch {
            return null
        }
    }

    return {
        quotes: computed(() => quotes.value),
        loading: computed(() => loading.value),
        error: computed(() => error.value),
        fetchQuotes
    }
}
