import React, { Component } from 'react';
import {withRouter} from 'react-router';
import { PersianNumber } from '@thg303/react-persian';
class HouseBox extends Component {
    constructor(props){
        super(props);
        this.sendInfo = this.sendInfo.bind(this);
    }

    sendInfo(event) {
        this.props.history.push({pathname: '/moreInfo/' + this.props.house.id + '/' + this.props.house.serverNum});
    }

  render() {
    return (
        <div className="col-lg-6">
            <div className="box1">
                <div className={"card h-100 house-box " + (this.props.house.dealType ? 'rent-house' : 'sell-house')}>
                    <a onClick={this.sendInfo}>
                        <div className="house-img" style={{"background-image": "url('" + this.props.house.imageURL + " ')"}}>
                            <div className="show-type">{this.props.house.dealType ? 'رهن و اجاره' : 'فروش'}</div>
                        </div>
                    </a>
                    <div className="card-body line">
                        <span className="card-text"><PersianNumber>{this.props.house.area}</PersianNumber> متر مربع</span>
                        <span className="card-text"><i className="fa fa-map-marker marker"></i> شایر</span>
                    </div>
                    <hr/>
                    { this.props.house.dealType
                    ?   <div className="card-body line">
                            <span className="card-text">رهن <PersianNumber>{this.props.house.price.basePrice}</PersianNumber> <span className="toman">تومان</span></span>
                            <span className="card-text">اجاره <PersianNumber>{this.props.house.price.rentPrice}</PersianNumber> <span className="toman">تومان</span></span>
                        </div>
                    :   <div className="card-body line">
                            <span className="card-text">قیمت <PersianNumber>{this.props.house.price.sellPrice}</PersianNumber> <span className="toman">تومان</span></span>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
  }
}

export default withRouter(HouseBox);
