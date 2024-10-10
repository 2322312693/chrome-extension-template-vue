console.log('background.js');
// 定义变量，用于判断是否可以在侧边栏显示
var canDisplayInSidePanel = false;
// 初始化显示模式
function initDisplayMode() {
  // 检测是否支持侧边栏
  canDisplayInSidePanel = chrome.sidePanel != undefined;
  if (canDisplayInSidePanel) {
    // 如果支持侧边栏，设置侧边栏行为
    chrome.sidePanel
      .setPanelBehavior({
        openPanelOnActionClick: true,
      })
      .catch((error) => console.error(error));
    // 当标签页激活时，根据存储的显示模式设置显示
    chrome.tabs.onActivated.addListener(async ({ tabId }) => {
      chrome.storage.sync.get(
        {
          displayMode: 'sidePanel',
        },
        (result) => {
          setDisplayMode(tabId, result.displayMode);
        }
      );
    });
  } else {
    // 如果不支持侧边栏，设置为弹出窗口模式
    chrome.action.setPopup({
      popup: 'popup.html',
    });
    // 禁用侧边栏选项（如果存在）
    if (chrome.sidePanel) {
      chrome.sidePanel.setOptions({
        enabled: false,
      });
    }
  }
  // 检测当前浏览器是否为Vivaldi，如果是，则强制使用弹出窗口模式
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    function (tabs) {
      try {
        let is_vivaldi = 'vivExtData' in tabs[0];
        if (is_vivaldi) {
          canDisplayInSidePanel = false;
          setDisplayMode(tabs[0].id, 'popup');
        }
      } catch (e) {}
    }
  );
}

// 设置显示模式
function setDisplayMode(tabId, displayMode) {
  var displayMode = displayMode;
  // 如果不支持侧边栏，强制使用弹出窗口模式
  if (!canDisplayInSidePanel) displayMode = 'popup';
  // 存储显示模式设置
  chrome.storage.sync.set({
    displayMode: displayMode,
  });
  // 根据显示模式调整UI
  if (displayMode == 'sidePanel') {
    chrome.action.setPopup({
      popup: '',
    });
    chrome.sidePanel.setOptions({
      tabId,
      path: 'src/pages/popup/index.html',
      enabled: true,
    });
  } else {
    chrome.action.setPopup({
      popup: 'popup.html',
    });
    if (chrome.sidePanel) {
      chrome.sidePanel.setOptions({
        tabId,
        enabled: false,
      });
    }
  }
}

chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    // fiset install open welcome(当扩展首次安装打开欢迎页面)
    // chrome.tabs.create({
      // url: 'src/pages/welcome/index.html',
    // });
  } else if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
    // chrome version  update
  }
  // uninstall open page
  chrome.runtime.setUninstallURL('https://www.livepolls.app/chrome_addons?type=uninstall&from=ai_homeworker');
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log(message, 'message');
  if (message.msg === 'changeDisplayMode') {
    setDisplayMode(message.tabId, message.displayMode);
    setTimeout(function () {
      sendResponse();
    }, 100);
    return true;
  } else if (message.type == 'getBase64') {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];
      chrome.tabs.captureVisibleTab((res) => {
        console.log('发送了截屏数据', res);
        chrome.tabs.sendMessage(tab.id, { type: 'base64', data: res });
      });
    });
    return true;
  } else if (message.msg == 'get_user') {
    console.log('get_user');
    // 发送来的消息 判定是读取缓存还是再次请求获取user;
    const byStorage = message?.byStorage || false;
    getAddonUserStatus(byStorage).then(async (res) => {
      let result = await chrome.storage.sync.get(['usetime']);
      let free_times = Math.max(0, 3 - (result?.usetime || 0));
      console.log({
        user: res.user === false ? false : res,
        jwt: res?.jwt,
        free_times,
      });
      sendResponse({
        user: res.user === false ? false : res,
        jwt: res?.jwt,
        free_times,
      });
    });
    return true;
  } else if (message.msg === 'login') {
    handleLogin(message.data);
  } else if (message.msg == 'subscribed') {
    handleSubscribe();
  } else if (message.msg === 'canDisplayInSidePanel') {
    sendResponse(canDisplayInSidePanel);
    return true;
  } else if (message.msg === 'useFreeTimes') {
    updateFreeTimes();
    return true;
  } else if (message.msg === 'new_tab_search_img') {
    chrome.tabs.create({ url: 'src/pages/popup/index.html' }, tab => {
      setTimeout(() => {
        chrome.tabs.sendMessage(tab.id, { msg: 'searchImg',data:message.base64 });
      }, 1000);
    });
    return true;
  }
});

chrome.contextMenus.create({
  contexts: ['image'],
  id: 'img',
  title: `Get Answer`,
});

