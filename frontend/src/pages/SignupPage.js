import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/SignupPage.css";
import UserPool from "../components/UserPool";
import { Link } from "react-router-dom";


export default function AccountPageSignUp() {
  // const [newUser, setInfo] = useState({
  //   name: '',
  //   password: ''
  // });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // let handleChange = ({target}) => {
  //   const {name, value} = target;
  //   setInfo(prevValues => {
  //     return {
  //       ...prevValues,
  //       [name] : value
  //     }
  //   });
  // };

  // let sendUser = (event) => {
  //   event.preventDefault();

  //   let payload = {
  //     name : newUser.name,
  //     password: newUser.password
  //   }

  //   axios({
  //     url: '/account/signup',
  //     method: 'POST',
  //     data: payload
  //   })
  //     .then(() => {
  //       navigate('/account');
  //     })
  // }

  const onSubmit = (event) =>{
        event.preventDefault();
        UserPool.signUp(email, password, [], null, (err, data)=>{
          if(err){
            console.log(err);
          }
          console.log(data);
        })
      };

  return (
    <div className="Signup">
      <main>
        <h1>Sign Up</h1>
        <p>Enter your account details below</p>

        <form onSubmit={onSubmit}>
          <div className="signup-email">
            <label for="email">Email</label>
            <input 
              type="email"
              value={email}
              onChange={(event)=> setEmail(event.target.value)} 
            />
          </div>
          <br/>
          <div className="signup-password">
            <label for = "password">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(event)=> setPassword(event.target.value)}  
            />
          </div>
          <button className="submit-buttom"> Submit </button>
          <Link to="/account"><button className="login-btn">Returning User</button></Link>
        </form>
      </main>
    </div>
  );
}

// export default function AccountPageSignUp(){
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const onSubmit = (event) =>{
//     event.preventDefault();
//     UserPool.signUp(email, password, [], null, (err, data)=>{
//       if(err){
//         console.log(err);
//       }
//       console.log(data);
//     })
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <label htmlFor="email">Email</label>
//         <input
//           value={email}
//           onChange={(event)=> setEmail(event.target.value)}>  
//         </input>
//         <label htmlFor="password">Password</label>
//         <input
//           value={password}
//           onChange={(event)=> setPassword(event.target.value)}>  
//         </input>
//         <button type="submit">Sign Up</button>
//       </form>
//     </div>
//   )
// }