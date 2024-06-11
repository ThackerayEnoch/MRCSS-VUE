<template>
    <el-menu default-active="1" class="menu">
        <el-menu-item class="ranking" index="1" @click="changeCategory('')">
            <span>热度排名</span>
        </el-menu-item>
        <el-menu-item class="category">
            <span>歌曲分类</span>
        </el-menu-item>
        <el-menu-item class="category" index="2" @click="changeCategory('Pop')">
            <span>流行</span>
        </el-menu-item>
        <el-menu-item class="category" index="3" @click="changeCategory('Classical')">
            <span>古典</span>
        </el-menu-item>
        <el-menu-item class="category" index="4" @click="changeCategory('Rock')">
            <span>摇滚</span>
        </el-menu-item>
        <el-menu-item class="category" index="5" @click="changeCategory('Folk')">
            <span>民谣</span>
        </el-menu-item>
        <el-menu-item class="category" index="6" @click="changeCategory('Electronic')">
            <span>电子</span>
        </el-menu-item>



    </el-menu>
</template>

<script>
import { useCounterStore } from '@/stores/counter.js';
export default {
    name: 'ViewSideBar',
    setup() {
        const store = useCounterStore();
        const changeCategory = (category) => {
            store.setRingtoneType(category);
        };
        return {
            changeCategory,
        };
    },
};
</script>
<style scoped>
.menu {
    height: 100%;
    text-align: left;
}

.ranking {
    font-size: 18px;
}

.category {
    font-size: 18px;
}
</style>