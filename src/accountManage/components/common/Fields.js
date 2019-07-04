/**
 * 账号字段集合
 */
import React from 'react';
import {
  Form,
  Select,
  Input,
  Checkbox,
  Radio,
  InputNumber,
  Tooltip,
  Divider,
  DatePicker, TimePicker, Modal, message
} from 'antd';
import { OssUpload } from 'wbyui';
import SimpleTag from '../../base/SimpleTag';
import moment from 'moment';
import InputCount from "@/accountManage/base/InputCount";
import CheckedWrap from "./CheckedWrap";
import WordList from "./WordList";
import AreasTreeSelect from "./AreasTreeSelect";
import CooperationCasesCore from "./CooperationCasesCore";
import DefaultAndCustomTag from "./DefaultAndCustomTag";
import {
  createRange,
  date2moment,
  handleReason,
  handleWeeks,
  initialMoment
} from "@/accountManage/util";
import {
  FeedbackCreate,
  FeedbackDetail,
  FeedbackMini
} from "@/accountManage/components/CategoryFeedbackModal";
import LazyAreaOptions from "./LazyAreaOptions";
import EmSpan from "@/accountManage/base/EmSpan";
import ShippingAddress from "@/accountManage/components/common/ShippingAddress";
import ChildrenList from "@/accountManage/components/common/ChildrenList";
import api from '@/api'
import commonInterface from '@/constants/Interface'
import FieldsOptionsLoading from "@/accountManage/base/FieldsOptionsLoading";

const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const { TextArea } = Input;
const { Option, OptGroup } = Select;
const { RangePicker } = DatePicker;

// 敏感词校验
export const checkForSensitiveWord = (rule, value, callback) => {
  if (!value) return callback()
  api.post(commonInterface.common.checkSensitiveWord, { word: value }).then(() => {
    callback();
  }).catch(({ data, code, errorMsg }) => {
    if (code === '110502') {
      const errorWords = (data.sensitiveWords || []).join('，')
      callback(`${rule.name || '内容'}包含敏感词${errorWords}，请修订`);
    } else {
      callback(errorMsg);
    }
  })
};

// DefaultAndCustomTag 重复校验
const checkDefaultAndCustomTagRepeat = getSource => (rule, value, callback) => {
  let source = getSource()
  let isRepeat = source.some(name => value === name)
  if (isRepeat) {
    callback('添加内容已存在，请修订');
  } else {
    callback()
  }
};

// 处理三方提交提示
export const trinityIsPreventShieldingTip = (value, callback) => {
  let { accountValue, skuValue, trinityName = "微任务/WEIQ", platformId } = value, diff;
  accountValue = parseInt(accountValue)
  skuValue = parseInt(skuValue)
  if (platformId !== 1 || !accountValue || !skuValue || accountValue === skuValue) {
    let hide = message.loading('保存中...');
    Promise.resolve(callback(hide)).finally(hide)
    return
  }
  if (accountValue === 1 && skuValue === 2) {
    diff = true;
  } else if (accountValue === 2 && skuValue === 1) {
    diff = false;
  } else {
    return console.warn('其他错误:', accountValue, skuValue);
  }
  let text = diff ? `当前账号可以在${trinityName}下单，报价包含防屏蔽未勾选，请修改报价项价格，以免影响应约造成损失。` :
    `当前账号不可以在${trinityName}下单，报价包含防屏蔽已勾选，请修改报价项价格，以免影响应约造成损失。`
  Modal.confirm({
    title: text,
    okText: '不修改,保存',
    cancelText: '去修改',
    onOk: callback
  });
}

/* region  base - 账号基本信息  */

/**
 * snsUniqueId - 唯一标识
 */
export const UniqueId = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    data: { account }
  } = props;
  const {
    snsUniqueId
  } = account.base;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label='唯一标识'>
      {getFieldDecorator('base.snsUniqueId', {
        initialValue: snsUniqueId
      })(
        <div>{snsUniqueId || '--'}</div>
      )}
    </FormItem>
  </div>;
};

/**
 * id - 内部账号ID
 */
export const AccountId = (props) => {
  const {
    // form: { getFieldDecorator },
    layout,
    data: { account }
  } = props;
  const {
    id
  } = account;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label='account_id'>
      {id || '--'}
    </FormItem>
  </div>;
};

/**
 * snsName - 名称
 */
export const Name = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    data: { account }
  } = props;
  const {
    snsName,
    snsNameFrom,
    snsNameMaintainedTime
  } = account.base;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label='账号名称'>
      {getFieldDecorator('base.snsName', {
        initialValue: snsName,
        first: true,
        rules: [{ required: true, message: '账号名称不能为空' }, {
          pattern: /^(.){0,80}$/,
          message: '账号名称最多可输入80个字符'
        }]
      })(
        <InputCount placeholder="账号名称" showCount disabled={snsNameFrom === 2} max={80} />
      )}
    </FormItem>
    {getFieldDecorator('base.snsNameFrom', { initialValue: snsNameFrom })(
      <input type="hidden" />)}
    {getFieldDecorator('base.snsNameMaintainedTime', { initialValue: snsNameMaintainedTime })(
      <input type="hidden" />)}
  </div>
};

/**
 * snsId - 外部账号ID
 */
export const Id = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    data: { account }
  } = props;
  const {
    snsId,
    snsIdFrom,
    snsIdMaintainedTime
  } = account.base;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label='账号ID'>
      {getFieldDecorator('base.snsId', {
        initialValue: snsId,
        first: true,
        rules: [{ required: true, message: '账号ID不能为空' }, {
          pattern: /^.{0,100}$/,
          message: '账号ID最多可输入100个字符'
        }]
      })(
        <InputCount placeholder="账号名ID" showCount disabled={snsIdFrom === 2} max={100} />
      )}
    </FormItem>
    {getFieldDecorator('base.snsIdFrom', { initialValue: snsIdFrom })(
      <input type="hidden" />)}
    {getFieldDecorator('base.snsIdMaintainedTime', { initialValue: snsIdMaintainedTime })(
      <input type="hidden" />)}
  </div>
};

/**
 * url - 主页链接
 */
export const Url = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    data: { account }
  } = props;
  const {
    url,
    urlFrom,
    urlMaintainedTime
  } = account.base;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label='主页链接'>
      {getFieldDecorator('base.url', {
        first: true,
        initialValue: url,
        rules: [{ required: true, message: '主页链接不能为空' }, {
          pattern: /^((htt(p|ps))|weixin):\/\//,
          message: '主页链接格式不正确，请填写前缀为“http://或https://”的主页链接'
        }, { max: 1024, message: '主页链接最多可输入1024个字符' }]
      })(
        <Input disabled={urlFrom === 2} placeholder="主页链接" />
      )}
    </FormItem>
    {getFieldDecorator('base.urlFrom', { initialValue: urlFrom })(
      <input type="hidden" />)}
    {getFieldDecorator('base.urlMaintainedTime', { initialValue: urlMaintainedTime })(
      <input type="hidden" />)}
  </div>
};

/**
 * avatarUrl - 头像
 */
export const AvatarUrl = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    data: { account },
    authToken
  } = props;
  const {
    avatarUrl,
    avatarUrlFrom,
    avatarUrlMaintainedTime
  } = account.base;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label='头像'>
      {getFieldDecorator('base.avatarUrl', {
        initialValue: avatarUrl ? [{
          url: avatarUrl,
          uid: avatarUrl
        }] : [],
        valuePropName: 'fileList',
        getValueFromEvent: e => e.fileList,
        rules: [{ required: true, message: '头像不能为空' }]
      })(
        <OssUpload
          authToken={authToken}
          rule={{
            bizzCode: 'F_IMG_0001',
            max: 25,
            suffix: 'bmp,jpg,png,tif,gif,pcx,tga,exif,fpx,svg,cdr,pcd,dxf,ufo,eps,raw,wmf,webp,flic,ico'
          }}
          tipContent='请上传25M以内的图片'
          len={1}
          disabled={avatarUrlFrom === 2}
          listType='picture-card'
          empty={<FieldsOptionsLoading />}
        />
      )}
    </FormItem>
    {getFieldDecorator('base.avatarUrlFrom', { initialValue: avatarUrlFrom })(
      <input type="hidden" />)}
    {getFieldDecorator('base.avatarUrlMaintainedTime', { initialValue: avatarUrlMaintainedTime })(
      <input type="hidden" />)}
  </div>
};

/**
 * qrCodeUrl - 二维码
 */
