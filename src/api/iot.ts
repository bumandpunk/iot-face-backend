import { http } from "@/utils/http";

const API_BASE = import.meta.env.VITE_IOT_API_BASE || "http://10.10.50.2:6160";

export type ApiResponse<T> = {
  code: number;
  msg: string | null;
  data: T;
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
    `${API_BASE}/personne/page`,
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
    `${API_BASE}/personne/add`,
    {
      data: payload
    }
  );

export const updatePerson = (payload: PersonPayload) =>
  http.request<ApiResponse<PageResult<PersonPayload>>>(
    "put",
    `${API_BASE}/personne/update`,
    {
      data: payload
    }
  );
