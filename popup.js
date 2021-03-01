const mainDictionary =
  document.querySelector('.popup__main-dictionary-selector')
const saveBtn = document.querySelector('.popup__apply-btn')

saveBtn.addEventListener(
  'click',
  sendMainDictionaryId.bind(null, mainDictionary)
)

function sendMainDictionaryId (selector) {
  chrome.runtime.sendMessage({ id: selector.value })
}
