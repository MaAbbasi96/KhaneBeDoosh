import React, { Component } from 'react';
import './../Styles/indexStyle.css';

import icon1 from './../assets/icons/726499.svg';
import icon2 from './../assets/icons/726488.svg';
import icon3 from './../assets/icons/726446.svg';

class Cards extends Component {
  render() {
    return (
        <div className="container middle col-md-6 col-md-offset-3">
            <div className="row col-md-12">    
                <div className="col-md-4 feature-box">   
                    <div className="feature">
                        <img alt="icon1" src={icon1}/>
                        <div className="big-text">گسترده</div>
                        <div className="small-text">در منطقه مورد علاقه خود صاحب خانه شوید</div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="feature">
                        <img alt="icon2" src={icon2}/>
                        <div className="big-text">مطمئن</div>
                        <div className="small-text">با خیال راحت به دنبال خانه بگردید</div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="feature">
                        <img alt="icon3" src={icon3}/>
                        <div className="big-text">آسان</div>
                        <div className="small-text">به سادگی صاحب خانه شوید</div>
                    </div>
                </div> 
            </div>
        </div>
    );
  }
}

export default Cards;