import React from 'react-dom'
import './App.css'
import { Fragment } from 'react';
function NavBar(){

    return(
        <Fragment>
           <div  className="NavBar">
              <div className="image">
                <img src="" alt="log" />
              </div>
              <div className="Searchbar">
                <input type="text"  /><button>search</button>
              </div>
           </div>
        </Fragment>
    )
}

export default NavBar;