<template>
    <el-skeleton :rows="10" :loading="isLoading" :throttle="100" animated>
        <template #default>
            <el-table stripe class="table" :data="data" :default-sort="{ prop: 'subscribeCount', order: 'descending' }">
                <el-table-column prop="favouriteTime" label="收藏日期" min-width="20%"></el-table-column>
                <el-table-column prop="name" label="歌曲名" min-width="40%"></el-table-column>
                <el-table-column prop="category" label="类别" min-width="10%"></el-table-column>
                <el-table-column prop="monthlyFee" label="费用" min-width="10%" sortable>
                    <template v-slot="scope">
                        {{ scope.row.monthlyFee }} 元/100次
                    </template>
                </el-table-column>
                <el-table-column label="操作" min-width="20%">
                    <template #default="scope">
                        <el-button type="primary" @click="unfavourite(scope.row.id)" circle>
                            <el-icon>
                                <Star />
                            </el-icon>
                        </el-button>
                        <el-button type="success" @click="subscribe(scope.row.id)" :plain="!scope.row.isSubscribe"
                            circle>
                            <el-icon>
                                <CollectionTag />
                            </el-icon>
                        </el-button>
                        <el-button type="danger" @click="play(scope.row.id)" plain circle>
                            <el-icon>
                                <VideoPlay />
                            </el-icon>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
    </el-skeleton>
</template>

<script>
import { onMounted, getCurrentInstance, ref } from 'vue';
import api from '@/api';
export default {
    name: 'FavouriteRingtoneManageComponents',
    setup() {
        // Define reactive data
        const data = ref([]);
        const { proxy } = getCurrentInstance();
        const pageSize = ref(10); // 每页显示10行数据
        let isLoading = ref(true);

        const getFavorites = async () => {
            try {
                isLoading.value = true;
                const result = await api.getFavourites();
                if (result.data.status === 'SUCCESS') {
                    data.value = result.data.data;
                } else {
                    proxy.$globalMethods.error('获取铃声失败', result.data.message, proxy.$notify);
                }
            } catch (error) {
                proxy.$globalMethods.error('获取铃声失败', error.message, proxy.$notify);
            } finally {
                isLoading.value = false;
            }
        }
        const subscribe = async (id) => {
            try {
                const ringtone = data.value.find(r => r.id === id);
                let result;
                if (ringtone.isSubscribe) {
                    result = await api.cancelSubscribe(id);
                } else {
                    result = await api.subscribe(id);
                }
                if (result.data.status === 'SUCCESS') {
                    proxy.$globalMethods.success(result.data.message, '', proxy.$notify);
                    if (ringtone) {
                        ringtone.isSubscribe = !ringtone.isSubscribe;
                    }
                } else {
                    proxy.$globalMethods.error('订阅操作失败', result.data.message, proxy.$notify);
                }
            } catch (error) {
                proxy.$globalMethods.error('订阅操作失败', error.message, proxy.$notify);
            }
        }
        const unfavourite = async (id) => {
            try {
                const result = await api.cancelFavourite(id);

                if (result.data.status === 'SUCCESS') {
                    proxy.$globalMethods.success(result.data.message, '', proxy.$notify);
                    // 找到对应的 ringtone
                    const index = data.value.findIndex(ringtone => ringtone.id === id);

                    // 如果找到了，就删除它
                    if (index !== -1) {
                        data.value.splice(index, 1);
                    }
                } else {
                    proxy.$globalMethods.error('收藏操作失败', result.data.message, proxy.$notify);
                }
            } catch (error) {
                proxy.$globalMethods.error('收藏操作失败', error.message, proxy.$notify);
            }
        }



        // Lifecycle hooks
        onMounted(() => {
            getFavorites();
        });
        return {
            data,
            pageSize,
            getFavorites,
            isLoading,
            subscribe,
            unfavourite,
        };
    },
};
</script>

<style scoped>
/* Your component's styles here */
</style>