export const QrCodeUrl = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    data: { account },
    authToken
  } = props;
  const {
    qrCodeUrl,
    qrCodeUrlFrom,
    qrCodeUrlMaintainedTime
  } = account.base;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label='二维码'>
      <div className='clearfix'>
        {getFieldDecorator('base.qrCodeUrl', {
          initialValue: qrCodeUrl ? [{
            url: qrCodeUrl,
            uid: qrCodeUrl
          }] : [],
          valuePropName: 'fileList',
          getValueFromEvent: e => e.fileList,
          rules: [{ required: true, message: '二维码不能为空' }]
        })(
          <OssUpload
            authToken={authToken}
            rule={{
              bizzCode: 'F_IMG_0001',
              max: 25,
              suffix: 'bmp,jpg,png,tif,gif,pcx,tga,exif,fpx,svg,cdr,pcd,dxf,ufo,eps,raw,wmf,webp,flic,ico'
            }}
            tipContent='请上传25M以内的图片'
            disabled={qrCodeUrlFrom === 2}
            len={1}
            listType='picture-card'
            empty={<FieldsOptionsLoading />}
          />
        )}
      </div>
    </FormItem>
    {getFieldDecorator('base.qrCodeUrlFrom', { initialValue: qrCodeUrlFrom })(
      <input type="hidden" />)}
    {getFieldDecorator('base.qrCodeUrlMaintainedTime', { initialValue: qrCodeUrlMaintainedTime })(
      <input type="hidden" />)}
  </div>
};

/**
 * introduction - 账号简介
 */
export const Introduction = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    data: { account },
    placeholder
  } = props;
  const {
    introduction,
    introductionFrom,
    introductionMaintainedTime
  } = account.base;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label='账号简介'>
      {getFieldDecorator('base.introduction', {
        initialValue: introduction,
        first: true,
        validateTrigger: 'onBlur',
        rules: [{
          max: 1000,
          message: '账号简介不能超过1000字'
        }, { validator: checkForSensitiveWord, name: '账号简介' }]
      })(
        <TextArea placeholder={placeholder || '请输入账号简介'} autosize={{ minRows: 4, maxRows: 6 }} />
      )}
    </FormItem>
    {getFieldDecorator('base.introductionFrom', { initialValue: introductionFrom })(
      <input type="hidden" />)}
    {getFieldDecorator('base.introductionMaintainedTime', { initialValue: introductionMaintainedTime })(
      <input type="hidden" />)}
  </div>
};

/**
 * weiboUrl - 新浪微博
 */
export const WeiboUrl = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    data: { account }
  } = props;
  const {
    weiboUrl
  } = account.base;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label='新浪微博:'>
      {getFieldDecorator('base.weiboUrl', {
        rules: [{ required: false }, {
          pattern: /^htt(p|ps):\/\//,
          message: '新浪微博链接格式不正确，请填写前缀为“http://或https://”的新浪微博链接'
        }, { max: 1024, message: '新浪微博链接最多可输入1024个字符' }],
        initialValue: weiboUrl
      })(
        <Input placeholder='请输入微博主页链接' />
      )}
    </FormItem>
  </div>
};

/**
 * microFlashPost - 是否微闪投账号
 */
export const MicroFlashPost = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    data: { account }
  } = props;
  const {
    microFlashPost = 0,
    isFamous
  } = account.base;
  const style = isFamous === 1 ? { display: 'none' } : {};
  return <div className='field-wrap-item'>
    <FormItem style={style} {...layout.full} label='是否微闪投账号'>
      {getFieldDecorator('base.microFlashPost', {
        initialValue: isFamous === 1 ? 2 : (microFlashPost || 2)
      })(
        <RadioGroup>
          <Radio value={2}>否</Radio>
          <Radio value={1}>是</Radio>
        </RadioGroup>
      )}
    </FormItem>
  </div>
};

/**
 * classificationList - 内容分类
 */
export class ContentCategory extends React.Component {
  state = { feedback: '' }

  componentDidMount() {
    this.reload()
  }

  reload = () => {
    const { actions, data: { account } } = this.props
    actions.isExistClassify({ accountId: account.id }).then(({ data }) => {
      this.setState({
        classifyAuditInfoId: data.classifyAuditInfoId,
        hasRecord: data.count
      })
    })
  }

  setModal = type => {
    this.setState({ feedback: type })
  }

  render() {
    const {
      layout,
      data: { account },
      actions
    } = this.props;
    const {
      classificationList: category = []
    } = account.base;
    const { hasRecord, classifyAuditInfoId } = this.state
    return <div className='field-wrap-item'>
      <FormItem {...layout.full} label='内容分类'>
        {category.length ?
          <div>
            {
              category.map(({ name }) => <SimpleTag key={name}>{name}</SimpleTag>)
            }
            {
              hasRecord ? <a
                className='category-feedback-btn'
                onClick={() => this.setModal('detail')}
              >
                查看反馈进度
              </a> : <a
                className='category-feedback-btn'
                onClick={() => this.setModal('create')}
              >
                分类错误?
              </a>
            }
          </div>
          : '暂无分类'}
      </FormItem>
      {this.state.feedback === 'create' &&
      <FeedbackCreate setModal={this.setModal} reload={this.reload} hasReason account={account} actions={actions} />}
      {this.state.feedback === 'detail' &&
      <FeedbackDetail setModal={this.setModal} actions={actions} classifyAuditInfoId={classifyAuditInfoId} />}
      {this.state.feedback === 'mini' &&
      <FeedbackMini setModal={this.setModal} account={account} actions={actions} />}
    </div>
  }
}

/**
 * followerCount - 粉丝数
 */
export const FollowerCount = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    data: { account }
  } = props;
  const {
    disabled,
    followerCount,
    followerCountFrom,
    followerCountMaintainedTime
  } = account.base;
  const max = Math.pow(10, 10) - 1;
  return <div className='field-wrap-item'>
    <FormItem {...layout.half} label='粉丝数'>
      {getFieldDecorator('base.followerCount', {
        initialValue: followerCount,
        rules: [{ required: true, message: '粉丝数不能为空' }, {
          pattern: /^\d{0,9}$/,
          message: '只能输入不超过9位数的数字'
        }]
      })(
        <InputNumber
          style={{ width: '100%' }}
          max={max}
          disabled={disabled || followerCountFrom === 2}
          placeholder="粉丝数"
        />
      )}
    </FormItem>
    {getFieldDecorator('base.followerCountFrom', { initialValue: followerCountFrom })(
      <input type="hidden" />)}
    {getFieldDecorator('base.followerCountMaintainedTime', { initialValue: followerCountMaintainedTime })(
      <input type="hidden" />)}
  </div>
};

/**
 * followerCountScreenshotUrl - 粉丝数截图
 */
export const FollowerCountScreenshotUrl = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    data: { account },
    authToken,
    disabled
  } = props;
  const {
    followerCountScreenshotUrl: url
  } = account.base;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label='粉丝截图'>
      {getFieldDecorator('base.followerCountScreenshotUrl', {
        initialValue: url ? [{
          uid: url,
          url: url
        }] : [],
        valuePropName: 'fileList',
        getValueFromEvent: e => e.fileList,
        rules: [{ required: true, message: '请上传粉丝截图' }]
      })(
        <OssUpload
          authToken={authToken}
          rule={{
            bizzCode: 'F_IMG_0001',
            max: 25,
            suffix: 'bmp,jpg,png,tif,gif,pcx,tga,exif,fpx,svg,cdr,pcd,dxf,ufo,eps,raw,wmf,webp,flic,ico'
          }}
          tipContent='请上传25M以内的图片'
          disabled={disabled === 2}
          len={1}
          listType='picture-card'
          empty={<FieldsOptionsLoading />}
        />
      )}
    </FormItem>
  </div>
};

/**
 * followerCountVerificationStatus - 粉丝数认证
 */
export const FollowerCountVerificationStatus = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    data: { account },
    disabled
  } = props;
  const {
    followerCountVerificationStatus: status
  } = account.base;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label='粉丝数目认证'>
      {getFieldDecorator('base.followerCountVerificationStatus', {
        initialValue: status || 1,
        rules: [{ required: false, message: '粉丝数目认证必填' }]
      })(
        <RadioGroup disabled={disabled}>
          <Radio value={1}>是</Radio>
          <Radio value={2}>否</Radio>
          <Radio value={100}>拒绝认证</Radio>
        </RadioGroup>
      )}
    </FormItem>
  </div>
};

/**
 * level - 平台等级
 */
export const Level = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    data: { account },
    options
  } = props;
  const {
    level,
    levelFrom,
    levelMaintainedTime
  } = account.base;
  return <div className='field-wrap-item'>
    <FormItem {...layout.half} label='平台等级:'>
      {getFieldDecorator('base.level', {
        rules: [{ required: false }],
        initialValue: level || undefined
      })(
        options ?
          <Select style={{ width: "100%" }} placeholder='请选择平台等级' optionFilterProp='children'>
            {
              Object.entries(options).map(([key, text]) =>
                <Option key={key} value={parseInt(key)}>{text}</Option>)
            }
          </Select> :
          <InputNumber placeholder='请输入平台等级' style={{ width: "100%" }} precision={0} min={1} max={99999} disabled={levelFrom === 2} />
      )}
    </FormItem>
    {getFieldDecorator('base.levelFrom', { initialValue: levelFrom })(
      <input type="hidden" />)}
    {getFieldDecorator('base.levelMaintainedTime', { initialValue: levelMaintainedTime })(
      <input type="hidden" />)}
  </div>
};

