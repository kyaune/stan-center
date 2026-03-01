import { ref, computed } from "vue"

export function useWordPressExperts() {
    const experts = ref([])
    const loading = ref(false)
    const error = ref(null)

    const API_BASE = import.meta.env.VITE_WORDPRESS_API_SHORT

    const initialized = ref(false)
    if (!initialized.value) {
        initialized.value = true
        fetchExperts()
    }

    async function fetchExperts() {
        loading.value = true
        error.value = null

        try {
            let allData = []
            let page = 1
            let totalPages = 1

            while (page <= totalPages) {
                const res = await fetch(`${API_BASE}/experts?per_page=100&page=${page}`)
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

            experts.value = await Promise.all(
                allData.map(transformExpert)
            )

        } catch (e) {
            error.value = e.message
            console.error("Error loading experts:", e)
        } finally {
            loading.value = false
        }
    }

    async function transformExpert(item) {
        const acf = item.acf || {}
        let photoUrl = null
        if (acf.image) {
            const media = await loadMedia(acf.image)
            photoUrl = media?.source_url || null
        }

        return {
            id: item.id,
            name: acf.full_name || item.title?.rendered || "",
            role: acf.position || "",
            biography: acf.biography || "",
            avatar: photoUrl,
            slug: item.slug,
        }
    }

    async function loadMedia(id) {
        try {
            const res = await fetch(`${API_BASE}/media/${id}`)
            if (!res.ok) return null
            return await res.json()
        } catch {
            return null
        }
    }

    /**
     * Получение эксперта по slug
     */
    async function getExpertBySlug(slug) {
        // Если эксперты ещё не загружены, загружаем
        if (experts.value.length === 0) {
            await fetchExperts()
        }
        return experts.value.find(e => e.slug === slug) || null
    }

    return {
        experts: computed(() => experts.value),
        loading: computed(() => loading.value),
        error: computed(() => error.value),
        fetchExperts,
        getExpertBySlug
    }
}