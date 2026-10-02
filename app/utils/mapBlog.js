function mediaUrl(file, strapiUrl) {
  if (!file?.url) return ''
  if (file.url.startsWith('http')) return file.url
  return `${strapiUrl}${file.url}`
}

export function mapBlogCategories(items = []) {
  return (items || [])
    .filter((item) => item?.slug && item?.title)
    .map((item) => ({
      id: item.documentId || item.id,
      title: item.title,
      slug: item.slug,
    }))
}

export function mapBlogCard(item, strapiUrl = '') {
  if (!item) return null

  const categories = item.blog_categories || []
  const primary = categories[0]

  return {
    id: item.documentId || item.id,
    slug: item.slug,
    title: item.title || '',
    text: item.subtitle || '',
    tag: primary?.title || '',
    image: mediaUrl(item.image, strapiUrl),
    categories: categories
      .filter((cat) => cat?.slug && cat?.title)
      .map((cat) => ({
        id: cat.documentId || cat.id,
        title: cat.title,
        slug: cat.slug,
      })),
    subtitle: item.subtitle || '',
    post_text: item.post_text || '',
  }
}

export function mapBlogPost(item, strapiUrl = '') {
  const card = mapBlogCard(item, strapiUrl)
  if (!card) return null

  return {
    ...card,
    postTitle: card.title,
    lead: card.subtitle,
    heroImage: card.image,
    tags: card.categories,
    date: formatPostDate(item.updatedAt || item.publishedAt || item.createdAt),
  }
}

function formatPostDate(value) {
  if (!value) return ''

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''

  const formatted = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)

  return `Обновлено ${formatted}`
}
