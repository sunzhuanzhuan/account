import React from 'react';
import { Form, Select, Input, Checkbox, Popover, Radio, InputNumber } from 'antd';
import { OssUpload } from 'wbyui';
import SimpleTag from '../../base/SimpleTag';
import moment from 'moment';
import InputCount from "@/accountManage/base/InputCount";
import CheckedWrap from "./CheckedWrap";
import WordList from "@/accountManage/components/common/WordList";
import debounce from 'lodash/debounce'

const Option = Select.Option;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { TextArea } = Input;

// 数据校验
const checkForSensitiveWord = action => (rule, value, callback) => {
  action({ string: value }).then(result => {
    let is_sensitive_words = result.data && result.data.is_sensitive_words;
    if (is_sensitive_words === 1) {
      callback('账号简介有敏感词，请重新填写');
    } else {
      callback();
    }
  });
};

// base - 账号基本信息
/**
 * snsUniqueId - 唯一标识
 */
export const UniqueId = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    data: { accountInfo }
  } = props;
  const {
    snsUniqueId
  } = accountInfo;
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
    data: { accountInfo }
  } = props;
  const {
    id
  } = accountInfo;
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
    data: { accountInfo }
  } = props;
  const {
    snsName,
    snsNameFrom,
    snsNameMaintainedTime
  } = accountInfo;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label='账号名称'>
      {getFieldDecorator('base.snsName', {
        initialValue: snsName,
        first: true,
        rules: [{ required: true, message: '账号名称不能为空' }, {
          pattern: /^(.){0,40}$/,
          message: '账号名称最多可输入80个字符'
        }]
      })(
        <InputCount placeholder="账号名称" showCount disabled={false} max={40} />
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
    data: { accountInfo }
  } = props;
  const {
    snsId,
    snsIdFrom,
    snsIdMaintainedTime
  } = accountInfo;
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
    data: { accountInfo }
  } = props;
  const {
    url,
    urlFrom,
    urlMaintainedTime
  } = accountInfo;
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
    data: { accountInfo },
    authToken
  } = props;
  const {
    avatarUrl,
    avatarUrlFrom,
    avatarUrlMaintainedTime
  } = accountInfo;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label='头像'>
      {getFieldDecorator('base.avatarUrl', {
        initialValue: avatarUrl,
        valuePropName: 'fileList',
        getValueFromEvent: e => e.fileList,
        rules: [{ required: true, message: '头像不能为空' }]
      })(
        <OssUpload
          authToken={authToken}
          rule={{
            bizzCode: 'F_IMG_0001',
            max: 50,
            suffix: 'bmp,jpg,png,tif,gif,pcx,tga,exif,fpx,svg,cdr,pcd,dxf,ufo,eps,raw,wmf,webp,flic,ico'
          }}
          tipContent='请上传50M以内的图片'
          showUploadList={{
            showPreviewIcon: true,
            showRemoveIcon: !(avatarUrlFrom === 2)
          }}
          len={1}
          disabled={avatarUrlFrom === 2}
          listType='picture-card'
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
    data: { accountInfo },
    authToken
  } = props;
  const {
    qrCodeUrl,
    qrCodeUrlFrom,
    qrCodeUrlMaintainedTime
  } = accountInfo;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label='二维码'>
      <div className='clearfix'>
        {getFieldDecorator('base.qrCodeUrl', {
          initialValue: qrCodeUrl ? [{
            name: qrCodeUrl,
            url: qrCodeUrl,
            filepath: qrCodeUrl
          }] : [],
          valuePropName: 'fileList',
          getValueFromEvent: e => e.fileList,
          rules: [{ required: true, message: '二维码不能为空' }]
        })(
          <OssUpload
            authToken={authToken}
            rule={{
              bizzCode: 'F_IMG_0001',
              max: 50,
              suffix: 'bmp,jpg,png,tif,gif,pcx,tga,exif,fpx,svg,cdr,pcd,dxf,ufo,eps,raw,wmf,webp,flic,ico'
            }}
            tipContent='请上传50M以内的图片'
            showUploadList={{
              showPreviewIcon: true,
              showRemoveIcon: !(qrCodeUrlFrom === 2)
            }}
            disabled={qrCodeUrlFrom === 2}
            len={1}
            listType='picture-card'
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
    data: { accountInfo },
    actions: { sensitiveWordsFilter },
    placeholder
  } = props;
  const {
    introduction
  } = accountInfo;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label='账号简介'>
      {getFieldDecorator('base.introduction', {
        initialValue: introduction,
        first: true,
        validateTrigger: 'onBlur',
        rules: [{
          max: 1000,
          message: '账号简介不能超过1000字'
        }, { validator: checkForSensitiveWord(sensitiveWordsFilter) }]
      })(
        <TextArea placeholder={placeholder || '请输入账号简介'} autosize={{ minRows: 2, maxRows: 4 }} />
      )}
    </FormItem>
  </div>
};

/**
 * weiboUrl - 新浪微博
 */
export const WeiboUrl = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    data: { accountInfo }
  } = props;
  const {
    weiboUrl
  } = accountInfo;
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
    data: { accountInfo }
  } = props;
  const {
    microFlashPost = 0,
    isFamous
  } = accountInfo;
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
export const ContentCategory = (props) => {
  const {
    // form: { getFieldDecorator },
    layout,
    data: { accountInfo }
  } = props;
  const {
    classificationList: category = [{ name: '美食' }, { name: '游戏' }]
  } = accountInfo;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label='内容分类'>
      {category.length ?
        <div>
          {
            category.map(({ name }) => <SimpleTag key={name}>{name}</SimpleTag>)
          }
          <a>分类错误?</a>
        </div>
        : '暂无分类'}
    </FormItem>
  </div>
};

