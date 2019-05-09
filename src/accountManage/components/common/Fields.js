import React from 'react';
import { Form, Select, Input, Checkbox, Popover, Radio } from 'antd';
import { OssUpload } from 'wbyui';
import SimpleTag from '../../base/SimpleTag';
import moment from 'moment';
import WBYUploadFile from "@/accountManage/base/NewUpload";
import InputCount from "@/accountManage/base/InputCount";

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

// 基础信息
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
 * AvatarUrl - 头像
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
            max: 5,
            suffix: 'bmp,jpg,gif,jpeg'
          }}
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
          rules: [{ required: true, message: '二维码不能为空' }]
        })(
          <OssUpload
            authToken={authToken}
            rule={{
              bizzCode: 'F_IMG_0001',
              max: 5,
              suffix: 'bmp,jpg,gif,jpeg'
            }}
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
        <TextArea placeholder={placeholder} autosize={{ minRows: 2, maxRows: 4 }} />
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
      {getFieldDecorator('extend.microFlashPost', {
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
