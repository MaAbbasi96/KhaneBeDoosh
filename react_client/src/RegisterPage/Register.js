import React, { Component } from 'react';
import './../Styles/Register.css'
import DefaultNavbar from '../Common/DefaultNavbar';
import TitleDes from '../Common/TitleDes';
import Footer from '../Common/Footer';
import * as Network from './../Common/RequestMaker';
import * as Converter from './../Common/NumConverter';

class Register extends Component {
    constructor(props){
        super(props);

        this.state = {
            message: '',
            name: '',
            username: '',
            password: '',
            phone: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.sendInfo = this.sendInfo.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: Converter.toPersian(event.target.value)});

        let alerts = document.getElementsByClassName("alert");
        for (let i = 0; i < alerts.length; i++)
            alerts[i].style.display= 'none';
    }

    sendInfo(event) {
        let registerLink = '/KhaneBeDoosh/register';
        let data = new URLSearchParams();
        data.append('name', Converter.toEnglish(this.state.name));
        data.append('username', Converter.toEnglish(this.state.username));
        data.append('password', Converter.toEnglish(this.state.password));
        data.append('phone', Converter.toEnglish(this.state.phone));
        Network.PostRequest(registerLink, data).then((res)=>{
            this.setState({message: res.result});
            if(this.state.message === "succes")
                this.props.history.push({pathname: '/'});
            else if(this.state.message === "exists")
                document.getElementById('exist-alert').style.display = 'flex';
            else
                document.getElementById('server-alert').style.display = 'flex';
        });
    }


    render() {
        return (
            <div className="body-register">
                <DefaultNavbar/>
                <TitleDes title="ثبت‌نام"/>
                <div>
                    <div id="success-alert" className="alert alert-success">
                        <strong>ثبت‌نام با موفقیت انجام شد</strong>
                    </div>
                    <div id="server-alert" className="alert alert-danger">
                        <strong>خطا در ارتباط با سرور</strong>
                    </div>
                    <div id="-alert" className="alert alert-danger">
                        <strong>نام‌کاربری تکراری می‌باشد</strong>
                    </div>

                    <div className = "content container">
                        <div className = "register container">
                            <div className = "register-box">
                                <div className = "name-input">
                                    <input id="name" name="name" className="name input-box" type="text" value={this.state.name} onChange={this.handleChange} placeholder="نام"/>
                                </div>
                                <div className = "username-input">
                                    <input id="username" name="username" className="username input-box" type="text" value={this.state.username} onChange={this.handleChange} placeholder="نام‌کاربری"/>
                                </div>
                                <div className = "password-input">
                                    <input id="password" name="password" className="password input-box" type="text" value={this.state.password} onChange={this.handleChange} placeholder="گذرواژه"/>
                                </div>
                                <div className = "phone-input">
                                    <input id="phone" name="phone" className="phone input-box" type="text" value={this.state.phone} onChange={this.handleChange} placeholder="شماره تماس"/>
                                </div>
                                <div><input type="submit" onClick={this.sendInfo} value="ثبت‌نام" className="submit"/></div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Register;
