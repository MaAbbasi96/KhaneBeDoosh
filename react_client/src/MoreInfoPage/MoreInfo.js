import React, { Component } from 'react';

import * as Network from './../Common/RequestMaker';
import { PersianNumber } from '@thg303/react-persian';

import DefaultNavbar from './../Common/DefaultNavbar';
import TitleDes from '../Common/TitleDes';
import Footer from '../Common/Footer';
import './../Styles/moreInfoStyle.css';

class Search extends Component {
    constructor(props){
        super(props)

        this.state = {
            moreInfoHouse:{},
            phone: 'null',
            message: 'null',
            decreaseCredit: false
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event){
        if(this.state.message === "notAuthenticated"){
            localStorage.setItem("infoURL",this.state.moreInfoHouse.id + '/' + this.state.moreInfoHouse.serverNum);
            this.props.history.push({pathname: '/login'});
        }
        else{
            let getPhoneLink = '/house/' 
                        + this.state.moreInfoHouse.id + '/' + this.state.moreInfoHouse.serverNum + '/phone';
            Network.GetRequest(getPhoneLink).then((res)=>{
                if(res.phone){
                    this.setState({phone: res.phone, decreaseCredit:true});
                    this.setState({decreaseCredit: false});
                }
                this.setState({message: res.message});
            });
        }
    }

    componentWillMount(){
        let id = this.props.match.params.houseId;
        let serverNum = this.props.match.params.serverNum;
        let moreInfoLink = '/house/' 
                    + id + '/' + serverNum;
        Network.GetRequest(moreInfoLink).then((res)=>{
            let temp = res.data;
            this.setState({moreInfoHouse: temp});
            this.setState({phone: temp.phone});
            this.setState({message: temp.message});
        });
    }


    render() {
        let dealType = this.state.moreInfoHouse.dealType;
        
        let sellPrice = (dealType === 0 ? this.state.moreInfoHouse.price.sellPrice : 0);
        let basePrice = (dealType === 1 ? this.state.moreInfoHouse.price.basePrice : 0);
        let rentPrice = (dealType === 1 ? this.state.moreInfoHouse.price.rentPrice : 0);

        return (
        <div className="body-more-info">
            <DefaultNavbar decreaseCredit={this.state.decreaseCredit}/>
            <TitleDes title="مشخصات کامل ملک"/>
            <div className="container description">
                <div className="row col-md-12">    
                    <div className="more-info-img col-md-8">
                        <img alt="houses pic" src={this.state.moreInfoHouse.imageURL}/>
                        <div className={"phone-button phone-button-"+this.state.message} onClick={this.handleClick}>{
                            this.state.message === "creditError" ? 
                            "اعتبار شما برای دریافت شماره‌ی مالک/مشاور کافی نیست!" :
                            this.state.message === "notAuthenticated" ? 
                            "برای مشاهده شماره‌تماس وارد شوید":
                            "مشاهده شماره مالک/مشاور"
                        }</div>
                    </div>
                    
                    <div className="col-md-4">
                        <div className={"" + (dealType ? 'rent-house' : 'sell-house')}>
                            <div className="show-type more-info-type">{dealType ? 'رهن و اجاره' : 'فروش'}</div>
                            
                            <div><span className = "tex-title">شماره مالک/مشاور</span> <span><PersianNumber>{this.state.phone}</PersianNumber></span></div>
                            <hr/>
                            <div><span className = "tex-title">نوع ساختمان</span> <span>{this.state.moreInfoHouse.buildingType}</span></div>
                            <hr/>
                            <div className = {"sellPrice-" +dealType}><span className = "tex-title">قیمت</span><span><PersianNumber>{sellPrice}</PersianNumber></span><span> تومان</span></div>
                            <hr className = {"sellPrice-" +dealType}/>
                            <div className = {"basePrice-" +dealType}><span className = "tex-title">قیمت رهن</span><span><PersianNumber>{basePrice}</PersianNumber></span><span> تومان</span></div>
                            <hr className = {"basePrice-" +dealType}/>
                            <div className = {"rentPrice-" +dealType}><span className = "tex-title">قیمت اجاره</span><span><PersianNumber>{rentPrice}</PersianNumber></span><span> تومان</span></div>
                            <hr className = {"rentPrice-" +dealType}/>
                            <div><span className = "tex-title">آدرس</span> <span>{this.state.moreInfoHouse.address}</span></div>
                            <hr/>
                            <div><span className = "tex-title">متراژ</span> <span><PersianNumber>{this.state.moreInfoHouse.area}</PersianNumber></span><span> متر مربع</span></div>
                            <hr/>
                            <div><span className = "tex-title">توضیحات</span> <span>{this.state.moreInfoHouse.description}</span></div>
                            <hr/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
        );
    }
}

export default Search;
