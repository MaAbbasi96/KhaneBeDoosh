import React, { Component } from 'react';
import HouseBox from './HouseBox';

class SearchResult extends Component {
  render() {
    let housesInfo = this.props.housesInfo;
    const items = []
    for(let i=0;i<housesInfo.length;i++){
        items.push(
            <HouseBox house={housesInfo[i]}/>
        )
    }
    return (
        <div className="more-info">
            <span className="title">برای مشاهده اطلاعات بیشتر درباره‌ی هر ملک روی آن کلیک کنید</span>

            <div className="row">
                {items}
            </div>
        </div>
    );
  }
}

export default SearchResult;
