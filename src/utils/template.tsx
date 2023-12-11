import * as React from 'react'
import { Modal, Form, Button, Input, Select } from "antd";
import { FormInstance } from 'antd/es/form'
import queryString from 'querystring'
import { TemplateType,createTmp, getCategoryList, CategoryTypeEnum,CategoryType } from '../apis'
import { project } from '@alilc/lowcode-engine';
import {useLocalStorageState} from '@planjs/react-utils'
const FormItem = Form.Item;
let dialog: any = null;

const SaveAsTemplateCom = () => {
    const { search } = window.location;
    const { tmpId } = queryString.parse(search)
    const formRef = React.useRef<FormInstance>(null);
    const [isCreate,setIsCreate] = React.useState<boolean>(!tmpId);
    const [currentTmp,setCurrentTmp] = useLocalStorageState<TemplateType>('currentTmp')
    const [cateList,setCateList] = React.useState<CategoryType[]>([])
    const fetchList =async () => {
        const list = await getCategoryList(CategoryTypeEnum.TMP)
        setCateList(list)
    }
    const save = async (values: Partial<TemplateType>) => {
        const { tmpName } = values
        const schema = project.exportSchema();
        const _currentTmp:Partial<TemplateType>=isCreate?{}:currentTmp!;

        const template ={
            tmpName:tmpName,
            tmpSchema:JSON.stringify(schema)
        }
        const result = await createTmp(template)
        if(result){
            console.log('11111111111111',result);
            
            dialog?.destroy();
        }
    }
    return (
        <div className='save-template-modal--content'>
            <Form style={{ width: '100%' }} ref={formRef} colon onFinish={save}>
                <FormItem name="tmpName" label="模板名称" rules={[{
                    required: isCreate, message: '请输入名称'
                }]} >
                    <Input />
                </FormItem>
                <FormItem name="tmpVersion" label="版本号" rules={[{
                    required: isCreate, message: '请输入版本号'
                }]} >
                    <Input />
                </FormItem>
                {/* <FormItem name="tmpCategoryId" label="分组" rules={[{
                    required: isCreate, message: '请选择分组'
                }]} >
                    <Select
                        showSearch
                        placeholder='请选择分组'
                        optionFilterProp='children'
                        fieldNames={{ label: 'categoryName', value: 'id' }}
                    //options={cateList}
                    />
                </FormItem> */}
            </Form>
            <div className='save-template-modal--footer'>
                {/* <Button
                    type='primary'
                    disabled={false}
                    style={{ marginRight: 20 }}
                    onClick={() => {
                        formRef.current?.submit?.()
                    }}
                >
                    更新当前模板
                </Button> */}
                <Button
                    type='primary'
                    disabled={false}
                    style={{ marginRight: 20 }}
                    onClick={() => {
                        setIsCreate(false)
                        formRef.current?.submit?.()
                    }}
                >
                    新建模板
                </Button>
                <Button
                    onClick={() => {
                        formRef.current?.resetFields?.()
                    }}
                >
                    重置
                </Button>
            </div>
        </div>

    );
};
export const saveTemplateSchema = async () => {
    dialog = Modal.confirm({
        title: '保存模板',
        content: <SaveAsTemplateCom />,
        className: 'save-template-modal',
        closable: true,
    })

};
