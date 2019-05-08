import React from 'react';
import {
  Form,
  Input, Button,
  Row, Col, Radio, message, Modal
} from 'antd';
import { parseUrlQuery } from '@/util/parseUrl'
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";

const RadioGroup = Radio.Group;
const FormItem = Form.Item;

function info() {
  Modal.info({
    title: '抓取信息有误!',
    content: (
      <div>
        <p>抓取回账号唯一标识与原唯一标识不一致，无法更新账号信息</p>
      </div>
    ),
    onOk() { }
  });
}
const rules = {
  'url': new RegExp('^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$', 'i')
}

export default class Fetch extends React.Component {
  static defaultProps = {
    pid: '1'
  }
  state = {
    isLoading: false
  }

  constructor(props) {
    super(props)
    // 处理拓号入库跳转抓取
    let urlParams = parseUrlQuery()
    this.isAutoFetch = urlParams['fetch_info'] && decodeURIComponent(urlParams['fetch_info'])
    let isID = /^\d+$/.test(this.isAutoFetch)
    const { platform: configurePlatform, pid } = this.props
    // TODO: 逻辑重写
    let keys = configurePlatform.configure.fetchDefaultKeys
    if(typeof keys === "function"){
      keys = keys(isID)
    }
    this.type = {
      defaultKeys: keys,
      types: configurePlatform.configure.fetchTypes
    }
    this.state = {
      disabled: !this.isAutoFetch,
      value: this.isAutoFetch || '',
      keys: this.type.defaultKeys,
      placeholder: this.type.types.find(({ field }) => field === this.type.defaultKeys).placeholder
    }
  }

  handleChange = e => {
    let value = e.target.value.trim()
    this.setState({
      value,
      disabled: !value
    })
  }

  changeKeys = e => {
    let value = e.target.value
    this.setState({
      keys: value,
      placeholder: this.type.types.find(({ field }) => field === value).placeholder
    })
  }

  handleFetch = () => {
    const { pid, actions: { fetchAccountBaseInfo, fetchAccountBaseInfoByUpdate, updateFetchInfo, addFetchInfo }, form, data: { accountInfo }, isUpdate } = this.props
    const { value, keys } = this.state
    this.setState({ isLoading: true })
    let flag_id = window.oldSnsUniqueId || accountInfo.snsUniqueId
    let action = isUpdate ? fetchAccountBaseInfoByUpdate : fetchAccountBaseInfo
    let params = isUpdate ? {
      platformId: pid,
      [keys]: value,
      is_edit_account_page: 1,
      accountId: accountInfo.accountId
    } : { platformId: pid, [keys]: value }
    action(params).then((data = {}) => {
      this.setState({ isLoading: false })
      let value = data.data
      if (isUpdate) {
        let reg = /^wby_|_old$/
        if (value['snsUniqueId'] && !reg.test(flag_id) && (flag_id != value['snsUniqueId'])) {
          value = {}
          return info()
        }
        window.oldSnsUniqueId = flag_id
        updateFetchInfo(value)
      } else {
        addFetchInfo({
          isNewFetch: !(flag_id == value['snsUniqueId']),
          value
        })
      }
      let forms = Object.values((window.updateForms || {})) // 维护页分段提交form
      let singleForm = form // 入库页单个提交form
      if (singleForm) {
        Object.keys(data.data).forEach(key => {
          singleForm.resetFields('base.' + key)
        })
      }
      if (forms.length) {
        Object.keys(data.data).forEach(key => {
          forms.forEach(form => form.resetFields(key))
        })
      }
      message.success('获取信息成功！')
    }).catch(() => {
      this.setState({
        isLoading: false
      })
    })
  }

  componentDidMount() {
    if (this.isAutoFetch) {
      let timer = setTimeout(() => {
        window.clearTimeout(timer)
        this.handleFetch()
      }, 0)
    }
  }

  render() {
    const { layout, pid = 0 } = this.props
    const { module: configureModule, platform: configurePlatform } = this.props

    const { disabled, value = '', isLoading, placeholder, keys } = this.state
    let isSuccess = !value || !rules[keys] || rules[keys].test(value)
    let valida = isSuccess ? {
      help: '账号必须经过抓取才可入库'
    } : {
      validateStatus: "error",
      help: '请输入正确的抓取格式!'
    }
    return <div className='module-item-container'>
      <ModuleHeader title={configureModule.title} />
      <FormItem {...layout.full} label={this.type.types.length > 1 ? '抓取项' : '抓取信息'} {...valida}>
        <Row gutter={20}>
          {
            this.type.types.length > 1 ?
              <Col span={24}>
                <RadioGroup onChange={this.changeKeys} defaultValue={keys}>
                  {
                    this.type.types.map(radio =>
                      <Radio key={radio.field} value={radio.field}>{radio.title}</Radio>)
                  }
                </RadioGroup>
              </Col> : null
          }
          <Col span={20}>
            <Input placeholder={placeholder || "填写抓取信息"} onChange={this.handleChange} value={value} />
          </Col>
          <Col span={4}>
            <Button block onClick={this.handleFetch}
              loading={isLoading}
              disabled={disabled || !isSuccess}
              type='primary'>{isLoading ? '抓取中...' : '一键抓取'}</Button>
          </Col>
        </Row>
      </FormItem>
    </div>
  }

}
