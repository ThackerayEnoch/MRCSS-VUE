import axios from '@/utils/request';
import path from './path';
const api = {
    login: (phone,password) => axios.post(path.login, {phone,password}),
    register: (phone,password) => axios.post(path.register, {phone,password}),
    getUserInfo: () => axios.get(path.getUserInfo,{}),
    getRingtoneList : (page,pageSize,type,category) => axios.get(path.getRingtoneList,{params: {
        page: page,
        pageSize: pageSize,
        type: type,
        category: category
      }}),
    }
export default api;
