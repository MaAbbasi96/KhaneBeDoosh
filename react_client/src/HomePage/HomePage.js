import React, { Component } from 'react';
import SlideShow from './SlideShow';
import SearchBox from './../Common/SearchBox';
import Cards from './Cards';
import Description from './Description';
import HomePageNavbar from './HomePageNavbar';
import Footer from './../Common/Footer';

class HomePage extends Component {
  render() {
    return (
      <div>
        <SlideShow/>
        <HomePageNavbar/>
        <SearchBox/>
        <Cards/>
        <Description/>
        <Footer/>
      </div>
    );
  }
}

export default HomePage;
