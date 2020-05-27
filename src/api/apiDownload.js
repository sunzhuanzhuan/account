import { saveAs } from 'file-saver'
import axios from 'axios'
const Cookie = require('js-cookie');

import { message } from 'antd'

const apiDownload = (opts, filename = 'file', success, error) => {
	opts.baseURL =  '/api'
	opts.responseType = 'blob'
	opts.headers = {"X-Access-Token" : Cookie.get('token') || ''}

	axios(opts).then(res => {
		if (res.data.type === "application/json") {
      if(error){
        error(new Error("下载失败"))
      }else {
        message.error("下载失败，文件不存在或权限不足");
      }
		} else {
			let blob = new Blob([res.data]);
			saveAs(blob, filename)
      success?.()
		}
	}).catch(e => error?.(e))

}
export default apiDownload
