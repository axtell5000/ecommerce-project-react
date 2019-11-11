import React from 'react';
import { withRouter } from 'react-router-dom';

import './menu-item.styles.scss';

const MenuItem = ({title, imageUrl, size, history, linkUrl, match}) => (
  <div 
    className={`${size} menu-item`} 
    onClick={() => history.push(`${match.url}${linkUrl}`)}>
    {/*We use this as background image of content so when we hover the image does not expand beyond content are */}
    <div
      className="background-image"
      style={{
        backgroundImage: `url(${imageUrl})`
      }}>
    </div>
    <div className="content">
      <h1 className="title">{title.toUpperCase()}</h1>
      <span className="subtitle">SHOP NOW</span>
    </div>
  </div>
);

// Using withRouter allows us to avoid having to pops drill down, now men-uitem with have access to routes and history etc
export default withRouter(MenuItem);