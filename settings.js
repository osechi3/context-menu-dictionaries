function getStorageData () {
  chrome.storage.sync.get(null, (result) => {
    settings.mainDictionaryId = result.mainDictionary ?
      result.mainDictionary : 'macmillan'
    settings.englishVariant = result.englishVariant ?
      result.englishVariant : 'american'
    updateEnglishVariant()
  })
}

function updateEnglishVariant () {
  dictionaries = dictionaries.map(dict => {
    if (dict.id === 'macmillan') {
      dict.baseUrl = `https://www.macmillandictionary.com/dictionary/${settings.englishVariant}`
    }
    return dict
  })
}

function initOnMessageListeners () {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.mainDictionary) {
      settings.mainDictionaryId = message.id
      chrome.storage.sync.set({ mainDictionary: message.id })
    } else if (message.englishVariant) {
      settings.englishVariant = message.englishVariant
      chrome.storage.sync.set({ englishVariant: message.englishVariant })
      updateEnglishVariant()
    }
  })
}

export const settings = {
  englishVariant: '', // Macmillan's main English
  mainDictionaryId: 'macmillan'
}

export let dictionaries = [
  {
    id: 'macmillan',
    baseUrl: `https://www.macmillandictionary.com/dictionary/${settings.englishVariant}`
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

getStorageData()
initOnMessageListeners()
