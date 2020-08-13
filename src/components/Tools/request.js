import Taro from '@tarojs/taro'
// import g from "./global";

export default {
    doMain : "http://localhost",
    prefix : "/wxapp",
    post : function( url, params, callback, errback ){
        this.request( url, params, callback, 'POST', errback );
    },
    get : function( url, params, callback, errback ){
        this.request(  url, params, callback, 'GET', errback );
    },
    request : function( url, params, callback, method, errback ){
        // let user = g.get('user');
        let user = {token:123123}
        Taro.request({
            url: this.doMain + this.prefix + url,
            method: method,
            header: {
                'x-auth-token': user.token,
            },
            data: params,
            success: function(res) {
                let d = res.data
                if( d.status ){
                    if( callback ){
                        callback( d.data, d )
                    }
                    return;
                }
                if( typeof errback == 'function' ){
                    errback( d );
                }
                if( d.message == "" ){
                    d.message = '系统繁忙，请稍后重试'
                }
                Taro.showToast({
                     title: d.message,
                     icon: 'none',
                     duration: 1500
                })
            },
            fail: function() {
                if( errback ){
                    errback();
                }
                Taro.showToast({
                     title: '系统繁忙，请稍后重试',
                     icon: 'none',
                     duration: 1500
                })
            },
            complete: function() {
            // complete
            }
        })
    }
}
