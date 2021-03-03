const mainDictionary =
  document.querySelector('.popup__main-dictionary-selector')

const englishVariant =
  document.querySelector('.popup__english-variant-selector')

mainDictionary.addEventListener('click', sendMainDictionaryId)
englishVariant.addEventListener('click', sendEnglishVariant)

function sendMainDictionaryId (e) {
  chrome.runtime.sendMessage({ id: e.currentTarget.value })
}

function sendEnglishVariant (e) {
  chrome.runtime.sendMessage({ englishVariant: e.currentTarget.value })
}

function showUserSettings () {
  chrome.storage.sync.get(['mainDictionary'], (result) => {
    const option = document.querySelector(`[value="${result.mainDictionary}"]`)
    option.setAttribute('selected', '')
  })

  chrome.storage.sync.get(['englishVariant'], (result) => {
    const option = document.querySelector(`[value="${result.englishVariant}"]`)
    option.setAttribute('selected', '')
  })
}

showUserSettings()
