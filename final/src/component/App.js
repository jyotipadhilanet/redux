import React, { Component } from 'react';
import Header from '../container/Header'
import Footer from '../container/Footer'
import List from '../container/List'
import Login from '../container/Login'
import {BrowserRouter as Router,Route,Switch,NavLink} from 'react-router-dom'
const Logout=()=>{
        (localStorage.getItem('user').length>0) ? localStorage.setItem('user',''):''
}
const Link=()=>{
    return(
        <div>
            {(localStorage.getItem('user'))?<NavLink exact to="/">Logout</NavLink>:<NavLink exact to="/">Login</NavLink>}
            <NavLink to="/crud">Crud</NavLink>
        </div>
    )
}
const App=()=>{
    return(
        <Router>
            <section>
                <Link/>
                <Switch>
                    {(localStorage.getItem('user').length>0)?<Route exact path="/" component={Logout}/>:<Route exact path="/" component={Login}/>}
                    <Route path="/crud" component={List}/>
                </Switch>
            </section>
        </Router>

        //     <div>
        //    <Header/>
        //     <Login/>
        //     <List/>
        //     <Footer/>
        // </div>
    )
}
export default App;
