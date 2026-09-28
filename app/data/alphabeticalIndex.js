import { directions } from '~/data/directions'

const alphabet = [
  'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К', 'Л', 'М',
  'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Э', 'Ю', 'Я',
]

const professionsByCategory = {
  'rabochie-professii': [
    'Авиационный механик по криогенным системам 2 разряда',
    'Автоклавщик',
    'Автомаляр',
    'Автоматчик клеильных полуавтоматов 3 разряда',
    'Автомеханик',
    'Автослесарь',
    'Аппаратчик',
    'Бригадир',
    'Бурильщик',
    'Вальцовщик',
    'Водитель погрузчика',
    'Горнорабочий',
    'Грузчик',
    'Дежурный',
    'Дефектоскопист',
    'Заготовщик',
    'Изолировщик',
    'Кассир',
    'Кладовщик',
    'Комплектовщик',
    'Контролер',
    'Кузнец',
    'Лаборант',
    'Литейщик',
    'Лифтер',
    'Маляр',
    'Машинист',
    'Машинист крана',
    'Механик',
    'Моторист',
    'Наладчик',
    'Оператор',
    'Отделочник',
    'Пекарь',
    'Плавильщик',
    'Плотник',
    'Разнорабочие',
    'Резчик',
    'Сборщик',
    'Сварщик',
    'Слесарь',
    'Станочник',
    'Уборщик',
    'Формовщик',
    'Фрезеровщик',
    'Чистильщик',
    'Шлифовщик',
    'Штамповщик',
    'Электрогазосварщик',
    'Электромеханик',
    'Электромонтажник',
    'Электромонтер',
    'Электросварщик',
  ],
  perepodgotovka: [
    'Бухгалтер',
    'Водитель',
    'Инженер по охране труда',
    'Кадровик',
    'Мастер производственного обучения',
    'Менеджер',
    'Специалист по закупкам',
    'Экономист',
  ],
  'povyshenie-kvalifikacii': [
    'Инженер',
    'Мастер участка',
    'Начальник смены',
    'Прораб',
    'Специалист ОТ',
    'Техник',
  ],
  attestaciya: [
    'Аттестация по промышленной безопасности',
    'Аттестация сварщиков',
    'Аттестация специалистов НОК',
  ],
  'ohrana-truda': [
    'Охрана труда для руководителей',
    'Охрана труда для специалистов',
    'Пожарно-технический минимум',
    'Первая помощь',
  ],
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/ё/g, 'e')
    .replace(/[^a-zа-я0-9]+/gi, '-')
    .replace(/^-|-$/g, '')
}

function buildGroups(titles, categorySlug) {
  const map = new Map()

  for (const title of titles) {
    const letter = title[0].toUpperCase()
    if (!map.has(letter)) map.set(letter, [])
    map.get(letter).push({
      title,
      directionSlug: categorySlug,
      courseSlug: slugify(title),
    })
  }

  return [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b, 'ru'))
    .map(([letter, items]) => ({ letter, items }))
}

export const alphabeticalCategories = directions.map((direction) => ({
  slug: direction.slug,
  title: direction.menuTitle,
  groups: buildGroups(
    professionsByCategory[direction.slug] || professionsByCategory['rabochie-professii'],
    direction.slug,
  ),
}))

export const alphabeticalLetters = alphabet

export const alphabeticalGroups = alphabeticalCategories[0]?.groups || []
