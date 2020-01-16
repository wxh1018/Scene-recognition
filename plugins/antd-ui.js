import Vue from 'vue'
import Antd from 'ant-design-vue/lib'
import jquery from 'jquery'
import {fetch} from '../static/js/api.js'

Vue.prototype.$ = jquery
window.fetch=fetch

window.uploadurl="http://119.3.210.185:9010/scene/Uploadfile"
window.defultfilepath="http://119.3.210.185:9999/"

// window.uploadurl="http://localhost:9010/scene/Uploadfile"
// window.defultfilepath="http://localhost:8023/"

Vue.use(Antd)
