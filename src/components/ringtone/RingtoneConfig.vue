<template>
    <el-skeleton :rows="8" :loading="isLoading" animated>
        <template #default>
            <el-container class="container">
                <el-descriptions size="large" direction="vertical" style="width: 100%;" :column="10" border>
                    <el-descriptions-item label="铃声名称" min-width="55%">
                        <el-select v-model="selectValue">
                            <el-option v-for="(item, index) in ringtoneData" :key="index" :label="item.name"
                                :value="index">
                                {{ item.name }}
                            </el-option>
                        </el-select>
                    </el-descriptions-item>
                    <el-descriptions-item label="铃声类型" min-width="15%">
                        {{ ringtoneData[selectValue].category }}</el-descriptions-item>
                    <el-descriptions-item label="铃声时长" min-width="15%">
                        {{ ringtoneData[selectValue].duration }} 秒
                    </el-descriptions-item>
                    <el-descriptions-item prop="subscribeTime" label="铃声订阅时间" min-width="15%">
                        {{ ringtoneData[selectValue].subscribeTime }}
                    </el-descriptions-item>
                </el-descriptions>
            </el-container>
            <el-container class="container" style="margin-top: 0;padding: 1% ; background-color: white;">
                <el-row style="width: 100%;">
                    <el-col :span="6">
                        <el-statistic title="已设置用户数量" :value="contactData.length" />
                    </el-col>
                    <el-col :span="6">
                        <el-statistic title="总计拨号数量" :value="callCount" />
                    </el-col>
                    <el-col :span="6">
                        <el-statistic :precision="2" title="价格" :value="ringtoneData[selectValue].monthlyFee / 100">
                            <template #suffix>元/次</template>
                        </el-statistic>
                    </el-col>
                    <el-col :span="6">
                        <el-statistic :precision="2" title="总花费"
                            :value="callCount * (ringtoneData[selectValue].monthlyFee / 100)">
                            <template #suffix>元</template>
                        </el-statistic>
                    </el-col>
                </el-row>
            </el-container>

            <el-container class="container" style="margin-top: 2%;">
                <el-table stripe class="table" :data="contactData"
                    :default-sort="{ prop: 'subscribeCount', order: 'descending' }">
                    <el-table-column prop="contactPhone" label="用户手机号" min-width="20%"></el-table-column>
                    <el-table-column prop="callCount" label="拨打次数" min-width="20%"></el-table-column>
                    <el-table-column prop="" label="产生费用" min-width="20%">
                        <template #default="scope">
                            <span>{{ ringtoneData[selectValue].monthlyFee * scope.row.callCount / 100 }} 元</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" min-width="30%">
                        <template #header>
                            <span>操作 </span>
                            <el-button style="margin-left: 20%;" type="primary" @click="addUserDialogVisable = true"
                                plain><el-icon>
                                    <Plus />
                                </el-icon></el-button>
                        </template>
                        <template #default="scope">
                            <el-button type="danger" @click="deleteContact(scope.row.contactPhone)" plain circle>
                                <el-icon>
                                    <Delete />
                                </el-icon>
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-container>
        </template>
    </el-skeleton>
    <el-dialog v-model="addUserDialogVisable" title="修改联系人">
        <el-form :model="addUserData" label-width="100px">
            <el-form-item label="用户手机号">
                <el-input v-model="addUserData.userPhone"></el-input>
            </el-form-item>
        </el-form>
        <span class="dialog-footer">
            <el-button @click="addUserDialogVisable = false">取 消</el-button>
            <el-button type="primary" @click="addContacts">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { ref, onBeforeMount, getCurrentInstance, reactive, watch, onMounted } from 'vue';
import api from '@/api';
export default {
    name: 'RingtoneConfig',
    setup() {
        // Define reactive data
        const { proxy } = getCurrentInstance();
        let ringtoneData = ref([]);
        let callCount = ref(0);
        let contactData = ref([]);
        let addUserData = reactive({
            userPhone: '',
        });
        let addUserDialogVisable = ref(false);
        let selectValue = ref(0);
        let isLoading = ref(true);


        // Define lifecycle hooks
        onBeforeMount(() => {
            // Your mounted logic here
            getSubscribeRingtones();

        });
        onMounted(() => {
            // Your mounted logic here
        });
        watch(selectValue, (value) => {
            getContacts(ringtoneData.value[value].id);
        });
        watch(contactData, (value) => {
            callCount.value = 0;
            value.forEach((item) => {
                callCount.value += item.callCount;
            });
        });
        const getSubscribeRingtones = async () => {
            try {
                isLoading.value = true;
                const result = await api.getSubscribes();
                if (result.data.status === 'SUCCESS') {
                    ringtoneData.value = result.data.data;
                } else {
                    proxy.$globalMethods.error('获取铃声失败', result.data.message, proxy.$notify);
                }
                const result1 = await api.getContactByUidAndRid(ringtoneData.value[0].id);
                if (result.data.status === 'SUCCESS') {
                    contactData.value = result1.data.data;
                } else {
                    proxy.$globalMethods.error('获取联系人失败', result.data.message, proxy.$notify);
                }
            } catch (error) {
                proxy.$globalMethods.error('获取铃声失败', error.message, proxy.$notify);
            } finally {
                isLoading.value = false;
            }
        }

        const getContacts = async (id) => {
            try {
                const result = await api.getContactByUidAndRid(id);
                if (result.data.status === 'SUCCESS') {
                    contactData.value = result.data.data;
                } else {
                    proxy.$globalMethods.error('获取联系人失败', result.data.message, proxy.$notify);
                }
            } catch (error) {
                proxy.$globalMethods.error('获取联系人失败', error.message, proxy.$notify);
            }
        }
        const addContacts = async () => {
            try {
                const result = await api.addContact(addUserData.userPhone, ringtoneData.value[selectValue.value].id);
                if (result.data.status === 'SUCCESS') {
                    proxy.$globalMethods.success(result.data.message, '', proxy.$notify);
                    getContacts(ringtoneData.value[selectValue.value].id);
                    addUserDialogVisable.value = false;
                } else {
                    proxy.$globalMethods.error('添加联系人失败', result.data.message, proxy.$notify);
                }
            } catch (error) {
                proxy.$globalMethods.error('添加联系人失败', error.message, proxy.$notify);
            }
        }
        const deleteContact = async (userPhone) => {
            try {
                const result = await api.deleteContact(userPhone, ringtoneData.value[selectValue.value].id);
                if (result.data.status === 'SUCCESS') {
                    proxy.$globalMethods.success(result.data.message, '', proxy.$notify);
                    getContacts(ringtoneData.value[selectValue.value].id);
                    addUserDialogVisable.value = false;
                } else {
                    proxy.$globalMethods.error('删除联系人失败', result.data.message, proxy.$notify);
                }
            } catch (error) {
                proxy.$globalMethods.error('删除联系人失败', error.message, proxy.$notify);
            }
        }
        // Return the reactive data, refs, computed properties, and methods
        return {
            ringtoneData,
            getSubscribeRingtones,
            selectValue,
            isLoading,
            getContacts,
            contactData,
            addUserDialogVisable,
            addUserData,
            addContacts,
            deleteContact,
            callCount,
        };
    },
};
</script>

<style scoped>
.container {
    width: 100%;
}

.el-col {
    text-align: center;
}
</style>