/**
 * mediaType - 账号类属
 */
export const MediaType = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    data: { account }
  } = props;
  const {
    mediaType
  } = account.base;
  return <div className='field-wrap-item base-media-type'>
    <FormItem {...layout.full} label=' ' colon={false}>
      {getFieldDecorator('base.mediaType', {
        initialValue: mediaType || 1
      })(
        <RadioGroup style={{ width: '100%' }}>
          <Radio value={2}>个人号-具有个人的属性特征<b className='gray-text'>（如papi酱，谷阿莫等）</b></Radio>
          <br />
          <Radio value={3}>企业号-社会上的企业或官方注册<b className='gray-text'>（如央视新闻，红十字会等）</b></Radio>
          <br />
          <Radio value={4}>内容号-不具有人的属性特征、仅以内容存在<b className='gray-text'>（如精选搞笑排行榜、娱闻少女等）</b></Radio>
        </RadioGroup>
      )}
    </FormItem>
  </div>
};

/**
 * isVerified,verifiedStatus - 认证
 */
export const Verified = (props) => {
  const {
    form: { getFieldDecorator, getFieldValue },
    layout,
    data: { account },
    options
  } = props;
  const {
    isVerified,
    isVerifiedFrom,
    isVerifiedMaintainedTime,
    verifiedStatus,
    verifiedStatusFrom,
    verifiedStatusMaintainedTime,
    verificationInfo,
    verificationInfoFrom,
    verificationInfoMaintainedTime
  } = account.base;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label='是否认证'>
      {getFieldDecorator('base.isVerified', {
        initialValue: isVerified || 2
      })(
        <RadioGroup disabled={isVerifiedFrom === 2}>
          <Radio value={1}>已认证</Radio>
          <Radio value={2}>未认证</Radio>
        </RadioGroup>
      )}
    </FormItem>
    {getFieldValue('base.isVerified') === 1 && <div>
      <FormItem {...layout.full} label='认证类型'>
        {getFieldDecorator('base.verifiedStatus', {
          rules: [{ required: false }],
          initialValue: verifiedStatus === 1 ? 2 : (verifiedStatus || 2)
        })(
          <RadioGroup disabled={verifiedStatusFrom === 2}>
            {
              options.map(opt => <Radio key={opt.id} value={opt.id}>{opt.name}</Radio>)
            }
          </RadioGroup>
        )}
      </FormItem>
      <FormItem {...layout.half} label='认证说明'>
        {getFieldDecorator('base.verificationInfo', {
          validateFirst: true,
          validateTrigger: 'onBlur',
          rules: [
            { required: true, message: '请填写认证说明' },
            { pattern: /.{2,40}/, message: '请输入2~40字的认证原因' },
            { validator: checkForSensitiveWord, name: '认证说明' }
          ],
          initialValue: verificationInfo
        })(
          <TextArea
            disabled={verificationInfoFrom === 2}
            autosize={{ minRows: 2, maxRows: 2 }}
            placeholder='请填写账号所属平台的认证说明，比如：知名情感博主、原创漫画家'
          />
        )}
      </FormItem>
    </div>}
    {getFieldDecorator('base.isVerifiedFrom', { initialValue: isVerifiedFrom })(
      <input type="hidden" />)}
    {getFieldDecorator('base.isVerifiedMaintainedTime', { initialValue: isVerifiedMaintainedTime })(
      <input type="hidden" />)}
    {getFieldDecorator('base.verifiedStatusFrom', { initialValue: verifiedStatusFrom })(
      <input type="hidden" />)}
    {getFieldDecorator('base.verifiedStatusMaintainedTime', { initialValue: verifiedStatusMaintainedTime })(
      <input type="hidden" />)}
    {getFieldDecorator('base.verificationInfoFrom', { initialValue: verificationInfoFrom })(
      <input type="hidden" />)}
    {getFieldDecorator('base.verificationInfoMaintainedTime', { initialValue: verificationInfoMaintainedTime })(
      <input type="hidden" />)}
  </div>
};

/**
 * showWindow - 橱窗/店铺
 */
export const OpenStore = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    data: { account }
  } = props;
  const {
    showWindow,
    showWindowFrom,
    showWindowMaintainedTime
  } = account.base;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label='橱窗/店铺'>
      {getFieldDecorator('base.showWindow', {
        initialValue: showWindow
      })(
        <RadioGroup style={{ width: '100%' }}>
          <Radio value={1}>已开通</Radio>
          <Radio value={2}>未开通</Radio>
        </RadioGroup>
      )}
    </FormItem>
    {getFieldDecorator('base.showWindowFrom', { initialValue: showWindowFrom })(
      <input type="hidden" />)}
    {getFieldDecorator('base.showWindowMaintainedTime', { initialValue: showWindowMaintainedTime })(
      <input type="hidden" />)}
  </div>
};

/**
 * isSupportLive - 直播
 */
export const OpenLiveProgram = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    data: { account }
  } = props;
  const {
    isSupportLive,
    isSupportLiveFrom,
    isSupportLiveMaintainedTime
  } = account.base;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label='直播'>
      {getFieldDecorator('base.isSupportLive', {
        initialValue: isSupportLive
      })(
        <RadioGroup style={{ width: '100%' }}>
          <Radio value={1}>已开通</Radio>
          <Radio value={2}>未开通</Radio>
        </RadioGroup>
      )}
    </FormItem>
    {getFieldDecorator('base.isSupportLiveFrom', { initialValue: isSupportLiveFrom })(
      <input type="hidden" />)}
    {getFieldDecorator('base.isSupportLiveMaintainedTime', { initialValue: isSupportLiveMaintainedTime })(
      <input type="hidden" />)}
  </div>
};

/* endregion  base - 账号基本信息  */

/* region  cooperation - 合作相关  */

/**
 * isAcceptHardAd, isAcceptProductUse - 拒绝项
 */
export const DirectItems = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    data: { account },
    visibility
  } = props;
  const {
    isAcceptHardAd = 1,
    isAcceptProductUse = 1
  } = account.cooperation;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label='拒绝项'>
      {visibility.isAcceptHardAd && getFieldDecorator('cooperation.isAcceptHardAd', {
        initialValue: isAcceptHardAd,
        valuePropName: 'checked',
        getValueFromEvent: e => {
          return e.target.checked ? 2 : 1
        }
      })(
        <CheckedWrap>不接受硬广</CheckedWrap>
      )}
      {visibility.isAcceptProductUse && getFieldDecorator('cooperation.isAcceptProductUse', {
        initialValue: isAcceptProductUse,
        valuePropName: 'checked',
        getValueFromEvent: e => {
          return e.target.checked ? 2 : 1
        }
      })(
        <CheckedWrap>不接受产品试用</CheckedWrap>
      )}
    </FormItem>
  </div>
};

/**
 * refuseBrands - 不接受的品牌
 */
export const RefuseBrands = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    data: { account }
  } = props;
  const {
    refuseBrands
  } = account.cooperation;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label='不接受的品牌'>
      {getFieldDecorator('cooperation.refuseBrands', {
        initialValue: refuseBrands
      })(
        <WordList
          placeholder='请输入2~20字的品牌名称'
          message='请输入2~20字的品牌名称'
          label='添加品牌'
          validator={value => {
            return /^[^\s]{2,20}$/.test(value)
          }} />
      )}
    </FormItem>
  </div>
};

/**
 * manuscriptModificationLimit - 视频/稿件/大纲修改次数
 */
export const ManuscriptModificationLimit = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    data: { account }
  } = props;
  const {
    manuscriptModificationLimit
  } = account.cooperation;
  return <div className='field-wrap-item'>
    <FormItem {...layout.half} label='稿件/大纲修改次数'>
      {getFieldDecorator('cooperation.manuscriptModificationLimit', {
        initialValue: manuscriptModificationLimit === -1 ? undefined : manuscriptModificationLimit
      })(
        <Select style={{ width: '100%' }}>
          <Option value={-1}>不限</Option>
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <Option key={n} value={n}>{n}</Option>)
          }
        </Select>
      )}
    </FormItem>
  </div>
};

/**
 * videoShotArea - 视频拍摄地点类型
 */
