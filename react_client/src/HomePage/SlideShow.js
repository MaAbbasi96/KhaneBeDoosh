import React, { Component } from 'react';
import pic1 from './../assets/Banner/luke-van-zyl-504032-unsplash.jpg';
import pic2 from './../assets/Banner/casey-horner-533586-unsplash.jpg';
import pic3 from './../assets/Banner/mahdiar-mahmoodi-452489-unsplash.jpg';
import pic4 from './../assets/Banner/michal-kubalczyk-260909-unsplash.jpg';
import './../Styles/indexStyle.css';

class SlideShow extends Component {
  render() {
    return (
        <div className="slideshow">
            <div className="banner-image">
                <img src={pic1} alt="Banner1"/>
                <img src={pic2} alt="Banner2"/>
                <img src={pic3} alt="Banner3"/>
                <img src={pic4} alt="Banner4"/>
            </div>
        </div>
    );
  }
}

export default SlideShow;
