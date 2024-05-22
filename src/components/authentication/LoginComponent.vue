<template>
    <el-form class="main">
        <el-form-item class="label">
            <h1><el-icon>
                    <Service />
                </el-icon>手机铃声定制服务系统</h1>
        </el-form-item>
        <el-form-item>
            <el-input class="input" v-model="form.phone" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input class="input" v-model="form.password" type="password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button class="login" type="primary" @click="login">登录</el-button>
        </el-form-item>
        <el-divider />
        <el-form-item class="reg">
            <router-link to="/register">注册</router-link>|<router-link to="/forget">忘记密码</router-link>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: 'LoginComponent',
    data() {
        return {
            form: {
                phone: '',
                password: '',
            },
        };
    },
    methods: {
        login() {
            this.$router.push('/');
        }
    },
};
</script>

<style scoped>
.label {
    text-align: center;
    color: #409EFF;
}

.input {
    height: 38px;
    font-size: 16px;
}

:deep(.input .el-input__wrapper) {
    background-color: rgb(237, 238, 240) !important;
}

.login {
    width: 100%;
    height: 38px;
}

.reg a {
    color: #afb2b4;
}

.reg .el-form-item__content a:hover {
    background-color: white;
    color: #409EFF;
}

:deep(.reg .el-form-item__content) {
    height: 10px !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
}
</style>