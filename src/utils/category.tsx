import * as React from 'react'
import { Modal, Form, Button, Input, message } from "antd";
import { FormInstance } from 'antd/es/form';
import { createCategory, SchemaType } from '../apis';
const FormItem = Form.Item;
let dialog: any = null;

const AddSchemaType = () => {
    const { search } = window.location;
    const formRef = React.useRef<FormInstance>(null);
  
    const save = async (values: Partial<SchemaType>) => {
       const { schemaType, typeCode } = values;
       const category = {
        schemaType,
        typeCode,
        type: 'tmp'
       };
       const result = await createCategory(category as SchemaType);
       console.log('createSchemaType--', result);
       if(result) {
        message.success('新建类型成功！')
        dialog?.destroy();
       }
    }
    return (
        <div className='save-template-modal--content'>
            <Form style={{ width: '100%' }} ref={formRef} colon onFinish={save}>
                <FormItem name="schemaType" label="模板类型名称" rules={[{
                    required: true, message: '请输入类型名称'
                }]} >
                    <Input />
                </FormItem>
                <FormItem name="typeCode" label="类型代码" rules={[{
                    required: true, message: '请输入类型代码'
                }]} >
                    <Input />
                </FormItem>
            </Form>
            <div className='save-template-modal--footer'>
                <Button
                    type='primary'
                    disabled={false}
                    style={{ marginRight: 16 }}
                    onClick={() => {
                        formRef.current?.submit?.()
                    }}
                >
                    新建模板类型
                </Button>
            </div>
        </div>

    );
};
export const saveTemplateSchemaType = async () => {
    dialog = Modal.confirm({
        title: '新建模板类型',
        content: <AddSchemaType />,
        className: 'save-template-modal',
        closable: true,
    })

};
