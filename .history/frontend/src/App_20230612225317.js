import React, { useEffect, useState } from "react";
import Head from "./component/Head_foot/head";
import Footer from "./component/Head_foot/foot";
import Body from "./utils/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./utils/main"
import Home from "./utils/Home"
import SignIn from "./utils/signIn"
import SignUp from "./utils/signUp"
import History from "./utils/history"
function App() {
  let [userData,setUserData]=useState(JSON.parse(localStorage.getItem("user_prediction"))||{
    logged:false,
    data:{},
})
  let [count,setCount]=useState(1)
  //console.log("data from app",JSON.stringify(userData));

  return (
    <div >
     <BrowserRouter>
        <Routes>
             <Route path='/' element={<Main userData={userData} setUserData={setUserData}/>}>
               <Route path='' element={<Home userData={userData} setUserData={setUserData}/>}/>
               <Route path='/signIn' element={<SignIn count={count} setCount={setCount} userData={userData} setUserData={setUserData}/>}/>
               <Route path='/signUp' element={<SignUp />}/>
               <Route path='/history' element={<History userData={userData} setUserData={setUserData}/>}/>
             </Route>
       </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
