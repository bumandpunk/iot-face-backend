<template>
  <div class="remote-door-page">
    <el-card class="door-card">
      <template #header>
        <div class="card-header">
          <span>远程开门控制</span>
        </div>
      </template>

      <div class="door-controls">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card class="device-card">
              <template #header>
                <span>门内设备</span>
              </template>
              <div class="device-info">
                <p><strong>设备号：</strong>{{ indoorDevice.sn }}</p>
                <el-button
                  type="primary"
                  size="large"
                  :loading="indoorLoading"
                  :disabled="indoorLoading"
                  @click="handleOpenDoor('indoor')"
                >
                  <el-icon><Unlock /></el-icon>
                  开门
                </el-button>
              </div>
            </el-card>
          </el-col>

          <el-col :span="12">
            <el-card class="device-card">
              <template #header>
                <span>门外设备</span>
              </template>
              <div class="device-info">
                <p><strong>设备号：</strong>{{ outdoorDevice.sn }}</p>
                <el-button
                  type="success"
                  size="large"
                  :loading="outdoorLoading"
                  :disabled="outdoorLoading"
                  @click="handleOpenDoor('outdoor')"
                >
                  <el-icon><Unlock /></el-icon>
                  开门
                </el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <el-card class="records-card">
      <template #header>
        <div class="card-header">
          <span>开门记录</span>
          <el-button :icon="Refresh" @click="loadRecords">刷新</el-button>
        </div>
      </template>

      <el-table v-loading="recordsLoading" :data="records">
        <el-table-column prop="devName" label="设备名称" width="120" />
        <el-table-column prop="sn" label="设备号" width="150" />
        <el-table-column prop="name" label="操作人" width="120" />
        <el-table-column prop="typeDesc" label="类型" width="100" />
        <el-table-column prop="personTypeDesc" label="人员类型" width="100" />
        <el-table-column prop="timeStr" label="操作时间" width="180" />
        <el-table-column label="详情">
          <template #default="{ row }">
            <el-button size="small" @click="viewDetail(row)"
              >查看详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="loadRecords"
          @current-change="loadRecords"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Unlock, Refresh } from "@element-plus/icons-vue";
import {
  openDoor,
  fetchRecordPage,
  fetchRecordDetail,
  type OpenDoorRequest,
  type RecordQuery
} from "@/api/iot";

const indoorDevice = {
  name: "门内设备",
  sn: "c5ce000020225c28"
};

const outdoorDevice = {
  name: "门外设备",
  sn: "c5ce0000203aa438"
};

const indoorLoading = ref(false);
const outdoorLoading = ref(false);
const recordsLoading = ref(false);
const records = ref<any[]>([]);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);

const handleOpenDoor = async (deviceType: "indoor" | "outdoor") => {
  const device = deviceType === "indoor" ? indoorDevice : outdoorDevice;
  const loadingRef = deviceType === "indoor" ? indoorLoading : outdoorLoading;

  try {
    await ElMessageBox.confirm(`确定要开启${device.name}吗？`, "确认开门", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    });

    loadingRef.value = true;

    const payload: OpenDoorRequest = {
      cmd: "F1openDoor",
      token: "xxx", // 这里需要根据实际情况获取token
      sn: device.sn
    };

    const result = await openDoor(payload);

    if (result.code === 0 || result.code === 200) {
      ElMessage.success(`${device.name}开门成功`);

      // 重新加载记录列表
      await loadRecords();
    } else {
      ElMessage.error(result.msg || `${device.name}开门失败`);
    }
  } catch (error: any) {
    if (error !== "cancel") {
      ElMessage.error("操作失败：" + (error.message || "未知错误"));
    }
  } finally {
    loadingRef.value = false;
  }
};

const loadRecords = async () => {
  recordsLoading.value = true;
  try {
    const query: RecordQuery = {
      sn: "", // 查询所有设备
      name: "",
      personType: 1,
      pageNum: currentPage.value,
      pageSize: pageSize.value
    };

    const response = await fetchRecordPage(query);

    if (response.code === 0 || response.code === 200) {
      // 处理数据，添加格式化的时间和类型描述
      records.value = response.data.records.map(record => ({
        ...record,
        timeStr: record.time
          ? new Date(record.time * 1000).toLocaleString("zh-CN")
          : "",
        typeDesc: record.type === 1 ? "进门" : "出门",
        personTypeDesc: "管理员"
      }));
      total.value = response.data.total;
    } else {
      ElMessage.error(response.msg || "加载记录失败");
    }
  } catch (error) {
    ElMessage.error("加载记录失败");
    console.error(error);
  } finally {
    recordsLoading.value = false;
  }
};

const formatTime = (timestamp: number) => {
  return new Date(timestamp).toLocaleString("zh-CN");
};

const viewDetail = async (row: any) => {
  try {
    const response = await fetchRecordDetail(row.id);
    if (response.code === 0 || response.code === 200) {
      const detail = response.data;
      ElMessageBox.alert(
        `
        <div>
          <p><strong>设备名称：</strong>${detail.devName || "-"}</p>
          <p><strong>设备号：</strong>${detail.sn || "-"}</p>
          <p><strong>操作人：</strong>${detail.name || "-"}</p>
          <p><strong>工号：</strong>${detail.jobnumber || "-"}</p>
          <p><strong>类型：</strong>${detail.typeDesc || "-"}</p>
          <p><strong>人员类型：</strong>${detail.personTypeDesc || "-"}</p>
          <p><strong>操作时间：</strong>${detail.timeStr || "-"}</p>
          <p><strong>指令：</strong>${detail.cmd || "-"}</p>
        </div>
      `,
        "记录详情",
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "确定"
        }
      );
    } else {
      ElMessage.error(response.msg || "获取详情失败");
    }
  } catch (error) {
    ElMessage.error("获取详情失败");
    console.error(error);
  }
};

onMounted(() => {
  loadRecords();
});
</script>

<style scoped>
.remote-door-page {
  padding: 20px;
}

.door-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  font-weight: bold;
}

.door-controls {
  margin-top: 20px;
}

.device-card {
  height: 200px;
}

.device-info {
  padding: 20px;
  text-align: center;
}

.device-info p {
  margin-bottom: 20px;
  font-size: 14px;
  color: #666;
}

.device-info .el-button {
  width: 120px;
  height: 50px;
  font-size: 16px;
}

.records-card {
  min-height: 400px;
}

.el-icon {
  margin-right: 8px;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
