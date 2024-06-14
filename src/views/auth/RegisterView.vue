<template>
    <el-container class="container">
        <el-main>
            <el-row>
                <el-col :span="6" :offset="15"><register-component /> </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
import RegisterComponent from '@/components/auth/RegisterComponent.vue';
export default {
    name: 'RegisterView',
    components: {
        RegisterComponent,
    },
    data() {
        return {
            // Your data properties go here
        };
    },
    methods: {
        // Your methods go here
    },
};
</script>

<style scoped>
.main {
    /* 登录栏垂直居中 */
    margin-top: 50%;
    /* 登录栏样式 */
    padding: 25px;
    height: auto;
    width: 350px;
    background-color: white;
    border-radius: 10px;
}

.container {
    /* 让容器充满窗口 */
    width: 100vw;
    height: 100%;
    background-image: url(https://api.dujin.org/bing/1920.php) !important;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    background-position-x: center;
}
</style>