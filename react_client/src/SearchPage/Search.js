import React, { Component } from 'react';
import * as Network from './../Common/RequestMaker';
import DefaultNavbar from './../Common/DefaultNavbar';
import './../Styles/searchStyle.css';
import TitleDes from '../Common/TitleDes';
import SearchBox from '../Common/SearchBox';
import Footer from '../Common/Footer';
import SearchResult from './SearchResult';
class Search extends Component {

    constructor(){
        super()

        this.state = {housesInfo:[]}
    }

    componentWillMount(){
        let areaLimit = this.props.match.params.areaLimit === 'null'? '' : this.props.match.params.areaLimit;
        let maxPrice = this.props.match.params.maxPrice === 'null'? '' : this.props.match.params.maxPrice;
        let dealType = this.props.match.params.dealType === 'null'? '' : this.props.match.params.dealType;
        let buildingType = this.props.match.params.buildingType === 'null'? '' : this.props.match.params.buildingType;
        let searchLink = '/house?areaLimit=' + areaLimit + '&maxPrice='
                    + maxPrice + '&dealType=' + dealType
                    + '&buildingType=' + buildingType;
        Network.GetRequest(searchLink).then((res)=>{ //uncomment after connecting to server
            let temp = res.data;
            this.setState({housesInfo: temp});
        });
    }

  render() {
    return (
      <div className="body-search">
        <DefaultNavbar/>
        <TitleDes title="نتایج جست‌ و جو"/>
        <div className="content">
‍‍          <SearchResult housesInfo={this.state.housesInfo}/>
          <span className="title">جستجوی مجدد</span>
          <SearchBox/>
        </div>  
        <Footer/>
      </div>
    );
  }
}

export default Search;