export const VideoShotArea = (props) => {
  const {
    form: { getFieldDecorator, getFieldValue },
    actions,
    layout,
    data: { account, areasHotCity }
  } = props;
  const {
    videoShotAreaType,
    videoShotAreas = []
  } = account.cooperation;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label='视频拍摄地点'>
      {getFieldDecorator('cooperation.videoShotAreaType', {
        initialValue: videoShotAreaType
      })(
        <RadioGroup>
          <Radio value={1}>不限地点</Radio>
          <Radio value={2}>部分地区</Radio>
        </RadioGroup>
      )}
      {getFieldValue('cooperation.videoShotAreaType') === 2 && <div>
        <FormItem {...layout.full}>
          {getFieldDecorator('cooperation.videoShotAreaIds', {
            rules: [{ required: true, message: '请选择视频拍摄地点' }],
            initialValue: videoShotAreas.map(area => area.id || area)
          })(
            <AreasTreeSelect actions={actions} areas={areasHotCity} />
          )}
        </FormItem>
      </div>}
    </FormItem>
  </div>
};

/**
 * liveArea - 直播形式
 */
export const LiveArea = (props) => {
  const {
    form: { getFieldDecorator, getFieldValue },
    layout,
    actions,
    data: { account, areasHotCity }
  } = props;
  const {
    liveAreaType,
    liveAreas = []
  } = account.cooperation;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label='直播形式'>
      {getFieldDecorator('cooperation.liveAreaType', {
        initialValue: liveAreaType || 1
      })(
        <RadioGroup>
          <Radio value={1}>不限地点</Radio>
          <Radio value={2}>线上直播间</Radio>
          <Radio value={3}>线下指定地点</Radio>
        </RadioGroup>
      )}
      {getFieldValue('cooperation.liveAreaType') === 3 && <div>
        <FormItem {...layout.full}>
          {getFieldDecorator('cooperation.liveAreas', {
            rules: [{ required: true, message: '请选择视频拍摄地点' }],
            initialValue: liveAreas.map(area => area.id || area)
          })(
            <AreasTreeSelect actions={actions} areas={areasHotCity} />
          )}
        </FormItem>
      </div>}
    </FormItem>
  </div>
};

/**
 * cooperationTips - 合作案例备注
 */
export const CooperationTips = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    data: { account }
  } = props;
  const {
    cooperationTips
  } = account.cooperation;
  return <div className='field-wrap-item'>
    <FormItem {...layout.half} label='备注'>
      {getFieldDecorator('cooperation.cooperationTips', {
        validateFirst: true,
        validateTrigger: 'onBlur',
        rules: [
          { pattern: /^[^\s]{0,1000}$/, message: '合作须知备注可输入中英文数字符号, 最多可输入1000个字' },
          { validator: checkForSensitiveWord, name: '合作案例备注' }
        ],
        initialValue: cooperationTips
      })(
        <TextArea
          placeholder='您可添加更多附加合作内容'
          autosize={{ minRows: 2, maxRows: 6 }}
        />
      )}
    </FormItem>
  </div>
};

/**
 * cooperationCases - 合作案例
 */
export const CooperationCases = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    data: { account }
  } = props;
  const {
    cooperationCases = []
  } = account.cooperation;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label=' '>
      {getFieldDecorator('cooperation.cooperationCases', {
        initialValue: cooperationCases
      })(
        <CooperationCasesCore {...props} />
      )}
    </FormItem>
  </div>
};

/**
 * adServiceItems - 可提供的广告服务
 */
export const AdServiceItems = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    data: { account },
    options = []
  } = props;
  const {
    adServiceItems = []
  } = account.cooperation;
  return <div className='field-wrap-item base-media-type'>
    <FormItem {...layout.full} label='可提供'>
      {getFieldDecorator('cooperation.adServiceItemIds', {
        initialValue: (adServiceItems || []).map(item => item.id || item)
      })(
        options.length > 0 ? <Checkbox.Group style={{
          display: 'flex',
          flexWrap: 'wrap'
        }}>
          {
            options.map(item => {
              return <Checkbox
                key={item.id}
                value={item.id}
                style={{
                  display: "block",
                  width: "155px",
                  margin: "0",
                  padding: "6px 0"
                }}
              >
                {item.adServiceItemName}
              </Checkbox>
            })
          }
        </Checkbox.Group> : <FieldsOptionsLoading />
      )}
    </FormItem>
  </div>
};

/**
 * postPlatform - 分发平台
 */
export const PostPlatform = (props) => {
  const {
    form: { getFieldDecorator, getFieldValue },
    layout,
    data: { account },
    options = []
  } = props;
  const {
    supportMultiPlatformOriginalPost,
    postPlatforms,
    multiPlatformOriginalPostTips
  } = account.cooperation;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label='分发平台'>
      {getFieldDecorator('cooperation.supportMultiPlatformOriginalPost', {
        initialValue: supportMultiPlatformOriginalPost
      })(
        <RadioGroup style={{ width: '100%' }}>
          <Radio value={1}>可分发</Radio>
          <Radio value={2}>不可分发</Radio>
        </RadioGroup>
      )}
    </FormItem>
    {getFieldValue('cooperation.supportMultiPlatformOriginalPost') === 1 && <div>
      <FormItem {...layout.half} label='选择分发平台'>
        {getFieldDecorator('cooperation.postPlatformIds', {
          rules: [{ required: true, message: '请选择分发平台' }],
          initialValue: (postPlatforms || []).map(item => item.id || item)
        })(
          options.length > 0 ? <Select mode="multiple" placeholder='选择分发平台(可多选)'>
            {
              options.map(item =>
                <Option key={item.id} value={item.id}>{item.platformName}</Option>)
            }
          </Select> : <FieldsOptionsLoading />
        )}
      </FormItem>
      <FormItem {...layout.half} label='备注'>
        {getFieldDecorator('cooperation.multiPlatformOriginalPostTips', {
          validateFirst: true,
          validateTrigger: 'onBlur',
          rules: [
            { pattern: /^[^\s]{0,200}$/, message: '分发平台备注可输入中英文数字符号, 最多可输入200个字' },
            { validator: checkForSensitiveWord, name: '分发平台备注' }
          ],
          initialValue: multiPlatformOriginalPostTips
        })(
          <TextArea
            autosize={{ minRows: 2, maxRows: 2 }}
            placeholder='备注'
          />
        )}
      </FormItem>
    </div>}
  </div>
};

/**
 * productPlacementType - 植入类型
 */
export const ProductPlacementType = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    data: { account }
  } = props;
  const {
    productPlacementType
  } = account.cooperation;
  return <div className='field-wrap-item base-media-type'>
    <FormItem {...layout.full} label='植入类型'>
      {getFieldDecorator('cooperation.productPlacementType', {
        initialValue: productPlacementType
      })(
        <RadioGroup style={{ width: '100%' }}>
          <Radio value={0}>不限</Radio>
          <Radio value={1}>仅单品<b className='gray-text'>（1次可投放1个单品）</b></Radio>
          <Radio value={2}>仅合集<b className='gray-text'>（1次可投放多个单品）</b></Radio>
        </RadioGroup>
      )}
    </FormItem>
  </div>
};

/* endregion  cooperation - 合作相关  */

/* region  content - 内容相关  */

/**
 * contentForms - 内容形式
 */
export const ContentForms = (props) => {
  const {
    form: { getFieldDecorator, getFieldValue },
    layout,
    options = [],
    data: { account }
  } = props;
  const {
    forms,
    customForm
  } = account.content;
  return <div className='field-wrap-item base-media-type'>
    <FormItem {...layout.full} label='内容形式'>
      {getFieldDecorator('_client.form', {
        initialValue: {
          defaultItems: (forms || []).map(item => item.id || item),
          custom: customForm || []
        }
      })(
        options.length > 0 ? <DefaultAndCustomTag
          options={options}
          placeholder='请输入1~10字'
          rules={[
            { required: true, pattern: /^[^\s]{1,10}$/, message: '请输入1~10个中英文数字符号' },
            { validator: checkForSensitiveWord, name: '添加内容' },
            {
              validator: checkDefaultAndCustomTagRepeat(() => {
                let { custom } = getFieldValue('_client.form')
                return [].concat(options.map(item => item.name), custom)
              })
            }
          ]}
        /> : <FieldsOptionsLoading />
      )}
    </FormItem>
  </div>
};

/**
 * contentFeatures - 内容特点
 */
