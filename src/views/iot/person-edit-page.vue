<script setup lang="ts">
import { message } from "@/utils/message";
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { updatePerson, type PersonPayload } from "@/api/iot";

defineOptions({
  name: "IotPersonEditPage"
});

type PersonFormState = {
  id: string;
  name: string;
  number: string;
  snNumber: string;
  image: string;
  status: string;
  delFlag: string;
};

const formRef = ref<FormInstance>();
const loading = ref(false);
const formState = reactive<PersonFormState>({
  id: "",
  name: "",
  number: "",
  snNumber: "",
  image: "",
  status: "",
  delFlag: "0"
});

const rules: FormRules<PersonFormState> = {
  id: [{ required: true, message: "请输入人员ID", trigger: "blur" }],
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
};

const buildPayload = (): PersonPayload => ({
  id: Number(formState.id),
  name: formState.name,
  number: formState.number || null,
  snNumber: formState.snNumber || null,
  image: formState.image || null,
  status: formState.status || null,
  delFlag: formState.delFlag || "0"
});

const submit = async () => {
  if (!formRef.value) return;
  await formRef.value.validate(async valid => {
    if (!valid) return;
    loading.value = true;
    try {
      await updatePerson(buildPayload());
      message("人员修改成功", { type: "success" });
    } catch (error) {
      message("人员修改失败", { type: "error" });
    } finally {
      loading.value = false;
    }
  });
};
</script>

<template>
  <div class="iot-person-edit space-y-4">
    <el-card shadow="never">
      <template #header>
        <div>
          <h2 class="text-base font-semibold">人员修改</h2>
          <p class="text-sm text-gray-500">
            调用 /personne/update 修改人员信息
          </p>
        </div>
      </template>

      <el-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="人员ID" prop="id">
          <el-input v-model="formState.id" placeholder="请输入人员ID" />
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
        <el-form-item label="删除标记">
          <el-select v-model="formState.delFlag" placeholder="请选择">
            <el-option label="未删除" value="0" />
            <el-option label="删除" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="submit">
            提交修改
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.iot-person-edit :deep(.el-card__header) {
  padding-bottom: 0.5rem;
}
</style>
