/**
 * Created by lzb on 2020-03-09.
 */
import React, { useEffect, useState } from 'react';
import { Table, Icon, Modal, Popconfirm, Popover, Tabs } from "antd";
import Global from "@/policyManage/components/accountModalList/Global";

const { TabPane } = Tabs
const data = {}


const PolicyAccountModal = (props) => {
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({})
  const [loading, setLoading] = useState(false)

  const { active, record = {} } = props.modal

  const handleTabChange = (key) => {
    props.setModal({
      active: key,
      record
    })
  };

  const fetch = (params = {}) => {
    //
  };


  return (
    <Modal
      visible={!!active}
      title="政策包含账号"
      footer={null}
      width={900}
      bodyStyle={{ padding: "8px 13px" }}
      onCancel={() => props.setModal({})}
    >
      <Tabs activeKey={active} onChange={handleTabChange}>
        <TabPane tab={<span>全局账号 <b>{record.globalAccountCount}</b></span>} key="global">
          <Global action={props.actions.getGlobalAccountList} record={record} />
        </TabPane>
        <TabPane tab={<span>特殊账号 <b>{record.specialAccountCount}</b></span>} key="specific">
          <ul className="policy-account-modal-rules-container">
            <li>
              规则1（120个号）：折扣固定扣减90元；返点固定比例20%（季结）
              <a>查看</a>
            </li>
            <li>
              规则1（120个号）：折扣固定扣减90元；返点固定比例20%（季结）
            </li>
            <li>
              规则1（120个号）：折扣固定扣减90元；返点固定比例20%（季结）
              <a>查看</a>
            </li>
            <li>
              规则1（120个号）：折扣固定扣减90元；返点固定比例20%（季结）
              <a>查看</a>
            </li>
          </ul>
        </TabPane>
        <TabPane tab={<span>白名单 <b>{record.whiteListCount}</b></span>} key="whiteList">
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default PolicyAccountModal;
