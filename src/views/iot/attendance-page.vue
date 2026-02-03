<script setup lang="ts">
import dayjs from "dayjs";
import { message } from "@/utils/message";
import { onMounted, reactive, ref } from "vue";
import {
  fetchAttendancePage,
  exportAttendance,
  type AttendanceRecord
} from "@/api/iot";

defineOptions({
  name: "Attendance"
});

const attendanceLoading = ref(false);
const exportLoading = ref(false);
const dateRange = ref<[string, string]>([
  dayjs().format("YYYY-MM-DD"),
  dayjs().format("YYYY-MM-DD")
]);
const attendanceQuery = reactive({
  name: "",
  cardNumber: "",
  clockStatus: "",
  pageNum: 1,
  pageSize: 10,
  startDate: dayjs().format("YYYY-MM-DD"),
  endDate: dayjs().format("YYYY-MM-DD")
});
const attendanceTotal = ref(0);
const attendanceData = ref<AttendanceRecord[]>([]);

const loadAttendancePage = async () => {
  attendanceLoading.value = true;
  try {
    // 更新查询参数
    if (dateRange.value && dateRange.value.length === 2) {
      attendanceQuery.startDate = dateRange.value[0];
      attendanceQuery.endDate = dateRange.value[1];
    }
    const res = await fetchAttendancePage(attendanceQuery);
    attendanceData.value = res.data.records ?? [];
    attendanceTotal.value = res.data.total ?? 0;
  } catch (error) {
    message("加载考勤统计失败", { type: "error" });
  } finally {
    attendanceLoading.value = false;
  }
};

const handleAttendanceSearch = () => {
  attendanceQuery.pageNum = 1;
  loadAttendancePage();
};

const handleReset = () => {
  attendanceQuery.name = "";
  attendanceQuery.cardNumber = "";
  attendanceQuery.clockStatus = "";
  const now = dayjs().format("YYYY-MM-DD");
  dateRange.value = [now, now];
  attendanceQuery.startDate = now;
  attendanceQuery.endDate = now;
  attendanceQuery.pageNum = 1;
  loadAttendancePage();
};

const handleExport = async () => {
  exportLoading.value = true;
  try {
    await exportAttendance({
      name: attendanceQuery.name,
      cardNumber: attendanceQuery.cardNumber,
      clockStatus: attendanceQuery.clockStatus,
      startDate: attendanceQuery.startDate,
      endDate: attendanceQuery.endDate
    });
    message("导出成功", { type: "success" });
  } catch (error) {
    message("导出失败", { type: "error" });
  } finally {
    exportLoading.value = false;
  }
};

onMounted(() => {
  loadAttendancePage();
});
</script>

<template>
  <div class="iot-attendance space-y-4">
    <el-card shadow="never">
      <template #header>
        <div>
          <h2 class="text-base font-semibold">考勤统计</h2>
        </div>
      </template>

      <el-form :inline="true" class="mb-4" @submit.prevent>
        <el-form-item label="姓名">
          <el-input
            v-model="attendanceQuery.name"
            placeholder="请输入姓名"
            clearable
          />
        </el-form-item>
        <el-form-item label="卡号">
          <el-input
            v-model="attendanceQuery.cardNumber"
            placeholder="请输入卡号"
            clearable
          />
        </el-form-item>
        <!-- <el-form-item label="考勤状态">
          <el-select
            v-model="attendanceQuery.clockStatus"
            placeholder="请选择考勤状态"
            clearable
          >
            <el-option label="上班" value="上班" />
            <el-option label="下班" value="下班" />
          </el-select>
        </el-form-item> -->
        <el-form-item label="时间范围">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAttendanceSearch">
            查询
          </el-button>
          <el-button @click="handleReset">重置</el-button>
          <el-button
            type="success"
            :loading="exportLoading"
            @click="handleExport"
          >
            导出
          </el-button>
        </el-form-item>
      </el-form>

      <el-table
        :data="attendanceData"
        :loading="attendanceLoading"
        border
        stripe
      >
        <!-- <el-table-column prop="id" label="ID" width="80" /> -->
        <el-table-column type="index" label="序号" width="80" />
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="cardNumber" label="卡号" width="120" />
        <!-- <el-table-column prop="department" label="部门" min-width="120">
          <template #default="{ row }">
            {{ row.department || "-" }}
          </template>
        </el-table-column>
        <el-table-column prop="position" label="职位" min-width="120">
          <template #default="{ row }">
            {{ row.position || "-" }}
          </template>
        </el-table-column> -->
        <el-table-column prop="date" label="日期" width="120" />
        <el-table-column prop="clockIn" label="上班时间" width="100">
          <template #default="{ row }">
            {{ row.clockIn || "-" }}
          </template>
        </el-table-column>
        <el-table-column prop="clockOut" label="下班时间" width="100">
          <template #default="{ row }">
            {{ row.clockOut || "-" }}
          </template>
        </el-table-column>
        <el-table-column prop="clockAddress" label="打卡地点" min-width="140" />
        <el-table-column prop="clockStatus" label="考勤状态" width="100">
          <template #default="{ row }">
            <el-tag
              :type="
                row.clockStatus === '上班'
                  ? 'success'
                  : row.clockStatus === '下班'
                    ? 'info'
                    : 'warning'
              "
            >
              {{ row.clockStatus }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="deviceNumber" label="设备号" width="100" />
        <el-table-column prop="reason" label="备注" min-width="120">
          <template #default="{ row }">
            {{ row.reason || "-" }}
          </template>
        </el-table-column>
      </el-table>

      <div class="flex justify-end mt-4">
        <el-pagination
          v-model:current-page="attendanceQuery.pageNum"
          v-model:page-size="attendanceQuery.pageSize"
          :total="attendanceTotal"
          layout="total, sizes, prev, pager, next"
          @size-change="loadAttendancePage"
          @current-change="loadAttendancePage"
        />
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.iot-attendance :deep(.el-card__header) {
  padding-bottom: 0.5rem;
}
</style>
