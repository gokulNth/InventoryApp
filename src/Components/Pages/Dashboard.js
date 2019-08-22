import React from 'react';
import { fetch } from '../../Fetches/Fetches';
import Homepage from '../Layouts/Homepage';
import LoginPage from './LoginPage';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      selected_items: [],
      items: [],
      totPrice: 0,
      isloading: 'Loading...',
      list: [],
      login: false
    };
  }
  componentDidMount() {
    sessionStorage.getItem('status') &&
      this.setState({ login: sessionStorage.getItem('status') });
    this.state.login &&
      this.props.location.state &&
      this.setState({
        selected_items: this.props.location.state.selected_items,
        items: this.props.location.state.items,
        totPrice: this.props.location.state.totPrice
      });
    this.fetchData();
  }
  fetchData = async () => {
    let a = await fetch();
    await a.forEach(async doc => {
      await this.state.products.push({ ...doc.data(), id: doc.id });
    });
    (await this.state.products.length) !== 0 &&
      this.setState({ isloading: '' });
    let srt = await this.state.products.sort((a, b) => a.Avail - b.Avail);
    await this.setState({ products: srt });
    (await a.size) === 0 && this.setState({ isloading: 'serverError' });
  };
  one = async e => {
    let id = e.target.id;
    let value = +e.target.value;
    if (value > this.state.selected_items[id].totavail) {
      alert('Quantity Exceeded');
    } else if (value > -1) {
      let a = await Object.assign({}, this.state.selected_items, {
        ...this.state.selected_items,
        [id]: {
          ...this.state.selected_items[id],
          req: value,
          totPrice:
            +this.state.products
              .filter(i => i.Name === id)
              .map(i => i.Price)[0] * value
        }
      });
      await this.setState({ selected_items: a });
      await this.tot();
    }
  };
  add = async e => {
    let a = await e.target.id;
    let item = await this.state.products.filter(i => i.Name === a);
    if (item[0])
      if (item[0].Avail > 0) {
        if (!this.state.items.includes(a)) {
          this.setState(prev => {
            return {
              selected_items: {
                ...prev.selected_items,
                [a]: {
                  req: 1,
                  totavail: +item.map(i => i.Avail)[0],
                  id: this.state.products
                    .filter(i => i.Name === a)
                    .map(i => i.id)[0],
                  totPrice: +item.map(i => i.Price)[0],
                  price: +item.map(i => i.Price)[0]
                }
              }
            };
          });
          await this.setState({
            items: [...this.state.items, a]
          });
          await this.tot();
          await this.setState({ list: [] });
        }
      } else alert('Not enough to sell');
  };
  tot = () => {
    let a =
      this.state.items.length !== 0
        ? this.state.items
            .map(i => {
              return this.state.selected_items[i].totPrice;
            })
            .reduce(this.summation)
        : 0;
    this.setState({ totPrice: a });
  };
  delete = async e => {
    let name = e.target.id;
    let res = Object.assign({}, this.state.selected_items);
    delete res[name];
    await this.setState({ items: this.state.items.filter(i => i !== name) });
    await this.setState({ selected_items: res });
    await this.tot();
  };
  summation = (a, b) => a + b;
  search = e => {
    let list = [];
    this.state.products
      .filter(i => i.Name.toLowerCase().includes(e.target.value))
      .map(i => {
        return list.push(i);
      });
    e.target.value.length !== 0 && this.setState({ list: list });
    e.target.value.length === 0 && this.setState({ list: [] });
  };
  empty = a => {
    a === 1 && this.setState({ list: [] });
    a === 2 && this.setState({ selected_items: '' });
    a === 2 && this.setState({ items: [] });
  };
  login = () => {
    this.setState({ login: !this.state.login });
  };
  render() {
    return this.state.login ? (
      <Homepage
        empty={this.empty}
        state={this.state}
        add={this.add}
        tot={this.tot}
        delete={this.delete}
        one={this.one}
        search={this.search}
      />
    ) : (
      <LoginPage login={this.login} />
    );
  }
}

export default Dashboard;
