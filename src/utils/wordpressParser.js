/**
 * Парсер WordPress контента для преобразования HTML в структурированные блоки
 * Поддерживает различные типы блоков: параграфы, вопросы, цитаты, изображения
 */

export class WordPressContentParser {
    constructor(htmlContent) {
        this.html = htmlContent
        this.blocks = []
    }

    /**
     * Парсинг HTML контента в структурированные блоки
     */
    parse() {
        const parser = new DOMParser()
        const doc = parser.parseFromString(this.html, 'text/html')
        const body = doc.body

        this.blocks = []
        this._parseNode(body)

        return this.blocks
    }

    /**
     * Рекурсивный парсинг DOM узлов
     */
    _parseNode(node) {
        for (const child of node.children) {
            const block = this._identifyBlock(child)
            if (block) {
                this.blocks.push(block)
            }
        }
    }

    /**
     * Идентификация типа блока по DOM элементу
     */
    _identifyBlock(element) {
        const tagName = element.tagName.toLowerCase()
        const classList = Array.from(element.classList || [])
        const textContent = element.textContent.trim()

        // Пропускаем пустые элементы
        if (!textContent) return null

        // Заголовки
        if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) {
            return {
                type: 'heading',
                level: parseInt(tagName[1]),
                content: element.innerHTML,
                text: textContent
            }
        }

        // Цитаты
        if (tagName === 'blockquote' || classList.includes('quote') || classList.includes('article__quote')) {
            return this._parseQuote(element)
        }

        // Изображения с подписями
        if (tagName === 'figure' || classList.includes('article__figure')) {
            return this._parseFigure(element)
        }

        // Параграфы
        if (tagName === 'p') {
            return this._parseParagraph(element)
        }

        // Списки
        if (tagName === 'ul' || tagName === 'ol') {
            return this._parseList(element, tagName)
        }

        // Обычные изображения (не в figure)
        if (tagName === 'img') {
            return {
                type: 'image',
                src: element.src,
                alt: element.alt || ''
            }
        }

        return null
    }

    /**
     * Парсинг параграфа с определением подтипа
     */
    _parseParagraph(element) {
        const classList = Array.from(element.classList || [])
        const textContent = element.textContent.trim()
        const innerHTML = element.innerHTML.trim()

        // Лид (вводный абзац)
        if (classList.includes('article__lead') || classList.includes('lead')) {
            return {
                type: 'paragraph',
                subtype: 'lead',
                content: innerHTML,
                text: textContent
            }
        }

        // Вопрос (начинается с "—" и выделен жирным)
        const strongElement = element.querySelector('strong')
        if (strongElement && textContent.startsWith('—')) {
            return {
                type: 'paragraph',
                subtype: 'question',
                content: innerHTML,
                text: textContent
            }
        }

        // Благодарность
        if (classList.includes('article__thanks') || textContent.includes('Спасибо за беседу')) {
            return {
                type: 'paragraph',
                subtype: 'thanks',
                content: innerHTML,
                text: textContent
            }
        }

        // Автор
        if (classList.includes('article__author') || textContent.startsWith('Беседовал')) {
            return {
                type: 'paragraph',
                subtype: 'author',
                content: innerHTML,
                text: textContent
            }
        }

        // Дисклеймер
        if (classList.includes('article__disclaimer') || textContent.includes('*') || textContent.includes('**')) {
            return {
                type: 'paragraph',
                subtype: 'disclaimer',
                content: innerHTML,
                text: textContent
            }
        }

        // Обычный параграф
        return {
            type: 'paragraph',
            subtype: 'normal',
            content: innerHTML,
            text: textContent
        }
    }

    /**
     * Парсинг цитаты
     */
    _parseQuote(element) {
        const paragraphs = element.querySelectorAll('p')
        let quoteText = ''
        let quoteMeta = ''

        if (paragraphs.length === 0) {
            quoteText = element.innerHTML
        } else if (paragraphs.length === 1) {
            quoteText = paragraphs[0].innerHTML
        } else {
            // Последний параграф - мета, остальные - текст цитаты
            const textParagraphs = Array.from(paragraphs).slice(0, -1)
            const metaParagraph = paragraphs[paragraphs.length - 1]

            quoteText = textParagraphs.map(p => p.innerHTML).join(' ')
            quoteMeta = metaParagraph.textContent
        }

        return {
            type: 'quote',
            content: quoteText,
            text: element.textContent.trim(),
            meta: quoteMeta
        }
    }

    /**
     * Парсинг изображения с подписью
     */
    _parseFigure(element) {
        const img = element.querySelector('img')
        const figcaption = element.querySelector('figcaption')

        if (!img) return null

        return {
            type: 'figure',
            src: img.src,
            alt: img.alt || '',
            caption: figcaption ? figcaption.textContent.trim() : ''
        }
    }

    /**
     * Парсинг списка
     */
    _parseList(element, tagName) {
        const items = Array.from(element.querySelectorAll('li')).map(li => ({
            content: li.innerHTML,
            text: li.textContent.trim()
        }))

        return {
            type: 'list',
            listType: tagName === 'ol' ? 'ordered' : 'unordered',
            items
        }
    }

    /**
     * Статический метод для быстрого парсинга
     */
    static parse(htmlContent) {
        const parser = new WordPressContentParser(htmlContent)
        return parser.parse()
    }
}

/**
 * Хелпер для извлечения простого текста из HTML
 */
export function stripHtmlTags(html) {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    return doc.body.textContent || ''
}

/**
 * Хелпер для извлечения первого изображения из контента
 */
export function extractFirstImage(htmlContent) {
    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlContent, 'text/html')
    const img = doc.querySelector('img')
    return img ? img.src : null
}

/**
 * Хелпер для получения краткого описания из контента
 */
export function getExcerpt(htmlContent, maxLength = 200) {
    const text = stripHtmlTags(htmlContent)
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength).trim() + '...'
}
