/**
 * pages模版快速生成脚本,执行命令 npm run temp `文件名`
 */
const fs = require('fs');
const path = require("path");
let dir = process.argv[2];

if (!dir) {
    console.log('文件夹名称不能为空！');
    console.log('示例：npm run temp test');
    process.exit(0);
}
let temp = dir.split('/');
let len  = 1;
// 从第二个数组开始，首字母转换为大写。
for (; len < temp.length; len++) {
    temp[len] = titleCase(temp[len]);
}
const dirName = temp.join("");

// 页面模版
const indexTep = `import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux';
import './index.less'

class ${titleUpCase(dirName)} extends Component {
    config = {
        navigationBarTitleText: '${dirName}',
    }
    state = {
    }
    // 页面加载。后要执行的钩子函数。
    componentWillMount () {
        // 一个网络请求的demo
        const { dispatch } = this.props;
        dispatch({
            type: '${dirName}/effectsDemo',
            payload: {
                key:"value"
            },
        })
    }

    componentDidMount () { }

    componentWillUnmount () { }

    componentDidShow () { }

    componentDidHide () { }
    render () {
        const { flags } = this.state;
        const { list } = this.props;
        
        return (
            <View>
                <View className="${dirName}-page">
                    <Text>正如你所见这是你的${dirName}页面</Text>
                </View>
                {
                    list.map( (item,key)=>{
                        return (
                            <View className="${dirName}-page" key={key}>
                                <Text>{item}</Text>
                            </View>
                        )
                    } )
                }
            </View>
        )
    }
}
export default connect(({${dirName}:{ list },loading}) => ({
    list,
    loading: loading.effects['${dirName}/effectsDemo'],
}))(${titleUpCase(dirName)})
`;
// less文件模版
const lessTep = `
.${dirName}-page {
    border:1px solid red;
    width:600px;
    heigth:300px;
    Text{
        color:#c0c0c0;
    }
}
`;

// model文件模版
const modelTep = `import * as ${dirName}Api from './service';

export default {
    namespace: '${dirName}',
    state: {
        list:[]
    },

    effects: {
        * effectsDemo({ payload }, { call, put }) {
            const { status, data } = yield call(${dirName}Api.demo, payload);
            if (status) {
                yield put({ type: 'save', payload: data });
            }
        },
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, list:payload };
        },
    },

};
`;

let paths = "../";
for (var i = 0; i < len; i++) {
    paths += "../";
}
// service页面模版
const serviceTep = `import Request from '${paths}utils/request';

export const demo = (data) => {
    return Request({
        url: '/',
        method: 'POST',
        data,
    });
};
`;
mkdirsSync(`./src/pages/${dir}`); // mkdir $1
process.chdir(`./src/pages/${dir}`); // cd $1

fs.writeFileSync('index.js', indexTep);
fs.writeFileSync('index.less', lessTep);
fs.writeFileSync('model.js', modelTep);
fs.writeFileSync('service.js', serviceTep);
console.log(`模版${dir}已创建,请手动按照格式增加到./src/models`);
function titleCase(str) {
    const array = str.toLowerCase().split(' ');
    for (let i = 0; i < array.length; i++) {
        array[i] = array[i][0].toUpperCase() + array[i].substring(1, array[i].length);
    }
    const string = array.join(' ');
    return string;
}
function titleUpCase(str){
    const array = str.split(' ');
    for (let i = 0; i < 1; i++) {
        array[i] = array[i][0].toUpperCase() + array[i].substring(1, array[i].length);
    }
    const string = array.join(' ');
    return string;
}
function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}
process.exit(0);
