/**
 * Created by lzb on 2019-11-18.
 */
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as commonAction from "@/actions";
import { connect } from "react-redux";

// 平台项
export const PlatformItem = (props) => {
  return (
    <Link className="select-platform-page-item" to={`/account/manage/add/${props.id}?user_id=${props.userId}`}>
      <img className="select-platform-page-item-img" src={props.platformIcon} />
      <em className="select-platform-page-item-text">{props.platformName}</em>
    </Link>
  )
};

const SelectPlatform = (props) => {
  const [list, setList] = useState([])

  // 获取平台
  useEffect(() => {
    props.actions.getNewBPlatforms().then(({ data }) => {
      setList(data)
    })
  }, [])
  return (
    <div className="select-platform-page">
      <h2>选择平台</h2>
      <div className="select-platform-page-list">
        {list.map(item => <PlatformItem userId={props.match.params.userId} key={item.id} {...item}/>)}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...commonAction }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectPlatform);
