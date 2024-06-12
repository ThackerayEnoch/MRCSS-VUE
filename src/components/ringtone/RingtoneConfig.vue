<template>
    <el-container class="container">
        <el-descriptions size="large" direction="vertical" style="width: 100%;" column="10" border>
            <el-descriptions-item label="铃声名称" min-width="55%">Ringtone0</el-descriptions-item>
            <el-descriptions-item label="铃声类型" min-width="15%">Pop</el-descriptions-item>
            <el-descriptions-item label="铃声时长" min-width="15%">0:56</el-descriptions-item>
            <el-descriptions-item label="铃声订阅时间" min-width="15%">2024-6-12</el-descriptions-item>
        </el-descriptions>
    </el-container>
    <el-container class="container" style="margin-top: 0;padding: 1% ; background-color: white;">
        <el-row style="width: 100%;">
            <el-col :span="6">
                <el-statistic title="已设置用户数量" :value="23" />
            </el-col>
            <el-col :span="6">
                <el-statistic title="总计拨号数量" :value="438" />
            </el-col>
            <el-col :span="6">
                <el-statistic :precision="2" title="价格" :value="0.08">
                    <template #suffix>元/次</template>
                </el-statistic>
            </el-col>
            <el-col :span="6">
                <el-statistic :precision="2" title="总花费" :value="7.4">
                    <template #suffix>元</template>
                </el-statistic>
            </el-col>
        </el-row>
    </el-container>
    <el-container class="container" style="margin-top: 2%;">
        <el-table stripe class="table" :data="data" :default-sort="{ prop: 'subscribeCount', order: 'descending' }">
            <el-table-column prop="" label="用户手机号" min-width="20%"></el-table-column>
            <el-table-column prop="" label="拨打次数" min-width="20%"></el-table-column>
            <el-table-column prop="" label="产生费用" min-width="20%"></el-table-column>
            <el-table-column prop="" label="操作" min-width="40%"></el-table-column>
        </el-table>
    </el-container>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue';

export default {
    name: 'RingtoneConfig',
    setup() {
        // Define reactive data
        const data = ref([]);

        // Define refs
        const count = ref(0);

        // Define computed properties
        const doubledCount = computed(() => count.value * 2);

        // Define lifecycle hooks
        onMounted(() => {
            // Your mounted logic here
        });

        onUnmounted(() => {
            // Your unmounted logic here
        });

        // Define methods
        const increment = () => {
            count.value++;
        };

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
.container {
    width: 100%;
}

.el-col {
    text-align: center;
}
</style>