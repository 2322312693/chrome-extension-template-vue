<template>
  <div class="wrap"></div>
  <div v-if="showCapture" id="start-wrap">
    <div @mouseup="mouseupInit" @mousedown="wrapMousedonw" @mousemove="wrapMousemove" id="awesome_screenshot_wrapper"
      ref="awesome_screenshot_wrapper" style="display: block">
      <div id="awesome_screenshot_top" ref="awesome_screenshot_top"></div>
      <div id="awesome_screenshot_right" ref="awesome_screenshot_right"></div>
      <div id="awesome_screenshot_bottom" ref="awesome_screenshot_bottom"></div>
      <div id="awesome_screenshot_left" ref="awesome_screenshot_left"></div>
      <div id="awesome_screenshot_center" @mouseup="centerMouseup" @mousedown="centerMousedown"
        @mousemove="centertMousemove" ref="awesome_screenshot_center" class="drsElement drsMoveHandle">
        <div id="awesome_screenshot_size" style="min-width: 70px; display: block">
          <span>{{ centerWidthData }} X {{ centerHeightData }}</span>
        </div>
        <div class="dragresize dragresize-tl" @mousedown="handleSidesDonw('tl', $event)"></div>
        <div class="dragresize dragresize-tm" @mousedown="handleSidesDonw('tm', $event)"></div>
        <div class="dragresize dragresize-tr" @mousedown="handleSidesDonw('tr', $event)"></div>
        <div class="dragresize dragresize-ml" @mousedown="handleSidesDonw('ml', $event)"></div>
        <div class="dragresize dragresize-mr" @mousedown="handleSidesDonw('mr', $event)"></div>
        <div class="dragresize dragresize-bl" @mousedown="handleSidesDonw('bl', $event)"></div>
        <div class="dragresize dragresize-bm" @mousedown="handleSidesDonw('bm', $event)"></div>
        <div class="dragresize dragresize-br" @mousedown="handleSidesDonw('br', $event)"></div>
      </div>
    </div>
    <div id="screenshot_annotate" class="annotate_toolbar" style="display: none">
      <input id="file_input" type="file" class="file-input" accept=".jpg,.png,.jpeg" />
      <div id="shapes_area" class="shapes_area" style="display: none">
        <div id="awesome_rect_btn" class="toolbar_item tooltip tooltip-right" aria-label="矩形框">
          <div class="toolbtn rect"></div>
        </div>
        <div id="awesome_round_btn" class="toolbar_item tooltip tooltip-right" aria-label="椭圆">
          <div class="toolbtn ellipse"></div>
        </div>
        <div id="awesome_arrow_btn" class="toolbar_item tooltip tooltip-right" aria-label="箭头">
          <div class="toolbtn line_arrow"></div>
        </div>
        <div id="awesome_freeline_btn" class="toolbar_item tooltip tooltip-right" aria-label="笔">
          <div class="toolbtn curve"></div>
        </div>
        <div id="awesome_blur_btn" class="toolbar_item tooltip tooltip-right" aria-label="模糊">
          <div class="toolbtn rect_blur"></div>
        </div>
        <div id="awesome_undo_btn" aria-label="撤销" class="toolbar_item action_item tooltip tooltip-right disable">
          <div class="toolbtn undobtn"></div>
        </div>
        <div id="awesome_text_btn" class="toolbar_item tooltip tooltip-right" aria-label="文字">
          <div class="toolbtn text"></div>
        </div>
        <div id="awesome_callout_btn" class="toolbar_item tooltip tooltip-right premium isfree" aria-label="标注">
          <div class="toolbtn callout"></div>
        </div>
        <div id="awesome_step_btn" class="toolbar_item tooltip tooltip-right premium isfree" aria-label="步骤">
          <div class="toolbtn list"></div>
        </div>
        <div id="awesome_image_btn" class="toolbar_item tooltip tooltip-right premium isfree" aria-label="表情">
          <div class="toolbtn image"></div>
        </div>
        <div id="awesome_image_local_btn" class="toolbar_item tooltip tooltip-right premium isfree" aria-label="图片">
          <div class="toolbtn insertImage"></div>
        </div>
        <div class="sep_line"></div>
        <div id="awesome_clear_btn" class="toolbar_item action_item tooltip tooltip-right disable" aria-label="清除">
          <div class="toolbtn clear-all icon-text"></div>
        </div>
      </div>
      <div class="action_area">
        <a @click="cancel" id="clear112">
          <svg t="1695195852681" class="icon" style="width: 17px; height: 17px" viewBox="0 0 1025 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg" p-id="1469" width="200" height="200">
            <path
              d="M513.024 1024C230.254592 1024 1.024 794.769408 1.024 512S230.254592 0 513.024 0s512 229.230592 512 512-229.230592 512-512 512z m0-589.579264l-168.0896-168.0896-77.579264 77.579264L435.444736 512l-168.0896 168.0896 77.579264 77.579264L513.024 589.579264l168.0896 168.0896 77.579264-77.579264L590.603264 512l168.0896-168.0896-77.579264-77.579264L513.024 434.420736z"
              fill="#cdcdcd"
              p-id="1470"></path>
          </svg>
        </a>

        <!-- <a @click="copy" id="awesome_screenshot_copy" class="awesome_action_btn copy">Copy</a> -->
         <a @click="handleSearch" class="awesome_action_btn copy">Search</a>
        <!-- <a @click="cancel" id="awesome_screenshot_cancel" class="awesome_action_btn cancel">Cancel</a> -->
        <!-- <a @click="toExcel" id="awesome_screenshot_capture" class="awesome_action_btn tooltip tooltip-bottom save">To Spreadsheet</a> -->
      </div>
      <div id="awesome_color_panel" class="color_panel left">
        <div class="trangle"></div>
        <div class="colors">
          <div id="awesome_width_small" class="width_cell shape">
            <div class="dot small"></div>
            <div class="font small">A</div>
          </div>
          <div id="awesome_width_middle" class="width_cell shape">
            <div class="dot middle"></div>
            <div class="font middle">A</div>
          </div>
          <div id="awesome_width_big" class="width_cell shape">
            <div class="dot big"></div>
            <div class="font big">A</div>
          </div>
          <div id="red_clr" class="color_cell red"></div>
          <div id="blue_clr" class="color_cell blue"></div>
          <div id="green_clr" class="color_cell green"></div>
          <div id="yellow_clr" class="color_cell yellow"></div>
          <div id="gray_clr" class="color_cell gray"></div>
          <div id="white_clr" class="color_cell white"></div>
        </div>
      </div>
      <div id="awesome_svgs_panel" class="svg-panel right"></div>
    </div>
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue';

let maxWidth = ref(0);
let maxHeight = ref(0);

