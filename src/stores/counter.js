import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', () => {
  const user = ref({
    username: '',
    phone: '',
  });
  const ringtoneType = ref('');
  function setRingtoneType(type) {
    if(type === 'All'){
      ringtoneType.value=''
    }else {
    ringtoneType.value = type;
    }
  }
  function setUser(username, phone) {  // 修改为 username，保持一致
    user.value.username = username;
    user.value.phone = phone;
  }

  return { user, setUser, ringtoneType,setRingtoneType};
});
