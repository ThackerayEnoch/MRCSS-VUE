<template>
    <div class="block text-center">
        <el-carousel height="200px">
            <el-carousel-item v-for="item in data" :key="item.id">
                <el-image :src="item.url" fit="scale-down"></el-image>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>
<script>
import { ref, onMounted } from 'vue';
import api from '@/api';
export default {
    name: 'ImageCarousel',
    setup() {
        const data = ref([]);
        onMounted(async () => {
            const result = await api.getAdvertisement();
            if (result.data.status === 'SUCCESS') {
                data.value = result.data.data;
            }
        });
        return {
            data
        };
    },
};
</script>
<style scoped>
.demonstration {
    color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>