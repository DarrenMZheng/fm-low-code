import { baseUrl, request } from './request';
export enum CategoryTypeEnum {
    SECTION = 'section',
    TMP = 'tmp'
  }
  
  export interface SchemaType {
    id: string;
    schemaType: string;
    typeCode: string;
    type: 'section' | 'tmp';
  }
  export const getCategoryList = async (type: SchemaType['type']) => {
    const url = `http://127.0.0.1:7001/api/v1/schema/querySchemaType?type=${type}`;
    const res = await request(url);
    console.log('res: ', res);
    if (!res) {
      console.error('list category failed: ', res);
      return;
    }
    return res;
  }
  
  export const createCategory = async (category: SchemaType) => {
    const url = 'http://127.0.0.1:7001/api/v1/schema/addSchemaType';
    const res = await (await fetch(url, {
      method: 'post',
      headers: {
       'Content-Type': 'application/json'
       // 'Content-Type': 'application/x-www-form-urlencoded',
     },
      body: JSON.stringify(category)
  })).json()
    console.log('res: ', res);
    if (!res.success) {
      console.error('create category failed: ', res);
      return;
    }
    return res.data;
  }