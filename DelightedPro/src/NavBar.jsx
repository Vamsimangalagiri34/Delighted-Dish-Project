import React, { Fragment, useRef, useEffect, useState } from 'react';
import './App.css';
import Recipes from './Recipes';

function NavBar() {
  const titles = useRef();
  const [data, setData] = useState([]); // State to store fetched data
  const [options, setOptions] = useState([]); // State to store options
  const [meal, setMeals] = useState(null); // State to store selected meal category URL

  useEffect(() => {
    titles.current.textContent = "Meal Categories";

    // Fetch categories from API
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(response => response.json())
      .then(response => {
        setData(response.categories); // Store API response
      })
      .catch(error => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    const tempOptions = [
      <option value="" key="default">Select a category</option>, // Placeholder option
    ];

    data.forEach((category, index) => {
      tempOptions.push(
        <option
          value={`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`}
          key={index}
        >
          {category.strCategory}
        </option>
      );
    });

    setOptions(tempOptions); // Update options state
  }, [data]);

  const selectCat = (e) => {
    const selectedValue = e.target.value;
    console.log("Selected Category URL:", selectedValue);
    setMeals(selectedValue); // Update selected meal URL
  };

  return (
    <Fragment>
      <div className="NavBar">
        <div className="heading">
          <div className="titles" ref={titles}></div>
          <div className="subheading">
            Explore delicious recipes by category
          </div>
          <div className="searchbar">
            <select name="menu" id="categories" onChange={selectCat}>
              {options.length > 0 ? options : <option disabled>Loading...</option>}
            </select>
            <input type="text" placeholder="Search" />
            <button type="submit">Search</button>
          </div>
        </div>
      </div>
      {meal && <Recipes categoryUrl={meal} />} {/* Conditionally render Recipes */}
    </Fragment>
  );
}

export default NavBar;
