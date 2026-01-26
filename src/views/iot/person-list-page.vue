<script setup lang="ts">
import { message } from "@/utils/message";
import { onMounted, reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import {
  addPerson,
  fetchPersonPage,
  updatePerson,
  type PersonPayload
} from "@/api/iot";

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
const dialogVisible = ref(false);
const dialogMode = ref<"add" | "edit">("add");
const formRef = ref<FormInstance>();
const formState = reactive({
  id: "",
  name: "",
  number: "",
  snNumber: "",
  image: "",
  status: ""
});

const rules: FormRules = {
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
};

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

const openAdd = () => {
  dialogMode.value = "add";
  formState.id = "";
  formState.name = "";
  formState.number = "";
  formState.snNumber = "";
  formState.image = "";
  formState.status = "";
  dialogVisible.value = true;
};

const openEdit = (person: PersonPayload) => {
  dialogMode.value = "edit";
  formState.id = person.id ? String(person.id) : "";
  formState.name = person.name || "";
  formState.number = person.number || "";
  formState.snNumber = person.snNumber || "";
  formState.image = person.image || "";
  formState.status = person.status || "";
  dialogVisible.value = true;
};

const submit = async () => {
  if (!formRef.value) return;
  await formRef.value.validate(async valid => {
    if (!valid) return;
    const payload: PersonPayload = {
      id: formState.id ? Number(formState.id) : undefined,
      name: formState.name,
      number: formState.number || null,
      snNumber: formState.snNumber || null,
      image: formState.image || null,
      status: formState.status || null,
      delFlag: "0"
    };
    try {
      if (dialogMode.value === "add") {
        await addPerson(payload);
        message("人员新增成功", { type: "success" });
      } else {
        await updatePerson(payload);
        message("人员修改成功", { type: "success" });
      }
      dialogVisible.value = false;
      loadPersonPage();
    } catch (error) {
      message("提交失败", { type: "error" });
    }
  });
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
        <el-button type="success" @click="openAdd">新增人员</el-button>
      </div>

      <el-table :data="personData" :loading="personLoading" border stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="姓名" min-width="140" />
        <el-table-column prop="number" label="工号" min-width="120" />
        <el-table-column prop="snNumber" label="SN编号" min-width="160" />
        <el-table-column prop="status" label="状态" width="120" />
        <el-table-column label="操作" width="120">
          <template #default="{ row }">
            <el-button type="primary" link @click="openEdit(row)">
              修改
            </el-button>
          </template>
        </el-table-column>
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

    <el-dialog
      v-model="dialogVisible"
      :title="dialogMode === 'add' ? '人员新增' : '人员修改'"
      width="520px"
    >
      <el-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item v-if="dialogMode === 'edit'" label="人员ID">
          <el-input v-model="formState.id" disabled />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="formState.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="工号">
          <el-input v-model="formState.number" placeholder="请输入工号" />
        </el-form-item>
        <el-form-item label="SN编号">
          <el-input v-model="formState.snNumber" placeholder="请输入SN编号" />
        </el-form-item>
        <el-form-item label="头像">
          <el-input v-model="formState.image" placeholder="请输入头像地址" />
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="formState.status" placeholder="请输入状态" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.iot-person-list :deep(.el-card__header) {
  padding-bottom: 0.5rem;
}
</style>
