<template>
  <div class="article__body">
    <template v-for="(block, index) in blocks" :key="index">
      <!-- Параграф -->
      <p
        v-if="block.type === 'paragraph'"
        :class="getParagraphClass(block.subtype)"
        v-html="block.content"
      ></p>

      <!-- Заголовок -->
      <component
        v-else-if="block.type === 'heading'"
        :is="`h${block.level}`"
        v-html="block.content"
      ></component>

      <!-- Цитата -->
      <aside v-else-if="block.type === 'quote'" class="article__quote">
        <p class="article__quote-text" v-html="block.content"></p>
        <p v-if="block.meta" class="article__quote-meta">{{ block.meta }}</p>
      </aside>

      <!-- Изображение (с figure) -->
      <figure v-else-if="block.type === 'figure'" class="article__figure">
        <div class="article__figure-img">
          <img :src="block.src" :alt="block.alt" />
        </div>
        <figcaption v-if="block.caption" class="article__figure-caption">
          {{ block.caption }}
        </figcaption>
      </figure>
      
      <!-- Обычное изображение (без figure) -->
      <div v-else-if="block.type === 'image'" class="article__image">
        <img :src="block.src" :alt="block.alt" />
      </div>

      <!-- Список -->
      <ul v-else-if="block.type === 'list' && block.listType === 'unordered'" class="article__list">
        <li v-for="(item, i) in block.items" :key="i" v-html="item.content"></li>
      </ul>
      
      <ol v-else-if="block.type === 'list' && block.listType === 'ordered'" class="article__list">
        <li v-for="(item, i) in block.items" :key="i" v-html="item.content"></li>
      </ol>
    </template>
  </div>
</template>

<script setup>
import {computed, onMounted} from 'vue'
import { WordPressContentParser } from '@/utils/wordpressParser'

const props = defineProps({
  // Можем принимать либо готовые блоки, либо HTML контент
  blocks: {
    type: Array,
    required: false,
    default: null
  },
  content: {
    type: String,
    required: false,
    default: ''
  }
})

// Используем готовые блоки если они переданы, иначе парсим HTML
const blocks = computed(() => {
  if (props.blocks) {
    return props.blocks
  }
  return WordPressContentParser.parse(props.content)
})

function getParagraphClass(subtype) {
  const classMap = {
    lead: 'article__lead',
    question: 'article__question',
    thanks: 'article__thanks',
    author: 'article__author',
    normal: ''
  }
  return classMap[subtype] || ''
}

</script>

<style scoped lang="scss">
/* Основной контейнер тела статьи */
.article__body {
  margin-top: var(--paddingL);
  display: flex;
  flex-direction: column;
  gap: var(--paddingS);
  font-size: 0.95rem;
  line-height: 1.5;
  font-family: var(--font-main);
  color: var(--color-text);
  
  /* Сброс отступов у всех параграфов */
  p {
    margin-top: 0;
    margin-bottom: 4px;
  }
}

/* Лид-параграф */
.article__lead {
  font-weight: 500;
}

/* Вопрос */
.article__question {
  margin-top: var(--paddingXS);
}

/* Благодарности */
.article__thanks {
  margin-top: var(--paddingL);
}

/* Информация об авторе */
.article__author {
  margin-top: var(--paddingS);
  font-weight: 500;
}


/* Заголовки внутри контента */
h2, h3, h4, h5, h6 {
  margin-top: var(--paddingL);
  margin-bottom: var(--paddingS);
  font-weight: 700;
  line-height: 1.3;
  color: var(--color-text);
}

h2 {
  font-size: 1.5rem;
}

h3 {
  font-size: 1.25rem;
}

h4 {
  font-size: 1.1rem;
}

/* Встроенная картинка */
.article__figure {
  margin: var(--paddingL) 0;
  
  img {
    width: 100%;
    max-height: 420px;
    object-fit: contain;
    border-radius: var(--radius-md);
  }
}

.article__figure-img {
  width: 100%;
  
  img {
    width: 100%;
    max-height: 420px;
    object-fit: contain;
    border-radius: var(--radius-md);
    display: block;
  }
}

.article__figure-caption {
  margin-top: 4px;
  font-size: 0.8rem;
  color: var(--color-text-muted);
  line-height: 1.4;
}

/* Обычное изображение без figure */
.article__image {
  margin: var(--paddingL) 0;
  
  img {
    width: 100%;
    max-height: 420px;
    object-fit: cover;
    border-radius: var(--radius-md);
    display: block;
  }
}

/* Цитата */
.article__quote {
  margin: var(--paddingL) 0;
  padding: var(--paddingL);
  border-radius: var(--radius-md);
  background: rgba(144, 213, 172, 0.2); // мягкий фирменный зелёный фон
  position: relative;
  overflow: hidden;
}

.article__quote::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 6px;
  background-color: var(--color-primary);
}

.article__quote-text {
  margin: 0 0 8px;
  font-size: 1.05rem;
  line-height: 1.6;
  font-style: italic;
  font-weight: 600;
}

.article__quote-meta {
  margin: 0;
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

/* Списки */
.article__list {
  margin: var(--paddingS) 0;
  padding-left: 1.5rem;
  
  li {
    margin: 4px 0;
    line-height: 1.5;
  }
}

ul, ol {
  margin: var(--paddingS) 0;
  padding-left: 1.5rem;
  
  li {
    margin: 4px 0;
    line-height: 1.5;
  }
}

/* Глобальные стили для всех изображений в контенте */
img {
  max-width: 100%;
  max-height: 420px;
  height: auto;
  display: block;
  margin: var(--paddingM) 0;
  border-radius: var(--radius-md);
  object-fit: cover;
}

/* Стили для ссылок */
a {
  color: var(--color-primary);
  text-decoration: underline;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.8;
  }
}

/* Стили для выделенного текста */
strong, b {
  font-weight: 700;
}

em, i {
  font-style: italic;
}
</style>
