const mainDictionary = document.querySelector('.main-dictionary-selector')
const saveBtn = document.querySelector('.save-btn')

saveBtn.addEventListener(
  'click',
  sendMainDictionaryId.bind(null, mainDictionary)
)

function sendMainDictionaryId (selector) {
  chrome.runtime.sendMessage({ id: selector.value })
}
