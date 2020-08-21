import React, { Component } from 'react';
import './App.scss';
import Header from './components/Header';
// import { HashRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

class App extends Component {

  render() {
    return (
      <Header />
    )
  }
}

const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps)(App);
