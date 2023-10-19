import React, { Component, useState, useEffect } from 'react';  // import useEffect
import {BrowserRouter as Routes, Switch, Route, Link } from "react-router-dom";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Contact from './components/Contacts';
import Home from './components/Home';
import Stats from './components/Stats';
import api from './api-source';
class App extends Component{
    constructor(props){
        super(props);
        api.get('/contacts').then(res =>{
            console.log(res.data);
        })
    }
    render() {
        return (
          <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
              <Link to={"/contacts"} className="navbar-brand">
                Assignment-2
              </Link>
              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/contacts"} className="nav-link">
                    Contacts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/stats"} className="nav-link">
                    Stats
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link to={"/stats"} className="nav-link">
                    Add
                  </Link>
                </li> */}
              </div>
            </nav>
    
            <div className="container mt-3">
             
            </div>
          </div>
        );
      }
}

// function App() {

//     return (
//         <div>     
//             <h1 class="text-center">Contactor</h1>
//             <Home/>
//         </div>
//     );
// }

export default App;