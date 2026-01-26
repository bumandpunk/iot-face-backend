<script setup lang="ts">
import dayjs from "dayjs";
import { message } from "@/utils/message";
import { onMounted, reactive, ref } from "vue";
import {
  fetchRecordDetail,
  fetchRecordPage,
  type BaseRecord,
  type BaseRecordDetail
} from "@/api/iot";

defineOptions({
  name: "Records"
});

const recordLoading = ref(false);
const recordQuery = reactive({
  sn: "",
  name: "",
  pageNum: 1,
  pageSize: 10
});
const recordTotal = ref(0);
const recordData = ref<BaseRecord[]>([]);
const recordDetailVisible = ref(false);
const recordDetail = ref<BaseRecordDetail | null>(null);

const formatRecordTime = (record: BaseRecord) => {
  if (record.timeStr) return record.timeStr;
  if (!record.time) return "-";
  return dayjs.unix(record.time).format("YYYY-MM-DD HH:mm:ss");
};

const loadRecordPage = async () => {
  recordLoading.value = true;
  try {
    const res = await fetchRecordPage(recordQuery);
    recordData.value = res.data.records ?? [];
    recordTotal.value = res.data.total ?? 0;
  } catch (error) {
    message("加载进出记录失败", { type: "error" });
  } finally {
    recordLoading.value = false;
  }
};

const handleRecordSearch = () => {
  recordQuery.pageNum = 1;
  loadRecordPage();
};

const openRecordDetail = async (record: BaseRecord) => {
  if (!record.id) return;
  recordDetailVisible.value = true;
  recordDetail.value = null;
  try {
    const res = await fetchRecordDetail(record.id);
    recordDetail.value = res.data;
  } catch (error) {
    message("获取详情失败", { type: "error" });
  }
};

onMounted(() => {
  loadRecordPage();
});
</script>

<template>
  <div class="iot-records space-y-4">
    <el-card shadow="never">
      <template #header>
        <div>
          <h2 class="text-base font-semibold">进出记录</h2>
        </div>
      </template>

      <el-form :inline="true" class="mb-4" @submit.prevent>
        <el-form-item label="设备名称">
          <el-input
            v-model="recordQuery.sn"
            placeholder="请输入设备名称"
            clearable
          />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input
            v-model="recordQuery.name"
            placeholder="请输入姓名"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleRecordSearch">
            查询
          </el-button>
        </el-form-item>
      </el-form>

      <el-table :data="recordData" :loading="recordLoading" border stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="devName" label="设备" min-width="160" />
        <el-table-column prop="sn" label="设备SN" min-width="180" />
        <el-table-column prop="jobnumber" label="工号" width="120" />
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column label="时间" min-width="180">
          <template #default="{ row }">
            {{ formatRecordTime(row) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template #default="{ row }">
            <el-button type="primary" link @click="openRecordDetail(row)">
              查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="flex justify-end mt-4">
        <el-pagination
          v-model:current-page="recordQuery.pageNum"
          v-model:page-size="recordQuery.pageSize"
          :total="recordTotal"
          layout="total, sizes, prev, pager, next"
          @size-change="loadRecordPage"
          @current-change="loadRecordPage"
        />
      </div>
    </el-card>

    <el-dialog v-model="recordDetailVisible" title="进出记录详情" width="600px">
      <el-descriptions v-if="recordDetail" :column="2" border>
        <el-descriptions-item label="ID">
          {{ recordDetail.id }}
        </el-descriptions-item>
        <el-descriptions-item label="设备">
          {{ recordDetail.devName || "-" }}
        </el-descriptions-item>
        <el-descriptions-item label="设备SN">
          {{ recordDetail.sn || "-" }}
        </el-descriptions-item>
        <el-descriptions-item label="工号">
          {{ recordDetail.jobnumber || "-" }}
        </el-descriptions-item>
        <el-descriptions-item label="姓名">
          {{ recordDetail.name || "-" }}
        </el-descriptions-item>
        <el-descriptions-item label="时间">
          {{ formatRecordTime(recordDetail) }}
        </el-descriptions-item>
        <el-descriptions-item label="指令">
          {{ recordDetail.cmd || "-" }}
        </el-descriptions-item>
        <el-descriptions-item label="类型">
          {{ recordDetail.type ?? "-" }}
        </el-descriptions-item>
      </el-descriptions>
      <template #footer>
        <el-button @click="recordDetailVisible = false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.iot-records :deep(.el-card__header) {
  padding-bottom: 0.5rem;
}
</style>
