export const courses = [
  {
    slug: 'aviacionnyj-mehanik',
    title: 'Обучение Авиационный механик по криогенным системам 2 разряда в Москве',
    shortTitle: 'Авиационный механик',
    specialty: 'Слесарь по ремонту авиационной техники',
  },
  {
    slug: 'ezhegodnoe-obuchenie-voditelej',
    title: 'Обучение Авиационный механик по криогенным системам 2 разряда в Москве',
    shortTitle: 'Авиационный механик',
    specialty: 'Слесарь по ремонту авиационной техники',
  },
]

export const getCourseBySlug = (slug) => (
  courses.find((item) => item.slug === slug) ?? null
)