export const ContentFeatures = (props) => {
  const {
    form: { getFieldDecorator, getFieldValue },
    layout,
    options,
    data: { account }
  } = props;
  const {
    features,
    customFeature
  } = account.content;
  return <div className='field-wrap-item base-media-type'>
    <FormItem {...layout.full} label='内容特点'>
      {getFieldDecorator('_client.feature', {
        initialValue: {
          defaultItems: (features || []).map(item => item.id || item),
          custom: customFeature || []
        }
      })(
        options.length > 0 ? <DefaultAndCustomTag
          options={options}
          placeholder='请输入1~10字'
          rules={[
            { required: true, pattern: /^[^\s]{1,10}$/, message: '请输入1~10个中英文数字符号' },
            { validator: checkForSensitiveWord, name: '添加内容' },
            {
              validator: checkDefaultAndCustomTagRepeat(() => {
                let { custom } = getFieldValue('_client.feature')
                return [].concat(options.map(item => item.name), custom)
              })
            }
          ]}
        /> : <FieldsOptionsLoading />
      )}
    </FormItem>
  </div>
};

/**
 * contentStyles - 内容风格
 */
export const ContentStyles = (props) => {
  const {
    form: { getFieldDecorator, getFieldValue },
    layout,
    options,
    data: { account }
  } = props;
  const {
    styles,
    customStyle
  } = account.content;
  return <div className='field-wrap-item base-media-type'>
    <FormItem {...layout.full} label='内容风格'>
      {getFieldDecorator('_client.style', {
        initialValue: {
          defaultItems: (styles || []).map(item => item.id || item),
          custom: customStyle || []
        }
      })(
        options.length > 0 ? <DefaultAndCustomTag
          options={options}
          placeholder='请输入1~10字'
          rules={[
            { required: true, pattern: /^[^\s]{1,10}$/, message: '请输入1~10个中英文数字符号' },
            { validator: checkForSensitiveWord, name: '添加内容' },
            {
              validator: checkDefaultAndCustomTagRepeat(() => {
                let { custom } = getFieldValue('_client.style')
                return [].concat(options.map(item => item.name), custom)
              })
            }
          ]}
        /> : <FieldsOptionsLoading />
      )}
    </FormItem>
  </div>
};

/* endregion  content - 内容相关  */

/* region  strategyInfo - 策略信息  */

/**
 * onSaleInfo - 上架信息
 */
export const OnSaleInfo = (props) => {
  const {
    form: { getFieldDecorator, getFieldValue },
    layout,
    data: { account }
  } = props;
  const {
    approvedStatus,
    disapprovalReason,
    isContacted,
    isSignedOff,
    isOnline,
    isOpen,
    isShielded,
    onShelfStatus: {
      aOnShelfStatus,
      aOffShelfReasonStringList,
      bOnShelfStatus,
      bOffShelfReasonStringList
    } = {},
    offlineReason
  } = account.strategyInfo;
  return <div className='field-wrap-item base-media-type'>
    <FormItem {...layout.full} label='审核状态:'>
      {getFieldDecorator('strategyInfo.approvedStatus', {
        rules: [{ required: false }],
        initialValue: approvedStatus ? approvedStatus : 0
      })(
        <RadioGroup>
          <Radio value={1}>未审核</Radio>
          <Radio value={2}>审核成功</Radio>
          <Radio value={3}>审核失败</Radio>
        </RadioGroup>
      )}
    </FormItem>
    {getFieldValue('strategyInfo.approvedStatus') === 3 &&
    <FormItem {...layout.full} label=' ' colon={false}>
      {getFieldDecorator('strategyInfo.disapprovalReason', {
        rules: [{ required: true, message: '审核失败原因不能未空！' },
          { max: 1000, message: '审核失败原因不能超过1000字' }
        ],
        initialValue: disapprovalReason
      })(
        <TextArea style={{ width: '30%' }} placeholder="请输入失败原因！" autosize={{
          minRows: 2,
          maxRows: 6
        }} />
      )}
    </FormItem>}
    <FormItem {...layout.full} label='是否与博主联系'>
      {getFieldDecorator('strategyInfo.isContacted', {
        rules: [{ required: true, message: '是否与博主联系为必填项！' }],
        initialValue: isContacted ? isContacted : 1
      })(
        <RadioGroup>
          <Radio value={1}>是</Radio>
          <Radio value={2}>否</Radio>
        </RadioGroup>
      )}
    </FormItem>
    <FormItem {...layout.full} label='是否在C端已注销'>
      {getFieldDecorator('strategyInfo.isSignedOff', {
        rules: [{ required: true, message: '是否在C端已注销为必填项！' }],
        initialValue: isSignedOff ? isSignedOff : 2
      })(
        <RadioGroup>
          <Radio value={1}>是</Radio>
          <Radio value={2}>否</Radio>
        </RadioGroup>
      )}
    </FormItem>
    <FormItem {...layout.full} label='是否可售卖'>
      <div>
        {isOnline && isOnline === 2 && <span>否</span>}
        {isOnline && isOnline === 2 && offlineReason &&
        <Tooltip title={handleReason(offlineReason)}>
          <a style={{ marginLeft: '20px' }}>显示原因</a>
        </Tooltip>
        }
        {isOnline && isOnline === 1 && <span>是</span>}
      </div>
    </FormItem>
    <Divider dashed />
    <FormItem {...layout.full} label='是否公开'>
      {getFieldDecorator('strategyInfo.isOpen', {
        rules: [{ required: true, message: '是否公开为必填项！' }],
        initialValue: isOpen ? isOpen : 1
      })(
        <RadioGroup>
          <Radio value={1}>是</Radio>
          <Radio value={2}>否</Radio>
        </RadioGroup>
      )}
    </FormItem>
    <FormItem {...layout.full} label='是否被官方屏蔽'>
      {getFieldDecorator('strategyInfo.isShielded', {
        rules: [{ required: true, message: '是否被官方屏蔽必填项！' }],
        initialValue: isShielded ? isShielded : 2
      })(
        <RadioGroup>
          <Radio value={1}>是</Radio>
          <Radio value={2}>否</Radio>
        </RadioGroup>
      )}
    </FormItem>
    <FormItem {...layout.full} label='可在A端上架'>
      <div>
        {aOnShelfStatus && aOnShelfStatus === 2 && <span>否</span>}
        {aOnShelfStatus && aOnShelfStatus === 2 && aOffShelfReasonStringList &&
        <Tooltip title={handleReason(aOffShelfReasonStringList)}>
          <a style={{ marginLeft: '20px' }}>显示原因</a>
        </Tooltip>
        }
        {aOnShelfStatus && aOnShelfStatus === 1 && <span>是</span>}
        {!aOnShelfStatus && '--'}
      </div>
    </FormItem>
    <FormItem {...layout.full} label='可在B端上架'>
      <div>
        {bOnShelfStatus && bOnShelfStatus === 2 && <span>否</span>}
        {bOnShelfStatus && bOnShelfStatus === 2 && bOffShelfReasonStringList &&
        <Tooltip title={handleReason(bOffShelfReasonStringList)}>
          <a style={{ marginLeft: '20px' }}>显示原因</a>
        </Tooltip>
        }
        {bOnShelfStatus && bOnShelfStatus === 1 && <span>是</span>}
        {!bOnShelfStatus && '--'}
      </div>
    </FormItem>
  </div>
};

/**
 * maxOrderCount - 最大接单数
 */
export const MaxOrderCount = (props) => {
  const {
    form: { getFieldDecorator, getFieldValue },
    layout,
    data: { account }
  } = props;
  const {
    maxOrderCount,
    maxOrderCountNote
  } = account.strategyInfo;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label=" ">
      {getFieldDecorator('_client.isFinite', {
        valuePropName: 'checked',
        initialValue: !!maxOrderCount
      })(
        <Checkbox>接单上限</Checkbox>
      )}
    </FormItem>
    {getFieldValue('_client.isFinite') &&
    <div>
      <FormItem
        label="每日最大接单数"
        {...layout.half}
      >
        {getFieldDecorator('strategyInfo.maxOrderCount', {
          rules: [{ required: true, message: '请填写每日最大接单数！' }],
          initialValue: maxOrderCount || 1
        })(
          <InputNumber min={1} max={99} precision={0} style={{ width: '100%' }} />
        )}
      </FormItem>
      <FormItem
        label="备注"
        {...layout.half}
      >
        {getFieldDecorator('strategyInfo.maxOrderCountNote', {
          rules: [{
            max: 1000,
            message: '备注不能超过1000字'
          }],
          initialValue: maxOrderCountNote
        })(
          <TextArea style={{ width: '100%' }} />
        )}
      </FormItem>
    </div>}
  </div>
};

/**
 * strategy - 暂离设置
 */
