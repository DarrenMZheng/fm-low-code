import { Spin, List, Popconfirm, message } from 'antd';
import * as React from 'react';
import './index.scss';
import { TemplateType, SchemaType, deleteTmp, getCategoryList, CategoryTypeEnum, CategoryType, getTmpList } from '../../../apis';
import { CaretUpOutlined, FileTextOutlined ,DeleteOutlined,CaretDownOutlined} from '@ant-design/icons'
import { eventCenter as event } from '@planjs/utils'

const { useState, useEffect } = React;
export interface BlockResponse {
    code: number;
    data: TemplateType[];
}
export interface TemplatePaneAPI {
    listBlock: () => BlockResponse;
}
export interface TemplatePaneProps {
    api: TemplatePaneAPI;
}
export const TemplatePane = (props: TemplatePaneProps) => {
    const [cateList, setCateList] = useState<SchemaType[]>([]);
    const [currentIdx, setCurrentIdx] = useState<number>();
    const [showMap, setShowMap] = useState<Record<number, boolean>>({});
    const [dataSource, setDataSource] = useState<TemplateType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const handleDelete = async (id: number) => {
        const result = await deleteTmp(id);
        console.log('result', result);

        if (result) {
            message.success('删除成功！');
            event.trigger('common:TemplateChanged');
        }
    };
    const fetchList = async () => {
        // setLoading(true);
        const result = await getCategoryList(CategoryTypeEnum.TMP);
        const categoryList= [];
        if(result.data.length){
            result.data.map((item: CategoryType) => {
                const itemTmp = {
                    id: item.type_id,
                    schemaType: item.schema_type,
                    typeCode: item.type_code,
                    type: item.type
                }
                categoryList.push(itemTmp)
            })
        }
        setCateList(categoryList);
        const showObj = categoryList.reduce((acc, _, i) => {
            return { ...acc, [i]: false };
        }, {} as Record<number, boolean>);
        setShowMap(showObj);
        setLoading(false);
    };
    const fetchTemps = async (cate: SchemaType, idx: number) => {
        const showObj = Object.keys(showMap).reduce((acc, _, i) => {
            return { ...acc, [i]: idx === i ? true : false, }
        }, {})
        setShowMap(showObj);
        // if (idx === currentIdx) return;
        // setLoading(true);
        const tmpList = await getTmpList(cate.typeCode);
        console.log('tmpList', tmpList);
        setDataSource(tmpList);
        setLoading(false);
        // setCurrentIdx(idx);
    };
    useEffect(() => {
        // event.on('common:TemplateChanged', () => {
        //     console.log('xxxx event on TemplateChanged');
        //     fetchList();
        // });
        // console.log('xxxxxxxxxxxx');

        fetchList();

        // return () => {
        //     event.off('common:TemplateChanged', () => { });
        // };
    }, []);
    // return loading ? (
    //     <div className="template-pane-loading">
    //         <Spin />
    //     </div>
    // ) : (
    return(
        <div className='template-pane'>
          {  console.log('2222222222222222', dataSource)}
            
            {cateList?.map((cate, i) => {
                return (
                    <>
                        <div
                            className="template-pane-cate"
                            onClick={() => {
                                fetchTemps(cate, i);
                            }}
                        >
                            {cate?.schemaType}
                             {/* {showMap?.[i] ? <CaretUpOutlined /> : <CaretDownOutlined />} */}
                        </div>
                        {console.log('222222-------2222222222', dataSource)}
                        {/* {
                         dataSource.length == 0 ? (
                            <div className='template-pane-empty'>暂无数据</div>
                        ) : ( */}
                            <List
                                dataSource={dataSource}
                                renderItem={(item) => {
                                    console.log("item-----------", item);
                                    <List.Item
                                      key={item.id}
                                    >
                                      {item.tmpName}
                                    </List.Item>
                                }}
                            ></List>
                        {/* )} */}
                    </>
                )
            })}
        </div>
        )
    // )
}

export default TemplatePane