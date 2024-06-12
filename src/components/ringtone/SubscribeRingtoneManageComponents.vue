<template>
    <el-skeleton :rows="10" :loading="isLoading" :throttle="100" animated>
        <template #default>
            <el-table stripe class="table" :data="data" :default-sort="{ prop: 'subscribeCount', order: 'descending' }">
                <el-table-column prop="subscribeTime" label="订阅日期" min-width="10%"></el-table-column>
                <el-table-column prop="name" label="歌曲名" min-width="25%"></el-table-column>
                <el-table-column prop="category" label="类别" min-width="10%"></el-table-column>
                <el-table-column prop="" label="本月总呼叫次数" min-width="15%" sortable></el-table-column>
                <el-table-column prop="monthlyFee" label="费用" min-width="10%" sortable>
                    <template v-slot="scope">
                        {{ scope.row.monthlyFee }}元/100次
                    </template>
                </el-table-column>
                <el-table-column prop="" label="本月总花费" min-width="10%" sortable></el-table-column>
                <el-table-column label="操作" min-width="20%">
                    <template #default="scope">
                        <el-button type="warning" plain circle>
                            <el-icon>
                                <Setting />
                            </el-icon>
                        </el-button>
                        <el-button type="primary" @click="favourite(scope.row.id)" :plain="!scope.row.isFavourite"
                            circle>
                            <el-icon>
                                <Star />
                            </el-icon>
                        </el-button>
                        <el-button type="success" @click="unsubscribe(scope.row.id)" circle>
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

        const getSubscribes = async () => {
            try {
                isLoading.value = true;
                const result = await api.getSubscribes();
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
        const unsubscribe = async (id) => {
            try {
                const result = await api.cancelSubscribe(id);
                if (result.data.status === 'SUCCESS') {
                    proxy.$globalMethods.success(result.data.message, '', proxy.$notify);
                    const index = data.value.findIndex(ringtone => ringtone.id === id);

                    // 如果找到了，就删除它
                    if (index !== -1) {
                        data.value.splice(index, 1);
                    }
                } else {
                    proxy.$globalMethods.error('订阅操作失败', result.data.message, proxy.$notify);
                }
            } catch (error) {
                proxy.$globalMethods.error('订阅操作失败', error.message, proxy.$notify);
            }
        }
        const favourite = async (id) => {
            try {
                const ringtone = data.value.find(r => r.id === id);
                let result;
                if (ringtone.isFavourite) {
                    result = await api.cancelFavourite(id);
                } else {
                    result = await api.favourite(id);
                }
                if (result.data.status === 'SUCCESS') {
                    proxy.$globalMethods.success(result.data.message, '', proxy.$notify);
                    if (ringtone) {
                        ringtone.isFavourite = !ringtone.isFavourite;
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
            getSubscribes();
        });
        return {
            data,
            pageSize,
            getSubscribes,
            isLoading,
            unsubscribe,
            favourite,
        };
    },
};
</script>

<style scoped>
/* Your component's styles here */
</style>