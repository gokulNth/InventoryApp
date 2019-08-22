import React from 'react';

const Chip = props => {
  return (
    <div>
      {props.list && (
        <div style={{ marginTop: 1 }}>
          {props.list.map(i => {
            return (
              <div
                key={i.id}
                style={{ cursor: 'pointer' }}
                className='chip'
                id={i.Name}
                onClick={props.add}
              >
                {i.Name}
                <i className='close material-icons'>close</i>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Chip;
