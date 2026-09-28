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

export const getCourseBySlug = (slug) => {
  if (!slug || typeof slug !== 'string') return null

  const found = courses.find((item) => item.slug === slug)
  if (found) return found

  // Пока в данных мало курсов — не роняем демо-ссылки 404-ом
  return {
    slug,
    title: `Обучение по программе «${slug}»`,
    shortTitle: slug,
    specialty: 'Программа обучения',
  }
}
