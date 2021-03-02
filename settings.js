export const settings = {
  english: 'american', // Macmillan's main English
  mainDictionaryId: 'macmillan'
}

export const dictionaries = [
  {
    id: 'macmillan',
    baseUrl: `https://www.macmillandictionary.com/dictionary/${settings.english}`
  },

  {
    id: 'cambridge',
    baseUrl: `https://dictionary.cambridge.org/dictionary/english`
  },

  {
    id: 'collins',
    baseUrl: `https://www.collinsdictionary.com/dictionary/english`
  },

  {
    id: 'longman',
    baseUrl: `https://www.ldoceonline.com/dictionary`
  },
]

const contexts = ['selection']

export const contextMenus = [
  {
    title: 'All dictionaries',
    id: 'all',
    contexts
  },

  {
    title: 'Macmillan',
    id: 'macmillan',
    contexts
  },

  {
    title: 'Cambridge',
    id: 'cambridge',
    contexts
  },

  {
    title: 'Collins',
    id: 'collins',
    contexts
  },

  {
    title: 'Longman',
    id: 'longman',
    contexts
  },
]
