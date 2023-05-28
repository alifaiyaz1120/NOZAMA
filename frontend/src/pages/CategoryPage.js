import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import React, { Component } from 'react'
import axios from "axios";
import ItemComponent from "../components/ItemComponent";
import "../styles/CategoryPage.css";

function CategoryPage() {
    const { category } = useParams();
    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get(`/searchcategory/${category}`).then((response) => {
        //   console.log(response.data.products);
          setList(response.data.products);
        });
      }, [category]);


    return(
        <div>
            <div className="category-title"><h1>{category}</h1></div>
            <div className="item-container">
                {
                    list.map(item=>{
                        return(
                            <ItemComponent
                            itemID = {item.id}
                            title = {item.title}
                            description = {item.description}
                            price = {item.price}
                            rating = {item.rating}
                            image = {item.images[0]}
                            ></ItemComponent>
                        )
                    })
                }
            </div>
        </div>
    )
}



export default CategoryPage;



