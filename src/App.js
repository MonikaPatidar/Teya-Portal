// import React, {Component} from 'react';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useSelector} from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { 
    BrowserRouter as Router, 
    Route,
    Switch,
    Redirect ,
    useHistory
} from "react-router-dom";
import './assets/css/style.css';

// Components and Containers
import { LanguageProvider } from './Hooks/Context/Language'
import LoginPage from './containers/Login/Loginform';
import SignUp from './containers/Signup/SignupForm';
import MainContainer from './containers/MainContainer';
import Dashboard from './containers/Dashboard/Dashboard';
import Posts from './containers/Posts/Post';
import PostsDetails from './containers/Posts/PostsDetails.js';
import Workshops from './containers/Workshops/Workshops';
import Profile from './containers/Profile/Profile';
import Settings from './containers/Settings/Setting';

const authProvider=createContext([{},() => {}])

const App = () => {
  const history=useHistory();
  const isLogged=useSelector(state=>state.authUser.user)
  const [state,setState]=useState({
      lang: false,
			isAuth: true,
			isLoggedIn:false,
			userInfo: false
  })
  
  useEffect(()=>{
    isAuth()
  },[])

  const isAuth = () => {
		if(localStorage.getItem("AuthToken"))
    {debugger
        setState({...state,
				isAuth: true
        })
        }
    else{
			  if(window.location.pathname!=='/'){
				window.location = '/';
			}
		}
	}

  const PrivateRoute=({component: Component, authed, ...rest})=>{debugger
  return <Route
      {...rest}
      component={() =>
        authed===true ? (
            <Component />
    ) : (
            <Redirect to="/" />
          )
    }
    />
  }
 
    return (
        <div className="App">
          <LanguageProvider>
            <Router>
              <div>
                <Switch>
                    {/* <Route exact path="/" component={LoginPage} setLanguagee={(currentLang)=>setLanguage(currentLang)} ></Route> */}
                    <Route exact path="/" component={LoginPage}></Route>
                    <Route path="/signup" component={SignUp}></Route>
                    <MainContainer>
                    {/* <Route path="/dashboard" component={Dashboard}></Route> */}
                    <PrivateRoute authed={state.isAuth} path='/dashboard' component={Dashboard} />
                    <PrivateRoute authed={state.isAuth} path='/posts' component={Posts} /> 
                    <PrivateRoute authed={state.isAuth} path='/posts-details' component={PostsDetails} /> 
                    <PrivateRoute authed={state.isAuth} path='/workshops' component={Workshops} /> 
                    <PrivateRoute authed={state.isAuth} path='/profile' component={Profile} /> 
                    <PrivateRoute authed={state.isAuth} path='/settings' component={Settings} />  
                    {/* <Route path="/dashboard" component={Dashboard}></Route> */}
                    </MainContainer>
                  </Switch>
              </div>
            </Router>
            </LanguageProvider>
        </div>
    );
}

export default App;
export {authProvider}


// const setLanguagee = async (lang)=>{

//   window.location.reload()
//   setCurrentLang(lang)
//   // await setLanguage (lang);
//   // handleGetLanguage()
// }