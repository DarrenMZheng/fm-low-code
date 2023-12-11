import React from 'react';
import { IPublicModelPluginContext } from '@alilc/lowcode-types';
import {TemplatePane} from './pane'


// 增加模板
const LowcodePluginCusPlugin = (ctx: IPublicModelPluginContext) => {
  return {
    async init() {
      const { skeleton } = ctx;
      skeleton.add({
        area: 'leftArea',
        name: 'templatePane',
        type: 'PaneDock',
        props: {
           icon:(
            <img
            src='https://sinosoft.com.cn/images/logo.png'
            alt=''
            style={{filter:'brightness(1)'}}
            //onClick={()=>{TemplatePane}}
            />
           ),
           description:'模板列表',   
        }, 
        content:TemplatePane
      });
      console.log('1111111111111111111111111111');
      
    },
  };
}

LowcodePluginCusPlugin.pluginName = 'TemplatePlugin';
LowcodePluginCusPlugin.meta = {
  dependencies:['EditorInitPlugin']
};

export default LowcodePluginCusPlugin;