export const Strategy = (props) => {
  const {
    form: { getFieldDecorator, getFieldValue },
    layout,
    data: { account }
  } = props;
  const {
    strategy = {}
  } = account.strategyInfo;

  const disabledStartDate = () => {
    const endValue = getFieldValue('strategyInfo.strategy.endTimeOfTime');
    if (endValue) {
      let flag = moment(endValue).hour();
      return createRange(0, 24).slice(flag, 24)
    }
    return [23]
  }
  const disabledEndDate = () => {
    const startValue = getFieldValue('strategyInfo.strategy.startTimeOfTime');
    if (startValue) {
      let flag = moment(startValue).hour();
      return createRange(0, 24).slice(0, flag + 1)
    }
    return [0]
  }

  const checkWeeks = (rule, value, callback) => {
    value = handleWeeks(value)
    if (value.length > 6) {
      return callback('最多选择6天!')
    }
    return callback()
  }

  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label=" ">
      {getFieldDecorator('_client.isLeave', {
        valuePropName: 'checked',
        initialValue: Object.keys(strategy).length > 0
      })(
        <Checkbox>暂离</Checkbox>
      )}
    </FormItem>
    {getFieldValue('_client.isLeave') &&
    <div>
      <FormItem {...layout.full} label=" ">
        {getFieldDecorator('strategyInfo.strategy.type', {
          initialValue: strategy.type,
          rules: [{
            required: true,
            message: '请选择对应的时间类型'
          }]
        })(
          <RadioGroup>
            <Radio value={1}>每日</Radio>
            <Radio value={2}>每周</Radio>
            <Radio value={3}>自定义时间</Radio>
          </RadioGroup>
        )}
      </FormItem>
      {getFieldValue('strategyInfo.strategy.type') === 2 && <FormItem {...layout.full} label=' '>
        {getFieldDecorator('strategyInfo.strategy.weeks', {
          initialValue: handleWeeks(strategy.weeks),
          rules: [
            { required: true, message: '请选择星期！' },
            { validator: checkWeeks }
          ]
        })(
          <CheckboxGroup options={[
            { label: '星期一', value: '1' },
            { label: '星期二', value: '2' },
            { label: '星期三', value: '3' },
            { label: '星期四', value: '4' },
            { label: '星期五', value: '5' },
            { label: '星期六', value: '6' },
            { label: '星期日', value: '7' }]
          } />
        )}
      </FormItem>}
      {(getFieldValue('strategyInfo.strategy.type') === 1 || getFieldValue('strategyInfo.strategy.type') === 2) &&
      <div>
        <FormItem {...layout.full} label='离开时间' style={{ display: 'inner-block' }}>
          {getFieldDecorator('strategyInfo.strategy.startTimeOfTime', {
            rules: [{ required: true, message: '离开时间不能为空' }],
            initialValue: strategy.startTimeOfTime ? moment(strategy.startTimeOfTime, 'HH:mm') : null
          })(
            <TimePicker
              placeholder="离开时间"
              disabledHours={disabledStartDate}
              minuteStep={15}
              format="HH:mm"
            />
          )}
        </FormItem>
        <FormItem {...layout.full} label='返回时间' style={{ display: 'inner-block' }}>
          {getFieldDecorator('strategyInfo.strategy.endTimeOfTime', {
            rules: [{ required: true, message: '返回时间不能为空' }],
            initialValue: strategy.endTimeOfTime ? moment(strategy.endTimeOfTime, 'HH:mm') : null
          })(
            <TimePicker
              placeholder="返回时间"
              disabledHours={disabledEndDate}
              minuteStep={15}
              format="HH:mm"
            />
          )}
        </FormItem>
        <FormItem {...layout.full} label='备注'>
          {getFieldDecorator('strategyInfo.strategy.comment', {
            rules: [{
              max: 1000, message: '备注不能超过1000字'
            }],
            initialValue: strategy.comment
          })(
            <TextArea style={{ width: '35%' }} />
          )}
        </FormItem>
      </div>}
      {getFieldValue('strategyInfo.strategy.type') === 3 && <FormItem {...layout.full} label="选择时间">
        {getFieldDecorator('strategyInfo.strategy.otherTime', {
          initialValue: (strategy.startTimeOfDate && strategy.endTimeOfDate) ? [moment(strategy.startTimeOfDate), moment(strategy.endTimeOfDate)] : [],
          rules: [{ type: 'array', required: true, message: '请填入对应的时间！' }],
          getValueFromEvent: (value) => {
            if (value && value.length) {
              let [start, end] = value
              if (start.minute() % 15) {
                start.minute(0)
              }
              if (end.minute() % 15) {
                end.minute(0)
              }
              start.second(0);
              end.second(0);
              return [start, end]
            }
          }
        })(
          <RangePicker
            showTime={{ minuteStep: 15, format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm"
            disabledDate={(current) => current && current < moment().startOf('day')}
          />
        )}
      </FormItem>}
    </div>}
  </div>
};

/* endregion  strategyInfo - 策略信息  */

/* region otherInfo - 其他信息 */

/**
 * isLowQuality - 是否劣质号
 */
export const IsLowQuality = (props) => {
  const {
    layout,
    data: { account }
  } = props;
  const {
    isLowQuality,
    lowQualityReasonList
  } = account.otherInfo;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label='是否劣质号'>
      {isLowQuality ? <div>
        {isLowQuality === 1 && <Tooltip title={handleReason(lowQualityReasonList)}>
          <span>是</span>
        </Tooltip>}
        {isLowQuality === 2 && <span>否</span>}
      </div> : '未获取到数据'}
    </FormItem>
  </div>
};

/**
 * mediaTeamNote - 媒介备注
 */
export const MediaTeamNote = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    data: { account }
  } = props;
  const {
    mediaTeamNote
  } = account.otherInfo;
  return <div className='field-wrap-item'>
    <FormItem label="媒介备注"  {...layout.half} >
      {getFieldDecorator('otherInfo.mediaTeamNote', {
        rules: [{
          max: 1000,
          message: '媒介备注不能超过1000字'
        }],
        initialValue: mediaTeamNote
      })(
        <TextArea style={{ width: '100%' }} />
      )}
    </FormItem>
  </div>
};

/* endregion otherInfo - 其他信息 */

/* region price - 报价信息 */

/**
 * referencePrice - 参考报价
 */
export const ReferencePrice = (props) => {
  const {
    layout,
    data: { account }
  } = props;
  const {
    priceMicroTaskTweet,
    priceMicroTaskRetweet,
    priceWeiqTweet,
    priceWeiqRetweet,
    weitaskFetchedTime
  } = account;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label='参考报价'>
      <div className='sina-reference-table'>
        <table>
          <tbody>
          <tr>
            <th>微任务原发价</th>
            <td>{priceMicroTaskTweet || '--'}</td>
          </tr>
          <tr>
            <th>微任务转发价</th>
            <td>{priceMicroTaskRetweet || '--'}</td>
          </tr>
          <tr>
            <th>WEIQ原发价</th>
            <td>{priceWeiqTweet || '--'}</td>
          </tr>
          <tr>
            <th>WEIQ转发价</th>
            <td>{priceWeiqRetweet || '--'}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <p className='input-desc-bottom'>微任务,
        WEIQ价格更新时间: <span>{weitaskFetchedTime ? moment(weitaskFetchedTime).format('YYYY-MM-DD') : '--'}</span>
      </p>
    </FormItem>
  </div>;
};

/**
 * priceInclude - 报价包含
 */
export const PriceInclude = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    data: { priceInfo }
  } = props;
  const {
    isSupportTopicAndLink,
    isPreventShielding
  } = priceInfo;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label='报价包含'>
      {getFieldDecorator('isPreventShielding', {
        valuePropName: 'checked',
        initialValue: isPreventShielding === 1
      })(
        <Checkbox>防屏蔽（博主可自行下微任务/接WEIQ订单）</Checkbox>)}
    </FormItem>
    <FormItem style={{ top: '-16px' }}  {...layout.full} label=' ' colon={false}>
      {getFieldDecorator('isSupportTopicAndLink', {
        valuePropName: 'checked',
        initialValue: isSupportTopicAndLink === 1
      })(
        <Checkbox>话题/@/链接 </Checkbox>)}
    </FormItem>
  </div>;
};

/**
 * isAcceptHardAd - 接硬广
 * */
export const IsAcceptHardAd = (props) => {
  const {
    form: { getFieldDecorator, getFieldValue },
    layout,
    data: { priceInfo }
  } = props;
  const {
    isAcceptHardAd,
    isAcceptHardAdDescription
  } = priceInfo;
  let style = {};
  let show = false;
  if (getFieldValue('isAcceptHardAd') === undefined) {
    style = (isAcceptHardAd === 1) ? { display: 'block' } : { display: 'none' };
    show = isAcceptHardAd === 1;
  } else {
    style = (getFieldValue('isAcceptHardAd')) ? { display: 'block' } : { display: 'none' };
    show = getFieldValue('isAcceptHardAd');
  }
  return <div className='field-wrap-item'>
    <FormItem label=" "  {...layout.full} >
      {getFieldDecorator('isAcceptHardAd', {
        rules: [{ required: false }],
        valuePropName: 'checked',
        initialValue: isAcceptHardAd === 1
      })(
        <Checkbox>接硬广</Checkbox>
      )}
    </FormItem>
    {show ? <FormItem style={style} label="备注" {...layout} {...layout.half}>
      {getFieldDecorator('isAcceptHardAdDescription', {
        rules: [{ max: 1000, message: '备注不能超过1000字' }],
        initialValue: isAcceptHardAdDescription
      })(
        <TextArea />
      )}
    </FormItem> : null}
  </div>;
};

