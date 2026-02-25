<script setup lang="ts">
import { message } from "@/utils/message";
import { onMounted, reactive, ref } from "vue";
import type { FormInstance, FormRules, UploadProps } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import {
  addPerson,
  fetchPersonPage,
  updatePerson,
  uploadImage,
  type PersonPayload
} from "@/api/iot";

defineOptions({
  name: "People"
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
  status: "",
  mobile: "",
  nameType: ""
});
const uploadLoading = ref(false);
const imageUrl = ref("");

const rules: FormRules = {
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
  image: [{ required: true, message: "请上传头像", trigger: "change" }]
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
  formState.mobile = "";
  formState.nameType = "";
  imageUrl.value = "";
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
  formState.mobile = person.mobile || "";
  formState.nameType = person.nameType || "";
  // 如果已有图片，直接使用完整 URL 显示
  if (person.image) {
    imageUrl.value = person.image;
  } else {
    imageUrl.value = "";
  }
  dialogVisible.value = true;
};

const handleUploadChange: UploadProps["onChange"] = async uploadFile => {
  if (!uploadFile.raw) return;

  const file = uploadFile.raw;
  const isImage = file.type.startsWith("image/");
  const isLt5M = file.size / 1024 / 1024 < 5;

  if (!isImage) {
    message("只能上传图片文件", { type: "error" });
    return;
  }
  if (!isLt5M) {
    message("图片大小不能超过 5MB", { type: "error" });
    return;
  }

  // 本地预览：先用 ObjectURL 显示图片
  const localUrl = URL.createObjectURL(file);
  imageUrl.value = localUrl;

  uploadLoading.value = true;
  try {
    const result = await uploadImage(file);
    // 接口返回字段为 imageUrl，兜底取 url
    const uploadedUrl = result.imageUrl || result.url || "";
    formState.image = uploadedUrl;
    imageUrl.value = uploadedUrl;
    URL.revokeObjectURL(localUrl);
    // 上传成功后清除 image 字段的校验错误
    formRef.value?.clearValidate("image");
    message("上传成功", { type: "success" });
  } catch (error: any) {
    imageUrl.value = "";
    message(error.message || "上传失败", { type: "error" });
    console.error(error);
  } finally {
    uploadLoading.value = false;
  }
};

const submit = async () => {
  if (!formRef.value) return;
  await formRef.value.validate(async valid => {
    if (!valid) return;

    // 直接使用上传接口返回的完整 URL
    let fullImageUrl = formState.image || null;

    const payload: PersonPayload = {
      id: formState.id ? Number(formState.id) : undefined,
      name: formState.name,
      number: formState.number || null,
      snNumber: formState.snNumber || null,
      image: fullImageUrl,
      status: formState.status || null,
      nameType: formState.nameType || null,
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
          <h2 class="text-base font-semibold">人员列表</h2>
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
        <el-table-column label="头像" width="80">
          <template #default="{ row }">
            <el-image
              v-if="row.image"
              :src="row.image"
              fit="cover"
              class="table-avatar"
              :preview-src-list="[row.image]"
              :z-index="100000"
              preview-teleported
              hide-on-click-modal
            />
            <span v-else class="text-gray-400">-</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" min-width="120" />
        <el-table-column prop="number" label="工号" min-width="120" />
        <el-table-column prop="mobile" label="手机号" min-width="160" />
        <el-table-column prop="nameType" label="人员类型" width="120" />
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
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="formState.mobile" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="头像" prop="image" required>
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            :on-change="handleUploadChange"
            :auto-upload="false"
            accept="image/*"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon" :size="50">
              <Plus />
            </el-icon>
          </el-upload>
          <div class="text-xs text-gray-500 mt-1">
            支持 jpg、png 格式，大小不超过 5MB
          </div>
        </el-form-item>
        <el-form-item label="工号">
          <el-input v-model="formState.number" placeholder="请输入工号" />
        </el-form-item>
        <el-form-item label="人员类型">
          <el-input v-model="formState.nameType" placeholder="请输入人员类型" />
        </el-form-item>
        <!-- <el-form-item label="SN编号">
          <el-input v-model="formState.snNumber" placeholder="请输入SN编号" />
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="formState.status" placeholder="请输入状态" />
        </el-form-item> -->
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

.table-avatar {
  width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 4px;
}

.avatar-uploader {
  display: inline-block;
}

.avatar-uploader :deep(.el-upload) {
  position: relative;
  display: block;
  width: 148px;
  height: 148px;
  overflow: hidden;
  cursor: pointer;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader :deep(.el-upload:hover) {
  border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 148px;
  height: 148px;
  font-size: 28px;
  color: #8c939d;
}

.avatar {
  display: block;
  width: 148px;
  height: 148px;
  object-fit: cover;
}
</style>

<style>
/* 全局样式：修复图片预览层级问题 - 确保高于所有组件（右侧面板是40000） */
.el-image-viewer__wrapper {
  z-index: 100000 !important;
}

.el-image-viewer__mask {
  z-index: 99999 !important;
}

.el-overlay {
  z-index: 99998 !important;
}

/* 确保图片预览器的关闭按钮可点击 */
.el-image-viewer__close {
  z-index: 100001 !important;
}

.el-image-viewer__actions {
  z-index: 100001 !important;
}
</style>
