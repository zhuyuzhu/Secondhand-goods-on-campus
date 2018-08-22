/**
 * Created by sban on 2017/5/29.
 */

'use strict'

let service = require('./lib/service')
var Promise = require('./lib/bluebird-3.5.0.min')
let page = require('./lib/page')
var promise = {
    all: Promise.all,
}

var app = {
    data:{
        loading:false,
    },
    version: "1.0",
    service: service,
    promise: promise,
    page: page,
}

function request(url,data,options) {
    return new Promise(function (resolve, reject) {
        wx.showNavigationBarLoading()

        // 调用成功、失败都会执行
        let complete = function () {
            wx.hideNavigationBarLoading()
        }
        // 去掉微信的封装,直接返回服务器的结果
        let success = function (res) {
            if (res.statusCode == 200 && res.errMsg == "request:ok"){
                resolve(res.data)
            }else{
                reject(res.errMsg)
            }
        }
        var args = {
            url: url,
            header: { 'Content-Type': 'json' },
            success: success,
            fail: reject,
            complete:complete,
        }
        if (data) {
            args["method"] = "POST"
            args["data"] = data
        }
        if (options){
            Object.assign(args, options)
        }
        wx.request(args)
    })
}

app["request"] = request

module.exports = app