/* endregion price - 报价信息 */

/* region personalInfo - 博主个人信息 */

/**
 * sexualOrientation - 性取向
 */
export const SexualOrientation = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    data: { account }
  } = props;
  const {
    sexualOrientation
  } = account.personalInfo;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label='性取向'>
      {getFieldDecorator('personalInfo.sexualOrientation', {
        initialValue: sexualOrientation
      })(
        <RadioGroup>
          <Radio value={1}>同性</Radio>
          <Radio value={2}>异性</Radio>
          <Radio value={3}>双性</Radio>
        </RadioGroup>
      )}
    </FormItem>
  </div>
};

/**
 * gender - 性别
 */
export const Gender = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    data: { account }
  } = props;
  const {
    gender,
    genderFrom,
    genderMaintainedTime
  } = account.personalInfo;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label='性别'>
      {getFieldDecorator('personalInfo.gender', {
        initialValue: gender
      })(
        <RadioGroup>
          <Radio value={1}><EmSpan length={2}>男</EmSpan></Radio>
          <Radio value={2}><EmSpan length={2}>女</EmSpan></Radio>
          <Radio value={3}>未知</Radio>
        </RadioGroup>
      )}
    </FormItem>
    {getFieldDecorator('personalInfo.genderFrom', { initialValue: genderFrom })(
      <input type="hidden" />)}
    {getFieldDecorator('personalInfo.genderMaintainedTime', { initialValue: genderMaintainedTime })(
      <input type="hidden" />)}
  </div>
};

/**
 * area - 常住地
 */
export const Area = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    data: { account }
  } = props;
  const {
    area = {},
    areaIdFrom,
    areaIdMaintainedTime
  } = account.personalInfo;
  return <div className='field-wrap-item'>
    <FormItem {...layout.half} label='常住地'>
      {getFieldDecorator('personalInfo.area', {
        initialValue: area
      })(
        <LazyAreaOptions level={3} disabled={areaIdFrom === 2} placeholder="请选择您所处常住地" />
      )}
    </FormItem>
    {getFieldDecorator('personalInfo.areaIdFrom', { initialValue: areaIdFrom })(
      <input type="hidden" />)}
    {getFieldDecorator('personalInfo.areaIdMaintainedTime', { initialValue: areaIdMaintainedTime })(
      <input type="hidden" />)}
  </div>
};

/**
 * shipping - 收货地址
 */
export const Shipping = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    data: { account }
  } = props;
  const {
    shipping = {}
  } = account.personalInfo;
  return <div className='field-wrap-item'>
    <FormItem {...layout.half} label='收货地址'>
      {getFieldDecorator('personalInfo.shipping', {
        initialValue: shipping
      })(
        <ShippingAddress />
      )}
    </FormItem>
  </div>
};

/**
 * birthDate - 生日
 */
export const Birthday = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    data: { account }
  } = props;
  const {
    birthDate
  } = account.personalInfo;
  return <div className='field-wrap-item'>
    <FormItem {...layout.half} label='生日'>
      {getFieldDecorator('personalInfo.birthDate', {
        initialValue: initialMoment(birthDate)
      })(
        <DatePicker allowClear={false} style={{ width: '100%' }} placeholder='请选择您的生日' disabledDate={date => {
          return date.isBefore(moment().subtract(150, 'y')) || date.isAfter(moment())
        }} />
      )}
    </FormItem>
  </div>
};

/**
 * nationality - 国籍
 */
export const Nationality = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    options = [],
    data: { account }
  } = props;
  const {
    nationalityId
    // nationalityName
  } = account.personalInfo;
  return <div className='field-wrap-item'>
    <FormItem {...layout.half} label='国籍'>
      {getFieldDecorator('personalInfo.nationalityId', {
        initialValue: nationalityId === -1 ? undefined : nationalityId
      })(
        options.length > 0 ? <Select style={{ width: "100%" }} placeholder='请选择'>
          {
            options.map(({ value, label }) =>
              <Option key={value} value={parseInt(value)}>{label}</Option>)
          }
        </Select> : <FieldsOptionsLoading />
      )}
    </FormItem>
  </div>
};

/**
 * industry - 行业
 */
export const Industry = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    options = [],
    data: { account }
  } = props;
  const {
    industryId
  } = account.personalInfo;
  return <div className='field-wrap-item'>
    <FormItem {...layout.half} label='行业'>
      {getFieldDecorator('personalInfo.industryId', {
        initialValue: industryId || undefined
      })(
        options.length > 0 ? <Select style={{ width: "100%" }} placeholder='请选择您所处行业'>
          {
            options.map(({ value, label }) =>
              <Option key={value} value={parseInt(value)}>{label}</Option>)
          }
        </Select> : <FieldsOptionsLoading />
      )}
    </FormItem>
  </div>
};

/**
 * occupations - 职业
 */
export const Occupations = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    options = [],
    data: { account }
  } = props;
  const {
    occupations = []
  } = account.personalInfo;
  return <div className='field-wrap-item'>
    <FormItem {...layout.half} label='职业'>
      {getFieldDecorator('personalInfo.occupationIds', {
        initialValue: occupations.map(item => item.id || item)
      })(
        options.length > 0 ? <Select mode='multiple' style={{ width: "100%" }} placeholder='请选择' optionFilterProp='children'>
          {
            options.map(({ value, label }) =>
              <Option key={value} value={parseInt(value)}>{label}</Option>)
          }
        </Select> : <FieldsOptionsLoading />
      )}
    </FormItem>
  </div>
};

/**
 * educationQualification - 学历
 */
export const EducationQualification = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    options = [],
    data: { account }
  } = props;
  const {
    educationQualification
  } = account.personalInfo;
  return <div className='field-wrap-item'>
    <FormItem {...layout.half} label='学历/学位'>
      {getFieldDecorator('personalInfo.educationQualification', {
        initialValue: educationQualification === -1 ? undefined : educationQualification
      })(
        options.length > 0 ? <Select style={{ width: "100%" }} placeholder='请选择'>
          {
            options.map(({ key, text }) =>
              <Option key={key} value={parseInt(key)}>{text}</Option>)
          }
        </Select> : <FieldsOptionsLoading />
      )}
    </FormItem>
  </div>
};

/**
 * relationshipStatus - 情感状况
 */
export const RelationshipStatus = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    options = [],
    data: { account }
  } = props;
  const {
    relationshipStatus
  } = account.personalInfo;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label='情感状况'>
      {getFieldDecorator('personalInfo.relationshipStatus', {
        initialValue: relationshipStatus
      })(
        options.length > 0 ? <RadioGroup>
          {
            options.map(item => <Radio key={item.value} value={item.value}>{item.label}</Radio>)
          }
        </RadioGroup> : <FieldsOptionsLoading />
      )}
    </FormItem>
  </div>
};

/**
 * hasHouse, hasCar - 资产
 */
export const Assets = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    data: { account }
  } = props;
  const {
    hasHouse,
    hasCar
  } = account.personalInfo;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label='资产'>
      {getFieldDecorator('personalInfo.hasHouse', {
        initialValue: hasHouse,
        valuePropName: 'checked',
        getValueFromEvent: e => {
          return e.target.checked ? 1 : 2
        }
      })(
        <CheckedWrap mapBooleanToValueAry={[2, 1]}>有房</CheckedWrap>
      )}
      {getFieldDecorator('personalInfo.hasCar', {
        initialValue: hasCar,
        valuePropName: 'checked',
        getValueFromEvent: e => {
          return e.target.checked ? 1 : 2
        }
      })(
        <CheckedWrap mapBooleanToValueAry={[2, 1]}>有车</CheckedWrap>
      )}
    </FormItem>
  </div>
};

/**
 * children - 宝宝信息
 */
export const Children = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    data: { account }
  } = props;
  const {
    children
  } = account.personalInfo;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label='宝宝信息'>
      {getFieldDecorator('personalInfo.children', {
        initialValue: children
      })(
        <ChildrenList {...props} />
      )}
    </FormItem>
  </div>
};

/**
 * pets - 宠物信息
 */
