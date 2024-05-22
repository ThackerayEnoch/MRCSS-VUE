<template>
    <ImageCarousel />
    <el-table stripe class="table" :data="data" :default-sort="{ prop: 'subscribe_count', order: 'descending' }">
        <el-table-column type="index" label="排名" min-width="5%"></el-table-column>
        <el-table-column prop="name" label="歌曲名" min-width="40%"></el-table-column>
        <el-table-column prop="category" label="类别" min-width="10%"></el-table-column>
        <el-table-column prop="subscribe_count" label="当前订阅数" min-width="10%" sortable></el-table-column>
        <el-table-column prop="favourite_count" label="收藏数" min-width="10%" sortable></el-table-column>
        <el-table-column prop="play_count" label="播放量" min-width="10%" sortable></el-table-column>
        <el-table-column label="操作" min-width="15%">
            <template #default="scoped">
                <el-button type="primary" @click="someMethod(scoped.row)" :plain="buttonPlainType.isFavourite"
                    circle><el-icon>
                        <Star />
                    </el-icon></el-button>
                <el-button type="success" @click="someMethod(scoped.row)" :plain="buttonPlainType.isSubscribe"
                    circle><el-icon>
                        <CollectionTag />
                    </el-icon></el-button>
                <el-button type="danger" @click="someMethod(scoped.row)" plain circle><el-icon>
                        <VideoPlay />
                    </el-icon></el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
import { ref, onMounted } from 'vue';
import ImageCarousel from '@/components/global/ImageCarousel.vue';

export default {
    name: 'TrendingRingtone',
    components: {
        ImageCarousel,
    },
    setup() {
        // Your component data goes here
        const buttonPlainType = ref({
            isFavourite: true,
            isSubscribe: true,
        });
        const data = ref([
            {
                id: 1,
                name: 'Ringtone 1',
                upload_time: '2021-01-01',
                url: 'https://example.com/ringtone1.mp3',
                category: 'Pop',
                play_count: 100,
                favourite_count: 10,
                subscribe_count: 500,
            },
            {
                id: 2,
                name: 'Ringtone 2',
                upload_time: '2021-01-02',
                url: 'https://example.com/ringtone2.mp3',
                category: 'Rock',
                play_count: 200,
                favourite_count: 20,
                subscribe_count: 10,
            },
            {
                id: 3,
                name: 'Ringtone 3',
                upload_time: '2021-01-03',
                url: 'https://example.com/ringtone3.mp3',
                category: 'Classical',
                play_count: 300,
                favourite_count: 30,
                subscribe_count: 15,
            }
        ]);

        // Your component methods go here
        const someMethod = () => {

        };

        onMounted(() => {
            // Code to run when the component is mounted goes here
        });

        return {
            data,
            someMethod,
            buttonPlainType,
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