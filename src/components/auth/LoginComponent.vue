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
            <el-button class="login" type="primary" @click="login" :isLoading="loading.value">登录</el-button>
        </el-form-item>
        <el-divider />
        <el-form-item class="reg">
            <router-link to="/register">注册</router-link>|<router-link to="/forget">忘记密码</router-link>
        </el-form-item>
    </el-form>
</template>

<script>
import { ref, getCurrentInstance } from 'vue';
import api from '@/api';
export default {
    name: 'LoginComponent',
    setup() {
        const { proxy } = getCurrentInstance();
        const form = ref({
            phone: '',
            password: '',
        });
        let loading = ref(false);
        const login = async () => {
            if (form.value.phone === '' || form.value.password === '') {
                proxy.$globalMethods.error('登录失败', '手机号或密码不能为空', proxy.$notify)
                return
            }
            if (form.value.phone.length !== 11 || !/^\d+$/.test(form.value.phone)) {
                proxy.$globalMethods.error('登录失败', '手机号必须为11位', proxy.$notify)
                return
            }

            try {
                loading.value = true

                // 发送登录请求
                const loginResponse = await api.login(form.value.phone, form.value.password)

                if (loginResponse.data.status === 'SUCCESS') {
                    const token = loginResponse.data.token
                    // 保存 JWT 到 localStorage
                    localStorage.setItem('jwtToken', token)
                    proxy.$globalMethods.success('欢迎回来', proxy.$notify)
                    // 跳转到首页
                    proxy.$router.push('/')
                } else {
                    proxy.$globalMethods.error('登录失败', loginResponse.data.message, proxy.$notify)
                }
            } catch (err) {
                proxy.$globalMethods.error('登录失败', err.response?.data?.message || '未知错误', proxy.$notify)
            } finally {
                loading.value = false
            }
        }

        return {
            form,
            login,
            loading,
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