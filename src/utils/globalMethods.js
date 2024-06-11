import { ElNotification } from 'element-plus';
import api from '@/api/index.js';   
import { useCounterStore } from '@/stores/counter'; // 使用命名导入

export function notify(options) {
  ElNotification(options);
}

export const notificationUtils = {
  success(msg) {
    notify({
      title: '成功',
      message: msg,
      type: 'success',
      duration: 1000,
      position: 'top-right',
    });
  },
  error(title, msg) {
    notify({
      title: title,
      message: msg,
      type: 'error',
      duration: 2500,
      position: 'top-right',
    });
  },
  warning(msg) {
    notify({
      title: '警告',
      message: msg,
      type: 'warning',
      duration: 2000,
      position: 'top-right',
    });
  },
  info(msg) {
    notify({
      title: '消息',
      message: msg,
      type: 'info',
      duration: 1000,
      position: 'top-right',
    });
  },
  getUserInfo() {
    const store = useCounterStore();
    api.getUserInfo().then(res => {
      if (res.status === 200) {
        store.setUser(res.data.username, res.data.phone);
      }
    }).catch(err => {
      this.error('错误', err.message);
    });
  }
};
export default notificationUtils;