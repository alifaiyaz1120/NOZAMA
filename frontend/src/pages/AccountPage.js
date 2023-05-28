import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AccountPage.css";
import { Link } from "react-router-dom";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import {Amplify} from "aws-amplify"
import awsExports from "../components/aws-exports";
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Auth } from "aws-amplify";
import * as AWS from 'aws-sdk';

function AccountPageLoginIn() {
  const [user, setUser] = useState(null);
  // useEffect(()=>{
  //   async function checkUser(){
  //     try{
  //       const user = await Auth.currentSession();
  //       setUser(user);
  //       if(user.idToken.payload.email){
  //         localStorage.setItem('isLoggedIn', true);
  //         let isLoggedIn = localStorage.getItem('isLoggedIn');
  //         console.log("USEEFFECT: ", isLoggedIn);
  //       }
  //       console.log(user)
  //     }catch(error){
  //       console.log(error)
  //     }
  //   }
  //   checkUser();
  // },[])

  Amplify.configure({
    Auth: {
        region: awsExports.REGION,
        userPoolId: awsExports.USER_POOL_ID,
        userPoolWebClientId: awsExports.USER_POOL_APP_CLIENT_ID
    }
  })

  const formFields = {
    signUp: {
      username: {
        order: 2
      },
      email: {
        order: 1
      },
      name: {
        order: 3
      },
      birthdate: {
        order: 4
      },
      password: {
        order: 5
      },
      confirm_password: {
        order: 6
      }
    },
   }

  const signUpAttributes=['username', 'birthdate', 'name', "email"]

  const checkUserLegacy = (username) => {
    const dynamodb = new AWS.DynamoDB({
      region: 'us-east-1',
      endpoint: 'https://dynamodb.us-east-1.amazonaws.com',
      accessKeyId: "AKIA2FAU7FZITTI5DZE7",
      secretAccessKey: "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"
    });
    const getParams = {
      TableName: 'nozama_table1',
      Key: {
        'username': {S: username}
      }
    };
    dynamodb.getItem(getParams, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        if(data.Item){
          for(let i = 0; i < data.Item.cartItems.L.length; i++){
            console.log(data.Item.cartItems.L[i].N)
          }
        }
        else{
          console.log("NOOOO")
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
              username: username,
              cartItems: [] //test data
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
      }
    });
  }

  //retrieve Dynamo Cart
  /*
  async function retrieveCart(combinedCart, user){
    const dynamodb = new AWS.DynamoDB({
      region: 'us-east-1',
      endpoint: 'https://dynamodb.us-east-1.amazonaws.com',
      accessKeyId: "AKIA2FAU7FZITTI5DZE7",
      secretAccessKey: "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"
    });
    const getParams = {
      TableName: "nozama_table1",
      Key: {
        username: { S: user },
      },
    };
    try {
      const data = await dynamodb.getItem(getParams).promise();
      for (let i = 0; i < data.Item.cartItems.L.length; i++) {
          combinedCart.push(Number(data.Item.cartItems.L[i].N));
      }
      AWS.config.update({
        region: 'us-east-1',
        endpoint: 'https://dynamodb.us-east-1.amazonaws.com',
        accessKeyId: "AKIA2FAU7FZITTI5DZE7",
        secretAccessKey: "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"
      });
      const docClient = new AWS.DynamoDB.DocumentClient();
      let tempCart = JSON.parse(localStorage.getItem("cart"));
      for (let i = 0; i < tempCart.length; i++)
      {
        combinedCart.push(tempCart[i].id);
      }
      console.log(combinedCart);
      localStorage.setItem("cart", "[]");
      const putParams = {
        TableName: 'nozama_table1',
        Item: {
          username: user,
          cartItems: combinedCart //test data
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
      } catch (err) {
        console.log(err);
      }
  }
  */
  
  // {console.log(Auth.currentAuthenticatedUser())}
  function SetLogin(userString)
  {
    localStorage.setItem('isLoggedIn', true);
    let isLoggedIn = localStorage.getItem('isLoggedIn');
    localStorage.setItem('currentUser', userString);
    let currentUser = localStorage.getItem('currentUser');
    console.log(currentUser);
    console.log(isLoggedIn);
  }

  function Leave()
  {
    // return new Promise((resolve, reject) =>{
      localStorage.setItem('isLoggedIn', false);
      let isLoggedIn = localStorage.getItem('isLoggedIn');
      localStorage.setItem('currentUser', null);
      let currentUser = localStorage.getItem('currentUser');
      console.log(currentUser);
      console.log(isLoggedIn);
      // resolve( );
    // })
  }

  /*
  function combineCarts(user)
  {
    if (localStorage.getItem("cart") !== null)
    {
      let combinedCart = [];
      retrieveCart(combinedCart, user);
    }
  }
  */

  return (
    <div className="signInBox">
      <Authenticator formFields={formFields} signUpAttributes={signUpAttributes}>
              {({ signOut, user }) => (
                  <div className="signInContainerCognito">
                      {/* <p>Welcome {user.username}</p> */}
                      <p className="welcomeMessageCognito"><span className="highlight">Welcome</span> {(user.attributes.name)}</p>
                      {SetLogin(user.username)}
                      <p className="welcomeMessageSubHeading">{(user.attributes.email)}</p>
                      <button className="signOutButtonCognito"
                        onClick={async () => {
                          await Auth.signOut();
                          Leave();
                          }}
                        >
                          Sign out
                      </button>
                      {checkUserLegacy(user.username)}
                  </div>
              )}
      </Authenticator>
    </div>
  );
}

