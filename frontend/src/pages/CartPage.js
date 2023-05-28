import { Link } from "react-router-dom";
import "../styles/CartPage.css";
import { Auth } from "aws-amplify";
import * as AWS from 'aws-sdk';
import axios from "axios";
import { useEffect, useState } from "react";

function CartPage() {
const [itemData, setItemdata] = useState([]);
const [cart, setCart] = useState([]);
if (localStorage.getItem("currentUser") === null)
{
  localStorage.setItem("currentUser", "null")
}
let currentUser = localStorage.getItem("currentUser");
console.log(currentUser);

// Dynamodb and Local Storage steps:
// If a user is logged in, append item to and from dynamo cart, else from local storage cart
// When user logs in, append local storage cart to existing dynamo cart, clear local storage cart

if (localStorage.getItem("cart") === null) {
  localStorage.setItem("cart", "[]");
}

let cartItems = JSON.parse(localStorage.getItem("cart"));

function windowRefresh() {
 window.location.reload();
}

function removeFromCart(productID) {
  if (localStorage.getItem('isLoggedIn') === "true")
  {
    let deletedCart = [];
    removeDB(deletedCart, productID);
  }
  else
  {
    let cart = JSON.parse(localStorage.getItem("cart"));
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === productID) {
        cart.splice(i, 1);
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(cart.length);
  }
}

async function removeDB (deletedCart, productID)
{
  const dynamodb = new AWS.DynamoDB({
    region: 'us-east-1',
    endpoint: 'https://dynamodb.us-east-1.amazonaws.com',
    accessKeyId: "AKIA2FAU7FZITTI5DZE7",
    secretAccessKey: "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"
  });
  const getParams = {
    TableName: "nozama_table1",
    Key: {
      username: { S: localStorage.getItem("currentUser") },
    },
  };
  try {
    const data = await dynamodb.getItem(getParams).promise();
    for (let i = 0; i < data.Item.cartItems.L.length; i++) {
      if (Number(data.Item.cartItems.L[i].N) != productID) {
        deletedCart.push(Number(data.Item.cartItems.L[i].N));
      }
    }
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
        cartItems: deletedCart //test data
        // Add more attributes as  needed
      },
    };
  docClient.put(putParams, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(data);
    }
  });
  } catch (err) {
    console.log(err);
  }
}

function goToCheckout() {
  window.location.href = "/checkout";
}


async function pullCartFromDB() {
  let userCart = [];
  const dynamodb = new AWS.DynamoDB({
    region: 'us-east-1',
    endpoint: 'https://dynamodb.us-east-1.amazonaws.com',
    accessKeyId: "AKIA2FAU7FZITTI5DZE7",
    secretAccessKey: "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"
  });
  const getParams = {
    TableName: "nozama_table1",
    Key: {
      username: { S: localStorage.getItem("currentUser") },
    },
  };
  try {
    const data = await dynamodb.getItem(getParams).promise();
    for (let i = 0; i < data.Item.cartItems.L.length; i++) {
      userCart.push(Number(data.Item.cartItems.L[i].N));
    }
    let tempCart = [];
    for (let i = 0; i < userCart.length; i++) {
      const response = await axios.get(`/item/${userCart[i]}`);
      console.log(response.data);
      tempCart.push(response.data);
    }
    setCart(tempCart);
  } catch (err) {
    console.log(err);
  }
}

useEffect(() => {
  console.log(currentUser)
  if (currentUser !== "null") {
    pullCartFromDB();
  } else {
    setCart(cartItems);
  }
}, []);

const subtotal = cart.reduce((acc, item) => acc + item.price, 0);


return (
   <div className="cart-page">
     {console.log(localStorage.getItem('isLoggedIn'))}
     <div className="items-in-cart">
       <div className="cart-title">SHOPPING CART</div>
       {cart.map((item) => (
         <div className="item-display">
           <Link to={`/item/${item.id}`}>
             <img
               src={item.thumbnail}
               alt="product"
               className="cart-item-image"
             />
           </Link>
           <div className="cart-item-text">
             <Link to={`/item/${item.id}`}>
               <div className="cart-item-title">{item.title}</div>
             </Link>
             <div className="cart-item-price-info">
               <div className="cross-out">
                 $
                 {(
                   item.price +
                   eval(item.price * (item.discountPercentage / 100))
                 )
                   .toFixed(2)
                   .toString()}
               </div>
               <div className="cart-item-price">${item.price}</div>
             </div>
             <button
               className="cart-item-btn"
               onClick={() => {
                 removeFromCart(item.id);
                 windowRefresh();
                 alert("Item removed from cart!");
               }}
             >
               Remove
             </button>
           </div>
         </div>
       ))}
     </div>
     <div className="cart-sidebar">
       <div className="cart-free-ship">You've Earned FREE SHIPPING!</div>
       <div className="cart-total">
         <div className="cart-total-heading">Subtotal: ${subtotal}.00</div>
       </div>
       <button
         className="checkout-btn"
         onClick={() => {
           if (cart.length === 0) {
             alert("No items in cart!");
           } 
           else if (localStorage.getItem('isLoggedIn') === "false")
           {
            alert("Please log in to check out!");
           }
            else goToCheckout();
         }}
       >
         Checkout
       </button>
       <div className="cart-sidebar-end1">Don’t Miss Out!</div>
       <div className="cart-sidebar-end2">
         Items in bag are not held and may sell out
       </div>
       <div className="cart-help-title">NEED SOME HELP?</div>
       <div className="cart-help-text"><Link to="/contact"className="cart-help-link">Contact Us</Link>. And we'd love to help!</div>
     </div>
   </div>
 );
}

export default CartPage;
