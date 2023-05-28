import React from 'react'
import { Routes, Route, Link } from "react-router-dom";


const QuickLinks = () => {
  return (
    <div className='quickLinksSmallContainer'>
        <img src="http://localhost:9000/iphonex.webp"></img>
        <div className='quick-links-title'>Iphone X</div>
        <Link to="/item/2"><button className='quick-links-btn'>Shop Deal</button></Link>
    </div>
  )
}

export default QuickLinks