/**
 * followerCount - 粉丝数
 */
export const FollowerCount = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    data: { accountInfo }
  } = props;
  const {
    disabled,
    followerCount,
    followerCountFrom,
    followerCountMaintainedTime
  } = accountInfo;
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
    data: { accountInfo },
    authToken,
    disabled
  } = props;
  const {
    followerCountScreenshotUrl: url
  } = accountInfo;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label='粉丝截图'>
      {getFieldDecorator('base.followerCountScreenshotUrl', {
        initialValue: url ? [{
          name: url,
          url: url,
          filepath: url
        }] : [],
        valuePropName: 'fileList',
        getValueFromEvent: e => e.fileList,
        rules: [{ required: true, message: '请上传粉丝截图' }]
      })(
        <OssUpload
          authToken={authToken}
          rule={{
            bizzCode: 'F_IMG_0001',
            max: 50,
            suffix: 'bmp,jpg,png,tif,gif,pcx,tga,exif,fpx,svg,cdr,pcd,dxf,ufo,eps,raw,wmf,webp,flic,ico'
          }}
          tipContent='请上传50M以内的图片'
          showUploadList={{
            showPreviewIcon: true,
            showRemoveIcon: !(disabled === 2)
          }}
          disabled={disabled === 2}
          len={1}
          listType='picture-card'
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
    data: { accountInfo },
    disabled
  } = props;
  const {
    followerCountVerificationStatus: status
  } = accountInfo;
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
    data: { accountInfo },
    options
  } = props;
  const {
    level,
    levelFrom,
    levelMaintainedTime
  } = accountInfo;
  return <div className='field-wrap-item'>
    <FormItem {...layout.half} label='平台等级:'>
      {getFieldDecorator('base.level', {
        rules: [{ required: false }],
        initialValue: level
      })(
        options ?
          <Select style={{ width: "100%" }} placeholder='请选择'>
            {
              Object.entries(options).map(([key, text]) =>
                <Option key={key} value={parseInt(key)}>{text}</Option>)
            }
          </Select> :
          <InputNumber placeholder='请输入' style={{ width: "100%" }} min={0} max={300} disabled={levelFrom === 2} />
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
    data: { accountInfo }
  } = props;
  const {
    mediaType
  } = accountInfo;
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
    actions: { sensitiveWordsFilter },
    layout,
    data: { accountInfo }
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
  } = accountInfo;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label='是否认证'>
      {getFieldDecorator('base.isVerified', {
        initialValue: isVerified
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
          initialValue: verifiedStatus || 2
        })(
          <RadioGroup  disabled={verifiedStatusFrom === 2}>
            <Radio value={2}>黄V</Radio>
            <Radio value={3}>蓝V</Radio>
            <Radio value={6}>金V</Radio>
            <Radio value={4}>达人</Radio>
          </RadioGroup>
        )}
      </FormItem>
      <FormItem {...layout.half} label='认证说明'>
        {getFieldDecorator('base.verificationInfo', {
          validateFirst: true,
          rules: [
            { required: true, message: '请填写认证说明' },
            { pattern: /.{2,40}/, message: '请输入2~40字的认证原因' },
            { validator: checkForSensitiveWord(sensitiveWordsFilter) }
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
 * isOpenStore - 橱窗/店铺
 */
export const OpenStore = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    data: { accountInfo }
  } = props;
  const {
    isOpenStore,
    isOpenStoreFrom,
    isOpenStoreMaintainedTime,
  } = accountInfo;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label='橱窗/店铺'>
      {getFieldDecorator('base.mediaType', {
        initialValue: isOpenStore
      })(
        <RadioGroup style={{ width: '100%' }}>
          <Radio value={1}>已开通</Radio>
          <Radio value={2}>未开通</Radio>
        </RadioGroup>
      )}
    </FormItem>
    {getFieldDecorator('base.isOpenStoreFrom', { initialValue: isOpenStoreFrom })(
      <input type="hidden" />)}
    {getFieldDecorator('base.isOpenStoreMaintainedTime', { initialValue: isOpenStoreMaintainedTime })(
      <input type="hidden" />)}
  </div>
};

/**
 * isOpenLiveProgram - 直播
 */
export const OpenLiveProgram = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    data: { accountInfo }
  } = props;
  const {
    isOpenLiveProgram,
    isOpenLiveProgramFrom,
    isOpenLiveProgramMaintainedTime,
  } = accountInfo;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label='直播'>
      {getFieldDecorator('base.isOpenLiveProgram', {
        initialValue: isOpenLiveProgram
      })(
        <RadioGroup style={{ width: '100%' }}>
          <Radio value={1}>已开通</Radio>
          <Radio value={2}>未开通</Radio>
        </RadioGroup>
      )}
    </FormItem>
    {getFieldDecorator('base.isOpenLiveProgramFrom', { initialValue: isOpenLiveProgramFrom })(
      <input type="hidden" />)}
    {getFieldDecorator('base.isOpenLiveProgramMaintainedTime', { initialValue: isOpenLiveProgramMaintainedTime })(
      <input type="hidden" />)}
  </div>
};