let showCapture = ref(false);
let awesome_screenshot_wrapper = ref(null);
let awesome_screenshot_top = ref(null);
let awesome_screenshot_bottom = ref(null);
let awesome_screenshot_left = ref(null);
let awesome_screenshot_right = ref(null);
let awesome_screenshot_center = ref(null);

let centerWidthData = ref(0);
let centerHeightData = ref(0);

// 获取base64数组
let base64Array = [];
// base64拼接后的
let base64Result = '';

const new_tab=ref(false)
document.addEventListener('keydown', function (event) {
  // 检查是否按下了 Ctrl 键（按键码 17）和 Shift 键（按键码 16），以及按下的键是否是 S 键（按键码 83）
  if (event.ctrlKey && event.shiftKey && event.keyCode === 83) {
    // 阻止默认事件，以防止浏览器保存页面
    event.preventDefault();
    // 在这里执行你想要执行的操作，例如触发保存功能
    start();
  }

  // ctrl+shift+m 测试
  if (event.ctrlKey && event.shiftKey && event.keyCode === 77) {
    // 阻止默认事件，以防止浏览器保存页面
    event.preventDefault();
    start();
  }
});

nextTick(() => {
  console.log('开始安装接受端口');
  console.log(chrome);
  if (chrome?.runtime) {
    chrome.runtime.onMessage.addListener(async (message) => {
      console.log('message', message);
      if (message.type == 'screenshot') {
        new_tab.value=message.new_tab
        console.log('执行截图');
        start();
      } else if (message.type == 'base64') {
        base64Array.push(message.data);
      }
    });
  }
  console.log('信息接收端准备完毕');
});

// 最外部 warp 的事件
// 节流的 一次只能创建一个这样的 选择框
let flag = false;
// 是否点击后拖拽了
let wrapIsDrag = false;
// 初始化 创建center框事件
let wrapDownClientY = 0;
let wrapDownClientX = 0;
// 是否点击了后移动
let isDonwMove;

let originalCenterWidth;
let originalCenterHeight;
let originalCenterTop;
let originalCenterLeft;

let sidesDownX;
let sidesDownY;
let dir;

let previousScrollY = window.scrollY; // 上一个滚动位置

const wrapMousedonw = (event) => {
  console.log('执行了');
  wrapIsDrag = false;
  isDonwMove = true;
  // 最开始点击的坐标

  wrapDownClientX = event.clientX;
  wrapDownClientY = event.clientY;
};
const wrapMousemove = (event) => {
  // 已经创过 截图框了
  if (flag) {
    if (isDonwMove) {
      console.log('走到这里了');
      if (dir == 'tl' || dir == 'tm' || dir == 'tr') {
        if (!dirScroll) {
          // 改变top
          let topY = event.clientY - sidesDownY;
          // zheng ==false   top减少 height 增加
          // zheng==true  top增加 height 减少
          if (topY > 0) {
            awesome_screenshot_center.value.style.height = originalCenterHeight - Math.abs(topY) + 'px';
            awesome_screenshot_center.value.style.top = originalCenterTop + Math.abs(topY) + 'px';
          } else {
            awesome_screenshot_center.value.style.height = originalCenterHeight + Math.abs(topY) + 'px';
            awesome_screenshot_center.value.style.top = originalCenterTop - Math.abs(topY) + 'px';
          }
        }
      }
      if (dir == 'tl' || dir == 'ml' || dir == 'bl') {
        // 改变left  改变width
        let LeftX = event.clientX - sidesDownX;
        // left -- 负数  width增大 left减小
        // left == 正数  width减小 left加大
        if (LeftX > 0) {
          awesome_screenshot_center.value.style.width = originalCenterWidth - Math.abs(LeftX) + 'px';
          awesome_screenshot_center.value.style.left = originalCenterLeft + Math.abs(LeftX) + 'px';
        } else {
          awesome_screenshot_center.value.style.width = originalCenterWidth + Math.abs(LeftX) + 'px';
          awesome_screenshot_center.value.style.left = originalCenterLeft - Math.abs(LeftX) + 'px';
        }
      }
      if (dir == 'bl' || dir == 'bm' || dir == 'br') {
        if (!dirScroll) {
          // 锚点 要加上滚动历史
          let topY = event.clientY - sidesDownY;
          // 正数 +大height
          if (topY > 0) {
            awesome_screenshot_center.value.style.height = originalCenterHeight + Math.abs(topY) + 'px';
          } else {
            awesome_screenshot_center.value.style.height = originalCenterHeight - Math.abs(topY) + 'px';
          }
        }
      }
      if (dir == 'tr' || dir == 'br' || dir == 'mr') {
        let LeftX = event.clientX - sidesDownX;
        if (LeftX > 0) {
          awesome_screenshot_center.value.style.width = originalCenterWidth + Math.abs(LeftX) + 'px';
        } else {
          awesome_screenshot_center.value.style.width = originalCenterWidth - Math.abs(LeftX) + 'px';
        }
      }
    }
    updateMaskWH();
    return;
  }
  // 第一次执行
  if (isDonwMove) {
    var scrollTop = window.scrollY || window.pageYOffset;
    awesome_screenshot_wrapper.value.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    wrapIsDrag = true;
    nextTick(() => {
      // dirScroll=true
      // 实现了左右双向
      if (event.clientX - wrapDownClientX < 0) {
        awesome_screenshot_center.value.style.width = Math.abs(event.clientX - wrapDownClientX) + 'px';
        awesome_screenshot_center.value.style.left = Math.abs(event.clientX) + 'px';
      } else {
        awesome_screenshot_center.value.style.width = event.clientX - wrapDownClientX + 'px';
        let w = awesome_screenshot_center.value.style.width;
        awesome_screenshot_center.value.style.left = event.clientX - parseFloat(w) + 'px';
      }
      if (event.clientY - wrapDownClientY < 0) {
        awesome_screenshot_center.value.style.height = Math.abs(event.clientY - wrapDownClientY) + 'px';
        awesome_screenshot_center.value.style.top = Math.abs(event.clientY) + scrollTop + 'px';
      } else {
        awesome_screenshot_center.value.style.height = event.clientY - wrapDownClientY + 'px';
        let h = awesome_screenshot_center.value.style.height;
        awesome_screenshot_center.value.style.top = event.clientY - parseFloat(h) + scrollTop + 'px';
      }
      updateMaskWH();
    });
  }
};
const mouseupInit = (event) => {
  isDonwMove = false;
  dir = '';
  if (flag) {
    return;
  } else {
    if (wrapIsDrag) {
      flag = true;
    } else {
      flag = true;
      console.log('执行了');
      awesome_screenshot_center.value.style.width = '200px';
      awesome_screenshot_center.value.style.height = '200px';
      let w = awesome_screenshot_center.value.style.width;
      let h = awesome_screenshot_center.value.style.height;
      awesome_screenshot_center.value.style.left = Math.max(event.clientX - parseFloat(w) / 2, 0) + 'px';
      awesome_screenshot_center.value.style.top = Math.max(event.clientY - parseFloat(h) / 2, 0) + 'px';
      updateMaskWH();
      awesome_screenshot_wrapper.value.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    }
  }
};

