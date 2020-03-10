/**
 * Created by lzb on 2020-03-09.
 */
import React, {} from 'react';
import { Checkbox, Icon, Popconfirm, Popover } from "antd";

import './PolicyCard.less'
import PolicyStatus from "../base/PolicyStatus";
import Yuan from "@/base/Yuan";
import IconFont from "@/base/IconFont";

const data = {}
const PolicyCard = (props) => {
  return (
    <div className='policy-card-container active'>
      <section className='policy-card-container-prefix'>
        <Checkbox />
      </section>
      <section className='policy-card-container-main'>
        <header className='policy-card-container-main-header'>
          <div className="header-left">
            <PolicyStatus status={1} reason={"ss"} />
          </div>
          <ul className='header-center'>
            <li>政策ID：<a>{2222}</a></li>
            <li>政策级别：<Popover content={
              <div>
                <IconFont type="icon-level_S" /> 独家（1家）<br />
                <IconFont type="icon-level_A" /> 小圈（≤3家）<br />
                <IconFont type="icon-level_B" /> 大圈（≤6家）<br />
                <IconFont type="icon-level_C" /> 平价（≥6家）<br />
              </div>
            }>
              <IconFont type="icon-level_S" />
            </Popover></li>
            <li>主账号：<a>{"wangfei001"}</a></li>
            <li>主账号ID：<span className="text-black">{"898138"}</span></li>
            <li>有效期：<span className="text-black">{"2020.2.27-2020.7.30"}</span></li>
          </ul>
          <div className='header-right'>
            <a onClick={() => {}}>
              <Icon type="poweroff" />
              <span>启用</span>
            </a>
            <a onClick={() => {}}>
              <Icon type="download" />
              <span>下载</span>
            </a>
          </div>
        </header>
        <ul className='policy-card-container-main-center'>
          <li className='main-item-first'>
            <p className='fields-item-'>
              预约执行订单：
              2311
            </p>
            <p className='fields-item-'>
              预约执行金额：
              <Yuan className='text-red' value={999999999} format='0,0.00' />
            </p>
            <p className='fields-item-'>
              预约执行订单：
              2311
            </p>
            <p className='fields-item-'>
              预约执行金额：
              <Yuan className='text-red' value={999999999} format='0,0.00' />
            </p>
          </li>
          <li className='main-item-center'>
            <p className='fields-item-'>
              全局账号：
              <a>12</a>
              <a className='more-btn'>查看全部</a>
            </p>
            <ul className='fields-item-rules'>
              <li className='rule'>
                规则1：<br />
                折扣固定扣减90元<br />
                返点固定比例20%（季结）<br />
              </li>
              <li className='rule'>
                规则1：<br />
                折扣固定扣减90元<br />
                返点固定比例20%（季结）<br />
                <Popover title="啊啥大事" content={<div>
                  大于0 且小于等于1000， 比例12%<br />
                  大于1000 且小于等于2000， 比例15%<br />
                  大于2000 且小于等于999999999，比例20%<br />
                </div>}>
                  <a>查看</a>
                </Popover>
              </li>
            </ul>
          </li>
          <li className='main-item-center'>
            <p className='fields-item-'>
              特殊账号：
              <a>12</a>
            </p>
            <ul className='fields-item-rules'>
              <li className='rule'>
                规则1：<br />
                折扣固定扣减90元<br />
                返点固定比例20%（季结）<br />
              </li>
            </ul>
          </li>
          <li className='main-item-last'>
            <p className='fields-item-'>
              白名单：
              <a>12</a>
            </p>
          </li>
        </ul>
        <footer className='policy-card-container-main-footer'>
          <span className='fields-item-'>资源媒介：王一</span>
          <span className='fields-item-'>创建人：李大勇</span>
          <span className='fields-item-'>创建于：2020.2.10  13:00</span>
          <span className='fields-item-'>创建人：李大勇</span>
          <span className='fields-item-'>创建于：2020.2.10  13:00</span>
        </footer>
      </section>
    </div>
  );
};

export default PolicyCard;
