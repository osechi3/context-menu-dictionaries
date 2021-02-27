const english = 'american'

const baseUrls = [
  `https://www.macmillandictionary.com/dictionary/${english}/`,
  `https://dictionary.cambridge.org/dictionary/english/`,
  `https://www.collinsdictionary.com/dictionary/english/`,
  `https://www.ldoceonline.com/dictionary/`,
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

function initContextListeners () {
  chrome.contextMenus.onClicked.addListener((clickData) => {
    goToAllDictionaries(clickData, baseUrls)
    goToMacmillan(clickData)
    goToCambridge(clickData)
    goToCollins(clickData)
    goToLongman(clickData)
  })
}

function goToAllDictionaries (clickData, baseUrls) {
  if (clickData.menuItemId === 'all' && clickData.selectionText) {
    baseUrls.forEach(url => {
      chrome.tabs.create({
        url: `${url}/${clickData.selectionText}`
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
})
