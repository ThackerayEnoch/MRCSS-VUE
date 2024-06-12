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
    subscribe: (ringtoneId) => axios.post(path.subscribe,{ringtoneId}),
    cancelSubscribe: (ringtoneId) => axios.delete(`${path.cancelSubscribe}/${ringtoneId}`),
    favourite: (ringtoneId) => axios.post(path.favourite,{ringtoneId}),
    cancelFavourite: (ringtoneId) => axios.delete(`${path.cancelFavourite}/${ringtoneId}`),
    getAdvertisement: () => axios.get(path.getAdvertisement,{}),
    getFavourites: () => axios.get(path.getFavourites,{}),
    getSubscribes: () => axios.get(path.getSubscribes,{}),
    }
export default api;
