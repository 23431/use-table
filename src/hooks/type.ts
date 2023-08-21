import { FormInstance } from 'antd';
type ServiceResultType<T = any> = {
    data: T[];
    total: number;
  };
  
  type PageType = {
    page: number;
    pageSize: number;
    total: number;
  };
  
  type Config = {
    isMount: boolean;
    fInstance: FormInstance | null;
    pagination: Partial<PageType> | null;
  };
  type HttpResult<T = any> = {
    list: T[];
    total: number;
  };

  export {ServiceResultType,Config,HttpResult,PageType}