import React from 'react';

const EmptyModule = (props) => {
  const { title, desc, onChange } = props
  return (
    <div className='empty-module-wrap'>
      <h3>{title}</h3>
      <div className='desc'>{desc}</div>
      <a onClick={() => onChange('edit')}>去完善</a>
    </div>
  );
};

export default EmptyModule;
