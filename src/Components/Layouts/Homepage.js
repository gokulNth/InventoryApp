import React from 'react';
import ItemList from './ItemList';
import SelectedItemList from './Selected_ItemList';
import Footer from './Footer';
import Navbar from './Navbar';
import loading from '../../Gif/Loading/loading.gif';
import Chip from './Chip';
import { Link } from 'react-router-dom';

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false
    };
    this.toggle = this.toggle.bind(this);
    this.toggleClose = this.toggleClose.bind(this);
  }
  toggle() {
    this.setState({ toggle: !this.state.toggle });
  }
  toggleClose() {
    this.setState({ toggle: false });
  }
  render() {
    return (
      <div onClick={this.state.toggle ? this.toggleClose : () => {}}>
        <div className='row'>
          <div
            className='col s12 m8 l8'
            style={{
              overflow: 'auto',
              height: window.innerWidth < 500 ? 450 : 560,
              marginBottom: window.innerWidth < 500 && '40%'
            }}
          >
            <div className='row'>
              <Navbar
                empty={this.props.empty}
                toggle={this.toggle}
                search={this.props.search}
              />
              {this.state.toggle && (
                <div
                  className='row w3-container w3-center w3-animate-left z-depth-5'
                  style={{ paddingLeft: '1%' }}
                >
                  <div className='col s12 m6'>
                    <ul
                      className='collection center '
                      style={{
                        position: 'fixed',
                        backgroundColor: 'white',
                        border: '2px solid black',
                        zIndex: 10,
                        height: '80%',
                        width: '20%'
                      }}
                    >
                      <li className='collection-item'>
                        <Link to='/add'>Add Product</Link>
                      </li>
                      <li className='collection-item'>
                        <Link to='/'>Reports</Link>
                      </li>
                      <li className='collection-item'>
                        <Link to='/'>Wanted List</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              <Chip list={this.props.state.list} add={this.props.add} />
              {this.props.state.isloading === '' ? (
                this.props.state.products.map(i => {
                  return (
                    <ItemList item={i} key={i.Name} add={this.props.add} />
                  );
                })
              ) : this.props.state.isloading === 'Loading...' ? (
                <React.Fragment>
                  <div style={{ margin: '0 auto', width: '50%' }}>
                    <img
                      src={loading}
                      alt='Loading...'
                      style={{ margin: '0 auto', width: '99%' }}
                    />
                  </div>
                </React.Fragment>
              ) : (
                <div
                  style={{
                    marginLeft: window.innerWidth < 500 ? '30%' : '40%',
                    marginTop: '20%'
                  }}
                >
                  <b style={{ fontSize: 30 }}>ServerError</b>
                  <div style={{ marginLeft: 20 }}>Refresh the page</div>
                </div>
              )}
            </div>
          </div>
          <div
            className='col s12 m4 l4 z-depth-5 '
            style={{
              overflow: 'auto',
              height: 560,
              marginTop: window.innerWidth < 500 ? '-40%' : 5,
              marginLeft: window.innerWidth > 500 && -5
            }}
          >
            <Footer
              selected_items={this.props.state.selected_items}
              bill={this.props.state.totPrice}
              all={this.props.state.items}
              empty={this.props.empty}
            />
            <div style={{ overflow: 'auto', height: 400 }}>
              {this.props.state.items.length !== 0 ? (
                this.props.state.items.map((i, index) => {
                  return (
                    <SelectedItemList
                      item={this.props.state.selected_items[i]}
                      name={i}
                      key={index}
                      delt={this.props.delete}
                      one={this.props.one}
                    />
                  );
                })
              ) : (
                <h5 className='center'>--NONE--</h5>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