let centerIsDrag = false;
let downX;
let downY;

// 点击dir的时候 拖动滚轮 同时 禁止掉dir鼠标拖拽移动事件
let dirScroll = null;



// const watchWinwodWidth = () => {
//   const dom=document.querySelector("#awesome_screenshot_wrapper")
//   console.log(dom, "dom")
//   if(dom){
//     dom.style.width = window.innerWidth + 'px';
//     dom.style.height = window.innerHeight + 'px';
//   }
// }


const start = () => {
  showCapture.value = true;
  base64Array = [];
  base64Result = '';
  nextTick(() => {
    if (awesome_screenshot_wrapper) {
      console.log('执行了')
      console.log(awesome_screenshot_wrapper.value)
      awesome_screenshot_wrapper.value.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    }
    const totalHeight = document.documentElement.scrollHeight;
    const totalWidth = document.documentElement.scrollWidth;
    maxWidth.value = totalWidth;
    maxHeight.value = totalHeight;
    awesome_screenshot_wrapper.value.style.height = totalHeight + 'px';
    awesome_screenshot_wrapper.value.style.width = totalWidth + 'px';
  });

  window.keydownFun = function (event) {
    // 检查按下的键是否是ESC键，ESC键的键码是27
    if (event.keyCode === 27) {
      // 在这里执行你的操作，例如关闭模态框或执行其他任务
      console.log('ESC键被按下');
      cancel();
    }
  };

  document.addEventListener('keydown', window.keydownFun);

  window.windowmoverFun = function (event) {
    // 鼠标 距离顶部px
    window.mouseY = event.clientY;
    // 鼠标距离左边px
    window.mouseX = event.clientX;
  };

  document.addEventListener('mousemove', window.windowmoverFun);

  window.windowScrollFun = function () {
    const currentScrollY = window.scrollY;
    // 拖动时滚动
    if (centerIsDrag && !dir) {
      if (currentScrollY > previousScrollY) {
        const scrollDistance = currentScrollY - previousScrollY;
        console.log(`向下滚动了 ${scrollDistance}px`);
        // 向下滚动 增大 center的height
        awesome_screenshot_center.value.style.top = parseFloat(awesome_screenshot_center.value.style.top) + scrollDistance + 'px';
      } else if (currentScrollY < previousScrollY) {
        const scrollDistance = previousScrollY - currentScrollY;
        console.log(`向上滚动了 ${scrollDistance}px`);
        awesome_screenshot_center.value.style.top = parseFloat(awesome_screenshot_center.value.style.top) - scrollDistance + 'px';
      }
    }
    // 按住方滚动
    if (dir) {
      dirScroll = 1;

      if (currentScrollY > previousScrollY) {
        const scrollDistance = currentScrollY - previousScrollY;
        console.log(`dir向下滚动了 ${scrollDistance}px`);
        // awesome_screenshot_center.value.style.height = parseFloat(awesome_screenshot_center.value.style.height) + scrollDistance + "px"
        awesome_screenshot_center.value.style.height = window.mouseY + window.scrollY - parseFloat(awesome_screenshot_center.value.style.top) + 'px';
      } else if (currentScrollY < previousScrollY) {
        const scrollDistance = previousScrollY - currentScrollY;
        // awesome_screenshot_center.value.style.height = parseFloat(awesome_screenshot_center.value.style.height) - scrollDistance + "px"
        awesome_screenshot_center.value.style.height = window.mouseY + window.scrollY - parseFloat(awesome_screenshot_center.value.style.top) + 'px';
        console.log(`dir向上滚动了 ${scrollDistance}px`);
      }
    }
    if (dir || centerIsDrag) {
      previousScrollY = currentScrollY;
      updateMaskWH();
    }
  };

  window.addEventListener('scroll', window.windowScrollFun);

  window.mouseupFun = function () {
    dirScroll = null;
  };

  window.addEventListener('mouseup', window.mouseupFun);
};

const centerMousedown = (event) => {
  if (dir) return;
  // console.log(event)
  downX = event.layerX;
  downY = event.layerY;

  centerIsDrag = true;
};
const centerMouseup = (event) => {
  centerIsDrag = false;
};
// 拖动center事件
const centertMousemove = (event) => {
  if (dirScroll) return;
  if (dir) return;
  if (!centerIsDrag) return;
  let clientX = event.clientX;
  let clientY = event.clientY;

  var scrollTop = window.scrollY || window.pageYOffset;
  console.log(scrollTop, 'scrotop');
  if (window.innerWidth <= clientX - downX + parseFloat(awesome_screenshot_center.value.style.width)) {
    awesome_screenshot_center.value.style.left = window.innerWidth - parseFloat(awesome_screenshot_center.value.style.width) + 'px';
  } else {
    console.log(Math.max(clientX - downX, 0) + parseFloat(awesome_screenshot_center.value.style.width), maxWidth.value);
    if (Math.max(clientX - downX, 0) + parseFloat(awesome_screenshot_center.value.style.width) >= maxWidth.value) {
      return;
    }
    awesome_screenshot_center.value.style.left = Math.max(clientX - downX, 0) + 'px';
  }

  if (clientY - downY + scrollTop + parseFloat(awesome_screenshot_center.value.style.height) + 3 >= document.documentElement.scrollHeight) {
    console.log('触底还往下');
    return;
  } else {
    console.log('上下拖拽');
    if (clientY - downY + scrollTop < 0) {
      return;
    }

    awesome_screenshot_center.value.style.top = clientY - downY + scrollTop + 'px';
  }
  console.log('拖动center事件');
  updateMaskWH();
};

