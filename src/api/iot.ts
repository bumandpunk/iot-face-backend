import { http } from "@/utils/http";
import axios from "axios";

const API_BASE = import.meta.env.VITE_IOT_API_BASE || "";

export type ApiResponse<T> = {
  code: number;
  msg: string | null;
  data: T;
};

export type UploadResponse = {
  bucketName: string;
  fileName: string;
  url: string;
};

export type PageResult<T> = {
  records: T[];
  total: number;
  size: number;
  current: number;
  pages: number;
};

export type RecordQuery = {
  sn: string;
  name: string;
  pageNum: number;
  pageSize: number;
  personType: number;
};

export type BaseRecord = {
  id: number;
  cmd?: string;
  devName?: string;
  sn?: string;
  jobnumber?: string;
  name?: string;
  time?: number;
  type?: number;
  createTime?: number | null;
  personType?: number | null;
  typeDesc?: string | null;
  personTypeDesc?: string | null;
  timeStr?: string | null;
};

export type BaseRecordDetail = BaseRecord & {
  image?: string | null;
  updateTime?: number | null;
};

export type PersonQuery = {
  name: string;
  pageNum: number;
  pageSize: number;
};

export type PersonPayload = {
  id?: number;
  createTime?: number | null;
  updateTime?: number | null;
  creatorId?: number | null;
  updaterId?: number | null;
  creatorName?: string | null;
  updaterName?: string | null;
  delFlag?: string;
  outId?: string | null;
  outType?: string | null;
  outName?: string | null;
  status?: string | null;
  acquirerId?: string | null;
  acquirerName?: string | null;
  tenantId?: string | null;
  name: string;
  number?: string | null;
  snNumber?: string | null;
  nameType?: string | null;
  image?: string | null;
};

export const fetchRecordPage = (query: RecordQuery) =>
  http.request<ApiResponse<PageResult<BaseRecord>>>(
    "post",
    `${API_BASE}/api/base-record/page`,
    {
      data: {
        sn: query.sn,
        name: query.name,
        personType: query.personType,
        pageNum: String(query.pageNum),
        pageSize: String(query.pageSize)
      }
    }
  );

export const fetchRecordDetail = (id: number) =>
  http.request<ApiResponse<BaseRecordDetail>>(
    "get",
    `${API_BASE}/api/base-record/${id}`
  );

export const fetchPersonPage = (query: PersonQuery) =>
  http.request<ApiResponse<PageResult<PersonPayload>>>(
    "post",
    `${API_BASE}/api/personne/page`,
    {
      data: {
        name: query.name,
        pageNum: String(query.pageNum),
        pageSize: String(query.pageSize)
      }
    }
  );

export const addPerson = (payload: PersonPayload) =>
  http.request<ApiResponse<PageResult<PersonPayload>>>(
    "post",
    `${API_BASE}/api/personne/add`,
    {
      data: payload
    }
  );

export const updatePerson = (payload: PersonPayload) =>
  http.request<ApiResponse<PageResult<PersonPayload>>>(
    "put",
    `${API_BASE}/api/personne/update`,
    {
      data: payload
    }
  );

/** 上传图片 */
export const uploadImage = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post<ApiResponse<UploadResponse>>(
    "/api/images/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );

  if (response.data.code !== 0) {
    console.log(response);
    throw new Error(response.data.msg || "上传失败");
  }

  return response.data.data;
};

export type OpenDoorRequest = {
  cmd: string;
  token: string;
  sn: string;
};

export type OpenDoorResponse = {
  code: number;
  msg: string;
  data?: any;
};

export const openDoor = (payload: OpenDoorRequest) =>
  http.request<ApiResponse<PageResult<OpenDoorRequest>>>(
    "post",
    `${API_BASE}/api/opera/sendOperate/accessContro`,
    {
      data: payload
    }
  );
// export const openDoor = async (payload: OpenDoorRequest): Promise<OpenDoorResponse> => {
//   const response = await axios.post<OpenDoorResponse>(
//     "/opera/sendOperate/accessControl",
//     payload
//   );

//   return response.data;
// };
