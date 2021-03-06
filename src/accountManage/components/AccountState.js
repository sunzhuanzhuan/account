import React from "react"
import { Badge, Tooltip } from 'antd'
import { handleReason } from '../util'

const StatusComponent = ({ status = false, desc = ['', ''], reason = '' }) => {
  return <div>
    {status ? <Badge status={"success"} text={desc[0]} /> :
      <Tooltip title={handleReason(reason)}>
        <Badge status={"error"} text={desc[1]} />
      </Tooltip>}
  </div>
}
let MaxFetchCount = 5
let timer = null

class AccountState extends React.Component {

  componentDidMount() {
    const {
      onShelfStatus: {
        aOnShelfStatus,
        bOnShelfStatus
      } = {}
    } = this.props.data.account.strategyInfo
    if (!aOnShelfStatus && !bOnShelfStatus) {
      this.getStatus()
    }
  }

  getStatus() {
    if (MaxFetchCount <= 0) return this.setState({})
    let { actions } = this.props
    timer = setTimeout(() => {
      window.clearTimeout(timer)
      MaxFetchCount--
      actions.getAccountOnShelfStatus({ accountId: this.props.data.account.id }).finally(({ data } = {}) => {
        let { aOnShelfStatus, bOnShelfStatus } = data || {}
        if (aOnShelfStatus || bOnShelfStatus) return
        this.getStatus()
      })
    }, 1000);
  }

  render() {
    const {
      isOnline,
      offlineReason,
      onShelfStatus: {
        aOnShelfStatus,
        aOffShelfReasonStringList,
        bOnShelfStatus,
        bOffShelfReasonStringList
      } = {}
    } = this.props.data.account.strategyInfo
    const orderStatus = [
      { code: isOnline, reason: offlineReason },
      { code: aOnShelfStatus, reason: aOffShelfReasonStringList },
      { code: bOnShelfStatus, reason: bOffShelfReasonStringList }
    ]
    let [online, a, b] = orderStatus
    let show = MaxFetchCount <= 0 || a.code || b.code
    return <div className='account-status-tabs'>
      <StatusComponent status={online.code === 1} desc={["账号可售卖", "账号不可售卖"]} reason={online.reason} />
      {show ?
        <StatusComponent status={a.code === 1} desc={["A端上架", "A端下架"]} reason={a.reason} /> :
        <div>loading...</div>}
      {show ?
        <StatusComponent status={b.code === 1} desc={["B端上架", "B端下架"]} reason={b.reason} /> : null}
    </div>
  }

  componentWillUnmount() {
    window.clearTimeout(timer)
  }
}

export default AccountState