const updateMaskWH = (screenX, screenY, w, h) => {
  let centerTop = awesome_screenshot_center.value.offsetTop;
  let centerLeft = awesome_screenshot_center.value.offsetLeft;
  let centerHeight = parseFloat(awesome_screenshot_center.value.style.height);
  let centerWidth = parseFloat(awesome_screenshot_center.value.style.width);

  centerHeightData.value = centerHeight;
  centerWidthData.value = centerWidth;
  // // 需要根据center位置动态调整
  awesome_screenshot_top.value.style.height = centerTop + 'px';
  awesome_screenshot_top.value.style.top = 0 + 'px';
  awesome_screenshot_top.value.style.width = centerLeft + centerWidth + 'px';
  //   // 后面这个需要换成整个html -去 现在 center 点击的 clientY+ height
  awesome_screenshot_bottom.value.style.height = document.documentElement.scrollHeight - centerTop - centerHeight + 'px';
  awesome_screenshot_bottom.value.style.top = centerTop + centerHeight + 'px';
  awesome_screenshot_bottom.value.style.width = document.documentElement.clientWidth - centerLeft + 'px';
  awesome_screenshot_bottom.value.style.left = centerLeft + 'px';

  awesome_screenshot_left.value.style.height = document.documentElement.scrollHeight - centerTop + 'px';
  awesome_screenshot_left.value.style.width = centerLeft + 'px';
  awesome_screenshot_left.value.style.top = centerTop + 'px';
  awesome_screenshot_right.value.style.height = centerTop + centerHeight + 'px';
  awesome_screenshot_right.value.style.width = Math.max(0, document.documentElement.clientWidth - centerLeft - centerWidth) + 'px';

  awesome_screenshot_right.value.style.left = centerLeft + centerWidth + 'px';

  // 更新工具栏 小跟班的位置
  let munu = document.querySelector('#screenshot_annotate');
  munu.style.display = 'block';
  if (window.innerWidth - 160 < centerLeft + centerWidth) {
    if (centerLeft < 140) {
      munu.style.left = centerLeft + centerWidth - 140 + 'px';
    } else {
      munu.style.left = centerLeft - 140 + 'px';
    }
  } else {
    munu.style.left = centerLeft + centerWidth + 10 + 'px';
  }
  munu.style.top = centerTop + centerHeight - 100 + 'px';

  let PXshow = document.querySelector('#awesome_screenshot_size');
  if (parseFloat(awesome_screenshot_center.value.style.top) > 50) {
    PXshow.style.top = -30 + 'px';
  } else {
    PXshow.style.top = 0 + 'px';
  }
};
// 各路方向 放大点击事件 ，点击时候确认方向，和点击的坐标
const handleSidesDonw = (dirValue, event) => {
  dir = dirValue;

  originalCenterWidth = parseFloat(awesome_screenshot_center.value.style.width);
  originalCenterHeight = parseFloat(awesome_screenshot_center.value.style.height);
  originalCenterTop = parseFloat(awesome_screenshot_center.value.style.top);
  originalCenterLeft = parseFloat(awesome_screenshot_center.value.style.left);
  sidesDownX = event.clientX;
  sidesDownY = event.clientY;
  console.log(sidesDownX);
  console.log(sidesDownX);
};

function toggleFixedPositionElements (action) {
  // 获取所有的元素
  var allElements = document.getElementsByTagName('*');

  // 遍历所有元素
  for (var i = 0; i < allElements.length; i++) {
    var element = allElements[i];

    // 获取元素的计算样式
    var style = window.getComputedStyle(element);

    // 检查position属性是否为fixed
    if (style.position === 'fixed') {
      if (action === 'hide') {
        // 将元素的透明度设置为0
        element.style.opacity = '0';
      } else if (action === 'show') {
        // 将元素的透明度设置为1
        element.style.opacity = '1';
      }
    }
  }
}
const copy = async () => {
  let left = parseFloat(awesome_screenshot_center.value.style.left);
  let top = parseFloat(awesome_screenshot_center.value.style.top);
  let width = parseFloat(awesome_screenshot_center.value.style.width);
  let height = parseFloat(awesome_screenshot_center.value.style.height);
  await getBaase64();
  // 这个是为了 从第几屏幕开始截取的 裁剪的时候top从第几屏幕开始   top-去上面的没截取的屏幕
  if (window.isTopStartScreen !== 1) {
    top = top - (window.isTopStartScreen - 1) * window.innerHeight;
  }
  console.log("left:" + left, "top:", +top, "width:" + width + "height:" + height)

  let base64Data = await getResultImage(left, top, width, height);

  // 创建一个Blob对象
  const blob = await fetch(base64Data).then((response) => response.blob());
  // 创建剪贴板数据
  const clipboardData = new ClipboardItem({ 'image/png': blob });
  // 将数据添加到剪贴板
  await navigator.clipboard.write([clipboardData]);
  cancel();
  alert('copy success');
  console.log('copy完成');
};

const handleSearch = async () => {
  let left = parseFloat(awesome_screenshot_center.value.style.left);
  let top = parseFloat(awesome_screenshot_center.value.style.top);
  let width = parseFloat(awesome_screenshot_center.value.style.width);
  let height = parseFloat(awesome_screenshot_center.value.style.height);
  await getBaase64();
  // 这个是为了 从第几屏幕开始截取的 裁剪的时候top从第几屏幕开始   top-去上面的没截取的屏幕
  if (window.isTopStartScreen !== 1) {
    top = top - (window.isTopStartScreen - 1) * window.innerHeight;
  }
  console.log("left:" + left, "top:", +top, "width:" + width + "height:" + height)

  
  let base64Data = await getResultImage(left, top, width, height);

  try{
    console.log(new_tab.value,"new_tab.value???")
  if(new_tab.value){
    chrome.runtime.sendMessage({msg: 'new_tab_search_img', base64: base64Data  });
  }else{
    chrome.runtime.sendMessage({ type: 'screenshot_base64', base64: base64Data });
  }

  }catch(e){
    console.log(e,"e")
  }

  cancel();
}


const cancel = () => {
  awesome_screenshot_wrapper.value.style.backgroundColor = 'rgba(0, 0, 0, 0)';
  showCapture.value = false;
  flag = false;
  wrapIsDrag = false;
  // 是否点击后拖拽了
  // 初始化 创建center框事件
  wrapDownClientY = 0;
  wrapDownClientX = 0;
  // 是否点击了后移动
  isDonwMove = false;
  originalCenterWidth = 0;
  originalCenterHeight = 0;
  originalCenterTop = 0;
  originalCenterLeft = 0;
  sidesDownX = 0;
  sidesDownY = 0;
  dir = null;
  centerWidthData.value = 0;
  centerHeightData.value = 0;
  dirScroll = null;
  previousScrollY = window.scrollY; // 上一个滚动位置
  window.removeEventListener('scroll', window.windowScrollFun);
  window.removeEventListener('mousemove', window.windowmoverFun);
  window.removeEventListener('keydown', window.keydownFun);
  window.removeEventListener('mouseup', window.mouseupFun);
  base64Result = '';
  base64Array = [];
};



