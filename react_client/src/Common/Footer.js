import React, { Component } from 'react';
import instagramIcon from './../assets/icons/200px-Instagram_logo_2016.svg.png';
import telegramIcon from './../assets/icons/200px-Telegram_logo.svg.png';
import twitterIcon from './../assets/icons/Twitter_bird_logo_2012.svg.png';

class Footer extends Component {
  render() {
    return (
        <div className="hidden-xs footer">
        <span className="col-md-9">تمامی حقوق مادی و معنوی این وب‌سایت متعلق به مهدی عباسی و مهسا قزوینی‌نژاد می‌باشد</span>
        <div className="social-networks col-md-3">
            <a href="/"><img alt="instagram icon" src={instagramIcon}/></a>
            <a href="/"><img alt="telegram icon" src={telegramIcon}/></a>
            <a href="/"><img alt="twitter icon" src={twitterIcon}/></a>
        </div>
    </div>
    );
  }
}

export default Footer;
