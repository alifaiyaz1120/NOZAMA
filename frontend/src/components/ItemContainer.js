import React, { Component } from 'react'
import ItemComponent from './ItemComponent';
import axios from "axios"
import "../styles/Item.css";

export default class ListOfProducts extends Component {
    constructor(){
        super()
        this.state = {
            listOfProducts: [],
        };
    }

    componentDidMount = () =>{
        axios.get("/products").then(response => {
            // console.log(response.data)
            this.setState({
                listOfProducts: response.data
        });
        })
    };

    render() {
        return (
            <div className="product-container">
                <div className='product-container-title'>All Products:</div>
                <div className="item-container">
                    {this.state.listOfProducts.map(item=>{
                        return(
                            <ItemComponent
                                itemID = {item.id}
                                title = {item.title}
                                description = {item.description}
                                price = {item.price}
                                rating = {item.rating}
                                image = {item.images[0]}
                            />
                        )
                    })}
                </div>
          </div>
        )
      }
}
