// import React, {useState, useEffect, useContext} from 'react';
// import { Account, AccountContext } from './Account';

// const Status = () => {
//     const [status, setStatus] = useState(false);

//     const {getSession, logout} = useContext(AccountContext);

//     useEffect(() => {
//         getSession().then((session)=>{
//             console.log("Session: ", session);
//             setStatus(true);
//         })
//     })
//     return (
//         <div>{status ? <button onClick={logout}>LogOut</button> : "Log In"}</div>
//     );
// };

// export default Status
