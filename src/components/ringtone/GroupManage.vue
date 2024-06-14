<template>
    <el-skeleton :rows="8" :loading="isLoading" animated>
        <el-container class="container">
            <el-descriptions size="large" direction="vertical" style="width: 100%;" :column="10" border>
                <el-descriptions-item label="组名" min-width="20%">
                    <el-select v-model="selectGroupValue" :loading="isLoading">
                        <el-option v-for="(item, index) in groupData" :key="index" :label="item.group" :value="index">
                            {{ item.group }}
                        </el-option>
                    </el-select>
                </el-descriptions-item>
                <el-descriptions-item label="组铃声" min-width="40%">
                    <el-select v-model="selectValue" @change="updateRingtone">
                        <el-option v-for="(item, index) in ringtoneData" :key="index" :label="item.name" :value="index">
                            {{ item.name }}
                        </el-option>
                    </el-select>
                </el-descriptions-item>
                <el-descriptions-item label="铃声时长" min-width="10%">
                    {{ ringtoneData[selectValue].duration }} 秒
                </el-descriptions-item>
                <el-descriptions-item label="操作" min-width="20%">
                    <el-button type="primary" @click="dialogVisible = true" plain circle><el-icon>
                            <Plus />
                        </el-icon></el-button>
                    <el-button type="warning" @click="openEdit(groupData[selectGroupValue].id)" plain circle>
                        <el-icon>
                            <Edit />
                        </el-icon>
                    </el-button>
                    <el-button type="danger" @click="deleteGroup(groupData[selectGroupValue].id)" plain circle>
                        <el-icon>
                            <Delete />
                        </el-icon>
                    </el-button>
                </el-descriptions-item>
            </el-descriptions>
        </el-container>
        <el-container class="container" style="margin-top: 3%;">
            <el-table stripe class="table" :data="contactData">
                <el-table-column type="index" label="ID" min-width="10%"></el-table-column>
                <el-table-column prop="contactPhone" label="手机号" min-width="20%"></el-table-column>
                <el-table-column prop="callCount" label="拨打次数" min-width="15%"></el-table-column>
                <el-table-column prop="" label="产生费用" min-width="20%">
                    <template #default="scope">
                        <span>{{ ringtoneData[selectValue].monthlyFee * scope.row.callCount }} 元</span>
                    </template>
                </el-table-column>
                <el-table-column min-width="35%">
                    <template #header>
                        <span>操作</span>
                        <el-button style="margin-left: 20%;" type="primary" @click="addCotactDialogVisible = true" plain
                            circle><el-icon>
                                <Plus />
                            </el-icon></el-button>
                    </template>
                    <template #default="scope">
                        <el-button type="danger" @click="deleteContextFromGroup(scope.row.contactPhone)" plain circle>
                            <el-icon>
                                <Delete />
                            </el-icon>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-container>
    </el-skeleton>
    <el-dialog v-model="dialogVisible" title="新建组">
        <el-form :model="addGroupData" label-width="80px">
            <el-form-item label="组名">
                <el-input v-model="addGroupData.group"></el-input>
            </el-form-item>
            <el-form-item label="铃声">
                <el-select v-model="addGroupData.ringtoneId">
                    <el-option v-for="(item, index) in ringtoneData" :key="index" :label="item.name" :value="item.id">
                        {{ item.name }}
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addGroups">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog v-model="editDialogVisible" title="修改组">
        <el-form :model="addGroupData" label-width="80px">
            <el-form-item label="组名">
                <el-input v-model="addGroupData.group"></el-input>
            </el-form-item>
            <el-form-item label="铃声">
                <el-select v-model="addGroupData.ringtoneId">
                    <el-option v-for="(item, index) in ringtoneData" :key="index" :label="item.name" :value="item.id">
                        {{ item.name }}
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <span class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editGroup">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog v-model="addCotactDialogVisible" title="新建联系人">
        <el-form :model="addContactData" label-width="70px">
            <el-form-item label="手机号">
                <el-input v-model="addContactData.contactPhone"></el-input>
            </el-form-item>
        </el-form>
        <span class="dialog-footer">
            <el-button @click="addCotactDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addContextToGroup">确 定</el-button>
        </span>

    </el-dialog>
</template>

