import { settings, dictionaries, contextMenus } from './settings.js'

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
    settings.mainDictionaryId = result.mainDictionary ? result.mainDictionary : 'macmillan'
  })
}

function initOnMessageListeners () {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    settings.mainDictionaryId = message.id
    chrome.storage.sync.set({ mainDictionary: message.id })
  })
}

function initContextListeners () {
  chrome.contextMenus.onClicked.addListener((clickData) => {
    clickData.selectionText = clickData.selectionText.replace(/\s/g, '-')

    goToAllDictionaries(clickData, dictionaries, settings.mainDictionaryId)
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
      url: `https://www.macmillandictionary.com/dictionary/${settings.english}/${clickData.selectionText}`
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
initOnMessageListeners()
getStorageData()
