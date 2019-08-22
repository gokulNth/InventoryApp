import React from 'react';

const Input = props => {
  return (
    <div className='row'>
      <div className='col s3 m3 l3' />
      <div className='col s6 m6 l6'>
        <input
          type='number'
          id={props.id}
          value={props.req}
          onChange={props.one}
          style={{ height: 20, textAlign: 'center', marginLeft: 15 }}
        />
      </div>
      <div className='col s3 m3 l3' />
    </div>
  );
};

export default Input;
