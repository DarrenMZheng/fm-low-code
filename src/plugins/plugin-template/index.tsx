import React from 'react';
import { IPublicModelPluginContext } from '@alilc/lowcode-types';
import {TemplatePane} from './pane'


// 增加模板
const LowcodePluginCusPlugin = (ctx: IPublicModelPluginContext) => {
  return {
    // 插件名，注册环境下唯一
    name: "TemplatePlugin",
    // 依赖的插件（插件名数组）
    dep:[],
    exports () {
      return {
        data: "对外暴漏插件数据",
        func: ()=>{
          console.log("方法也是一样的")
        }
      }
    },
    init() {
      const { skeleton } = ctx;
      skeleton.add({
        area: 'leftArea',
        name: 'templatePane',
        type: 'PanelDock',
        props: {
          //  icon:(
          //   <img
          //   src='https://sinosoft.com.cn/images/logo.png'
          //   alt=''
          //   style={{filter:'brightness(1)'}}
          //   //onClick={()=>{TemplatePane}}
          //   />
          //  ),
           description:'Demo',   
        }, 
        content:TemplatePane,
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