// 文本
chrome.contextMenus.create({
  contexts: ['selection'],
  id: 'text',
  title: `Get Answer`,
});

chrome.contextMenus.create({
  contexts: ['page'],
  id: 'captrue',
  title: `Capture Question ➡️ Get Answer`,
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  console.log(info, 'info');
  console.log(tab, 'tab');
  if (info.menuItemId === 'img') {
     chrome.tabs.create({ url: 'src/pages/popup/index.html' }, tab => {
       setTimeout(() => {
        chrome.tabs.sendMessage(tab.id, { msg: 'searchImg',data:info.srcUrl });
       }, 1000);
     });
  } else if (info.menuItemId === 'text') {
    chrome.tabs.create({ url: 'src/pages/popup/index.html' }, tab => {
      setTimeout(() => {
        chrome.tabs.sendMessage(tab.id, { msg: 'searchText',data:info.selectionText });
      }, 1000);
    });
    // 在这里添加你的处理逻辑
  } else if (info.menuItemId === 'captrue') {
    console.log('捕获菜单项被点击');
    chrome.tabs.sendMessage(tab.id, { type: 'screenshot',new_tab:true });
    // 在这里添加你的处理逻辑
  }
  return true;
});

// 执行初始化显示模式函数
initDisplayMode();

// 获取浏览器登录用户信息
function getProfileUserInfo() {
  return new Promise(async (resolve, reject) => {
    let result = await chrome.storage.sync.get(['g_user_info']);
    if (result.g_user_info) {
      resolve(result.g_user_info);
    } else {
      chrome.identity.getProfileUserInfo({ accountStatus: 'ANY' }, (userInfo) => {
        console.log('userInfo', userInfo);
        resolve(userInfo);
        chrome.storage.sync.set({ g_user_info: userInfo });
      });
    }
  });
}

// 获取易宠用户信息
async function getAddonUserStatus(byStoray) {
  if (byStoray) {
    let storage = await chrome.storage.sync.get(['user', 'getUserDateNow']);
    const user = storage?.user;
    const getUserDateNow = storage?.getUserDateNow;
    if (getUserDateNow && Date.now() - getUserDateNow < 9 * 60 * 60 * 1000 && user) {
      return user;
    } else {
      console.log('fetch user');
    }
  }
  let g_user = await getProfileUserInfo();
  let google_uid = g_user.id;
  const header = {
    Referer: 'https://www.livepolls.app/ai_homework_helper/chrome',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  };
  const response = await request({
    url: `https://www.livepolls.app/ai_homework_helper/api/user/status?email=${g_user?.email}`,
    method: 'POST',
    headers: header,
    data: {
      email: g_user?.email,
      app_type: 'chrome_addon',
      uuid: google_uid,
    },
  });

  if (response?.subscription?.detail) {
    response.subscription.is_subscribed = true;
  }
  //记录storage
  chrome.storage.sync.set({ jwt: response.jwt, user: response?.profile ? response : false, getUserDateNow: Date.now() });
  console.log('发送登录成功');
  chrome.runtime.sendMessage({ type: 'loginSuccess', user: response?.profile ? response : false, free_times: -1 });
  return response;
}

let user = null;
let loopLoginCounter = 1;
let loopSubscribeCounter = 1;
let getUserStatusPromise = false;

var subscribeActive = false;
function handleSubscribe() {
  let isEdge = navigator.userAgent.toLowerCase().match(/edg/) != null;
  const url = `https://www.livepolls.app/ai_homework_helper/pricing?close=1&from=${isEdge ? 'edge_addon' : 'chrome_addon'}`;
  chrome.tabs.create({ url }, function (tab) {
    subscribeActive = true;
    // 定义监听器函数
    function onTabRemoved(tabId, removeInfo) {
      if (tabId === tab.id) {
        console.log('订阅页关闭');
        getAddonUserStatus();
        subscribeActive = false;
        // 移除监听器
        chrome.tabs.onRemoved.removeListener(onTabRemoved);
      }
    }
    // 添加监听器
    chrome.tabs.onRemoved.addListener(onTabRemoved);
  });
  setTimeout(() => {
    loopSubscribeCounter = 1;
    loopSubscribe();
  }, 5000);
}

// 轮询订阅
async function loopSubscribe() {
  if (!subscribeActive) return;
  try {
    getUserStatusPromise = getAddonUserStatus();
    user = await getUserStatusPromise;
    console.log('user', user);
    if ((!user.subscription || !user.subscription.free_cnt) && loopSubscribeCounter < 50) {
      setTimeout(() => {
        loopSubscribeCounter++;
        loopSubscribe();
      }, 4000);
    } else if (user.subscription && user.subscription.free_cnt) {
      chrome.storage.sync.set({ user, getUserDateNow: Date.now() });
      chrome.runtime.sendMessage({ type: 'loginSuccess', user: user, free_times: -1 });
    }
  } catch (error) {}
}

