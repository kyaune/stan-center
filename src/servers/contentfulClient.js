// lib/contentfulClient.js
import { createClient } from 'contentful'

const space = import.meta.env.VITE_CONTENTFUL_SPACE_ID
const accessToken = import.meta.env.VITE_CONTENTFUL_CDA_TOKEN
const environment = import.meta.env.VITE_CONTENTFUL_ENV_ID || 'master'

const wp_api = import.meta.env.WORDPRESS_API

export const contentfulClient = createClient({
  space,
  accessToken,
  environment,
})