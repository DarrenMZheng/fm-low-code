import { baseUrl, request } from './request';
export interface SectionType {
    id?: number;
    sectionName: string;
    sectionSchema: string;
    sectionImg: string;
    sectionOrder?: number;
    sectionCategoryId?: number;
    sectionVersion?: string;
  }
  export const getSectionList = async (sectionCategoryId: string) => {
    const url = `${baseUrl}/lowcode/sectionByCategory/${sectionCategoryId}`;
    const res = await request(url);
    console.log('res: ', res);
    if (!res) {
      console.error('list tmp failed: ', res);
      return;
    }
    return res;
  };
  export const createSection = async (section: SectionType) => {
    const url = `${baseUrl}/lowcode/section`;
    const result = await (
      await request(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: JSON.stringify(section),
      })
    );
    console.log('result', result);
  
    if (!result?.success) {
      console.error('create section failed: ', result);
      return;
    }
  
    return result;
  };
  export const deleteSection = async (id: number) => {
    if (!id) {
      console.error('id is undefined!');
      return
    }
    const url = `${baseUrl}/lowcode/section/${id}`;
    const result = await (
      await request(url, {
        method: 'delete'
      })
    );
  
    console.log('result', result);
  
    if (!result?.success) {
      console.error('create section failed: ', result);
      return;
    }
  
    return result;
  };