import Head from "./component/Head_foot/head";
import Footer from "./component/Head_foot/foot";
import Body from "./component/body/body";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div >
     <BrowserRouter>
        <Routes>
         <Route path='user/:username' element={<User darkmode={darkmode} setDarkmode={setDarkmode} userData={userData} setUserData={setUserData}/>}/>
     </Routes>
     </BrowserRouter>
        <Head/>
         <Body/>
        <Footer/>
    </div>
  );
}

export default App;
