const div = document.createElement('div');
// 设置 <div> 元素的 id 属性为 "app"
div.id = 'screenshot_html';
document.body.appendChild(div);

console.log("截图插件已经加载")

console.log(div,"div")
import { createApp } from 'vue'
import App from './index.vue'
// import '../../style.css'


const app = createApp(App)


  app.mount('#screenshot_html')

