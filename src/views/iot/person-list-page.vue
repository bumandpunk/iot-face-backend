<script setup lang="ts">
import { message } from "@/utils/message";
import { onMounted, reactive, ref } from "vue";
import { fetchPersonPage, type PersonPayload } from "@/api/iot";

defineOptions({
  name: "IotPersonListPage"
});

const personLoading = ref(false);
const personQuery = reactive({
  name: "",
  pageNum: 1,
  pageSize: 10
});
const personTotal = ref(0);
const personData = ref<PersonPayload[]>([]);

const loadPersonPage = async () => {
  personLoading.value = true;
  try {
    const res = await fetchPersonPage(personQuery);
    personData.value = res.data.records ?? [];
    personTotal.value = res.data.total ?? 0;
  } catch (error) {
    message("加载人员列表失败", { type: "error" });
  } finally {
    personLoading.value = false;
  }
};

const handlePersonSearch = () => {
  personQuery.pageNum = 1;
  loadPersonPage();
};

onMounted(() => {
  loadPersonPage();
});
</script>

<template>
  <div class="iot-person-list space-y-4">
    <el-card shadow="never">
      <template #header>
        <div>
          <h2 class="text-base font-semibold">人员分页查询</h2>
          <p class="text-sm text-gray-500">
            调用 /personne/page 获取人员分页列表
          </p>
        </div>
      </template>

      <div class="flex flex-wrap gap-2 items-center mb-4">
        <el-input
          v-model="personQuery.name"
          class="w-60"
          placeholder="请输入姓名"
          clearable
        />
        <el-button type="primary" @click="handlePersonSearch">查询</el-button>
      </div>

      <el-table :data="personData" :loading="personLoading" border stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="姓名" min-width="140" />
        <el-table-column prop="number" label="工号" min-width="120" />
        <el-table-column prop="snNumber" label="SN编号" min-width="160" />
        <el-table-column prop="status" label="状态" width="120" />
      </el-table>

      <div class="flex justify-end mt-4">
        <el-pagination
          v-model:current-page="personQuery.pageNum"
          v-model:page-size="personQuery.pageSize"
          :total="personTotal"
          layout="total, sizes, prev, pager, next"
          @size-change="loadPersonPage"
          @current-change="loadPersonPage"
        />
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.iot-person-list :deep(.el-card__header) {
  padding-bottom: 0.5rem;
}
</style>