// cooperation - 合作相关
/**
 * isAcceptHardAd, isAcceptProductUse - 拒绝项
 */
export const DirectItems = (props) => {
  const {
    form: { getFieldDecorator },
    layout,
    data: { accountInfo }
  } = props;
  const {
    isAcceptHardAd,
    isAcceptProductUse,
  } = accountInfo;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label='拒绝项'>
      {getFieldDecorator('cooperation.isAcceptHardAd', {
        initialValue: isAcceptHardAd,
        valuePropName: 'checked',
        getValueFromEvent: e => {
          return e.target.checked ? 2 : 1
        }
      })(
        <CheckedWrap>不接受硬广</CheckedWrap>
      )}
      {getFieldDecorator('cooperation.isAcceptProductUse', {
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
    data: { accountInfo }
  } = props;
  const {
    refuseBrands,
  } = accountInfo;
  return <div className='field-wrap-item'>
    <FormItem {...layout.full} label='不接受的品牌'>
      {getFieldDecorator('cooperation.refuseBrands', {
        initialValue: refuseBrands || ['品牌一', '品牌二']
      })(
        <WordList
          placeholder='请输入2~20字的品牌名称'
          message='请输入2~20字的品牌名称'
          label='添加品牌'
          validator={value => {
          return !(value.length < 2 || value.length > 20)
        }}/>
      )}
    </FormItem>
  </div>
};



/**
 * 账号类型(入库用)
 */
export const AccountType = (props) => {
  const { getFieldDecorator, layout, halfWrapCol, data: { accountInfo } } = props;
  const {
    mediaType = 0
  } = accountInfo;
  return <FormItem {...layout} wrapperCol={halfWrapCol} label='账号类型'>
    {getFieldDecorator('base.mediaType', {
      initialValue: mediaType || 3
      // rules: [{ required: true, message: '账号类型必须选择' }]
    })(
      <Select style={{ width: '100%' }}>
        <Option value={3}>未知</Option>
        <Option value={1}>草根</Option>
        <Option value={2}>名人</Option>
        <Option value={4}>媒体</Option>
        <Option value={5}>个人</Option>
      </Select>
    )}
  </FormItem>;
};

/**
 * 利润等级
 */
export const ProfitLevel = (props) => {
  const { getFieldDecorator, layout, halfWrapCol, data: { priceInfo } } = props;
  const {
    profitGradeId
  } = priceInfo;
  return <FormItem {...layout} wrapperCol={halfWrapCol} label='利润等级'>
    {getFieldDecorator('profitGradeId', {
      initialValue: profitGradeId || 1,
      rules: [{ required: true, message: '' }]
    })(
      <Select style={{ width: '100%' }}>
        <Option value={1}>未知</Option>
      </Select>
    )}
  </FormItem>;
};


/**
 * 微博报价特有项(参考报价)
 */
export const ReferencePrice = (props) => {
  const { layout = {}, data: { accountInfo } } = props;
  const {
    priceMicroTaskTweet,
    priceMicroTaskRetweet,
    priceWeiqTweet,
    priceWeiqRetweet,
    weitaskFetchedTime
  } = accountInfo;
  return <div>
    <FormItem {...layout} label='参考报价'>
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
 * 微博报价特有项(报价包含)
 */
export const PriceInclude = (props) => {
  const { getFieldDecorator, layout = {}, data: { priceInfo } } = props;
  const {
    isSupportTopicAndLink,
    isPreventShielding
  } = priceInfo;
  return <div>
    <FormItem {...layout} label='报价包含'>
      {getFieldDecorator('isPreventShielding', {
        valuePropName: 'checked',
        initialValue: isPreventShielding == 1
      })(
        <Checkbox>防屏蔽（博主可自行下微任务/接WEIQ订单）</Checkbox>)}
    </FormItem>
    <FormItem style={{ top: '-16px' }}  {...layout} label=' ' colon={false}>
      {getFieldDecorator('isSupportTopicAndLink', {
        valuePropName: 'checked',
        initialValue: isSupportTopicAndLink == 1
      })(
        <Checkbox>话题/@/链接 </Checkbox>)}
    </FormItem>
  </div>;
};

/**
 * 账号报价帮助信息
 */
export const AccountPriceHelp = () => {
  const content = <div className='account-price-help-tips'>
    <img src={require('../../images/help.jpg')} />
  </div>;
  return <div>
    <Popover getPopupContainer={() => document.querySelector('.price_scroll_container') || document.querySelector('#account-manage-container')} placement="topLeft" title={null} content={content} trigger="click">
      <a>查看订单成本, 收入计算规则</a>
    </Popover>
  </div>;
};


/**
 * 可在A端展示
 */
export const DisplayForA = (props) => {
  const { getFieldDecorator, layout = {}, data: { accountInfo } } = props;
  const {
    isOpen = 1
  } = accountInfo;
  return <FormItem {...layout} label=' ' colon={false}>
    {getFieldDecorator('extend.isOpen', {
      valuePropName: 'checked',
      initialValue: isOpen == 1
    })(
      <Checkbox>可在A端展示</Checkbox>)}
  </FormItem>;
};
/**
 * 可接单(入库)
 */
export const Orderable = (props) => {
  const { getFieldDecorator, layout = {}, data: { accountInfo } } = props;
  const {
    isAllowOrderStatus = 1
  } = accountInfo;
  return <FormItem {...layout} label='是否可接单'>
    {getFieldDecorator('skuList.isAllowOrderStatus', {
      initialValue: isAllowOrderStatus || 1
    })(
      <RadioGroup>
        <Radio value={1}>是</Radio>
        <Radio value={2}>否</Radio>
      </RadioGroup>
    )}
  </FormItem>;
};
/**
 * 接单策略
 * */
export const OrderStrategy = (props) => {
  const { getFieldDecorator, getFieldValue, layout = {}, halfWrapCol, data: { priceInfo } } = props;
  const {
    isAcceptHardAd,
    isAcceptHardAdDescription
  } = priceInfo;
  let style = {};
  let show = false;
  if (getFieldValue('isAcceptHardAd') === undefined) {
    style = (isAcceptHardAd == 1) ? { display: 'block' } : { display: 'none' };
    show = isAcceptHardAd == 1;
  } else {
    style = (getFieldValue('isAcceptHardAd')) ? { display: 'block' } : { display: 'none' };
    show = getFieldValue('isAcceptHardAd');
  }
  return <div>
    <FormItem label="接硬广"  {...layout} >
      {getFieldDecorator('isAcceptHardAd', {
        rules: [{ required: false }],
        valuePropName: 'checked',
        initialValue: isAcceptHardAd == 1
      })(
        <Checkbox>接硬广</Checkbox>
      )}
    </FormItem>
    {show ? <FormItem style={style} label="备注" {...layout} wrapperCol={halfWrapCol}>
      {getFieldDecorator('isAcceptHardAdDescription', {
        rules: [{ max: 1000, message: '备注不能超过1000字' }],
        initialValue: isAcceptHardAdDescription
      })(
        <TextArea />
      )}
    </FormItem> : null}
  </div>;
};
