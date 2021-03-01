const english = 'american'
let mainDictionaryId

const dictionaries = [
  {
    id: 'macmillan',
    baseUrl: `https://www.macmillandictionary.com/dictionary/${english}`
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

const contextMenus = [
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

function createContextMenus (contextMenus) {
  contextMenus.forEach(menu => {
    chrome.contextMenus.create({
      title: menu.title,
      id: menu.id,
      contexts: menu.contexts
    })
  })
}

function getStorageData () {
  chrome.storage.sync.get(['mainDictionary'], (result) => {
    mainDictionaryId = result.mainDictionary ? result.mainDictionary : 'macmillan'
  })
}

function initOnMessageListeners () {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    mainDictionaryId = message.id
    chrome.storage.sync.set({ mainDictionary: message.id })
  })
}

function initContextListeners () {
  chrome.contextMenus.onClicked.addListener((clickData) => {
    clickData.selectionText = clickData.selectionText.replace(/\s/g, '-')

    goToAllDictionaries(clickData, dictionaries, mainDictionaryId)
    goToMacmillan(clickData)
    goToCambridge(clickData)
    goToCollins(clickData)
    goToLongman(clickData)
  })
}

function goToAllDictionaries (clickData, dictionaries, mainDictionaryId) {
  if (clickData.menuItemId === 'all' && clickData.selectionText) {
    dictionaries.forEach(dict => {
      chrome.tabs.create({
        url: `${dict.baseUrl}/${clickData.selectionText}`,
        active: dict.id === mainDictionaryId ? true : false
      })
    })
  }
}

function goToMacmillan (clickData) {
  if (clickData.menuItemId === 'macmillan' && clickData.selectionText) {
    chrome.tabs.create({
      url: `https://www.macmillandictionary.com/dictionary/${english}/${clickData.selectionText}`
    })
  }
}

function goToCambridge (clickData) {
  if (clickData.menuItemId === 'cambridge' && clickData.selectionText) {
    chrome.tabs.create({
      url: `https://dictionary.cambridge.org/dictionary/english/${clickData.selectionText}`
    })
  }
}

function goToCollins (clickData) {
  if (clickData.menuItemId === 'collins' && clickData.selectionText) {
    chrome.tabs.create({
      url: `https://www.collinsdictionary.com/dictionary/english/${clickData.selectionText}`
    })
  }
}

function goToLongman (clickData) {
  if (clickData.menuItemId === 'longman' && clickData.selectionText) {
    chrome.tabs.create({
      url: `https://www.ldoceonline.com/dictionary/${clickData.selectionText}`
    })
  }
}

chrome.runtime.onInstalled.addListener(() => {
  createContextMenus(contextMenus)
  initContextListeners()
  initOnMessageListeners()
  getStorageData()
})
