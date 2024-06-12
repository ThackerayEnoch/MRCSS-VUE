<template>
    <el-menu default-active="/ringtone/manage/myfavourite" class="menu" :router="true">
        <el-sub-menu index="1" class="category">
            <template #title><span class="category">我的铃声</span></template>
            <el-menu-item index="/ringtone/manage/myfavourite">我的收藏</el-menu-item>
            <el-menu-item index="/ringtone/manage/mysubscribe">我的订阅</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/ringtone/manage/setting" class="category">铃声设置</el-menu-item>
        <el-menu-item index="3" class="category">查看账单</el-menu-item>
    </el-menu>
</template>

<script>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';

export default {
    name: 'RingtoneManageSideBar',
    setup() {
        // Define reactive data
        const data = reactive({
            // Your data properties here
        });

        // Define refs
        const count = ref(0);

        // Define computed properties
        const doubledCount = computed(() => count.value * 2);

        // Define methods
        function increment() {
            count.value++;
        }


        // Define lifecycle hooks
        onMounted(() => {
        });

        onUnmounted(() => {
            // Your unmounted logic here
        });

        // Return the reactive data, refs, computed properties, and methods
        return {
            data,
            count,
            doubledCount,
            increment,
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