import { baseUrl, request } from './request';
export interface TemplateType {
    id?: number;
    tmpName: string;
    tmpSchema: string;
    tmpOrder?: number;
    tmpCategoryId?: number;
    tmpVersion?: number;
}

export const getTmpList = async (tmpCategoryCode: String) => {
    if (!tmpCategoryCode) {
        console.error('tmpCategoryId is undefined! ', tmpCategoryCode);
        return
    }
    const url = `http://127.0.0.1:7001/api/v1/schema/querySchemasByCategory?categoryCode=${tmpCategoryCode}`;
    const res = await request(url);
    console.log('res: ', res);
    const resTmp = [];
    res.data.map((item) => {
      const tmp = {
        id: item.template_id,
        tmpName: item.template_name,
        tmpSchema: item.template_json,
        tmpOrder: item.template_type_code,
        tmpCategoryId: item.template_type_code,
        tmpVersion: item.template_type_code,
      }
      resTmp.push(tmp);
    })
   
    if (!resTmp.length) {
        console.error('list tmp failed: ', res);
        return;
    }
    return resTmp;
}
export const getCurTmp = async (tmpId: number) => {
    if (!tmpId) {
        console.error('tmpId is undefined! ', tmpId);
        return
    }
    const url = `${baseUrl}/lowcode/tmp/${tmpId}`;
    const res = await request(url);
    console.log('res: ', res);
    if (!res) {
        console.error('list tmp failed: ', res);
        return;
    }
    return res;
}

export const createTmp = async (template: TemplateType) => {
   // const url = `${baseUrl}/lowcode/tmp`;
   const url ='http://127.0.0.1:7001/api/v1/schema/addSchema'
    const result = await (
        await request(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: JSON.stringify(template),
        })
    );
    console.log('result', result);

    if (!result) {
        console.error('create tmp failed: ', result);
        return;
    }

    return result;
}
export const updateTmp = async (template: TemplateType) => {
    const url = `${baseUrl}/lowcode/tmp`;
    const result = await (
        await request(url, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: JSON.stringify(template),
        })
    );
    console.log('result', result);

    if (!result?.success) {
        console.error('create tmp failed: ', result);
        return;
    }

    return result;
}


export const deleteTmp = async (id: number) => {
    if (!id) {
        console.error('id is undefined!');
        return
    }
    const url = `${baseUrl}/lowcode/tmp/${id}`;
    const result = await (
        await request(url, {
            method: 'delete'
        })
    );

    console.log('result', result);

    if (!result?.success) {
        console.error('create tmp failed: ', result);
        return;
    }

    return result;
};