export const Pets = (props) => {
  const {
    form: { getFieldDecorator, getFieldValue },
    layout,
    options = [],
    data: { account }
  } = props;
  const {
    pets,
    customPets
  } = account.personalInfo;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label='宠物信息'>
      {getFieldDecorator('_client.pets', {
        initialValue: {
          defaultItems: (pets || []).map(item => item.id || item),
          custom: customPets || []
        }
      })(
        options.length > 0 ? <DefaultAndCustomTag
          options={options}
          placeholder='请输入1~10字'
          rules={[
            { required: true, pattern: /^[^\s]{1,10}$/, message: '请输入1~10个中英文数字符号' },
            { validator: checkForSensitiveWord, name: '添加内容' },
            {
              validator: checkDefaultAndCustomTagRepeat(() => {
                let { custom } = getFieldValue('_client.pets')
                return [].concat(options.map(item => item.name), custom)
              })
            }
          ]}
        /> : <FieldsOptionsLoading />
      )}
    </FormItem>
  </div>
};

/**
 * skills - 选择技能
 */
export const Skills = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    options = [],
    data: { account }
  } = props;
  const {
    skills
  } = account.personalInfo;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label='技能'>
      {getFieldDecorator('personalInfo.skills', {
        initialValue: skills.map(item => item.skillId || item)
      })(
        options.length > 0 ? <Select
          mode='multiple'
          style={{ width: '100%' }}
          placeholder='添加您的特长或才艺，将提升您的竞争力，在同类账号中更加突出哦~'
          allowClear
          showArrow
          optionFilterProp='children'
        >
          {
            options.map(item => <OptGroup label={item.label} key={item.value}>
              {
                item.children.map(n => <Option value={n.value} key={n.value}>{n.label}</Option>)
              }
            </OptGroup>)
          }
        </Select> : <FieldsOptionsLoading />
      )}
    </FormItem>
  </div>
};

/**
 * customSkills - 其他技能
 */
export const CustomSkills = (props) => {
  const {
    form: { getFieldDecorator, getFieldValue },
    layout,
    options = [],
    data: { account }
  } = props;
  const {
    customSkills = []
  } = account.personalInfo;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label='其他技能'>
      {getFieldDecorator('_client.skills', {
        initialValue: {
          defaultItems: [],
          custom: customSkills || []
        }
      })(
        <DefaultAndCustomTag
          options={options}
          placeholder='请输入1~10字'
          rules={[
            { required: true, pattern: /^[^\s]{1,10}$/, message: '请输入1~10个中英文数字符号' },
            { validator: checkForSensitiveWord, name: '添加内容' },
            {
              validator: checkDefaultAndCustomTagRepeat(() => {
                let { custom } = getFieldValue('_client.skills')
                return [].concat(options.map(item => item.name), custom)
              })
            }
          ]}
        />
      )}
    </FormItem>
  </div>
};


/* endregion personalInfo - 博主个人信息 */

/* region  trinity 三方报价相关  */

/**
 * trinityIsPreventShielding - 三方平台报价项及相关设置
 */
export const TrinityConfigAndPrice = (props) => {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 }
    }
  };
  const {
    form: { getFieldDecorator, getFieldValue },
    data: { trinityPriceInfo }
  } = props;
  const {
    trinityIsPreventShielding,
    trinityIsPreventShieldingManual,
    trinityIsPreventShieldingAutomated,
    trinityPlaceOrderType,
    cooperationPlatformResVOS = []
  } = trinityPriceInfo;
  let name = cooperationPlatformResVOS.map(item => item.cooperationPlatformName).join('/') || '三方平台';
  return <div className='field-wrap-item'>
    <FormItem {...formItemLayout} label={`可在${name}下单(机维)`}>
      {getFieldDecorator('trinityIsPreventShieldingAutomated', {
        initialValue: trinityIsPreventShieldingAutomated
        // rules: [{ required: true, message: '本项为必选项，请选择！' }]
      })(
        <RadioGroup disabled>
          <Radio value={1}>是</Radio>
          <Radio value={2}>否</Radio>
        </RadioGroup>
      )}
    </FormItem>
    <FormItem {...formItemLayout} label={` `} colon={false}>
      {getFieldDecorator('_trinityIsPreventShieldingManual_', {
        initialValue: trinityIsPreventShieldingManual > 0,
        valuePropName: 'checked'
      })(
        <Checkbox>人工控制可在{name}下单</Checkbox>
      )}
      <div style={{ color: 'red' }}>
        注：如果勾选此处，将以人工控制结果为准，若要恢复机维请取消勾选！
      </div>
    </FormItem>
    {getFieldValue('_trinityIsPreventShieldingManual_') ?
      <FormItem {...formItemLayout} label={`强制可在${name}下单结果`}>
        {getFieldDecorator('trinityIsPreventShieldingManual', {
          initialValue: trinityIsPreventShieldingManual || undefined,
          rules: [{ required: true, message: '本项为必选项，请选择！' }]
        })(
          <RadioGroup>
            <Radio value={1}>强制可下单</Radio>
            <Radio value={2}>强制不可下单</Radio>
          </RadioGroup>
        )}
      </FormItem> : null}
    {getFieldValue('trinityIsPreventShieldingAutomated') === 1 ||
    (getFieldValue('_trinityIsPreventShieldingManual_') &&
      getFieldValue('trinityIsPreventShieldingManual') === 1) ?
      <FormItem {...formItemLayout} label='下单方'>
        {getFieldDecorator('trinityPlaceOrderType', {
          initialValue: trinityPlaceOrderType,
          rules: [{ required: true, message: '本项为必选项，请选择！' }]
        })(
          <RadioGroup>
            <Radio value={2}>博主自行下单</Radio>
            <Radio value={1}>微播易代下单</Radio>
          </RadioGroup>
        )}
      </FormItem> : null}
    {
      cooperationPlatformResVOS.map((item, n) => {
        let { trinitySkuInfoResVOList: priceList = [], trinityTollTypeVOList: otherList = [] } = item;
        return <div key={n}>
          {priceList.length ?
            <FormItem {...formItemLayout} label={`${item.cooperationPlatformName}参考报价`}>
              <div className='trinity-reference-table'>
                <table>
                  <tbody>
                  <tr>
                    <th>报价项名称</th>
                    <th>报价</th>
                    <th>更新时间</th>
                    <th>更新人</th>
                  </tr>
                  {
                    priceList.map((sku, i) => {
                      return <tr key={sku.trinitySkuKey}>
                        <th>{sku.wbyTypeName}</th>
                        <td style={{ padding: '0 4px', textAlign: 'left' }}>
                          <FormItem>
                            {getFieldDecorator(`trinitySkuInfoVOS[${n}].list[${i}].publicCostPrice`, {
                              initialValue: sku.publicCostPrice,
                              rules: [{
                                required: (sku.publicCostPrice === 0 || sku.publicCostPrice),
                                message: '请输入大于等于0的数'
                              }]
                            })(
                              <InputNumber
                                placeholder="报价保留两位小数"
                                min={0}
                                precision={2}
                                max={999999999}
                                style={{ width: '100%' }}
                              />)}
                          </FormItem>
                        </td>
                        <td>
                          {sku.publicCostPriceMaintainedTime || '--'}
                        </td>
                        <td>
                          {sku.publicCostPriceFrom === 2 ? '系统' : sku.modifiedName}
                        </td>
                        {getFieldDecorator(`trinitySkuInfoVOS[${n}].list[${i}].trinitySkuTypeId`, {
                          initialValue: sku.trinitySkuTypeId
                        })(<input type='hidden' />)}
                        {getFieldDecorator(`trinitySkuInfoVOS[${n}].list[${i}].trinitySkuKey`, {
                          initialValue: sku.trinitySkuKey
                        })(<input type='hidden' />)}
                      </tr>;
                    })
                  }
                  </tbody>
                </table>
              </div>
            </FormItem> : null}
          {otherList.length ? <FormItem {...formItemLayout} label='附加费参考报价'>
            <div className='trinity-reference-table'>
              <table>
                <tbody>
                <tr>
                  <th>附加费名称</th>
                  <th>比例</th>
                  <th>更新时间</th>
                  <th>更新人</th>
                </tr>
                {
                  otherList.map((trinity, i) => {
                    return <tr key={i}>
                      <th>{trinity.tollTypeName}</th>
                      <td>
                        {trinity.serviceRatio} %
                      </td>
                      <td>
                        {trinity.modifiedAt || '--'}
                      </td>
                      <td>
                        {trinity.modifiedName}
                      </td>
                    </tr>;
                  })
                }
                </tbody>
              </table>
            </div>
          </FormItem> : null}
          {getFieldDecorator(`trinitySkuInfoVOS[${n}].trinityPlatformCode`, {
            initialValue: item.cooperationPlatformCode
          })(<input type='hidden' />)}
        </div>;
      })
    }
  </div>;
};


/* endregion  trinity 三方报价相关  */
