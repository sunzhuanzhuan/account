import React, { Component } from "react"
import { message, Button, Anchor } from 'antd'
import { parseUrlQuery } from "@/util/parseUrl";
import { sensors } from "@/util/sensor/sensors";

const position = {
	top: 20,
	bottom: 10
}
const { Link } = Anchor;
export default class AffixNav extends Component {
	state = {
		submitLoading: false
	}
	submit = () => {
		const {
			updateAccountBase,
			updateAccountFans,
			updateAccountFeature,
			updateAccountCooperation,
			updateAccountOnSale,
			updateAccountStrategy,
			updateAccountOther
		} = this.props.actions
		let actionsMap = {
			'baseInfos': updateAccountBase,
			'fansInfos': updateAccountFans,
			'featureInfos': updateAccountFeature,
			'cooperationInfos': updateAccountCooperation,
			'shelfInfos': updateAccountOnSale,
			'strategyInfos': updateAccountStrategy,
			'otherInfos': updateAccountOther
		}
		let ary = [], updateActions = []
		Object.entries(window.allSubmit.store).forEach(([key, item]) => {
			ary.push(item())
			updateActions.push(actionsMap[key])
		})
		Promise.all(ary).then((data) => {
			this.setState({
				submitLoading: true
			})
			/*let result = data.reduce((obj, item) => {
				obj = { ...obj, ...item }
				return obj
			}, {})*/
      // sensor
      const {
        accountId,
        platformId
			} = this.props.accountInfo || {};
      sensors.track('ACCOUNT_MANAGE_UPDATE_SAVE', {
        module: '账号信息',
        platform_id: platformId,
        account_id: accountId,
        submit_type: '一键保存'
      })
			let id = parseUrlQuery()['account_id']
			let updates = updateActions.map((action, index) => action({...data[index],id}))
			Promise.all(updates).then((data) => {
				this.setState({
					submitLoading: false
				})
				message.success(data.message || '更新账号成功', 1.5, () => window.location.reload())

			}).catch(({ errorMsg }) => {
				this.setState({
					submitLoading: false
				})
			})
		}).catch((err) => {
			console.error(err);
			message.error('信息填写不合法, 请重新填写')
		})
	}


	render() {
		const { isUpdate, scrollNode = '#app-content-children-id' } = this.props
		return <div className='account-info-sidebar'>
			<Anchor offsetTop={isUpdate ? 0 : position.top} getContainer={() => document.querySelector(scrollNode)}>
				{
					this.props.dataSource.map(li => {
						return <Link key={li.id} href={'#' + li.id} title={li.title} />
					})
				}
				{isUpdate ?
					<p className='fixed-btn-wrapper'>
						<Button block
							loading={this.state.submitLoading}
							type="primary"
							onClick={this.submit}
						>一键提交</Button>
					</p> : null
				}
			</Anchor>
		</div>
	}
}
