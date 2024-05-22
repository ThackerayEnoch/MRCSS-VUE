import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const user = ref({
    nickname:'',
    phone:'',
  })
  function setUser(nickname, phone) {
    user.value.nickname = nickname
    user.value.phone = phone
  }
  return {user,setUser}
})
