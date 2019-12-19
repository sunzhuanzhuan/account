import React from 'react';
import './index.less'
import PutPreview from './PutPreview'
import OrderDetail from './OrderDetail'
import OrderAssess from './OrderAssess'
export default function Delivery({ setShowModal, feature }) {
  return (
    <>
      <PutPreview setShowModal={setShowModal} />
      <OrderAssess feature={feature} />
      <OrderDetail />

    </>
  );
}
