import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux';
import './index.less'

class Index extends Component {
    config = {
        navigationBarTitleText: 'index',
    }
    state = {
    }
    // 页面加载。后要执行的钩子函数。
    componentWillMount () {
        // 一个网络请求的demo
        const { dispatch } = this.props;
        dispatch({
            type: 'index/effectsDemo',
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
                <View className="index-page">
                    <Text>正如你所见这是你的index页面</Text>
                </View>
                {
                    list.map( (item,key)=>{
                        return (
                            <View className="index-page" key={key}>
                                <Text>{item}</Text>
                            </View>
                        )
                    } )
                }
            </View>
        )
    }
}
export default connect(({index:{ list },loading}) => ({
    list,
    loading: loading.effects['index/effectsDemo'],
}))(Index)
