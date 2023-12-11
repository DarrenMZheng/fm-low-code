import { Spin, List, Popconfirm, message } from 'antd';
import * as React from 'react';
import './index.scss';
import { TemplateType, CategoryType, deleteTmp, getCategoryList, CategoryTypeEnum, getTmpList } from '../../../apis';
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
    const [cateList, setCateList] = useState<CategoryType[]>([]);
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
        const list = await getCategoryList(CategoryTypeEnum.TMP);
        setCateList(list);
        const showObj = list.reduce((acc, _, i) => {
            return { ...acc, [i]: false };
        }, {} as Record<number, boolean>);
        setShowMap(showObj);
        // const tmpList = await getTmpList(list?.[0]?.id);
        // setDataSource(tmpList);
        setLoading(false);
    };
    const fetchTemps = async (cate: CategoryType, idx: number) => {
        const showObj = Object.keys(showMap).reduce((acc, _, i) => {
            return { ...acc, [i]: idx === i ? true : false, }
        }, {})
        setShowMap(showObj);
        if (idx === currentIdx) return;
        setLoading(true);
        const tmpList = await getTmpList(cate?.id!);
        console.log('tmpList', tmpList);
        setDataSource(tmpList);
        setLoading(false);
        setCurrentIdx(idx);
    };
    useEffect(() => {
        event.on('common:TemplateChanged', () => {
            console.log('xxxx event on TemplateChanged');
            fetchList();
        });
        console.log('xxxxxxxxxxxx');

        fetchList();

        return () => {
            event.off('common:TemplateChanged', () => { });
        };
    }, []);
    return loading ? (
        <div className="template-pane-loading">
            <Spin />
        </div>
    ) : (
        <div className='template-pane'>
          {  console.log('2222222222222222')}
            
            {cateList?.map((cate, i) => {
                return (
                    <>
                        <div
                            className="template-pane-cate"
                            onClick={() => {
                                fetchTemps(cate, i);
                            }}
                        >
                            {cate?.categoryName} {showMap?.[i] ? <CaretUpOutlined /> : <CaretDownOutlined />}
                        </div>
                        {currentIdx !== i ? null : !showMap?.[i] ? null : !dataSource?.length ? (
                            <div className='template-pane-empty'>暂无数据</div>
                        ) : (
                            <List
                                dataSource={dataSource}
                                renderItem={(item) => {
                                    <List.Item
                                        onClick={() => {
                                            const { origin, pathname } = window.location;
                                            window.location.replace(`${origin}${pathname}?tmpId=${item.id}`);
                                        }}
                                    >
                                        <FileTextOutlined className='list-icon' />
                                        {item.tmpName}
                                        <Popconfirm
                                            title="确认删除该模板吗？"
                                            onConfirm={(e) => {
                                                e?.preventDefault();
                                                e?.stopPropagation();
                                                handleDelete(item.id!);
                                            }}
                                            okText="确认"
                                            cancelText="取消"
                                        >
                                            <DeleteOutlined
                                                className="delete-icon"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                }}
                                            />
                                        </Popconfirm>
                                    </List.Item>
                                }}
                            ></List>
                        )}
                    </>
                )
            })}
        </div>
    )
}

export default TemplatePane