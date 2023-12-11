import { baseUrl, request } from './request';
export interface TemplateType {
    id?: number;
    tmpName: string;
    tmpSchema: string;
    tmpOrder?: number;
    tmpCategoryId?: number;
    tmpVersion?: number;
}

export const getTmpList = async (tmpCategoryId: number) => {
    if (!tmpCategoryId) {
        console.error('tmpCategoryId is undefined! ', tmpCategoryId);
        return
    }
    const url = `${baseUrl}/lowcode/tmpByCategory/${tmpCategoryId}`;
    const res = await request(url);
    console.log('res: ', res);
    if (!res) {
        console.error('list tmp failed: ', res);
        return;
    }
    return res;
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
   const url ='http://12831936.r17.cpolar.top/lowcode/createTmp'
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

    if (!result?.id) {
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