const getResultImage = async (left, top, width, height) => {
  return new Promise((resolve, reject) => {
    // 创建Canvas元素
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var dpr = window.devicePixelRatio || 1; // 获取设备像素比
    // 创建一个Image对象，加载Base64图片
    var image = new Image();
    image.src = base64Result; // 替换成您的Base64图片数据
    window.base64Result = base64Result
    // 当图片加载完成时执行裁剪操作
    image.onload = function () {
      // 设置Canvas的大小，确保足够容纳裁剪后的图像
      canvas.width = width;
      canvas.height = height;
      // 在Canvas上绘制裁剪后的图像
      console.log(`image宽度:${image.width},image高度:${image.height},截取的left起点${left * dpr},截取的top起点${top * dpr}截取的宽度${width * dpr},截取的高度${height * dpr}`)
      ctx.drawImage(image, left * dpr, top * dpr, width * dpr, height * dpr, 0, 0, width, height);
      // 获取裁剪后的图像数据（可以将其转换为新的Base64图片）
      var croppedImageData = canvas.toDataURL('image/png');
      // 可以将croppedImageData用于需要的操作，比如显示或保存
      return resolve(croppedImageData);
    };
  });
};



const createMergedBase64Image = async (base64Array) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    let maxWidth = 0;
    let totalHeight = 0;

    const images = [];

    // 创建图像对象，并在加载完成后添加到数组
    const loadImage = (base64Image, index) => {
      const img = new Image();
      console.log(base64Image);
      img.src = base64Image;

      img.onload = () => {
        images[index] = img;

        // 获取最大宽度
        if (img.width > maxWidth) {
          maxWidth = img.width;
        }

        totalHeight += img.height;

        // 检查是否已加载完所有图像
        if (images.length === base64Array.length) {
          // 设置Canvas的宽度和高度
          canvas.width = maxWidth;
          canvas.height = totalHeight;

          let yOffset = 0;

          // 绘制所有图像
          images.forEach((image) => {
            ctx.drawImage(image, 0, yOffset);
            yOffset += image.height;
          });

          // 将Canvas内容转换为Base64编码
          const mergedBase64 = canvas.toDataURL('image/png');
          resolve(mergedBase64);
        }
      };

      img.onerror = () => {
        reject(new Error('Image loading failed.'));
      };
    };

    // 遍历图像数组并加载图像
    base64Array.forEach((base64Image, index) => {
      loadImage(base64Image, index);
    });
  });
};

const sleep = (time = 200) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('ok');
    }, time);
  });
};
const getBaase64 = async () => {
  toggleFixedPositionElements("hide")
  function recordFunction () {
    chrome.runtime.sendMessage({ type: 'getBase64' });
  }
  // 计算插件需要滚动几次截取
  let top = parseFloat(awesome_screenshot_center.value.style.top);
  console.log('距离文档顶部top:', top);
  let height = parseFloat(awesome_screenshot_center.value.style.height);
  let winH = window.innerHeight;
  console.log('window的height:', winH);
  // 计算需要截取 第几屏幕
  let NumberScr = function () {
    let array = [];
    // 从第几屏幕开始截取
    // 它顶部出现在第几屏
    window.isTopStartScreen = Math.ceil(top / winH);
    // 计算第一次截屏在第几屏幕
    // top在第几屏幕 向上取整 比如 可视区域500  top 700 那么 700/500 =1.4 向上取整2  那么第一次截屏应该在第二屏幕
    array.push(Math.ceil(top / winH));
    // 计算截到第几屏幕
    // top+height 计算出bottom的位置 / 可视区域  比如 top在700位置 height 600 可视500  700+600=1300 / 500  2.6向上 需要截道第三屏幕
    array.push(Math.ceil((top + height) / winH));
    return array;
  };
  let capTruescr = NumberScr();

  const max_captrue = Math.ceil(document.documentElement.scrollHeight / window.innerHeight);
  console.log(max_captrue, 'max_captrue');
  console.log(capTruescr[1], '截取到第几屏幕');
  // 截图的位置出现在了最后一屏幕  计算最后一屏幕缺失的高度
  if (max_captrue !== 1 && capTruescr[1] === max_captrue) {
    let lastScreenMissingHeight = window.innerHeight - (document.documentElement.scrollHeight - window.innerHeight * (max_captrue - 1));
    console.log('最后一屏幕缺失了', lastScreenMissingHeight + 'px');
    function parsePixelValue (value) {
      return parseInt(value.replace('px', ''), 10) || 0;
    }
    var newPaddingBottom = parsePixelValue(document.body.style.paddingBottom) + lastScreenMissingHeight;
    document.body.style.paddingBottom = newPaddingBottom + 'px';
    window.lastScreenMissingHeight = newPaddingBottom
  }

  let capTreuNum = capTruescr[1] - capTruescr[0] + 1;
  // 只有1屏幕
  if (capTruescr[0] == capTruescr[1]) {
    var originalScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, capTruescr[0] * window.innerHeight - window.innerHeight);
    await sleep(200);
    document.documentElement.style.scrollBehavior = originalScrollBehavior;
    console.log(`截取第${capTruescr[0]}屏幕`);
    recordFunction();
    // 然后 截屏
  } else {
    let i = capTruescr[0];
    async function fun () {
      if (i <= capTruescr[1]) {
        var originalScrollBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = 'auto';
        window.scrollTo(0, i * window.innerHeight - window.innerHeight);
        document.documentElement.style.scrollBehavior = originalScrollBehavior;
        let flalength = base64Array.length || 0;
        await sleep(800);
        recordFunction();
        const intervalId = setInterval(() => {
          if (flalength !== base64Array.length) {
            i++;
            clearInterval(intervalId);
            fun();
          }
        }, 100);
      }
    }
    await fun();
  }

  return new Promise((resolve, reject) => {
    const intervalId = setInterval(async () => {
      if (capTreuNum == base64Array.length) {
        clearInterval(intervalId);
        console.log('凑齐了 开始拼接');
        toggleFixedPositionElements("show")

        console.log(base64Array);
        base64Result = await createMergedBase64Image(base64Array);
        if (window.lastScreenMissingHeight) {
          document.body.style.paddingBottom = 0 + 'px';
          window.lastScreenMissingHeight = undefined;
        }
        return resolve(base64Result);
      }
    }, 100);
  });
};
</script>

<style scoped>
* {
  padding: none;
  border: none;
}

#start-wrap {
  background-color: transparent;
  overflow: hidden;
}

.dropdown-text-btn {
  padding: 7px 10px;
  line-height: 16px;
  border-radius: 8px;
  cursor: pointer
}

.dropdown-text-btn .dropdown-arrow {
  margin-left: 5px;
  font-size: 8px;
  top: -1px
}

.dropdown-text-btn.ant-dropdown-open,
.dropdown-text-btn.ant-dropdown-open:hover {
  background-color: var(--as-dropdown-btn-open-bg-color)
}

.dropdown-text-btn:hover {
  background-color: var(--as-dropdown-btn-bg-color)
}

.ant-select-arrow {
  color: #00000080;
  font-size: 13px
}

.unselectable {
  -webkit-user-select: none
}

