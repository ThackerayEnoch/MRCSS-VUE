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
            <el-input class="input" v-model="form.confirmPassword" type="password" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input class="input" v-model="form.verifyCode" placeholder="验证码">
                <template #append>
                    <el-button @click="verifySend" :disabled="countdown > 0">
                        {{ countdown > 0 ? `${countdown}秒后可重新发送` : '发送验证码' }}
                    </el-button>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button class="login" type="danger" @click="login">注册</el-button>
        </el-form-item>
        <el-divider />
        <el-form-item class="reg">
            <router-link to="/login">登录</router-link>
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
                confirmPassword: '',
                verifyCode: '',
            },
            countdown: 0, // 倒计时
        };
    },
    methods: {
        login() {

        },
        verifySend() {
            if (this.countdown > 0) return; // 如果倒计时还没结束，直接返回

            this.countdown = 30; // 设置倒计时为30秒
            const intervalId = setInterval(() => {
                if (this.countdown > 0) {
                    this.countdown--;
                } else {
                    clearInterval(intervalId); // 倒计时结束，清除定时器
                }
            }, 1000);

            // 在这里发送验证码
            // ...
        },
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