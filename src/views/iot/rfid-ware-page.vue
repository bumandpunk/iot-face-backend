<script setup lang="ts">
import { message } from "@/utils/message";
import { onMounted, reactive, ref } from "vue";
import { fetchRfidWarePage, type RfidWareRecord } from "@/api/iot";

defineOptions({
  name: "RfidWare"
});

const rfidWareLoading = ref(false);
const rfidWareQuery = reactive({
  rfidWareName: "",
  rfidNo: "",
  pageNum: 1,
  pageSize: 10
});
const rfidWareTotal = ref(0);
const rfidWareData = ref<RfidWareRecord[]>([]);

const loadRfidWarePage = async () => {
  rfidWareLoading.value = true;
  try {
    const res = await fetchRfidWarePage(rfidWareQuery);
    rfidWareData.value = res.data.records ?? [];
    rfidWareTotal.value = res.data.total ?? 0;
  } catch (error) {
    message("加载固资进出记录失败", { type: "error" });
  } finally {
    rfidWareLoading.value = false;
  }
};

const handleSearch = () => {
  rfidWareQuery.pageNum = 1;
  loadRfidWarePage();
};

const handleReset = () => {
  rfidWareQuery.rfidWareName = "";
  rfidWareQuery.rfidNo = "";
  rfidWareQuery.pageNum = 1;
  loadRfidWarePage();
};

onMounted(() => {
  loadRfidWarePage();
});
</script>

<template>
  <div class="iot-rfid-ware space-y-4">
    <el-card shadow="never">
      <template #header>
        <div>
          <h2 class="text-base font-semibold">固资进出记录</h2>
        </div>
      </template>

      <el-form :inline="true" class="mb-4" @submit.prevent>
        <el-form-item label="物品名称">
          <el-input
            v-model="rfidWareQuery.rfidWareName"
            placeholder="请输入物品名称"
            clearable
          />
        </el-form-item>
        <el-form-item label="RFID编号">
          <el-input
            v-model="rfidWareQuery.rfidNo"
            placeholder="请输入RFID编号"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="rfidWareData" :loading="rfidWareLoading" border stripe>
        <el-table-column type="index" label="序号" width="80" />
        <el-table-column prop="rfidWareName" label="物品名称" />
        <el-table-column prop="creatorName" label="进出人员" width="120">
          <template #default="{ row }">
            {{ row.creatorName || row.creatorId || "-" }}
          </template>
        </el-table-column>
        <el-table-column prop="rfidNo" label="RFID编号" min-width="200" />

        <el-table-column prop="areaCode" label="区域编码" width="120">
          <template #default="{ row }">
            {{ row.areaCode || "-" }}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="ip" label="IP地址" width="140" /> -->
        <el-table-column prop="faceDeviceSn" label="门禁设备SN" min-width="150">
          <template #default="{ row }">
            {{ row.faceDeviceSn || "-" }}
          </template>
        </el-table-column>
        <el-table-column prop="operateTypeDesc" label="类型" width="100">
          <template #default="{ row }">
            <el-tag
              v-if="row.operateTypeDesc"
              :type="row.operateType === 1 ? 'success' : 'warning'"
            >
              {{ row.operateTypeDesc }}
            </el-tag>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="时间" width="180">
          <template #default="{ row }">
            {{ row.createTime || "-" }}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="msg" label="消息" min-width="200" show-overflow-tooltip /> -->
      </el-table>

      <div class="flex justify-end mt-4">
        <el-pagination
          v-model:current-page="rfidWareQuery.pageNum"
          v-model:page-size="rfidWareQuery.pageSize"
          :total="rfidWareTotal"
          layout="total, sizes, prev, pager, next"
          @size-change="loadRfidWarePage"
          @current-change="loadRfidWarePage"
        />
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.iot-rfid-ware :deep(.el-card__header) {
  padding-bottom: 0.5rem;
}
</style>