export default AccountPageLoginIn;


// export default function AccountPageLoginIn() {

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const {authenticate} = useContext(AccountContext);

//   const onSubmit = (event) =>{
//     event.preventDefault();
//     authenticate(email, password)
//       .then(data =>{
//         console.log("Logged in!", data);
//         window.location.reload(); 
//       })
//       .catch(err => {
//         console.log("Failed to Login", err);
//       })
//   };


//   return (
//     <div className="Login">
//       <main>
//         <h1>Log In</h1>
//         <p>Enter your account details below</p>
//         <form onSubmit={onSubmit}>
//         <div className="login-email">
//             <label for="email">Email</label>
//             <input 
//               type="email"
//               value={email}
//               onChange={(event)=> setEmail(event.target.value)} 
//             />
//           </div>
//           <br />
//           <div className="login-password">
//             <label for = "password">Password</label>
//             <br />
//             <input 
//               type="password" 
//               value={password}
//               onChange={(event)=> setPassword(event.target.value)}  
//             />
//           </div>
          
//           <br />
//           <button className="login-button">Login</button>
//           <br />
//           <Link to="/account/signup"><button className="register-btn">Create your new account</button></Link>
//           <br />
//         </form>
//       </main>
//     </div>
//   );
// }

// export default function AccountPageLoginIn() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

      // const onSubmit = (event) =>{
      //   event.preventDefault();

      //   const user = new CognitoUser({
      //     Username: email,
      //     Pool: UserPool
      //   })
        
      //   const authDetails = new AuthenticationDetails({
      //     Username: email,
      //     Password: password,
      //   })

      //   user.authenticateUser(authDetails, {
      //     onSuccess:(data)=>{
      //       console.log("onsuccess : ", data);
      //     },
      //     onFailure: (err)=>{
      //       console.log("onFailure :", err)
      //     },
      //     newPasswordRequired: (data)=>{
      //       console.log("newPasswordRequired: ", data);
      //     },
      //   })
      // };

//   return (
//     <div className="Signup">
//       <main>
//         <h1>Sign Up</h1>
//         <p>Enter your account details below</p>

//         <form onSubmit={onSubmit}>
//           <div className="signup-email">
//             <label for="email">Email</label>
//             <input 
//               type="email"
//               value={email}
//               onChange={(event)=> setEmail(event.target.value)} 
//             />
//           </div>
//           <br/>
//           <div className="signup-password">
//             <label for = "password">Password</label>
//             <input 
//               type="password"
//               value={password}
//               onChange={(event)=> setPassword(event.target.value)}  
//             />
//           </div>
//           <button type="submit-buttom"> LOGIN </button>
//         </form>
//       </main>
//     </div>
//   );
// }