#awesome_screenshot_wrapper {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2147483620;
  overflow: hidden;
  cursor: crosshair;
  background-color: #0000;
  font: 12px/1 Helvetica, arial, sans-serif;
  box-sizing: content-box !important
}

#awesome_screenshot_wrapper * {
  box-sizing: border-box !important
}

#awesome_screenshot_wrapper>div {
  position: absolute;
  background-color: #0000004d;
  cursor: auto
}

#awesome_screenshot_top {
  top: 0;
  left: 0
}

#awesome_screenshot_right {
  top: 0;
  right: 0
}

#awesome_screenshot_bottom {
  right: 0;
  bottom: 0
}

#awesome_screenshot_left {
  bottom: 0;
  left: 0
}

div#awesome_screenshot_center {
  cursor: move;
  outline: 1.5px dashed #d5d5d5;
  background-color: #0000;
  background-clip: content-box
}

.dragresize {
  display: block !important;
  position: absolute !important;
  z-index: 999 !important;
  width: 9px !important;
  height: 9px !important;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAIxJREFUeNqMUDEOgCAMrA58CFZX3uDIU/iBX3D0DawkTCS8xhBYao84aOLgJZdy10sLTMxMgDHGSVmFizAKj5zzPpoIaa037z2nlLjWOio0/DFEDg5Ga42fgL6DbsYKay0ppegJaPjjCpI8seIL8NHHpFhKoS/cfkToCCFQ7/0VgIaP/q/XTX/+6RJgAEc6j4dkIiynAAAAAElFTkSuQmCC);
  background-position: center center !important;
  background-repeat: no-repeat !important;
  font-size: .1px !important
}

.dragresize-tl {
  top: -5px;
  left: -5px;
  cursor: nw-resize
}

.dragresize-tm {
  top: -5px;
  width: 100% !important;
  cursor: n-resize
}

.dragresize-tr {
  top: -5px;
  right: -5px;
  cursor: ne-resize
}

.dragresize-ml {
  left: -5px;
  height: 100% !important;
  cursor: w-resize
}

.dragresize-mr {
  right: -5px;
  height: 100% !important;
  cursor: e-resize
}

.dragresize-bl {
  left: -5px;
  bottom: -5px;
  cursor: sw-resize
}

.dragresize-bm {
  bottom: -5px;
  width: 100% !important;
  cursor: s-resize
}

.dragresize-br {
  right: -5px;
  bottom: -5px;
  cursor: se-resize
}

#awesome_screenshot_size {
  display: none;
  position: absolute;
  top: -30px;
  left: 0
}

#awesome_screenshot_size span {
  padding: 2px 10px;
  border-radius: 10px;
  background-color: #000000b3;
  color: #eee;
  text-align: center;
  line-height: 20px
}

font {
  pointer-events: none
}

#awesome_screenshot_action {
  display: none;
  position: absolute;
  right: 0;
  background-color: #32343e;
  z-index: 2147483630;
  text-align: center;
  overflow: hidden;
  border-radius: 2px;
  height: 38px;
  font-size: 16px !important;
  box-shadow: 0 2px 4px #000000e6
}

#awesome_screenshot_action .awesome_action_btn {
  display: inline-block;
  line-height: 38px;
  height: 38px;
  background: #32343e;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  font-family: PingFang SC;
  padding-left: 18px;
  padding-right: 18px;
  text-decoration: none !important;
  cursor: pointer
}

#awesome_screenshot_action .awesome_action_btn.cancel span {
  display: none;
  position: relative;
  width: 14px;
  height: 1px;
  background-color: #fff;
  transform: rotate(45deg);
  border-radius: .5px;
  left: -4.5px;
  bottom: 4.5px
}

#awesome_screenshot_action .awesome_action_btn.cancel span:after {
  display: block;
  content: "";
  position: absolute;
  width: 14px;
  height: 1px;
  background-color: #fff;
  transform: rotate(90deg);
  border-radius: .5px
}

#awesome_screenshot_action .awesome_action_btn.copy span {
  display: inline-block;
  position: relative;
  width: 16px;
  height: 16px;
  left: -3px;
  bottom: -3px;
  background-size: 16px 16px
}

#awesome_screenshot_action .awesome_action_btn:active {
  background-color: #191a1e
}

.tooltip {
  position: relative
}

.tooltip:after {
  content: attr(aria-label);
  background: rgba(0, 0, 0, .6);
  color: #fff;
  padding: 4px 6px;
  font-size: 12px;
  line-height: 12px;
  white-space: nowrap;
  border-radius: 2px;
  bottom: calc(100% + 5px);
  left: 50%;
  position: absolute;
  visibility: hidden;
  opacity: 0;
  z-index: 1000000;
  pointer-events: none;
  transition: .2s ease;
  transition-delay: 0s;
  transform: translate3d(-50%, 0, 0)
}

.tooltip.tooltip-bottom:after {
  height: 12px;
  top: 24px;
  transition-delay: .6s
}

.tooltip-bottom.no-after:after {
  display: none
}

.tooltip.tooltip-right:after {
  right: auto;
  left: 0;
  transform: translateZ(0)
}

.tooltip:hover:after {
  visibility: visible;
  opacity: 1
}

.tooltip.delay:hover:after {
  transition-delay: .3s
}

.border-style {
  display: none;
  background-color: #5794ff;
  position: fixed;
  z-index: 2147483621
}

.border-style.top {
  top: 0;
  left: 0;
  right: 0;
  height: 5px
}

.border-style.left {
  top: 0;
  left: 0;
  bottom: 0;
  width: 5px
}

.border-style.right {
  top: 0;
  right: 0;
  bottom: 0;
  width: 5px
}

.border-style.bottom {
  bottom: 0;
  left: 0;
  right: 0;
  height: 5px
}

.annotate_toolbar {
  display: none;
  position: absolute;
  right: -44px;
  width: 130px;
  padding: 1px;
  font-size: 16px;
  font-family: sans-serif;
  background-color: #32343e;
  border-radius: 2px;
  box-shadow: 0 2px 4px #000000e6;
  z-index: 2147483630;
  box-sizing: border-box !important;
  cursor: pointer
}

.annotate_toolbar .file-input {
  display: none
}

.annotate_toolbar .svg-panel {
  display: none;
  position: absolute;
  background-color: #fff;
  border-radius: 4px;
  width: 180px !important;
  height: 177px;
  top: 0;
  overflow-y: scroll;
  line-height: 48px;
  box-shadow: 0 1px 3px #00000040
}

.annotate_toolbar .svg-panel.right {
  left: 64px
}

.annotate_toolbar .svg-panel.left {
  right: 64px
}

.annotate_toolbar .svg-panel .image-item {
  width: 48px;
  height: 48px;
  background: white;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  margin: 0 3px 6px
}

