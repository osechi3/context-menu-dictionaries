const english = 'american'

const contextMenus = [
  {
    title: 'Macmillan',
    id: 'macmillan',
    contexts: ['selection']
  },

  {
    title: 'Cambridge',
    id: 'cambridge',
    contexts: ['selection']
  },

  {
    title: 'Collins',
    id: 'collins',
    contexts: ['selection']
  },

  {
    title: 'Longman',
    id: 'longman',
    contexts: ['selection']
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
    goToMacmillan(clickData)
    goToCambridge(clickData)
    goToCollins(clickData)
    goToLongman(clickData)
  })
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

createContextMenus(contextMenus)
initContextListeners()
