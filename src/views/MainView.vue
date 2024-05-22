<template>
    <el-container class="container">
        <el-header class="header">
            <navigation-bar />
        </el-header>
        <el-main class="main">
            <router-view name="ringtoneRouter" />
        </el-main>
    </el-container>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue';

export default {
    name: 'MainView',
    components: {
        NavigationBar,
    },
    setup() {

    },
};
</script>

<style scoped>
.container {
    /* 让容器充满窗口 */
    width: 100vw;
    height: 100%;
}

.header {
    margin: 0;
    padding: 0;
    height: 58px;
}

.main {
    margin: 0;
    padding: 0;
}
</style>