.annotate_toolbar .svg-panel .image-item:hover {
  background: #e0ecff
}

.annotate_toolbar .svg-panel .image-item img {
  width: 44px;
  height: 44px;
  vertical-align: middle
}

.annotate_toolbar .color_panel {
  display: none;
  width: 40px;
  height: 200px;
  top: 0;
  position: absolute;
  background-color: #191a1e;
  border-radius: 2px;
  padding-top: 10px;
  box-sizing: border-box
}

.annotate_toolbar .color_panel.only_color {
  height: 124px
}

.annotate_toolbar .color_panel.left {
  right: -46px
}

.annotate_toolbar .color_panel.left .trangle {
  left: -6px;
  border-top: 6px solid transparent;
  border-right: 6px solid #191a1e;
  border-bottom: 6px solid transparent
}

.annotate_toolbar .color_panel.right {
  right: 66px
}

.annotate_toolbar .color_panel.right .trangle {
  left: 38px;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 6px solid #191a1e
}

.annotate_toolbar .color_panel .trangle {
  position: absolute;
  top: 10px;
  width: 8px;
  height: 8px;
  box-sizing: border-box !important
}

.annotate_toolbar .color_panel .colors {
  width: 14px;
  margin-left: auto;
  margin-right: auto;
  text-align: center
}

.annotate_toolbar .color_panel .colors .width_cell {
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  width: 14px;
  height: 14px;
  display: block
}

.annotate_toolbar .color_panel .colors .width_cell.text .font {
  display: block !important
}

.annotate_toolbar .color_panel .colors .width_cell.hidden {
  display: none
}

.annotate_toolbar .color_panel .colors .width_cell .font {
  display: none;
  color: #6e6e6e;
  line-height: 14px;
  pointer-events: none;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  font-style: normal;
  font-family: sans-serif
}

.annotate_toolbar .color_panel .colors .width_cell .font.small {
  font-size: 10px
}

.annotate_toolbar .color_panel .colors .width_cell .font.middle {
  font-size: 14px
}

.annotate_toolbar .color_panel .colors .width_cell .font.big {
  font-size: 18px
}

.annotate_toolbar .color_panel .colors .width_cell .font.selected {
  color: #fff
}

.annotate_toolbar .color_panel .colors .width_cell.shape .dot {
  display: block !important
}

.annotate_toolbar .color_panel .colors .width_cell .dot {
  display: none;
  border-radius: 50%;
  pointer-events: none;
  background-color: #6e6e6e;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%)
}

.annotate_toolbar .color_panel .colors .width_cell .dot.small {
  width: 4px;
  height: 4px
}

.annotate_toolbar .color_panel .colors .width_cell .dot.middle {
  width: 8px;
  height: 8px
}

.annotate_toolbar .color_panel .colors .width_cell .dot.big {
  width: 12px;
  height: 12px
}

.annotate_toolbar .color_panel .colors .width_cell .dot.selected {
  background-color: #fff;
  color: #fff
}

.annotate_toolbar .color_panel .colors .color_cell {
  width: 14px;
  height: 14px;
  border-radius: 1px;
  margin-bottom: 4px;
  box-sizing: border-box !important
}

.annotate_toolbar .color_panel .colors .color_cell.selected,
.annotate_toolbar .color_panel .colors .color_cell:active {
  border: 1px solid white
}

.annotate_toolbar .color_panel .colors .color_cell.red {
  background-color: red
}

.annotate_toolbar .color_panel .colors .color_cell.blue {
  background-color: #4887e8
}

.annotate_toolbar .color_panel .colors .color_cell.green {
  background-color: #0f0
}

.annotate_toolbar .color_panel .colors .color_cell.yellow {
  background-color: #f1c231
}

.annotate_toolbar .color_panel .colors .color_cell.gray {
  background-color: #666
}

.annotate_toolbar .color_panel .colors .color_cell.white {
  background-color: #fff
}

.annotate_toolbar .action_area {
  display: block;
  padding: 15px 5px 2px;
  line-height: 22px
}

.annotate_toolbar .action_area .awesome_action_btn {
  display: inline-block;
  width: 120px;
  height: 22px;
  margin: 3px 0;
  color: #fff;
  border-radius: 2px;
  font-size: 12px;
  text-align: center;
  line-height: 22px;
  background-color: #505362
}

.annotate_toolbar .action_area .awesome_action_btn:hover {
  background-color: #3c3f4b
}

.annotate_toolbar .action_area .awesome_action_btn:active {
  background-color: #191a1e
}

.annotate_toolbar .action_area .awesome_action_btn.save {
  background-color: #5794ff
}

.annotate_toolbar .action_area .awesome_action_btn.save:hover,
.annotate_toolbar .action_area .awesome_action_btn.save:active {
  background-color: #1f64dd
}

.annotate_toolbar .shapes_area {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 192px;
  position: relative
}

.annotate_toolbar .shapes_area .sep_line {
  width: 46px;
  height: 1px;
  background-color: #d8d8d8;
  position: absolute;
  bottom: 30px;
  left: 8px;
  opacity: .26
}

.annotate_toolbar .toolbar_item {
  text-align: center;
  position: relative;
  display: inline-block;
  margin: 4px 3px;
  padding: 4px;
  border-radius: 2px
}

.annotate_toolbar .toolbar_item.action_item {
  margin-top: 5px;
  margin-bottom: 3px
}

.annotate_toolbar .toolbar_item:hover {
  background-color: #25272e
}

.annotate_toolbar .toolbar_item:active,
.annotate_toolbar .toolbar_item.selected {
  background-color: #191a1e
}

.annotate_toolbar .toolbar_item.isfree {
  filter: brightness(.6)
}

.annotate_toolbar .toolbar_item.disable {
  pointer-events: none;
  filter: brightness(.6)
}

.annotate_toolbar .toolbar_item .toolbtn {
  position: relative;
  height: 16px;
  width: 16px;
  pointer-events: none;
  background-size: 496px auto;
  /* background-image: url(chrome-extension://nlipoenfbbikpbjkfpfillcgkoblgpmj/images/annotate_icons.png) */
}

@media only screen and (-webkit-min-device-pixel-ratio: 1.5),
only screen and (-moz-min-device-pixel-ratio: 1.5),
only screen and (-o-min-device-pixel-ratio: 3/2),
only screen and (min-device-pixel-ratio: 1.5) {
  .annotate_toolbar .toolbar_item .toolbtn {
    /* background-image: url(chrome-extension://nlipoenfbbikpbjkfpfillcgkoblgpmj/images/annotate_icons@2x.png) */
  }
}

.annotate_toolbar .toolbar_item .toolbtn.rect {
  background-position: 0 0
}

