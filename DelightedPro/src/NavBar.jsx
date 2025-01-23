import React from 'react-dom'
import { Fragment } from 'react';
function NavBar(){


    return(
        <Fragment>
           <div className={NavBar}>
              <div className="image">
                <img src="" alt="log" />
              </div>
              <div className="searchbar">
                <input type="text"  />
              </div>
           </div>
        </Fragment>
    )
}

export default NavBar;