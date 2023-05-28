import SearchBar from "../components/searchbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import QuickLinkContainer from "../components/QuickLinkContainer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {Amplify} from "aws-amplify"
import awsExports from "../components/aws-exports";
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Auth } from "aws-amplify";
import * as AWS from 'aws-sdk';
import "../styles/ProductPage.css";

function ProductPage() {
  const { id } = useParams();
  const [itemData, setItemdata] = useState([]);
  const [image, setImage] = useState([]);

  function addToCart() {
    if (localStorage.getItem('isLoggedIn') === null)
    {
      localStorage.setItem('isLoggedIn', false);
    }
    if (localStorage.getItem('isLoggedIn') === "false")
    {
      let cart = JSON.parse(localStorage.getItem("cart"));
      if (cart === null) {
        cart = [];
      }
      cart.push(itemData);
      localStorage.setItem("cart", JSON.stringify(cart));
      console.log(cart);
    }
    else 
    {
      let userCart = [];
      const dynamodb = new AWS.DynamoDB({
        region: 'us-east-1',
        endpoint: 'https://dynamodb.us-east-1.amazonaws.com',
        accessKeyId: "AKIA2FAU7FZITTI5DZE7",
        secretAccessKey: "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"
      });
      const getParams = {
        TableName: 'nozama_table1',
        Key: {
          'username': {S: localStorage.getItem('currentUser')}
        }
      };
      dynamodb.getItem(getParams, (err, data) => {
        if (err) {
          console.log(err);
        } else {
            for(let i = 0; i < data.Item.cartItems.L.length; i++){
              console.log(data.Item.cartItems.L[i].N)
              userCart.push(Number(data.Item.cartItems.L[i].N));
          }
          userCart.push(Number(itemData.id));
          console.log(userCart);
          AWS.config.update({
            region: 'us-east-1',
            endpoint: 'https://dynamodb.us-east-1.amazonaws.com',
            accessKeyId: "AKIA2FAU7FZITTI5DZE7",
            secretAccessKey: "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"
          });
          const docClient = new AWS.DynamoDB.DocumentClient();
          const putParams = {
            TableName: 'nozama_table1',
            Item: {
              username: localStorage.getItem('currentUser'),
              cartItems: userCart //test data
              // Add more attributes as needed
            },
          };
      docClient.put(putParams, (err, data) => {
        if (err) {
          console.error(err);
        } else {
          console.log(data);
        }
      });
    }
  });
    }
  }

  useEffect(() => {
    axios.get(`/item/${id}`).then((response) => {
      // console.log(response.data);
      setItemdata(response.data);
      setImage(response.data.images);
    });
  }, []);

  return (
    <div>
      <div className="product-page-container">
        <div className="product-page-img">
          <img src={image[0]} alt="product" />
        </div>
        <div className="product_page_text">
          <h1 className="product-page-title">{itemData.title}</h1>
          <div className="product-page-item-price-info">
            <div className="product-page-cross-out">
                    $
                    {(
                      itemData.price +
                      eval(itemData.price * (itemData.discountPercentage / 100))
                    )
                      .toFixed(2)
                      .toString()}
            </div>
            <div className="product-page-price">${itemData.price}</div>
          </div>
          <div className="product-page-discount">-{itemData.discountPercentage}% OFF ORIGINAL PRICE</div>
          <div className="product-page-rating">Rating: {itemData.rating} (5)</div>
          <button 
            className="product-page-cart-button"
            onClick={() => {
              alert("Item added to cart!");
              addToCart();
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="product-page-bottom">
        <h4 className="product-page-bottom-title">More Details:</h4>
        <div>Brand: {itemData.brand}</div>
        <div>Description: {itemData.description}</div>
        <div>Items Remaining: {itemData.stock}</div>
      </div>
    </div>
  );
}

export default ProductPage;