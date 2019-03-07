import React, { Component } from 'react'
import { HeadInfo, DataIndicator, HistoricalAD, ContentData, AudienceAttribute, NewVideo } from "../components";
import './AccountDetail.less'
import { Modal } from 'antd';
import LazyLoad from 'react-lazyload';
class AccountDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      showModal: { title: '', content: '' }
    };
  }
  componentDidMount = () => {

  }

  componentWillUnmount() {
  }

  setShowModal = (visible, showModal) => {
    if (visible) {
      this.setState({
        visible: visible,
        showModal: showModal
      })
    } else {
      this.setState({ visible: visible })
    }
  }
  render() {
    const { showModal, visible } = this.state
    return (
      <div className="account-view-detail" id='Js-account-view-detail-Id'>

        <HeadInfo setShowModal={this.setShowModal} />
        <DataIndicator />
        <LazyLoad once overflow>
          <HistoricalAD />
        </LazyLoad>
        <LazyLoad once overflow>
          <ContentData />
        </LazyLoad>
        <LazyLoad once overflow>
          <AudienceAttribute />
        </LazyLoad>
        <LazyLoad once overflow>
          <NewVideo />
        </LazyLoad>
        <Modal
          title={showModal.title}
          visible={visible}
          onOk={() => this.setShowModal(false, null)}
          onCancel={() => this.setShowModal(false, null)}
          footer={null}
          width={showModal.width}
        >
          {showModal.content}
        </Modal>
      </div>
    );
  }
}

export default AccountDetail;
