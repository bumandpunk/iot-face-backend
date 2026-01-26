<script setup lang="ts">
import { message } from "@/utils/message";
import { reactive, ref } from "vue";
import dayjs from "dayjs";
import { fetchRecordDetail, type BaseRecordDetail } from "@/api/iot";

defineOptions({
  name: "IotRecordDetailPage"
});

const loading = ref(false);
const query = reactive({
  id: ""
});
const detail = ref<BaseRecordDetail | null>(null);

const formatTime = (timestamp?: number | null) => {
  if (!timestamp) return "-";
  const value = timestamp > 10_000_000_000 ? timestamp / 1000 : timestamp;
  return dayjs.unix(value).format("YYYY-MM-DD HH:mm:ss");
};

const fetchDetail = async () => {
  if (!query.id) {
    message("请输入记录ID", { type: "warning" });
    return;
  }
  loading.value = true;
  detail.value = null;
  try {
    const res = await fetchRecordDetail(Number(query.id));
    detail.value = res.data;
  } catch (error) {
    message("获取详情失败", { type: "error" });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="iot-record-detail space-y-4">
    <el-card shadow="never">
      <template #header>
        <div>
          <h2 class="text-base font-semibold">进出记录详细查询</h2>
          <p class="text-sm text-gray-500">
            调用 /api/base-record/{id} 获取单条进出记录
          </p>
        </div>
      </template>

      <el-form :inline="true" class="mb-4" @submit.prevent>
        <el-form-item label="记录ID">
          <el-input v-model="query.id" placeholder="请输入记录ID" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="fetchDetail">
            查询
          </el-button>
        </el-form-item>
      </el-form>

      <el-empty v-if="!detail" description="暂无详情数据" />
      <el-descriptions v-else :column="2" border>
        <el-descriptions-item label="ID">
          {{ detail.id }}
        </el-descriptions-item>
        <el-descriptions-item label="设备">
          {{ detail.devName || "-" }}
        </el-descriptions-item>
        <el-descriptions-item label="设备SN">
          {{ detail.sn || "-" }}
        </el-descriptions-item>
        <el-descriptions-item label="工号">
          {{ detail.jobnumber || "-" }}
        </el-descriptions-item>
        <el-descriptions-item label="姓名">
          {{ detail.name || "-" }}
        </el-descriptions-item>
        <el-descriptions-item label="时间">
          {{ formatTime(detail.time) }}
        </el-descriptions-item>
        <el-descriptions-item label="创建时间">
          {{ formatTime(detail.createTime) }}
        </el-descriptions-item>
        <el-descriptions-item label="更新时间">
          {{ formatTime(detail.updateTime) }}
        </el-descriptions-item>
        <el-descriptions-item label="指令">
          {{ detail.cmd || "-" }}
        </el-descriptions-item>
        <el-descriptions-item label="类型">
          {{ detail.type ?? "-" }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<style scoped>
.iot-record-detail :deep(.el-card__header) {
  padding-bottom: 0.5rem;
}
</style>
