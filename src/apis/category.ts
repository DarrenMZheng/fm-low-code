import { baseUrl, request } from './request';
export enum CategoryTypeEnum {
    SECTION = 'section',
    TMP = 'tmp'
  }
  
  export interface CategoryType {
    id: string;
    categoryName: string;
    categoryType: 'section' | 'tmp';
  }
  export const getCategoryList = async (type: CategoryType['categoryType']) => {
    const url = `${baseUrl}/lowcode/categoryByType/${type}`;
    //const res = await request(url);
    const res =[
      {
        categoryCode:'33333333333333333333333',
        categoryName:'1.5承诺报告',
        categoryType:'tmp',
        id:7
      },
      {
        categoryCode:'55555555555555555555',
        categoryName:'1.6承诺报告',
        categoryType:'tmp',
        id:8
      }
    ]
    console.log('res: ', res);
    if (!res) {
      console.error('list category failed: ', res);
      return;
    }
    return res;
  }
  
  export const createCategory = async (category: CategoryType) => {
    const url = `${baseUrl}/lowcode/category`;
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