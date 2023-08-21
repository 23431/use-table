import { PageType,Config,HttpResult,ServiceResultType } from './type';
const defaultPage: PageType = {
    page: 1,
    pageSize: 20,
    total: 0,
  };

  const mergeConfig = (c?: Partial<Config>): Config => {
    if (!c) {
      return {
        isMount: false,
        fInstance: null,
        pagination: null,
      };
    }
    return {
      isMount: c?.isMount ?? false,
      fInstance: c?.fInstance ?? null,
      pagination: c.pagination ?? null,
    };
  };
  function createService<T = any>(func: (args?: any) => Promise<HttpResult<T>>) {
    const result: ServiceResultType<T> = {
      data: [],
      total: 0,
    };
    return async (args?: Record<string, any>) => {
      try {
        const data = await func(args || {});
        return {
          data: data?.list ?? [],
          total: data?.total ?? 0,
        } as ServiceResultType<T>;
      } catch (e) {
        return result;
      }
    };
  }
  export {defaultPage,createService,mergeConfig}