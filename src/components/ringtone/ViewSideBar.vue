<template>
    <el-menu default-active="1" class="menu">
        <el-menu-item class="ranking" index="1">
            <span>热度排名</span>
        </el-menu-item>
        <el-menu-item class="category">
            <span>歌曲分类</span>
        </el-menu-item>
        <el-menu-item class="category" index="2">
            <span>流行</span>
        </el-menu-item>
        <el-menu-item class="category" index="3">
            <span>古典</span>
        </el-menu-item>
        <el-menu-item class="category" index="4">
            <span>摇滚</span>
        </el-menu-item>
        <el-menu-item class="category" index="5">
            <span>民谣</span>
        </el-menu-item>
        <el-menu-item class="category" index="6">
            <span>电子</span>
        </el-menu-item>



    </el-menu>
</template>

<script>
export default {
    name: 'ViewSideBar',
    setup() {
        // Add your setup logic here

        return {
            // Add your reactive variables and functions here
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