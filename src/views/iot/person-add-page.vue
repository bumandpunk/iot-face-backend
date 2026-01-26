<script setup lang="ts">
import { message } from "@/utils/message";
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { addPerson, type PersonPayload } from "@/api/iot";

defineOptions({
  name: "IotPersonAddPage"
});

type PersonFormState = {
  name: string;
  number: string;
  snNumber: string;
  image: string;
  status: string;
};

const formRef = ref<FormInstance>();
const loading = ref(false);
const formState = reactive<PersonFormState>({
  name: "",
  number: "",
  snNumber: "",
  image: "",
  status: ""
});

const rules: FormRules<PersonFormState> = {
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
};

const buildPayload = (): PersonPayload => ({
  name: formState.name,
  number: formState.number || null,
  snNumber: formState.snNumber || null,
  image: formState.image || null,
  status: formState.status || null,
  delFlag: "0"
});

const resetForm = () => {
  formState.name = "";
  formState.number = "";
  formState.snNumber = "";
  formState.image = "";
  formState.status = "";
};

const submit = async () => {
  if (!formRef.value) return;
  await formRef.value.validate(async valid => {
    if (!valid) return;
    loading.value = true;
    try {
      await addPerson(buildPayload());
      message("人员新增成功", { type: "success" });
      resetForm();
    } catch (error) {
      message("人员新增失败", { type: "error" });
    } finally {
      loading.value = false;
    }
  });
};
</script>

<template>
  <div class="iot-person-add space-y-4">
    <el-card shadow="never">
      <template #header>
        <div>
          <h2 class="text-base font-semibold">人员新增</h2>
          <p class="text-sm text-gray-500">调用 /personne/add 新增人员</p>
        </div>
      </template>

      <el-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        label-width="100px"
      >
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
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="submit">
            提交新增
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.iot-person-add :deep(.el-card__header) {
  padding-bottom: 0.5rem;
}
</style>
