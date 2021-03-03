import { settings, dictionaries, contextMenus } from '../settings.js'

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
    clickData.selectionText = clickData.selectionText.replace(/\s/g, '-')

    goToAllDictionaries(clickData, dictionaries, settings.mainDictionaryId)
    goToOneDictionary(clickData, dictionaries)
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

function goToOneDictionary (clickData, dictionaries) {
  if (clickData.menuItemId === 'all') return

  dictionaries.forEach(dict => {
    if (clickData.menuItemId !== dict.id) return

    chrome.tabs.create({ url: `${dict.baseUrl}/${clickData.selectionText}`})
  })
}

createContextMenus(contextMenus)
initContextListeners()
