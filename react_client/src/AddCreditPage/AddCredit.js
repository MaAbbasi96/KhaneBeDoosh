import React, { Component } from 'react';
import './../Styles/addCreditStyle.css'
import DefaultNavbar from '../Common/DefaultNavbar';
import TitleDes from '../Common/TitleDes';
import Footer from '../Common/Footer';
import AddCreditBox from '../AddCreditPage/AddCreditBox';
import * as Network from './../Common/RequestMaker';

class AddCredit extends Component {
    constructor(){
        super();

        this.state = {
            credit: ''
        };
    }

    componentWillMount(){
        let getInfoLink = '/user/info';
        Network.GetRequest(getInfoLink).then((res)=>{
            this.setState({credit: res.credit});
        });
    }

    render() {
        return (
            <div className="body-add-credit">
                <DefaultNavbar/>
                <TitleDes title="افزایش اعتبار"/>
                <AddCreditBox current_credit={this.state.credit}/>
                <Footer/>
            </div>
        );
    }
}

export default AddCredit;
