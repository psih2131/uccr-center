import blogImg1 from '~/assets/images/posts/blog-img-1.png'
import blogImg2 from '~/assets/images/posts/blog-img-2.png'
import blogImg3 from '~/assets/images/posts/blog-img-3.png'
import blogImg4 from '~/assets/images/posts/blog-img-4.png'
import blogImg5 from '~/assets/images/posts/blog-img-5.png'
import blogImg6 from '~/assets/images/posts/blog-img-6.png'
import postHero from '~/assets/images/posts/post-hero.png'

const excerpt =
  'Размышляя над проблемой, автор приводит слова старого мастера о том, что истинное ремесло требует терпения.'

const cardTitle = 'Когда требуется обучение по международным перевозкам и СПК'

export const blogCategories = [
  { id: 'all', label: 'Все' },
  { id: 'sro', label: 'СРО' },
  { id: 'accreditation', label: 'Аккредитация' },
  { id: 'retraining', label: 'Переподготовка' },
]

export const posts = [
  {
    slug: 'mezhdunarodnye-perevozki',
    tag: 'СРО',
    category: 'sro',
    title: cardTitle,
    text: excerpt,
    image: blogImg1,
    date: 'Опублковано 12 мая 2024',
    heroImage: postHero,
    postTitle: 'Новостройки Москвы — как купить квартиру в новостройке Москвы?',
    lead:
      'В данной статье мы расскажем Вам, про самые выдающие новостройки Москвы. Рассмотрим отзывы покупателей, ценовую политику, расположение, благоустройство, инфраструктуру и планировки квартир в самых новых ЖК Москвы.',
    tags: [
      { id: 'accreditation', label: 'Аккредитация' },
      { id: 'retraining', label: 'Переподготовка' },
    ],
    html: `
      <h2>Как правильно выбрать новостройку: советы для будущих владельцев</h2>
      <p>Самым верным решение при выборе новостройки является обращение к брокеру по недвижимости. При работе с профессионалам, Ваш выбор квартиры в новостройке окажется приятным занятием и вы сможете подобрать лучший вариант как для жизни, так и для инвестирования.</p>
      <h3>Преимущества работы с брокером:</h3>
      <ul>
        <li>Вам не нужно самостоятельно искать что-то подходящее среди сотен новостроек страны, брокер сам пришлет вам наилучшие варианты под ваш запрос</li>
        <li>Брокер может договориться о получении скидок от застройщика.</li>
        <li>Вы не работаете с перекупами, брокер помогает подобрать квартиру, но сделка происходит между покупателем и застройщиком.</li>
        <li><strong>Самое главное. Брокер не берет с покупателя НИКАКИХ денег. За работу брокеру оплачивает застройщик, но никак не покупатель.</strong></li>
        <li>С брокером недвижимости квартиры дешевле, тк брокерам доступны спец предложения на покупку квартир</li>
      </ul>
      <p>Выбор новостройки — важный и ответственный шаг. От того, насколько правильно вы сделаете свой выбор, зависит ваше будущее комфортное проживание. Чтобы не ошибиться и сделать правильный выбор, следует учесть множество важных аспектов.</p>
      <h2>Топ 5 Новостроек Москвы на 2023 год</h2>
      <p>Описание: Жилой комплекс «Бадаевский» на Кутузовском проспекте представляет собой уникальное место для жизни, которое получило широкое признание как на местном, так и на международном уровне. Этот проект, разработанный швейцарским архитектурным бюро Herzog &amp; de Meuron, стал первым московским проектом в категории «Жилищное строительство», победившим на World Architecture Festival. Ответственный за разработку проекта — девелопер Capital Group.</p>
      <h3>Преимущества работы с брокером:</h3>
      <ul>
        <li>Вам не нужно самостоятельно искать что-то подходящее среди сотен новостроек страны, брокер сам пришлет вам наилучшие варианты под ваш запрос</li>
        <li>Брокер может договориться о получении скидок от застройщика.</li>
        <li>Вы не работаете с перекупами, брокер помогает подобрать квартиру, но сделка происходит между покупателем и застройщиком.</li>
        <li><strong>Самое главное. Брокер не берет с покупателя НИКАКИХ денег. За работу брокеру оплачивает застройщик, но никак не покупатель.</strong></li>
        <li>С брокером недвижимости квартиры дешевле, тк брокерам доступны спец предложения на покупку квартир</li>
      </ul>
      <p>Выбор новостройки — важный и ответственный шаг. От того, насколько правильно вы сделаете свой выбор, зависит ваше будущее комфортное проживание. Чтобы не ошибиться и сделать правильный выбор, следует учесть множество важных аспектов.</p>
      <hr>
    `,
  },
  {
    slug: 'obuchenie-spk',
    tag: 'СРО',
    category: 'sro',
    title: cardTitle,
    text: excerpt,
    image: blogImg2,
    date: 'Опублковано 12 мая 2024',
    heroImage: blogImg2,
    postTitle: cardTitle,
    lead: excerpt,
    tags: [{ id: 'sro', label: 'СРО' }],
    html: `
      <h2>Когда требуется обучение по СПК</h2>
      <p>${excerpt}</p>
      <p>Программы обучения помогают специалистам подтвердить квалификацию и соответствовать требованиям отраслевых стандартов.</p>
      <hr>
    `,
  },
  {
    slug: 'sro',
    tag: 'СРО',
    category: 'sro',
    title: cardTitle,
    text: excerpt,
    image: blogImg3,
    date: 'Опублковано 12 мая 2024',
    heroImage: blogImg3,
    postTitle: cardTitle,
    lead: excerpt,
    tags: [{ id: 'sro', label: 'СРО' }],
    html: `
      <h2>Обучение для вступления в СРО</h2>
      <p>${excerpt}</p>
      <hr>
    `,
  },
  {
    slug: 'akkreditaciya-medpersonala',
    tag: 'Аккредитация',
    category: 'accreditation',
    title: cardTitle,
    text: excerpt,
    image: blogImg4,
    date: 'Опублковано 12 мая 2024',
    heroImage: blogImg4,
    postTitle: 'Аккредитация медицинского персонала: что важно знать',
    lead: excerpt,
    tags: [{ id: 'accreditation', label: 'Аккредитация' }],
    html: `
      <h2>Этапы аккредитации</h2>
      <p>${excerpt}</p>
      <hr>
    `,
  },
  {
    slug: 'perepodgotovka-specialistov',
    tag: 'Переподготовка',
    category: 'retraining',
    title: cardTitle,
    text: excerpt,
    image: blogImg5,
    date: 'Опублковано 12 мая 2024',
    heroImage: blogImg5,
    postTitle: 'Профессиональная переподготовка специалистов',
    lead: excerpt,
    tags: [{ id: 'retraining', label: 'Переподготовка' }],
    html: `
      <h2>Кому подходит переподготовка</h2>
      <p>${excerpt}</p>
      <hr>
    `,
  },
  {
    slug: 'nrs-i-obuchenie',
    tag: 'СРО',
    category: 'sro',
    title: cardTitle,
    text: excerpt,
    image: blogImg6,
    date: 'Опублковано 12 мая 2024',
    heroImage: blogImg6,
    postTitle: 'НРС и обучение: как подготовиться',
    lead: excerpt,
    tags: [{ id: 'sro', label: 'СРО' }],
    html: `
      <h2>Подготовка к НРС</h2>
      <p>${excerpt}</p>
      <hr>
    `,
  },
  {
    slug: 'akkreditaciya-vrachej',
    tag: 'Аккредитация',
    category: 'accreditation',
    title: cardTitle,
    text: excerpt,
    image: blogImg1,
    date: 'Опублковано 12 мая 2024',
    heroImage: blogImg1,
    postTitle: 'Аккредитация врачей',
    lead: excerpt,
    tags: [{ id: 'accreditation', label: 'Аккредитация' }],
    html: `
      <h2>Требования к аккредитации врачей</h2>
      <p>${excerpt}</p>
      <hr>
    `,
  },
  {
    slug: 'ohrana-truda',
    tag: 'Переподготовка',
    category: 'retraining',
    title: cardTitle,
    text: excerpt,
    image: blogImg2,
    date: 'Опублковано 12 мая 2024',
    heroImage: blogImg2,
    postTitle: 'Охрана труда и повышение квалификации',
    lead: excerpt,
    tags: [{ id: 'retraining', label: 'Переподготовка' }],
    html: `
      <h2>Программы по охране труда</h2>
      <p>${excerpt}</p>
      <hr>
    `,
  },
  {
    slug: 'obuchenie-rabochim-professiyam',
    tag: 'СРО',
    category: 'sro',
    title: cardTitle,
    text: excerpt,
    image: blogImg3,
    date: 'Опублковано 12 мая 2024',
    heroImage: blogImg3,
    postTitle: 'Обучение рабочим профессиям',
    lead: excerpt,
    tags: [{ id: 'sro', label: 'СРО' }],
    html: `
      <h2>Рабочие профессии</h2>
      <p>${excerpt}</p>
      <hr>
    `,
  },
  {
    slug: 'povyshenie-kvalifikacii',
    tag: 'Переподготовка',
    category: 'retraining',
    title: cardTitle,
    text: excerpt,
    image: blogImg4,
    date: 'Опублковано 12 мая 2024',
    heroImage: blogImg4,
    postTitle: 'Повышение квалификации специалистов',
    lead: excerpt,
    tags: [{ id: 'retraining', label: 'Переподготовка' }],
    html: `
      <h2>Форматы повышения квалификации</h2>
      <p>${excerpt}</p>
      <hr>
    `,
  },
  {
    slug: 'akkreditaciya-srednego-medpersonala',
    tag: 'Аккредитация',
    category: 'accreditation',
    title: cardTitle,
    text: excerpt,
    image: blogImg5,
    date: 'Опублковано 12 мая 2024',
    heroImage: blogImg5,
    postTitle: 'Аккредитация среднего медперсонала',
    lead: excerpt,
    tags: [{ id: 'accreditation', label: 'Аккредитация' }],
    html: `
      <h2>Особенности аккредитации</h2>
      <p>${excerpt}</p>
      <hr>
    `,
  },
  {
    slug: 'mezhdunarodnye-standarty',
    tag: 'СРО',
    category: 'sro',
    title: cardTitle,
    text: excerpt,
    image: blogImg6,
    date: 'Опублковано 12 мая 2024',
    heroImage: blogImg6,
    postTitle: 'Международные стандарты обучения',
    lead: excerpt,
    tags: [{ id: 'sro', label: 'СРО' }],
    html: `
      <h2>Международные стандарты</h2>
      <p>${excerpt}</p>
      <hr>
    `,
  },
]

const postImages = [blogImg1, blogImg2, blogImg3, blogImg4, blogImg5, blogImg6]
const categoryCycle = [
  { id: 'sro', tag: 'СРО' },
  { id: 'accreditation', tag: 'Аккредитация' },
  { id: 'retraining', tag: 'Переподготовка' },
]

// Демо-наполнение до 5 страниц по 12 карточек, как в макете
const basePosts = posts.splice(0, posts.length)
for (let i = 0; i < 60; i += 1) {
  const base = basePosts[i % basePosts.length]
  const category = categoryCycle[i % categoryCycle.length]
  const image = postImages[i % postImages.length]

  if (i < basePosts.length) {
    posts.push(base)
    continue
  }

  posts.push({
    ...base,
    slug: `${base.slug}-${i + 1}`,
    tag: category.tag,
    category: category.id,
    image,
    heroImage: image,
    tags: [{ id: category.id, label: category.tag }],
  })
}

export function getPostBySlug(slug) {
  return posts.find((item) => item.slug === slug) || null
}

export function getRelatedPosts(slug, limit = 3) {
  return posts.filter((item) => item.slug !== slug).slice(0, limit)
}
