<template>
    <el-container class="container">
        <el-aside width="180px">
            <RingtoneManageSideBar />
        </el-aside>
        <el-main>
            <router-view name="Manage" />
        </el-main>
    </el-container>
</template>

<script>
import RingtoneManageSideBar from '@/components/ringtone/RingtoneManageSideBar.vue';
export default {
    name: 'RingtoneManage',
    components: {
        RingtoneManageSideBar,
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