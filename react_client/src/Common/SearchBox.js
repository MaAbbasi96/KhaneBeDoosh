import React, { Component } from 'react';
import {withRouter} from 'react-router';
import * as Converter from './../Common/NumConverter';

class SearchBox extends Component {
    constructor(props){
        super(props);

        this.state = {
            areaLimit: 'null',
            buildingType: 'null',
            dealType: 'null',
            maxPrice: 'null',
        };
        this.handleChange = this.handleChange.bind(this);
        this.sendInfo = this.sendInfo.bind(this);
    }

    handleChange(event) {
        if(event.target.value === '')
            this.setState({[event.target.name]: 'null'});
        else
            this.setState({[event.target.name]: Converter.toPersian(event.target.value)});
    }

    sendInfo(event) {
        this.props.history.push({pathname: '/search/' +  Converter.toEnglish(this.state.areaLimit) + '/' +  Converter.toEnglish(this.state.maxPrice)
            + '/' +  Converter.toEnglish(this.state.dealType) + '/' +  Converter.toEnglish(this.state.buildingType)});
    }

  render() {
    return (
        <div>
            <div className="container col-md-6 col-md-offset-3 search">
                <form onSubmit={this.sendInfo} className="form">
                    <div className="row">
                        <div className="col-md-4 input">
                            <div className="white-color unit">متر مربع</div>
                            <input type="text" name="areaLimit" onChange={this.handleChange} placeholder="حداکثر متراژ" value={this.state.areaLimit === 'null' ? '' : this.state.areaLimit}/>
                        </div>
                        <div className="col-md-4 input">
                            <div className="white-color unit">تومان</div>
                            <input type="text" name="maxPrice" onChange={this.handleChange} placeholder="حداکثر قیمت" value={this.state.maxPrice === 'null' ? '' : this.state.maxPrice}/>
                        </div>
                        <div className="col-md-4 select"><select name="buildingType" onChange={this.handleChange} className="input col-md-12">
                            <option value="" disabled selected hidden>نوع ملک</option>
                            <option value="0">ویلایی</option>
                            <option value="1">آپارتمان</option>
                        </select></div>
                    </div>
                    <div className="row">
                        <div className="col-md-5"><input type="submit" value="جستجو" className="submit input col-md-12"/></div>
                        <div className="col-md-7 deal-type">
                            <input type="radio" name="dealType" onChange={this.handleChange} value="1" className="input"/><span className="white-color radio-box">رهن و اجاره</span>
                            <input type="radio" name="dealType" onChange={this.handleChange} value="0" className="input"/><span className="white-color radio-box">خرید</span>
                        </div>
                    </div>
                </form>
            </div>

            <div className="container col-md-6 col-md-offset-3 add-house"><a href="/addHouse">صاحب خانه هستید؟ خانه خود را ثبت کنید</a></div>
        </div>
    );
  }
}

export default withRouter(SearchBox);
