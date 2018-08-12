import React, { Component } from 'react';
import URLSearchParams from 'url-search-params';
import * as Network from './../Common/RequestMaker';

import DefaultNavbar from './../Common/DefaultNavbar';
import TitleDes from '../Common/TitleDes';
import Footer from '../Common/Footer';
import './../Styles/addHouseStyle.css';
import * as Converter from './../Common/NumConverter';

class Search extends Component {

    constructor(props){
        super(props);

        this.state = {
            dealType: '1',
            buildingType: '',
            area: '',
            address: '',
            basePrice: '0',
            sellPrice: '0',
            rentPrice: '0',
            phone: '',
            description: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.sendInfo = this.sendInfo.bind(this);
        this.checkParameter = this.checkParameter.bind(this);
    }

    handleChange(event) {
        if((event.target.name === 'basePrice' || event.target.name === 'sellPrice' || event.target.name === 'basePrice')
                        && event.target.value === '')
            this.setState({[event.target.name]: '.'});
        if(event.target.name !== 'dealType')
            this.setState({[event.target.name]: Converter.toPersian(event.target.value)});
        else
            this.setState({'dealType': event.target.value});

        if(event.target.name === 'dealType'){
            if(event.target.value === "0"){
                document.getElementById('sellPrice').style.display = 'block';
                document.getElementById('basePrice').style.display = 'none';
                document.getElementById('rentPrice').style.visibility = 'hidden';
                document.getElementById('rentPriceUnit').style.visibility = 'hidden';
            }
            else{
                document.getElementById('sellPrice').style.display = 'none';
                document.getElementById('basePrice').style.display = 'block';
                document.getElementById('rentPrice').style.visibility = 'visible';
                document.getElementById('rentPriceUnit').style.visibility = 'visible';
            }
        }

        let alerts = document.getElementsByClassName("alert");
        for (let i = 0; i < alerts.length; i++)
            alerts[i].style.display= 'none';
        
        let input_tags = document.getElementsByClassName("input-tag");
        for (let i = 0; i < input_tags.length; i++)
            input_tags[i].style.border = '1px solid rgb(167, 166, 166)';
        document.getElementById('buildingType').style.border = '1px solid rgb(167, 166, 166)';
    }

    checkParameter(){
        let error = false;
        if(this.state.buildingType === ''){
            document.getElementById('buildingType').style.border = '3px solid red';
            error = true;
        }
        if(isNaN(Converter.toEnglish(this.state.area)) || this.state.area === ''){
            document.getElementById('area').style.border = '3px solid red';
            error = true;
        }
        if(this.state.address === ''){
            document.getElementById('address').style.border = '3px solid red';
            error = true;
        }
        if(this.state.phone === ''){
            document.getElementById('phone').style.border = '3px solid red';
            error = true;
        }
        if(this.state.dealType === '0' && (isNaN(Converter.toEnglish(this.state.sellPrice)) || Converter.toEnglish(this.state.sellPrice) <= '0')){
            document.getElementById('sellPrice').style.border = '3px solid red';
            error = true;
        }
        if(this.state.dealType === '1' && (isNaN(Converter.toEnglish(this.state.rentPrice)) || Converter.toEnglish(this.state.sellPrice) < '0')){
            document.getElementById('rentPrice').style.border = '3px solid red';
            error = true;
        }
        if(this.state.dealType === '1' && (isNaN(Converter.toEnglish(this.state.basePrice)) || Converter.toEnglish(this.state.sellPrice) < '0')){
            document.getElementById('basePrice').style.border = '3px solid red';
            error = true;
        }
        if(this.state.dealType === '1' && Converter.toEnglish(this.state.rentPrice) === '0' && Converter.toEnglish(this.state.basePrice) === '0'){
            document.getElementById('basePrice').style.border = '3px solid red';
            document.getElementById('rentPrice').style.border = '3px solid red';
            error = true;
        }
        if(error)
            document.getElementById('parameter-alert').style.display = 'flex';
        return !error;
    }

    sendInfo(event) {
        if(this.checkParameter()){
            let addHouseLink = '/KhaneBeDoosh/house/add';
            let data = new URLSearchParams();
            data.append('dealType', Converter.toEnglish(this.state.dealType));
            data.append('buildingType', Converter.toEnglish(this.state.buildingType));
            data.append('area', Converter.toEnglish(this.state.area));
            data.append('address', Converter.toEnglish(this.state.address));
            data.append('basePrice', Converter.toEnglish(this.state.basePrice));
            data.append('sellPrice', Converter.toEnglish(this.state.sellPrice));
            data.append('rentPrice', Converter.toEnglish(this.state.rentPrice));
            data.append('phone', Converter.toEnglish(this.state.phone));
            data.append('description', Converter.toEnglish(this.state.description));
            Network.PostRequest(addHouseLink, data).then((res)=>{
                this.setState({message: res.message});
                if(this.state.message === "success")
                    this.props.history.push({pathname: '/'});
                else if(this.state.message === "invalidInput" || this.state.message === "unsuitableInput" || this.state.message === "invalidDealType")
                    document.getElementById('parameter-alert').style.display = 'flex';
                else
                    document.getElementById('add-house-alert').style.display = 'flex';
            });
        }
    }

    render() {
        return (
            <div className="body-add-house">
                <DefaultNavbar/>
                <TitleDes title="ثبت ملک جدید در خانه به دوش"/>
                
                <div id="parameter-alert" className="alert alert-danger">
                    <strong>خطا در وارد کردن پارامترها</strong>
                </div>
                <div id="add-house-alert" className="alert alert-danger">
                    <strong>خطا در اضافه کردن خانه</strong>
                </div>

                <div className="container description">
                    <div className="row">
                        <input type="radio" name="dealType" onChange={this.handleChange} value="1" className="input" checked={ this.state.dealType === '1' }/><span className="radio-box">رهن و اجاره</span>
                        <input type="radio" name="dealType" onChange={this.handleChange} value="0" className="input" checked={ this.state.dealType === '0' }/><span className="radio-box">خرید</span>
                    </div> 
                    <div className="row input-box">  
                        <div className="col-md-6 input">
                            <div className="white-color unit">.</div>
                            <div className="select">
                                <select id="buildingType" name="buildingType" onChange={this.handleChange} className="col-md-12">
                                    <option value="" disabled selected hidden>نوع ملک</option>
                                    <option value="ویلایی">ویلایی</option>
                                    <option value="آپارتمان">آپارتمان</option>
                                </select>
                            </div>
                        </div> 
                        <div className="col-md-6 input">
                            <div className="unit">متر مربع</div>
                            <input type="text" id="area" className="input-tag" name="area" value={this.state.area} onChange={this.handleChange} placeholder="متراژ"/>
                        </div>
                    </div>
                    <div className="row input-box">   
                        <div className="col-md-6 input">
                            <div className="white-color unit">.</div>
                            <input type="text" id="address" className="input-tag" name="address" value={this.state.address} onChange={this.handleChange} placeholder="آدرس"/>
                        </div>
                        <div className="col-md-6 input">
                            <div className="unit">تومان</div>
                            <input id="basePrice" type="text" className="input-tag" name="basePrice" value={this.state.basePrice === '0' ? '' : this.state.basePrice} onChange={this.handleChange} placeholder="قیمت رهن"/>
            
                            <input id="sellPrice" type="text" className="input-tag" name="sellPrice" value={this.state.sellPrice === '0' ? '' : this.state.sellPrice} onChange={this.handleChange} placeholder="قیمت فروش"/>

                        </div>
                    </div>
                    <div className="row input-box">   
                        <div className="col-md-6 input">
                            <div className="white-color unit">.</div>
                            <input type="text" id="phone" className="input-tag" name="phone" value={this.state.phone} onChange={this.handleChange} placeholder="شماره تماس"/>
                        </div>
                        <div className="col-md-6 input">
                            <div id="rentPriceUnit" className="unit">تومان</div>
                            <input id="rentPrice" type="text" className="input-tag" name="rentPrice" value={this.state.rentPrice === '0' ? '' : this.state.rentPrice} onChange={this.handleChange} placeholder="قیمت اجاره"/>
                        </div>
                    </div>
                    <div className="row input-box">   
                        <div className="col-md-12 input">
                            <div className="white-color unit">.</div>
                            <input type="text" id="description" name="description" value={this.state.description} onChange={this.handleChange} placeholder="توضیحات"/>
                        </div>
                    </div>

                    <div className="row">   
                        <div className="col-md-4">
                            <input type="submit" onClick={this.sendInfo} value="ثبت ملک" className="submit add-house-submit"/>
                        </div>
                    </div>
                </div> 
                <Footer/>
            </div>
        );
    }
}

export default Search;
