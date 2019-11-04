/**
 * 更新主账号信息
 * Created by lzb on 2019-11-04.
 */
import React, {  } from 'react';
import OwnerForm from "../components/AddOwnerForm";

const UpdateOwnerPage = (props) => {
  return (
    <div className="update-owner-page-container">
      <h2>
        添加主账号
      </h2>
      <OwnerForm/>
    </div>
  );
};

export default UpdateOwnerPage;
