import React, { Component } from 'react';
import {withRouter} from 'react-router';
import * as Network from './../Common/RequestMaker';
import { PersianNumber } from '@thg303/react-persian';

class UserInfo extends Component {
    constructor(){
        super();
        this.goToAddPage = this.goToAddPage.bind(this);
        this.state = {
            name: '',
            credit: ''
        };
    }

    goToAddPage(event){
        this.props.history.push({pathname: '/addCredit'});
    }

    componentWillMount(){
        let getInfoLink = '/user/info';
        Network.GetRequest(getInfoLink).then((res)=>{ //uncomment after connecting to server
            this.setState({name: res.name});
            this.setState({credit: res.credit});
        });
    }

    render() {
        let getInfoLink = '/user/info';
        Network.GetRequest(getInfoLink).then((res)=>{
            this.setState({credit: res.credit});
        });
        return (
            <div className="user-info-div">
                <ul className="list">
                    <li>
                        <button className="user-button">
                            <i className="fa fa-smile-o"></i> 
                            <span> ناحیه کاربری </span>
                        </button>
                        <div className="offset"></div>
                        <ul className="user-info">
                            <li><div className="info user-name">{this.state.name}</div></li>
                            <li><div className="info balance">
                                <span>اعتبار</span>
                                <span><PersianNumber>{this.state.credit} </PersianNumber>تومان</span>
                            </div></li>
                            <li><div className="info"><button onClick={this.goToAddPage} className="submit">افزایش اعتبار</button></div></li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
}

export default withRouter(UserInfo);