.annotate_toolbar .toolbar_item .toolbtn.ellipse {
  background-position: -16px 0
}

.annotate_toolbar .toolbar_item .toolbtn.line_arrow {
  background-position: -32px 0
}

.annotate_toolbar .toolbar_item .toolbtn.curve {
  background-position: -48px 0
}

.annotate_toolbar .toolbar_item .toolbtn.rect_blur {
  background-position: -64px 0
}

.annotate_toolbar .toolbar_item .toolbtn.text {
  background-position: -80px 0
}

.annotate_toolbar .toolbar_item .toolbtn.callout {
  background-position: -304px 0
}

.annotate_toolbar .toolbar_item .toolbtn.list {
  background-position: -320px 0
}

.annotate_toolbar .toolbar_item .toolbtn.image {
  background-position: -336px 0
}

.annotate_toolbar .toolbar_item .toolbtn.insertImage {
  background-position: -352px 0
}

.annotate_toolbar .toolbar_item .toolbtn.clear-all {
  background-position: -416px 0
}

.annotate_toolbar .toolbar_item .toolbtn.undobtn {
  background-position: -96px 0
}

.content-sign {
  display: none;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #0006;
  text-align: center;
  font-size: 14px;
  z-index: 2147483632
}

.content-sign .center-block {
  text-align: left;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 244px;
  padding: 22px;
  background-color: #fff;
  box-shadow: 0 6px 12px #0000002e;
  border-radius: 4px;
  transform: translate3d(-50%, -50%, 0)
}

.content-sign .center-block.upgrade {
  width: 260px;
  padding: 20px;
  text-align: center
}

.content-sign .center-block.upgrade img {
  height: 60px;
  width: 60px;
  filter: invert(71%) sepia(53%) saturate(647%) hue-rotate(339deg) brightness(104%) contrast(98%)
}

.content-sign .center-block.upgrade .tips {
  font-size: 16px;
  line-height: 24px;
  color: #383c43;
  font-weight: 700;
  text-align: center;
  margin-bottom: 16px
}

.content-sign .center-block.upgrade .popup-btn-primary {
  border-color: #5794ff;
  background-color: #5794ff;
  color: #fff;
  line-height: 36px !important;
  border-radius: 8px !important;
  font-size: 14px;
  font-weight: 700;
  margin-top: 10px;
  cursor: pointer
}

.content-sign .center-block.upgrade .sub-item {
  text-align: center;
  font-size: 12px;
  line-height: 34px;
  height: 34px;
  margin-top: 10px;
  border-radius: 8px;
  cursor: pointer;
  color: #5794ff
}

.content-sign .center-block .close {
  position: absolute;
  right: 16px;
  top: 12px;
  font-size: 24px;
  color: #979797;
  transform: rotate(45deg);
  cursor: pointer
}

.content-sign .center-block p {
  font-size: 14px;
  line-height: 24px;
  margin-top: 0
}

.content-sign .center-block .popup-btn-primary {
  text-align: center;
  border: 1px solid #666;
  border-radius: 4px;
  line-height: 40px;
  font-size: 15px;
  margin-top: 10px;
  cursor: pointer;
  border-color: #5794ff;
  background-color: #5794ff;
  color: #fff
}

#asNotifyBox {
  border-radius: 3px;
  box-shadow: 0 1px 5px #0000004d;
  border: solid 1px #fff;
  background-image: -webkit-linear-gradient(top, #f9f9f9, #f5f5f5);
  position: fixed;
  top: 5px;
  right: 5px;
  z-index: 1000000;
  padding: 10px;
  width: 280px;
  -webkit-animation: fadeIn .3s ease
}

#asNotifyBox img {
  display: inline-block;
  vertical-align: middle;
  margin-right: 8px
}

#as-notifyMessage {
  font: 12px/14px arial, Helvetica;
  white-space: normal;
  word-break: break-all;
  display: inline-block;
  width: 230px;
  vertical-align: middle
}

#as-notifyClose {
  position: absolute;
  right: 3px;
  top: 3px;
  height: 12px;
  width: 12px;
  /* background-image: url(chrome-extension://nlipoenfbbikpbjkfpfillcgkoblgpmj/images/clear.png); */
  opacity: .3;
  cursor: pointer
}

#as-notifyClose:hover {
  opacity: .5
}

#sa-admanage-box {
  margin: 0 -28px 11px 0;
  padding: 2px 8px 6px;
  background-color: #fff7ed
}

#sa-admanage-box ol {
  margin-top: -14px
}

#sa-admanage-box h2 span {
  font-size: 10px;
  text-align: left;
  color: #767676;
  font-weight: 400
}

#sa-admanage-box h2 {
  margin: 0;
  text-align: right;
  line-height: 10px
}

#sa-admanage-box li {
  margin: 20px 8px 0 0;
  max-width: 440px
}

#awe_delay_div {
  box-sizing: content-box !important;
  height: 90px !important;
  width: 120px !important;
  text-align: center !important;
  background-color: #000000b3 !important;
  font-size: 72px !important;
  font-weight: 700 !important;
  position: fixed !important;
  right: 20px !important;
  top: 20px;
  z-index: 1000000 !important;
  line-height: 100px !important;
  color: #fff !important;
  border-top-left-radius: 3px !important;
  border-top-right-radius: 3px !important;
  box-shadow: 0 1px 3px #00000026 !important;
  border-bottom: 1px solid rgba(255, 255, 255, .3) !important;
  font-family: Arial !important
}

#awe_delay_div.countdown {
  left: 0 !important;
  right: 0 !important;
  top: 0 !important;
  bottom: 0 !important;
  margin: auto !important;
  background-color: #000c !important
}

#awe_delay_div.countdown #awe_delay_cancel {
  background-color: #000c !important
}

#awe_delay_cancel {
  width: 120px !important;
  height: 30px !important;
  line-height: 30px !important;
  font-size: 14px !important;
  font-weight: 400 !important;
  position: absolute !important;
  bottom: -31px !important;
  background-color: #000000b3 !important;
  cursor: pointer !important;
  border-bottom-left-radius: 3px !important;
  border-bottom-right-radius: 3px !important
}

#awe_delay_cancel:hover {
  background-color: #000c !important
}

#aws-record-div {
  height: 1px !important;
  width: 1px !important;
  position: fixed !important;
  left: 0 !important;
  top: 0 !important;
  background-color: #0003 !important;
  animation: fadeIn 1s infinite !important
}

#clear112 {
  text-align: right;
  display: block;
  width: 17px;
  margin-left: auto;
  height: 17px;
  position: absolute;
  right: -0px;
  top: -0px
}

*[data-v-ac6fd69d] {
  padding: none;
  border: none
}

#start-wrap[data-v-ac6fd69d] {
  background-color: transparent;
  overflow: hidden
}
</style>
