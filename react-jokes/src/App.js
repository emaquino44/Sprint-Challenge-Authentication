import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login.js';



class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Lambda's Jokes</h1>
        </header>
        <div className="App-intro">
        {localStorage.getItem('jwt') && (
        <button onClick={this.logoutHandler}>Log Out</button>)}

             <Route path='/login' component={ Login } />

        </div>
      </div>
    );
  }
    logoutHandler = event => {
      localStorage.removeItem('jwt');

      this.props.history.push('/login');
    };
}

export default withRouter(App);
