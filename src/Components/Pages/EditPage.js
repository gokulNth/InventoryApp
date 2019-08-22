import React from 'react';
import { add, fetchDetailAvail, remove } from '../../Fetches/Fetches';
import DeletingGif from '../Layouts/DeletingGif';

class EditPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toDateString().slice(4),
      num: '',
      id: this.props.match.params.id,
      detailAvail: 'Loading....',
      wanted: '',
      perBox: '',
      MRP: ''
    };
  }
  componentDidMount() {
    this.detailAvail();
  }
  detailAvail = async () => {
    await this.setState({ detailAvail: await fetchDetailAvail(this.state.id) });
    await this.setState({ wanted: await this.state.detailAvail.Wnt_ltd });
    await this.setState({ perBox: await this.state.detailAvail.perBox });
    await this.setState({ MRP: await this.state.detailAvail.MRP });
  };
  change = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };
  submit = async () => {
    let a = Object.keys(this.state.detailAvail.DetailAvail_ltd);
    if (a.includes(this.state.date)) {
      alert('Already U stock for today');
    } else {
      let a1 = window.confirm('R U Sure.....');
      a1 && (await this.setState({ detailAvail: 'Updating...' }));
      a1 &&
        (await this.setState({
          detailAvail: await add(this.state)
        }));
    }
  };
  remove = async e => {
    let { id } = e.target;
    // let a = window.confirm('R U Sure...?');
    // a && this.setState({ detailAvail: 'Deleting...' });
    // a &&
    this.setState({
      detailAvail: await remove(this.state, id)
    });
  };
  render() {
    return (
      <div>
        <nav className='navbar-fixed'>
          <div className='nav-wrapper'>
            <div className='brand-logo center'>
              {this.state.detailAvail && this.state.detailAvail.Name}
            </div>
          </div>
        </nav>
        <div className='row center-align'>
          <div className='col s12 m12 l6'>
            {this.state.detailAvail &&
            this.state.detailAvail === 'Loading....' ? (
              <DeletingGif text={this.state.detailAvail} />
            ) : this.state.detailAvail === 'Adding...' ? (
              <DeletingGif text={this.state.detailAvail} />
            ) : this.state.detailAvail === 'Deleting...' ? (
              <DeletingGif text={this.state.detailAvail} />
            ) : (
              <table className='highlight centered'>
                <thead>
                  <tr>
                    <th>Purchased Date</th>
                    <th>Purchased Qty</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {this.state.detailAvail.DetailAvail_ltd ? (
                    Object.keys(this.state.detailAvail.DetailAvail_ltd).map(
                      (i, index) => {
                        return (
                          <tr key={index}>
                            <td>{i}</td>
                            <td>{this.state.detailAvail.DetailAvail_ltd[i]}</td>
                            <td>
                              <i
                                className='material-icons red-text'
                                onClick={this.remove}
                                id={i}
                                style={{ cursor: 'pointer' }}
                              >
                                delete_forever
                              </i>
                            </td>
                          </tr>
                        );
                      }
                    )
                  ) : (
                    <DeletingGif text={this.state.detailAvail} />
                  )}
                </tbody>
              </table>
            )}
            <b>
              Price :{' '}
              {this.state.detailAvail.Price && this.state.detailAvail.Price}
            </b>
            &nbsp;&nbsp;
            <b>
              Availability :{' '}
              {this.state.detailAvail.Avail && this.state.detailAvail.Avail}
            </b>
          </div>
          <div className='col s12 m12 l6'>
            <div className='input-field inline'>
              <input
                type='number'
                name='num'
                value={this.state.num}
                onChange={this.change}
                autoFocus
              />
              <label>New Purchase</label>
            </div>
            <br />
            <label>Wanted Limit</label>
            <div className='input-field inline'>
              <input
                type='number'
                name='wanted'
                value={this.state.wanted}
                onChange={this.change}
              />
            </div>
            <br />
            <label>Pieces per Box</label>
            <div className='input-field inline'>
              <input
                type='number'
                name='perBox'
                value={this.state.perBox}
                onChange={this.change}
              />
            </div>
            <br />
            <label>MRP</label>
            <div className='input-field inline'>
              <input
                type='number'
                name='MRP'
                value={this.state.MRP}
                onChange={this.change}
              />
            </div>
            <br />
            <button className='btn btn-small' onClick={this.submit}>
              Submit
            </button>
            <button
              className='btn btn-small'
              onClick={() => this.props.history.push('/')}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default EditPage;