// 登录页面 打开状态
var loginTabActive = false;
async function handleLogin(subscribe = false) {
  let isEdge = navigator.userAgent.toLowerCase().match(/edg/) != null;
  let url = subscribe ? `https://www.livepolls.app/ai_homework_helper/login?subscribe=1&from=${isEdge ? 'edge_addon' : 'chrome_addon'}` : `https://www.livepolls.app/ai_homework_helper/login?close=1&from=${isEdge ? 'edge_addon' : 'chrome_addon'}`;
  console.log('打开标签页');
  chrome.tabs.create({ url }, function (tab) {
    loginTabActive = true;
    // 定义监听器函数
    function onTabRemoved(tabId, removeInfo) {
      if (tabId === tab.id) {
        console.log('登录页关闭');
        getAddonUserStatus();
        loginTabActive = false;
        // 移除监听器
        chrome.tabs.onRemoved.removeListener(onTabRemoved);
      }
    }
    // 添加监听器
    chrome.tabs.onRemoved.addListener(onTabRemoved);
  });
  setTimeout(() => {
    loopLoginCounter = 1;
    loopLogin(subscribe);
  }, 5000);
}

// 轮询登录
async function loopLogin(subscribe) {
  // 登录页标 失活 不再轮询问
  if (!loginTabActive) return;

  try {
    getUserStatusPromise = getAddonUserStatus();
    user = await getUserStatusPromise;
    console.log('user', user);
    if (!user.profile && loopLoginCounter < 50) {
      setTimeout(() => {
        loopLoginCounter++;
        loopLogin();
      }, 4000);
    } else if (user.profile) {
      chrome.storage.sync.set({ user, getUserDateNow: Date.now() });
      chrome.runtime.sendMessage({ type: 'loginSuccess', user: user, free_times: -1 });
      if (subscribe) {
        loopSubscribe();
      }
    }
  } catch (error) {
    console.log('loopLogin:error', error);
  }
}

// 封装的请求函数
function request({ url, data = null, method = 'GET', headers = null }) {
  try {
    var controller = new AbortController();
    var signal = controller.signal;
  } catch (error) {}

  let options = {
    method: method,
    headers: {
      'X-Access-Channel': 'ai_homework_helper',
    },
  };

  if (headers) {
    options.headers = Object.assign(options.headers, headers);
    if (headers['Content-Type'] && headers['Content-Type'].indexOf('application/x-www-form-urlencoded') != -1 && data) {
      let _data = '';
      Object.keys(data).forEach((element) => {
        if (data[element] || data[element] == 0) {
          _data += `${element}=${data[element]}&`;
        }
      });
      data = _data.slice(0, _data.length - 1);
    }
  }
  if (data) {
    if (typeof data == 'string') {
      options.body = data;
    } else {
      options.body = JSON.stringify(data);
    }
  }
  if (signal) {
    options.signal = signal;
  }

  const timeoutPromise = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(new Response('timeout', { status: 504, statusText: 'timeout' }));
        if (controller) controller.abort();
      }, 60000);
    });
  };

  return Promise.race([timeoutPromise(), fetch(url, options).then((response) => response.json())])
    .then((data) => {
      if (data.success == true || data.ok === 0 || data.code == 0) {
        if (data.message || data.message == 0) window.g_message = data.message;
        return Promise.resolve(data.data);
      } else if (data && (data.image || data.result)) {
        return Promise.resolve(data);
      } else {
        if (data.statusText == 'timeout') {
          return Promise.reject('The system is busy, please try again later');
        } else {
          return Promise.reject(data.message || (data.msg && data) || 'failed, please check your network and try again');
        }
      }
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

// 减少免费次数的函数
function updateFreeTimes() {
  console.log('updateFreeTimes--'); // 打印函数开始执行的日志
  // 从同步存储中获取当前的免费次数
  chrome.storage.sync.get(['usetime'], (result) => {
    let usetime = result.usetime || 0; // 如果没有设置过usetime，则默认为0
    // 检查是否已达到免费次数上限
    if (usetime < 3) {
      // 将免费次数减1
      usetime = usetime + 1;
      // 将减1后的免费次数存储回同步存储
      chrome.storage.sync.set({ usetime: usetime });
      // 向其他部分发送消息，通知免费次数已更新
      chrome.runtime.sendMessage({ type: 'updateFreeTimes', free_times: 3 - usetime });
    } else {
      console.log('免费次数已达到上限'); // 打印免费次数已达到上限的日志
      chrome.runtime.sendMessage({ type: 'updateFreeTimes', free_times: 0 });
    }
  });
}
