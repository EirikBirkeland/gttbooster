document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('item1').addEventListener('click', () => {
    chrome.runtime.openOptionsPage()
  })

  document.getElementById('item2').addEventListener('click', () => {
    chrome.tabs.create({
      url: 'https://base.gtt-booster.com'
    })
  })
})
