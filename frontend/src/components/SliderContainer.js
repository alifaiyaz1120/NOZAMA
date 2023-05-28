import React from 'react'
import ImageSlides from './ImageSlides'

const SliderContainer = () => {
    const slides = [
        {url: "http://localhost:3000/images/sale3.webp", title: "surface"},
        {url: "http://localhost:3000/images/iphone9ad.jpg", title: "Iphone-Ad"},
        {url: "http://localhost:3000/images/shipping.webp", title: "shipping"},
        {url: "http://localhost:3000/images/slider_img_1_copy.jpg", title: "deals"},
        {url: "http://localhost:3000/images/surface3.jpeg", title: "surface"},
      ]
    
      const constainerStyles = {
        width: "90vw",
        height: "70vh",
        margin: "0 auto",
        marginBottom: "50px",
        marginTop: "50px",
      }
  return (
    <div>
      <div style={constainerStyles}>
        <ImageSlides slides={slides}></ImageSlides>
      </div>
    </div>
  )
}

export default SliderContainer
