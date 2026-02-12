// lib/articles.js
import { contentfulClient } from './contentfulClient.js'

const wp_api = import.meta.env.WORDPRESS_API

export async function getArticles(options = {}) {
    const limit = options.limit || 20

    const res = await contentfulClient.getEntries({
        content_type: 'pageBlogPost',          // ID твоего content type
        limit,
    })

    return res.items
}

export async function getArticleBySlug(slug) {
    const res = await contentfulClient.getEntries({
        content_type: 'pageBlogPost',
        'fields.slug': slug,
        limit: 1,
    })

    if (!res.items.length) return null
    return res.items[0]
}