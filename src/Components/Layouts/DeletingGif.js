import React from 'react';
import deleting from '../../Gif/Deleting/deleting.gif';

const DeletingGif = props => {
  return (
    <div>
      <img
        height={50}
        style={{ marginTop: 10 }}
        src={deleting}
        alt={props.text}
      />
      <br />
      <h4>{props.text}....</h4>
    </div>
  );
};

export default DeletingGif;
