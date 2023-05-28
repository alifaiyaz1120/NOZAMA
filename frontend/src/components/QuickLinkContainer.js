import React, { useEffect, useState } from 'react'
import QuickLinks from "../components/QuickLinks";
import { Routes, Route, Link } from "react-router-dom";
import "../styles/QuickLinkContainer.css";

const QuickLinkContainer = () => {
    const list = [1, 2, 5, 6, 8, 9];
    const dataList = [];
    const [item, setItem] = useState([]);
    
  return (
    <div>
      <div className='quick-link-container-title'>Shop Our Top Picks:</div>
      <div className='quick-link-large-container'>
        {/* <QuickLinks></QuickLinks> */}
        <Link to="/item/2"><div className='quickLinksSmallContainer'>
          <img src="http://localhost:3000/images/iphonex.webp"></img>
          <div className='quick-links-title'>iPhone X</div>
          <Link to="/item/2"><button className='quick-links-btn'>Shop Deal</button></Link>
        </div></Link>
        <Link to="/item/8"><div className='quickLinksSmallContainer'>
          <img src="http://localhost:3000/images/surfacetrans.png"></img>
          <div className='quick-links-title'>Microsoft Surface Laptop 4</div>
          <Link to="/item/8"><button className='quick-links-btn'>Shop Deal</button></Link>
        </div></Link>
        <Link to="/item/5"><div className='quickLinksSmallContainer'>
          <img src="http://localhost:3000/images/huawei.png"></img>
          <div className='quick-links-title'>Huawei P30</div>
          <Link to="/item/5"><button className='quick-links-btn'>Shop Deal</button></Link>
        </div></Link>
        <Link to="/item/6"><div className='quickLinksSmallContainer'>
          <img src="http://localhost:3000/images/mac.png"></img>
          <div className='quick-links-title'>MacBook Pro</div>
          <Link to="/item/6"><button className='quick-links-btn'>Shop Deal</button></Link>
        </div></Link>
        <Link to="/item/1"><div className='quickLinksSmallContainer'>
          <img src="http://localhost:3000/images/iphone9.webp"></img>
          <div className='quick-links-title'>iPhone XR</div>
          <Link to="/item/1"><button className='quick-links-btn'>Shop Deal</button></Link>
        </div></Link>
        <Link to="/item/7"><div className='quickLinksSmallContainer'>
          <img src="http://localhost:3000/images/galaxybook.png"></img>
          <div className='quick-links-title'>Samsung Galaxy Book</div>
          <Link to="/item/7"><button className='quick-links-btn'>Shop Deal</button></Link>
        </div></Link>
        
      </div>
    </div>
  )
}

export default QuickLinkContainer
