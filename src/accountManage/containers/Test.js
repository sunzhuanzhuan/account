import React, { Component } from "react"
import './AddPage.less'
import NewUpload from "@/accountManage/base/NewUpload";
import request from '@/api'
function action() {
	return request.get('/toolbox/file/v1/getToken')
}
export default class Test extends Component {
	render() {
		return <div>
			<NewUpload tok={action} uploadUrl={'/api/common-file/file/v1/uploadPubBucket'}/>
		</div>
	}
}
