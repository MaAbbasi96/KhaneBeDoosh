import React, { Component } from 'react';
import logo from './../assets/logo.png';
import UserInfo from './UserInfo';

class LogoContainer extends Component {
    render() {
        return (
            <div className="logo-container">
                <a href="/"><img src={logo} alt="LOGO" className="logo"/></a>
                <span className="logo-text"> خانه به دوش</span>
            </div>
        );
    }
}

class DefaultNavbar extends Component {

  render() {
    return (
        <div className="navbar def-nav">
            <div className="default">
                <LogoContainer/>
                <UserInfo decreaseCredit={this.props.decreaseCredit}/>
            </div>
        </div>
    );
  }
}

export default DefaultNavbar;
