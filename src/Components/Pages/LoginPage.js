import React from 'react';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  loggedIn = () => {
    sessionStorage.setItem('status', true);
    this.props.login();
  };
  render() {
    return (
      <React.Fragment>
        UsersName:
        <input />
        Psssword:
        <input />
        <br />
        <button onClick={this.loggedIn}>Login</button>
      </React.Fragment>
    );
  }
}

export default LoginPage;