<script>
import { ref, reactive, getCurrentInstance, onMounted, watch } from 'vue';
import api from '@/api';
export default {
    name: 'GroupManage',
    setup() {
        let groupData = ref([]);
        let contactData = ref([]);
        let addContactData = reactive({
            contactPhone: '',
        });
        let addGroupData = reactive({
            group: '',
            ringtoneId: 0,
            userId: 0,
            id: 0,
        });
        const { proxy } = getCurrentInstance();
        let editDialogVisible = ref(false);
        let dialogVisible = ref(false);
        let groupIsLoading = ref(true);
        let addCotactDialogVisible = ref(false);
        let selectGroupValue = ref(0);
        let selectValue = ref(0);
        let isLoading = ref(true);
        let ringtoneData = ref([]);
        // Watch for changes in reactive data
        watch(selectGroupValue, (value) => {
            const rId = groupData.value[value].ringtoneId;
            const resultIndex = ringtoneData.value.findIndex(r => r.id === rId);
            selectValue.value = resultIndex;
            getAllContactByGid();
        });
        onMounted(() => {
            getSubscribeRingtones();
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

                const result1 = await api.getGroupsByUid();
                if (result1.data.status === 'SUCCESS') {
                    groupData.value = result1.data.data;
                    updateSelect();
                } else {
                    proxy.$globalMethods.error('获取组失败', result.data.message, proxy.$notify);
                }

            } catch (error) {
                proxy.$globalMethods.error('获取铃声失败', error.message, proxy.$notify);
            } finally {
                isLoading.value = false;
            }
        }
        const updateSelect = () => {
            const rId = groupData.value[selectGroupValue.value].ringtoneId;
            const resultIndex = ringtoneData.value.findIndex(r => r.id === rId);
            selectValue.value = resultIndex;
            getAllContactByGid();
        }
        const addGroups = async () => {
            try {
                const result = await api.addGroup(addGroupData.group, addGroupData.ringtoneId);
                if (result.data.status === 'SUCCESS') {
                    groupData.value.push(result.data.data[0]);
                    proxy.$globalMethods.success(result.data.message, '', proxy.$notify);
                } else {
                    proxy.$globalMethods.error('添加组失败', result.data.message, proxy.$notify);
                }
                dialogVisible.value = false;
            } catch (error) {
                proxy.$globalMethods.error('添加组失败', error.message, proxy.$notify);
            }
        }
        const deleteGroup = async (id) => {
            try {
                const result = await api.deleteGroup(id);
                if (result.data.status === 'SUCCESS') {
                    const index = groupData.value.findIndex(group => group.id === id);
                    if (index !== -1) {
                        groupData.value.splice(index, 1);
                        selectGroupValue.value = 0;
                        updateSelect();
                    }
                    proxy.$globalMethods.success(result.data.message, '', proxy.$notify);
                } else {
                    proxy.$globalMethods.error('删除组失败', result.data.message, proxy.$notify);
                }
            } catch (error) {
                proxy.$globalMethods.error('删除组失败', error.message, proxy.$notify);
            }
        }
        const openEdit = (id) => {
            let g = groupData.value.find(group => group.id === id);
            addGroupData.group = g.group;
            addGroupData.ringtoneId = g.ringtoneId;
            addGroupData.userId = g.userId;
            addGroupData.id = g.id;
            editDialogVisible.value = true;
        }
        const editGroup = async () => {
            try {
                const result = await api.updateGroup(addGroupData.id, addGroupData.group, addGroupData.ringtoneId);
                if (result.data.status === 'SUCCESS') {
                    let d = groupData.value.find(group => group.id === addGroupData.id);
                    d.group = addGroupData.group;
                    d.ringtoneId = addGroupData.ringtoneId;
                    updateSelect();
                    proxy.$globalMethods.success(result.data.message, '', proxy.$notify);
                } else {
                    proxy.$globalMethods.error('修改组失败', result.data.message, proxy.$notify);
                }
                editDialogVisible.value = false;
            } catch (error) {
                proxy.$globalMethods.error('修改组失败', error.message, proxy.$notify);
            }
        }
        const updateRingtone = async () => {
            try {
                const index = selectGroupValue.value;
                const g = groupData.value[index];
                console.log(g)
                const result = await api.updateGroup(g.id, g.group, ringtoneData.value[selectValue.value].id);
                if (result.data.status === 'SUCCESS') {
                    groupData.value[selectGroupValue.value].ringtoneId = ringtoneData.value[selectValue.value].id;
                    proxy.$globalMethods.success(result.data.message, '', proxy.$notify);
                }
            } catch (error) {
                proxy.$globalMethods.error('修改组失败', error.message, proxy.$notify);
            }
        }
        const getAllContactByGid = async () => {
            try {
                const result = await api.getAllContactByGid(groupData.value[selectGroupValue.value].id);
                if (result.data.status === 'SUCCESS') {
                    contactData.value = result.data.data;
                } else {
                    proxy.$globalMethods.error('获取联系人失败', result.data.message, proxy.$notify);
                }
            } catch (error) {
                proxy.$globalMethods.error('获取联系人失败', error.message, proxy.$notify);
            }
        }
        const addContextToGroup = async () => {
            try {
                const result = await api.addContactToGroup(addContactData.contactPhone, groupData.value[selectGroupValue.value].id);
                if (result.data.status === 'SUCCESS') {
                    proxy.$globalMethods.success(result.data.message, '', proxy.$notify);
                    addCotactDialogVisible.value = false;
                    getAllContactByGid();
                } else {
                    proxy.$globalMethods.error('添加联系人失败', result.data.message, proxy.$notify);
                }
            } catch (error) {
                proxy.$globalMethods.error('添加联系人失败', error.message, proxy.$notify);
            }
        }
        const deleteContextFromGroup = async (contactPhone) => {
            try {
                const result = await api.deleteContactFromGroup(contactPhone, groupData.value[selectGroupValue.value].id);
                if (result.data.status === 'SUCCESS') {
                    proxy.$globalMethods.success(result.data.message, '', proxy.$notify);
                    getAllContactByGid();
                } else {
                    proxy.$globalMethods.error('删除联系人失败', result.data.message, proxy.$notify);

                }
            } catch (error) {
                proxy.$globalMethods.error('删除联系人失败', error.message, proxy.$notify);
            }

        }
        return {
            groupData,
            addGroupData,
            editDialogVisible,
            dialogVisible,
            groupIsLoading,
            addGroups,
            deleteGroup,
            openEdit,
            editGroup,
            getSubscribeRingtones,
            ringtoneData,
            isLoading,
            selectGroupValue,
            selectValue,
            updateRingtone,
            contactData,
            addContactData,
            addCotactDialogVisible,
            addContextToGroup,
            deleteContextFromGroup,
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