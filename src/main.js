import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axios from "axios"
import {ElMessage} from 'element-plus'
import './assets/global.css'

import App from './App.vue'
import router from './router'
import { ElNotification } from 'element-plus';
import globalMethods from "@/utils/globalMethods";

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.config.globalProperties.$globalMethods = globalMethods;
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$message = ElMessage;
app.config.globalProperties.$notify = ElNotification;

app.mount('#app')
