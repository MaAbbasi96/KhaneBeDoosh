import React, { Component } from 'react';
import URLSearchParams from 'url-search-params';
import './../Styles/addCreditStyle.css';
import * as Network from './../Common/RequestMaker';
import { PersianNumber } from '@thg303/react-persian';
import * as Converter from './../Common/NumConverter';

class AddCreditBox extends Component {
    constructor(props){
        super(props);

        this.state = {
            credit: 0,
            currentCredit: '0',
            message: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.sendInfo = this.sendInfo.bind(this);
        this.checkParameter = this.checkParameter.bind(this);
    }

    componentWillReceiveProps(props){
        this.setState({currentCredit: props.current_credit});
    }

    handleChange(event) {
        this.setState({credit: Converter.toPersian(event.target.value)});
        let alerts = document.getElementsByClassName("alert");

        for (let i = 0; i < alerts.length; i++)
            alerts[i].style.display= 'none';
        
        document.getElementById('price-box').style.border = '1px solid rgb(167, 166, 166)';
        
    }

    checkParameter(){
        if(this.state.credit === ''|| Converter.toEnglish(this.state.credit) === '0' || isNaN( Converter.toEnglish(this.state.credit))){
            document.getElementById('price-box').style.border = '3px solid red';
            document.getElementById('parameter-alert').style.display = 'flex';
            return false;
        }
        return true;
    }

    sendInfo(event) {
        if(this.checkParameter()){
            let getInfoLink = '/credit/increase';
            let data = new URLSearchParams();
            data.append('credit', Converter.toEnglish(this.state.credit));
            Network.PostRequest(getInfoLink, data).then((res)=>{
                this.setState({message: res.message});
                if(this.state.message === "success")
                    document.getElementById('success-alert').style.display = 'flex';
                else if(this.state.message === "serverError")
                    document.getElementById('server-alert').style.display = 'flex';
                else
                    document.getElementById('credit-alert').style.display = 'flex';
                document.getElementById('price-box').value = '';
                let getInfoLink = 'user/info';
                Network.GetRequest(getInfoLink).then((infoRes)=>{ //uncomment after connecting to server
                    this.setState({currentCredit: infoRes.credit});
                });
            });
        }    
    }

  render() {
    return (
        <div>
            <div id="success-alert" className="alert alert-success">
                <strong>اعتبار با موفقیت افزایش یافت</strong>
            </div>
            <div id="parameter-alert" className="alert alert-danger">
                <strong>خطا در وارد کردن پارامتر</strong>
            </div>
            <div id="server-alert" className="alert alert-danger">
                <strong>خطا در ارتباط با سرور</strong>
            </div>
            <div id="credit-alert" className="alert alert-danger">
                <strong>خطا در افزایش اعتبار</strong>
            </div>

            <div className = "content container">
                <div className = "add-credit container">
                    <div className = "col-md-6 current-credit">
                        <span className = "tex-title">اعتبار کنونی</span>
                        <span><PersianNumber>{this.state.currentCredit} </PersianNumber> </span>
                        <span className = "toman">تومان</span>
                    </div>
                    <div className = "col-md-6 add-box">
                        <div className = "price-input">
                            <p className="toman">تومان</p>
                            <input id="price-box" onChange={this.handleChange} className="price" type="text" value={this.state.credit !== 0 ? this.state.credit : ''} placeholder="مبلغ مورد نظر"/>
                        </div>
                        <div><input onClick={this.sendInfo}  type="submit" value="افزایش اعتبار" className="submit"/></div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default AddCreditBox;
