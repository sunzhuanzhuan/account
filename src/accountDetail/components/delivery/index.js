import React from 'react';
import './index.less'
import PutPreview from './PutPreview'
import OrderDetail from './OrderDetail'
import OrderAssess from './OrderAssess'
export default function Delivery() {
  return (
    <>
      <PutPreview />
      <OrderAssess />
      <OrderDetail />

    </>
  );
}
