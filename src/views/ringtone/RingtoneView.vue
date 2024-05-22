<template>
    <el-container class="container">
        <el-aside width="180px">
            <ViewSideBar />
        </el-aside>
        <el-main>
            <TrendingRingtone />
        </el-main>
    </el-container>
</template>

<script>
import ViewSideBar from '@/components/ringtone/ViewSideBar.vue';
import TrendingRingtone from '@/components/ringtone/TrendingRingtone.vue';
export default {
    name: 'RingtoneView',
    components: {
        ViewSideBar,
        TrendingRingtone,
    },
    setup() {
        // Your setup code here

        return {
            // Your reactive data and methods here
        };
    },
};
</script>

<style scoped>
.container {
    height: 100%;
}
</style>