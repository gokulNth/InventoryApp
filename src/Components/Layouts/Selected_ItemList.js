import React from 'react';
import Input from './Input';

const Selected_ItemList = props => {
  return (
    <div
      className='card red lighten-3'
      style={{ height: '5rem', borderRadius: 20 }}
    >
      <div className='card-content red-text'>
        <div className='row'>
          <div className='col s6 m3 l6'>
            <span className='white-text'>{props.name}</span>
          </div>
          <div className='col s6 m9 l6'>
            <div className='row'>
              <div className='col s10 m10 l10'>
                <Input id={props.name} req={props.item.req} one={props.one} />
              </div>
              <div className='col s2 m2 l2'>
                <i
                  className='material-icons'
                  onClick={props.delt}
                  id={props.name}
                  style={{
                    fontSize: '2rem',
                    left: '10%',
                    cursor: 'pointer'
                  }}
                >
                  delete_sweep
                </i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Selected_ItemList;
