import React from 'react';
import logo from '../../Gif/logo.png';

const emptylist = empty => {
  const input = document.getElementById('search');
  input.innerHTML = '';
  empty(1);
};
const Navbar = props => {
  return (
    <React.Fragment>
      <nav
        style={{
          width: window.innerWidth > 500 && '98.5%',
          position: 'relative'
        }}
      >
        <span onClick={props.toggle} style={{ cursor: 'pointer' }}>
          <img src={logo} style={{ marginBottom: '3%' }} alt='SL Ice&Store' />
          <strong
            className='hide-on-small-only'
            style={{ fontSize: 35, marginTop: '1%' }}
          >
            SL Ice&Store
          </strong>
        </span>
        <div className='nav-wrapper right'>
          <div className='input-field'>
            <input
              id='search'
              type='search'
              required
              placeholder='Inventory App'
              onChange={props.search}
            />
            <label className='label-icon' htmlFor='search'>
              <i className='material-icons'>search</i>
            </label>
            <i
              className='material-icons'
              onClick={() => emptylist(props.empty)}
            >
              close
            </i>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
