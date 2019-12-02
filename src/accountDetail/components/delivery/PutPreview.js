import React, { useState, useEffect } from 'react';
import api from '@/api'
export default function PutPreview() {
  const [data, setData] = useState({})
  useEffect(() => {
    getDate()
  }, [])
  async function getDate() {
    const { data } = api.get('/data')
    setData(data)
  }
  return (
    <div>
      <div className='title-big'>投放预览</div>
    </div>
  );
}
const DataActive = () => {

}
const OrderStatistics = () => {

}
