<template>
    <div class='nav'>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
            @select="handleSelect">
            <el-menu-item class="title">
                <el-icon>
                    <Headset />
                </el-icon>
                <h1>手机铃声定制服务系统</h1>
            </el-menu-item>
            <el-menu-item index="1" class="menu-item-font-size notLogin2"><router-link
                    to="/">铃声订购</router-link></el-menu-item>
            <el-menu-item index="2" class="menu-item-font-size notLogin2"><router-link
                    to="/ringtone/manage/myfavourite">铃声管理</router-link></el-menu-item>
            <div class="flex-grow"></div>
            <el-menu-item><el-input v-model="searchInput" class="search" placeholder="音乐名/歌手">
                    <template #append>
                        <el-button class="search-btn" icon="Search" />
                    </template>
                </el-input></el-menu-item>
            <el-menu-item v-if='user.phone' class="menu-item-font-size">{{ user.phone }}</el-menu-item>
            <el-menu-item index="5" class="menu-item-font-size">个人中心</el-menu-item>
            <el-menu-item index="6" v-if='!user.phone' class="notLogin2" route="/login">
                <router-link to="/login">登录</router-link>
            </el-menu-item>
            <el-menu-item index="7" v-if='!user.phone' class="notLogin">
                <router-link to="/register" style="color:white;width: 100%;">注册</router-link>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useCounterStore } from '@/stores/counter.js'
export default {
    setup() {
        const counter = useCounterStore()
        const activeIndex = ref('1');
        const searchInput = ref('');
        const handleSelect = (index) => {
            activeIndex.value = index;
        };
        return {
            activeIndex,
            handleSelect,
            user: counter.user,
            searchInput
        };
    },
}


</script>

<style>
.flex-grow {
    flex-grow: 1;
}

.title {
    color: #409EFF !important;
}

.nav {
    width: 100%;
    height: 100%;
}

.el-menu {
    height: 100%;
    /* 设置模糊效果 */
    backdrop-filter: blur(10px);
    /* 设置半透明背景 */
    background-color: rgba(255, 255, 255, 0.8);
}

.notLogin {
    color: white;
    background-color: rgb(0, 82, 217);
}


.notLogin {
    background-color: rgb(39, 112, 232) !important;
}

.notLogin a:hover {
    background-color: transparent;
}

.notLogin2 a:hover {
    background-color: transparent;
}

.menu-item-font-size {
    font-size: 14px;
}

.search {
    color: black;
    width: 300px;
    background-color: transparent !important;
}

.search-btn {
    width: auto;
    height: auto;
    background-color: transparent;
}

.el-input__wrapper {
    background-color: transparent !important;
}



.el-input-group__append button.el-button {
    /* 设置模糊效果 */
    backdrop-filter: blur(10px);
    /* 设置半透明背景 */
    background-color: transparent !important;
}
</style>