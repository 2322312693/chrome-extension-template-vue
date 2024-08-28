console.log('background.js');

chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    // fiset install open welcome(当扩展首次安装打开欢迎页面)
    chrome.tabs.create({
      url: 'src/pages/welcome/index.html',
    });
  } else if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
    // chrome version  update
  }
  // uninstall open page
  chrome.runtime.setUninstallURL('https://google.com/');
});
