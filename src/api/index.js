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
    getContacts: (ringtoneId) => axios.get(path.getContacts,{params: {ringtoneId: ringtoneId}}),
    getGroupsByUid:()=>axios.get(path.getGroups,{}),
    updateGroup:(id,name,ringtoneId)=>axios.put(path.updateGroup,{id,name,ringtoneId}),
    deleteGroup:(groupId)=>axios.delete(`${path.deleteGroup}/${groupId}`),
    addGroup:(group,ringtoneId)=>axios.post(path.addGroup,{group,ringtoneId}),
    getContactByUidAndRid:(ringtoneId)=>axios.get(path.getContactByUidAndRid,{params: {ringtoneId: ringtoneId}}),
    getAllContactByGid:(groupId)=>axios.get(path.getAllContactByGid,{params: {groupId: groupId}}),
    addContactToGroup:(contactPhone,groupId)=>axios.post(path.addContactToGroup,{contactPhone,groupId}),
    deleteContactFromGroup:(contactPhone,groupId)=>axios.delete(`${path.deleteContactFromGroup}/${contactPhone}/${groupId}`),
    addContact:(contactPhone,ringtoneId)=>axios.post(path.addContact,{contactPhone,ringtoneId}),
    deleteContact:(contactPhone,ringtoneId)=>axios.delete(`${path.deleteContact}/${contactPhone}/${ringtoneId}`),
  }
export default api;
