export const directions = [
  {
    slug: 'rabochie-professii',
    menuTitle: 'Рабочие профессии',
    title: 'Обучение рабочим\nпрофессиям в Москве',
  },
  {
    slug: 'perepodgotovka',
    menuTitle: 'Переподготовка',
    title: 'Обучение по\nпереподготовке в Москве',
  },
  {
    slug: 'povyshenie-kvalifikacii',
    menuTitle: 'Повышение квалификации',
    title: 'Повышение\nквалификации в Москве',
  },
  {
    slug: 'attestaciya',
    menuTitle: 'Аттестация',
    title: 'Аттестация\nспециалистов в Москве',
  },
  {
    slug: 'ohrana-truda',
    menuTitle: 'Охрана труда',
    title: 'Обучение охране\nтруда в Москве',
  },
]

export const getDirectionBySlug = (slug) => (
  directions.find((item) => item.slug === slug) ?? null
)
