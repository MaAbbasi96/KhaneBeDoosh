import React, { Component } from 'react';
import './../Styles/indexStyle.css';

import pic from './../assets/why-khanebedoosh.jpg';

class Description extends Component {
  render() {
    return (
        <div>
            <div className="container why col-md-6 col-md-offset-3">چرا خانه به دوش</div>

            <div className="container description col-md-6 col-md-offset-3">
                <div className="row col-md-12">    
                    <div className="col-md-6 list"><ul>
                        <li>
                            <i className="fas fa-check-circle"></i>
                            اطلاعات کامل و صحیح از املاک قابل معامله
                        </li>
                        <li>
                            <i className="fas fa-check-circle"></i>
                            بدون محدودیت, ۲۴ ساعته و در تمام ایام هفته
                        </li>
                        <li>
                            <i className="fas fa-check-circle"></i>
                            جست و جوی هوشمند ملک, صرفه جویی در زمان
                        </li>
                        <li>
                            <i className="fas fa-check-circle"></i>
                            تنوع در املاک, افزایش قدرت خرید مشتریان
                        </li>
                        <li>
                            <i className="fas fa-check-circle"></i>
                            بانکی جامع از اطلاعات هزاران آگهی به روز
                        </li>
                        <li>
                            <i className="fas fa-check-circle"></i>
                            دستیابی به نتیجه مطلوب در کمترین زمان ممکن
                        </li>
                        <li>
                            <i className="fas fa-check-circle"></i>
                            همکاری با مشاوران متخصص در حوزه املاک
                        </li>
                    </ul></div>
        
                    <div className="description-img col-md-6">
                        <img alt="why khane be doosh" src={pic}/>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default Description;