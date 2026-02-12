import { ref, computed } from "vue"

export function useWordPressCategories() {
    const categories = ref([])
    const loading = ref(false)
    const error = ref(null)

    const API_BASE = import.meta.env.VITE_WORDPRESS_API_SHORT

    const initialized = ref(false)

    if (!initialized.value) {
        initialized.value = true
        fetchCategories()
    }

    /**
     * Загружаем список категорий WordPress
     */
    async function fetchCategories() {
        loading.value = true
        error.value = null

        try {
            const res = await fetch(`${API_BASE}/categories?per_page=100`)
            if (!res.ok) {
                throw new Error(res.statusText)
            }

            const data = await res.json()
             // удалить категорию "Uncategorized"
             const filtered = data.filter(cat =>
               cat.name !== "Uncategorized" && cat.slug !== "uncategorized"
             )

            // "Расширяем" каждую категорию данными о медиа
            categories.value = await Promise.all(
                filtered.map(transformCategory)
            )
            // console.log(categories.value)

        } catch (e) {
            error.value = e.message
            console.error("Error fetching categories:", e)
        } finally {
            loading.value = false
        }
    }

    /**
     * Преобразуем WP категорию в структуру приложения:
     * - достаём ACF поле category_image (ID)
     * - загружаем саму картинку
     */
    async function transformCategory(cat) {
        const acf = cat.acf || {}

        let imageUrl = null

        // Если у категории есть изображение — это ID
        if (acf.category_image) {
            const media = await loadMedia(acf.category_image)
            imageUrl = media?.source_url || null
        }

        return {
            id: cat.id,
            name: acf.category_name || cat.name,
            slug: cat.slug,
            image: imageUrl
        }
    }

    /**
     * Загружаем media по ID (для category_image)
     */
    async function loadMedia(id) {
        try {
            const res = await fetch(`${API_BASE}/media/${id}`)
            if (!res.ok) return null

            return await res.json()
        } catch (e) {
            console.error("Error loading media:", e)
            return null
        }
    }

    return {
        categories: computed(() => categories.value),
        loading: computed(() => loading.value),
        error: computed(() => error.value),
        fetchCategories
    }
}