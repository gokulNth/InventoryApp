import React from 'react';
import { Link } from 'react-router-dom';

const Footer = props => {
  return (
    <div className='center container'>
      {props.all.length !== 0 ? (
        <h4 className='center'>{props.all.length} items selected..</h4>
      ) : (
        <h4 className='center'>List of Selected Items</h4>
      )}
      {props.all.length !== 0 ? (
        <div className='row'>
          <div className='col s3 m3 l3'>
            <Link
              to={{
                pathname: '/billing...',
                state: {
                  item: props.selected_items,
                  bill: props.bill,
                  all: props.all
                }
              }}
            >
              <button
                onClick={() =>
                  localStorage.setItem('localStore', JSON.stringify(props))
                }
                className='waves-effect waves-light btn'
              >
                Bill it!
              </button>
            </Link>
          </div>
          <div className='col s6 m6 l6' style={{ marginTop: -10 }}>
            <h5>Total :{props.bill}</h5>
          </div>
          <div className='col s3 m3 l3'>
            <button
              className='waves-effect waves-light btn red'
              onClick={() => props.empty(2)}
            >
              Clear
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Footer;
