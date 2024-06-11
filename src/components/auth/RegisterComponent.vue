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
            <el-button class="login" type="danger" @click="register">注册</el-button>
        </el-form-item>
        <el-divider />
        <el-form-item class="reg">
            <router-link to="/login">登录</router-link>
        </el-form-item>
    </el-form>
</template>

<script>
import api from '@/api';
import { ref, getCurrentInstance } from 'vue';
export default {
    name: 'LoginComponent',
    setup() {
        const form = ref({
            phone: '',
            password: '',
            confirmPassword: '',
            verifyCode: '',
        });
        const { proxy } = getCurrentInstance();
        let countdown = ref(0);

        const register = async () => {
            if (form.value.phone === '' || form.value.password === '' || form.value.confirmPassword === '' || form.value.verifyCode === '') {
                proxy.$globalMethods.error('注册失败', '请填写完整信息', proxy.$notify)
                return;
            }
            if (form.value.phone.length !== 11 || !/^\d+$/.test(form.value.phone)) {
                proxy.$globalMethods.error('注册失败', '手机号格式不正确', proxy.$notify)
                return;
            }
            if (form.value.password !== form.value.confirmPassword) {
                proxy.$globalMethods.error('注册失败', '两次密码不一致', proxy.$notify)
                return;
            }

            try {
                // 发送注册请求
                const registerResponse = await api.register(form.value.phone, form.value.password);

                if (registerResponse.data.status === 'SUCCESS') {
                    proxy.$globalMethods.success('注册成功', proxy.$notify)
                    // 跳转到登录页
                    proxy.$router.push('/login')
                } else {
                    proxy.$globalMethods.error('注册失败', registerResponse.data.message, proxy.$notify)
                }
            } catch (error) {
                proxy.$globalMethods.error('注册失败', "未知错误", proxy.$notify)
            }
        };

        const verifySend = () => {
            if (countdown.value > 0) return;

            countdown.value = 30;
            const intervalId = setInterval(() => {
                if (countdown.value > 0) {
                    countdown.value--;
                } else {
                    clearInterval(intervalId);
                }
            }, 1000);
        };

        return {
            form,
            countdown,
            register,
            verifySend,
        };

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