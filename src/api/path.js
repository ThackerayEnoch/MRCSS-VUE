const base = {
    baseUrl: 'http://localhost:8081',
    login: '/api/auth/login',
    register : '/api/auth/register',
    getUserInfo: '/api/auth/getUserInfo',
    getRingtoneList: '/api/ringtone/getRingtones',
    subscribe:'/api/ringtone/subscribe',
    cancelSubscribe:'/api/ringtone/cancelSubscribe',
    favourite:'/api/ringtone/favourite',
    cancelFavourite:'/api/ringtone/cancelFavourite',
    getAdvertisement:'/api/ad/getAdvertisement',
    getFavourites :'/api/ringtone/getFavourites',
    getSubscribes :'/api/ringtone/getSubscribes',
}
export default base;