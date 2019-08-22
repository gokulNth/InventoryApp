import React from 'react';
import { Link } from 'react-router-dom';

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false
    };
  }
  render() {
    return (
      <span className='col s12 m6 l6 '>
        <span
          className={'card hoverable waves-effect waves-block grey lighten-3'}
          style={{ minHeight: 100 }}
          onClick={this.props.add}
          id={this.props.item.Name}
        >
          <Link
            to={{
              pathname: '/edit/' + this.props.item.id,
              state: this.props.item
            }}
          >
            <div
              className={
                this.props.item.Avail >= 10
                  ? 'card hoverable waves-effect waves-block waves-red green lighten-1 black-text'
                  : this.props.item.Avail === 0
                  ? 'card waves-effect waves-block waves-grey grey lighten-1'
                  : 'card hoverable red accent-3 yellow-text text-lighten-3'
              }
              style={{
                marginLeft: 10,
                position: 'absolute',
                height: 90,
                width: 90,
                borderRadius: 50,
                textAlign: 'center'
              }}
              onClick={() => {}}
            >
              <div style={{ marginTop: 20 }}>
                <b>Avail</b>
                <br />
                <span className='center'>{this.props.item.Avail}</span>
              </div>
            </div>
          </Link>
          <span className='card-content right' style={{ cursor: 'pointer' }}>
            <span
              style={{ fontSize: 20 }}
              onClick={this.props.add}
              id={this.props.item.Name}
            >
              {this.props.item.Name}
            </span>
            <br />
            <span
              className='center'
              onClick={this.props.add}
              id={this.props.item.Name}
            >
              Price : {this.props.item.Price}
            </span>
          </span>
        </span>
      </span>
    );
  }
}
export default ItemList;
