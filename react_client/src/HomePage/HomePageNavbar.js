import React, { Component } from 'react';
import logo from './../assets/logo.png';
import UserInfo from './UserInfo';

import './../Styles/indexStyle.css';


class LogoContainer extends Component {
    render() {
        return (
            <div className = "logo-container">
                <img src={logo} alt="Logo" className = "logo"/>
                <span className = "logo-text">خانه به دوش</span>
            </div>
        );
    }
}

class HomePageNavbar extends Component {
  render() {
    return (
        <div className = "home-page">
        <div className = "navbar container">
            <UserInfo/>
            <LogoContainer/>
        </div>
        </div>
    );
  }
}

export default HomePageNavbar;
