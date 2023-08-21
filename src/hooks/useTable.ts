import { useEffect, useMemo, useRef, useState } from 'react';
import { PaginationProps } from 'antd/es/pagination/Pagination';
import {Config,ServiceResultType,HttpResult,PageType} from './type';
import {mergeConfig,defaultPage,createService} from './utils'





export default function useTable<T = any>(httpRequest: (args?: any) => Promise<HttpResult<T>>, config?: Partial<Config>) {
  debugger;
  const { isMount, fInstance, pagination } = mergeConfig(config);
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const cacheSearchParams = useRef<{ [key: string]: any }>({});
  const [page, setPage] = useState<PageType>({ ...defaultPage, ...pagination });
  const query = async (params?: any) => {
    try {
      setLoading(true);
      const service = createService<T>(httpRequest);
      const res = await service(params || {});
      setData(res.data);
      setPage((p) => ({ ...p, total: res.total }));
      setLoading(false);
    } catch (e) {
      setData([]);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (isMount) {
      query(page);
    }
  }, []);
  const onChange = async (page: number, pageSize: number) => {
    setPage((p) => ({ ...p, page, pageSize }));
    await query({ page, pageSize, ...cacheSearchParams.current });
  };
  const onShowSizeChange = async (current: number, size: number) => {
    setPage((p) => ({ ...p, page: 1, pageSize: size }));
    await query({ page: 1, pageSize: size, ...cacheSearchParams.current });
  };
  const paginationMemo: PaginationProps = useMemo(
    () => ({
      current: page.page,
      defaultPageSize: defaultPage.pageSize,
      total: page.total,
      showTotal: () => `共${page.total}条`,
      pageSizeOptions: [10, 20, 50, 100],
      showQuickJumper: true,
      showSizeChanger: true,
      onChange,
      onShowSizeChange,
    }),
    [page],
  );
  const submit = async (params?: any) => {
    cacheSearchParams.current = fInstance?.getFieldsValue ? fInstance.getFieldsValue() : params || {};
    setPage((p) => ({ ...p, page: 1 }));
    await query({ ...cacheSearchParams.current, page: 1, pageSize: page.pageSize });
  };
  const keepSearchParamsSubmit = async () => {
    await query({ ...cacheSearchParams.current, page: paginationMemo.current, pageSize: page.pageSize });
  };
  const reset = async () => {
    cacheSearchParams.current = {};
    setPage((p) => ({
      ...p,
      page: 1,
    }));
    if (fInstance) {
      fInstance.resetFields();
    }
    await query({ ...defaultPage });
  };

  return {
    data,
    loading,
    pagination: paginationMemo,
    submit,
    keepSearchParamsSubmit,
    reset,
    onChange,
    onShowSizeChange,
  };
}
