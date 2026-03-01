import { ref, computed } from 'vue'
import { WordPressContentParser } from '@/utils/wordpressParser.js'

/**
 * Маппинг русских типов статей в латинские URL-сегменты
 */
export const TYPE_TO_SLUG = {
    'аналитика': 'analitika',
    'интервью': 'intervyu',
    'мнения': 'mneniya',
    'обзоры': 'obzory',
}

export const SLUG_TO_TYPE = {
    'analitika': 'аналитика',
    'intervyu': 'интервью',
    'mneniya': 'мнения',
    'obzory': 'обзоры',
}

/**
 * Composable для работы с WordPress REST API
 * Использует public API WordPress.com для получения статей
 */
export function useWordPressArticles() {
    const articles = ref([])
    const currentArticle = ref(null)
    const loading = ref(false)
    const error = ref(null)

    const API_BASE = import.meta.env.VITE_WORDPRESS_API
    const API_BASE_DIRECT = import.meta.env.VITE_WORDPRESS_API_SHORT // Для прямых запросов к media

    const initialized = ref(false)

    if (!initialized.value) {
        initialized.value = true
        fetchArticles()
    }

    /**
     * Получение списка всех статей
     * @param {Object} params - параметры запроса (per_page, page, categories, tags, etc.)
     */
    async function fetchArticles(params = {}) {
        loading.value = true
        error.value = null

        try {
            let allPosts = []
            let page = 1
            let totalPages = 1

            while (page <= totalPages) {
                const queryParams = new URLSearchParams({
                    per_page: 100,
                    page,
                    ...params
                })

                const response = await fetch(`${API_BASE}/posts?${queryParams}`)

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                // На первой странице узнаём общее количество страниц
                if (page === 1) {
                    totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1', 10)
                }

                const data = await response.json()
                if (Array.isArray(data)) {
                    allPosts = allPosts.concat(data)
                }

                page++
            }

            articles.value = allPosts.map(transformArticle)
            return articles.value
        } catch (err) {
            error.value = err.message
            console.error('Error fetching articles:', err)
            return []
        } finally {
            loading.value = false
        }
    }

    /**
     * Получение одной статьи по ID
     * @param {number} id - ID статьи
     */
    async function fetchArticleById(id) {
        loading.value = true
        error.value = null

        try {
            const response = await fetch(`${API_BASE}/posts/${id}`)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            currentArticle.value = transformArticle(data)

            return currentArticle.value
        } catch (err) {
            error.value = err.message
            console.error('Error fetching article:', err)
            return null
        } finally {
            loading.value = false
        }
    }

    /**
     * Получение одной статьи по slug
     * @param {string} slug - slug статьи
     */
    async function fetchArticleBySlug(slug) {
        loading.value = true
        error.value = null

        try {
            const response = await fetch(`${API_BASE}/posts?slug=${slug}&_embed=true`)

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()

            if (data.length === 0) {
                throw new Error('Article not found')
            }

            currentArticle.value = transformArticle(data[0])

            return currentArticle.value
        } catch (err) {
            error.value = err.message
            console.error('Error fetching article:', err)
            return null
        } finally {
            loading.value = false
        }
    }

    /**
     * Получение описания медиа-файла по ID
     * @param {number} mediaId - ID медиа-файла
     */
    async function fetchMediaCaption(mediaId) {
        if (!mediaId) return ''

        try {
            const response = await fetch(`${API_BASE_DIRECT}/media/${mediaId}`)
            if (!response.ok) return ''

            const data = await response.json()
            // caption.rendered содержит HTML, очищаем от тегов
            const caption = data.caption?.rendered || ''
            return caption.replace(/<[^>]*>/g, '').trim()
        } catch (err) {
            console.error('Error fetching media caption:', err)
            return ''
        }
    }

    /**
     * Декодирование HTML-сущностей (&#8230; → …, &amp; → & и т.д.)
     */
    function decodeHtmlEntities(str) {
        if (!str) return ''
        const textarea = document.createElement('textarea')
        textarea.innerHTML = str
        return textarea.value
    }

    /**
     * Преобразование статьи из формата WordPress в формат приложения
     */
    function transformArticle(wpPost) {
        // Извлекаем ACF поля
        const acf = wpPost.acf || {}

        // Обрабатываем countries - массив стран
        let countries = acf.countries || []
        if (Array.isArray(countries)) {
            countries = countries
                .map(c => c.replace(/^"|"$/g, '')) // убираем лишние кавычки
                .join(', ')
        }

        // Обрабатываем topics (themes) - массив тем
        let topics = acf.topics || []
        if (Array.isArray(topics)) {
            topics = topics
                .map(t => t.replace(/^"|"$/g, ''))
                .join(', ')
        }

        // Stories - это теги/рубрики
        const stories = acf.stories || ''
        const type = acf.type || ''
        const favourite = acf.favourite || false
        const acfId = acf.id || Math.random() * 100

        // Парсим HTML контент в структурированные блоки
        const htmlContent = wpPost.content?.rendered || ''
        let contentBlocks = htmlContent ? WordPressContentParser.parse(htmlContent) : []

        // Извлекаем заголовок и подзаголовок из контента
        let subtitle = ''
        const firstHeadingIndex = contentBlocks.findIndex(block => block.type === 'heading' && block.level === 2)
        if (firstHeadingIndex !== -1) {
            subtitle = contentBlocks[firstHeadingIndex].text
            // Удаляем первый h2 заголовок из контента, чтобы не дублировать его
            contentBlocks = contentBlocks.filter((_, index) => index !== firstHeadingIndex)
        }

        // Если подзаголовка нет в контенте, берём из excerpt
        if (!subtitle) {
            subtitle = wpPost.excerpt?.rendered?.replace(/\u003c[^>]*>/g, '').trim() || ''
        }

        // Получаем категорию
        const categories = wpPost.categories || []
        const categoryName = categories.length > 0 ? getCategoryName(categories[0]) : 'Статья'

        return {
            // Основные поля
            id: wpPost.id,
            date: formatDate(wpPost.date),
            dateRaw: wpPost.date,

            // Заголовок и подзаголовок
            title: decodeHtmlEntities(wpPost.title?.rendered || ''),
            subtitle: decodeHtmlEntities(subtitle),

            // ACF поля
            tag: categoryName,
            countries: countries,
            themes: topics,
            story: stories,
            type: type,
            favourite: favourite,
            acfId: acfId,

            // Медиа
            img: wpPost.jetpack_featured_media_url || '',
            featuredMediaId: wpPost.featured_media || null,
            coverCaption: '', // Загружается отдельно через fetchMediaCaption

            // Контент
            content: htmlContent,
            contentBlocks: contentBlocks, // Распарсенный контент по блокам

            // Мета
            author: '', // TODO: получить из _embed если нужно
            slug: wpPost.slug,
            link: wpPost.link,
        }
    }

    /**
     * Получение названия категории по ID
     * Можно расширить для маппинга ID -> название
     */
    function getCategoryName(categoryId) {
        const categoryMap = {
            1: 'Uncategorized'
        }
        return categoryMap[categoryId] || 'Статья'
    }

    /**
     * Форматирование даты в нужный формат
     * @param {string} dateString - дата в формате ISO
     */
    function formatDate(dateString) {
        const date = new Date(dateString)
        const months = [
            'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
            'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
        ]

        const day = date.getDate()
        const month = months[date.getMonth()]
        const year = date.getFullYear()
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')

        return `${day} ${month} ${year} г., ${hours}:${minutes}`
    }

    /**
     * Получение статьи по типу (slug) и acf.id
     * @param {string} typeSlug - латинский slug типа (analitika, intervyu, mneniya, obzory)
     * @param {number} acfId - ID статьи из acf.id
     */
    async function fetchArticleByTypeAndId(typeSlug, acfId) {
        loading.value = true
        error.value = null

        try {
            // Если статьи ещё не загружены, загружаем их
            if (articles.value.length === 0) {
                await fetchArticles()
            }

            // Получаем русский тип из slug
            const russianType = SLUG_TO_TYPE[typeSlug]
            if (!russianType) {
                throw new Error(`Unknown type slug: ${typeSlug}`)
            }

            // Ищем статью по типу и acfId
            const found = articles.value.find(
                article => article.type?.toLowerCase() === russianType && article.acfId === Number(acfId)
            )

            if (!found) {
                throw new Error(`Article not found: type=${typeSlug}, id=${acfId}`)
            }

            // Загружаем описание изображения, если есть featured_media
            if (found.featuredMediaId && !found.coverCaption) {
                found.coverCaption = await fetchMediaCaption(found.featuredMediaId)
            }

            currentArticle.value = found
            return currentArticle.value
        } catch (err) {
            error.value = err.message
            console.error('Error fetching article by type and id:', err)
            return null
        } finally {
            loading.value = false
        }
    }

    /**
     * Генерирует URL для статьи на основе типа и acf.id
     * @param {Object} article - объект статьи
     */
    function getArticleUrl(article) {
        const typeSlug = TYPE_TO_SLUG[article.type?.toLowerCase()]
        if (!typeSlug || !article.acfId) {
            return null
        }
        return `/${typeSlug}/${article.acfId}`
    }

    return {
        articles: computed(() => articles.value),
        currentArticle: computed(() => currentArticle.value),
        loading: computed(() => loading.value),
        error: computed(() => error.value),
        fetchArticles,
        fetchArticleById,
        fetchArticleBySlug,
        fetchArticleByTypeAndId,
        getArticleUrl,
    }
}
