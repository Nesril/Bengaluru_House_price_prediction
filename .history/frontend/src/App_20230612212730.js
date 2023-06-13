import Head from "./component/Head_foot/head";
import Footer from "./component/Head_foot/foot";
import Body from "./utils/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./utils/main"
import Home from "./utils/Home"
import SignIn from "./utils/signIn"
import History from "./utils/history"
function App() {
  return (
    <div >
     <BrowserRouter>
        <Routes>
             <Route path='/' element={<Main />}>
               <Route path='' element={<Home />}/>
               <Route path='/signIn' element={<SignIn />}/>
               <Route path='/signUp' element={<SignIn />}/>
               <Route path='/history' element={<History />}/>
             </Route>
       </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
