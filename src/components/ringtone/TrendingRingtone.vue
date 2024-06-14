<template>
    <ImageCarousel />
    <el-skeleton :rows="10" :loading="isLoading" :throttle="100" animated>
        <template #default>
            <el-table stripe class="table" :data="data" :default-sort="{ prop: 'subscribeCount', order: 'descending' }">
                <el-table-column type="index" label="排名" min-width="5%"></el-table-column>
                <el-table-column prop="name" label="歌曲名" min-width="30%"></el-table-column>
                <el-table-column prop="duration" label="时长" min-width="10%">
                    <template #default="scope">
                        {{ scope.row.duration }} 秒
                    </template>
                </el-table-column>
                <el-table-column prop="category" label="类别" min-width="10%"></el-table-column>
                <el-table-column prop="subscribeCount" label="当前订阅数" min-width="10%" sortable></el-table-column>
                <el-table-column prop="favouriteCount" label="收藏数" min-width="10%" sortable></el-table-column>
                <el-table-column prop="playCount" label="播放量" min-width="10%" sortable></el-table-column>
                <el-table-column label="操作" min-width="15%">
                    <template #default="scope">
                        <el-button type="primary" @click="favourite(scope.row.id)" :plain="!scope.row.isFavourite"
                            circle>
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
            <el-pagination layout="prev, pager, next" :page-size="10" :page-count="10"
                v-model:current-page="currentPage" @current-change="handlePageChange" />
        </template>
    </el-skeleton>
</template>



<script>
import { ref, onMounted, getCurrentInstance, watchEffect } from 'vue';
import { useCounterStore } from '@/stores/counter.js';
import ImageCarousel from '@/components/global/ImageCarousel.vue';
import api from '@/api';

export default {
    name: 'TrendingRingtone',
    components: {
        ImageCarousel,
    },
    setup() {
        const { proxy } = getCurrentInstance();
        const store = useCounterStore();
        const buttonPlainType = ref({
            isFavourite: true,
            isSubscribe: true,
        });
        let isLoading = ref(true);
        const pageSize = ref(10); // 每页显示10行数据
        const totalItems = ref(100); // 总共100行数据 (10页)
        const currentPage = ref(1);
        const data = ref([]);
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
                        ringtone.favouriteCount = ringtone.isFavourite ? ringtone.favouriteCount + 1 : ringtone.favouriteCount - 1;
                    }
                } else {
                    proxy.$globalMethods.error('收藏操作失败', result.data.message, proxy.$notify);
                }
            } catch (error) {
                proxy.$globalMethods.error('收藏操作失败', error.message, proxy.$notify);
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
                        ringtone.subscribeCount = ringtone.isSubscribe ? ringtone.subscribeCount + 1 : ringtone.subscribeCount - 1;
                    }
                } else {
                    proxy.$globalMethods.error('订阅操作失败', result.data.message, proxy.$notify);
                }
            } catch (error) {
                proxy.$globalMethods.error('订阅操作失败', error.message, proxy.$notify);
            }
        }
        function play(id) {
            //TODO
            console.log(id);
        }
        const getRingtones = async (page) => {
            try {
                isLoading.value = true;
                const result = await api.getRingtoneList(page, pageSize.value, "subscribe_count", store.ringtoneType);
                if (result.data.status === 'SUCCESS') {
                    data.value = result.data.data;
                    totalItems.value = result.data.total; // 更新总项数
                } else {
                    proxy.$globalMethods.error('获取铃声失败', result.data.message, proxy.$notify);
                }
            } catch (error) {
                proxy.$globalMethods.error('获取铃声失败', error.message, proxy.$notify);
            } finally {
                isLoading.value = false;
            }
            console.log(isLoading.value)
        }

        const handlePageChange = (page) => {
            currentPage.value = page;
            getRingtones(currentPage.value);
        };

        onMounted(() => {

            store.setRingtoneType('');
        });
        watchEffect(() => {
            getRingtones(currentPage.value)
        }, { flush: 'post' });
        return {
            data,
            buttonPlainType,
            totalItems,
            pageSize,
            handlePageChange,
            getRingtones,
            currentPage,
            favourite,
            subscribe,
            play,
            isLoading,
        };
    },
};
</script>



<style scoped>
.table {
    width: 100%;
    margin-top: 20px;
    /*background-color: transparent !important;
    --el-table-border-color: transparent !important;*/
}

.el-icon {
    font-size: 15px;
}
</style>