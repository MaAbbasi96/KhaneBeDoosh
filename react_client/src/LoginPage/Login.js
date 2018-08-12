import React, { Component } from 'react';
import './../Styles/login.css'
import DefaultNavbar from '../Common/DefaultNavbar';
import TitleDes from '../Common/TitleDes';
import Footer from '../Common/Footer';
import * as Network from './../Common/RequestMaker';
import * as Converter from './../Common/NumConverter';

class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            message: '',
            username: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.sendInfo = this.sendInfo.bind(this);
        this.goToRegister = this.goToRegister.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: Converter.toPersian(event.target.value)});

        let alerts = document.getElementsByClassName("alert");
        for (let i = 0; i < alerts.length; i++)
            alerts[i].style.display= 'none';
    }

    sendInfo(event) {
        let registerLink = '/KhaneBeDoosh/login';
        let data = new URLSearchParams();
        data.append('username', Converter.toEnglish(this.state.username));
        data.append('password', Converter.toEnglish(this.state.password));
        Network.PostRequest(registerLink, data).then((res)=>{
            this.setState({message: res.message});
            if(this.state.message === "success"){ //TODO:token ro bayad begirim
                localStorage.setItem("token", res.token);
                var infoURL = "/";
                if(localStorage.getItem("infoURL")){
                    infoURL = "moreInfo/"+localStorage.getItem("infoURL");
                    localStorage.setItem("infoURL","/");
                }
                this.props.history.push({pathname: infoURL});
            }
            else if(this.state.message === "failed")
                document.getElementById('failed-alert').style.display = 'flex';
            else
                document.getElementById('server-alert').style.display = 'flex';
        });
    }

    goToRegister(event){
        this.props.history.push({pathname: '/register'});
    }


    render() {
        return (
            <div className="body-login">
                <DefaultNavbar/>
                <TitleDes title="ورود"/>
                <div>
                    <div id="server-alert" className="alert alert-danger">
                        <strong>خطا در ارتباط با سرور</strong>
                    </div>
                    <div id="failed-alert" className="alert alert-danger">
                        <strong>نام‌کاربری یا رمزعبور اشتباه است</strong>
                    </div>

                    <div className = "content container">
                        <div className = "login container">
                            <div className = "login-box">
                                <div className = "register-box">
                                    <div><input type="submit" onClick={this.goToRegister} value="ثبت نام نکرده‌اید؟" className="register-button"/></div>
                                </div>
                                <div className = "username-input">
                                    <input id="username" name="username" className="username input-box" type="text" value={this.state.username} onChange={this.handleChange} placeholder="نام‌کاربری"/>
                                </div>
                                <div className = "password-input">
                                    <input id="password" name="password" className="password input-box" type="text" value={this.state.password} onChange={this.handleChange} placeholder="گذرواژه"/>
                                </div>
                                <div><input type="submit" onClick={this.sendInfo} value="ورود" className="submit"/></div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Login;
