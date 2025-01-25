import React, { Fragment, useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function NavBar() {
  const titles = useRef();
  const [data, setData] = useState([]);
  const [options, setOptions] = useState([]);
  const [meal, setMeal] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    titles.current.textContent = "xxxxxxx";

    const getData = () => {
      fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
        .then((response) => response.json())
        .then((response) => {
          setData(response.categories);
        })
        .catch((er) => console.log(er));
    };

    getData();
  }, []);

  useEffect(() => {
    const tempOptions = [];
    tempOptions.push(
      <option value="null" key="default">
        {" "}
      </option>
    );
    data.forEach((ele, index) => {
      tempOptions.push(
        <option
          value={`https://www.themealdb.com/api/json/v1/1/filter.php?c=${ele.strCategory}`}
          key={index}
        >
          {ele.strCategory}
        </option>
      );
    });

    setOptions(tempOptions);
  }, [data]);

  const selectCat = (e) => {
    const selectedMeal = e.target.value;
    setMeal(selectedMeal);
    navigate("/recipes", { state: { mealUrl: selectedMeal } }); // Navigate with state
  };

  return (
    <Fragment>
      <div className="NavBar">
        <div className="heading">
          <div className="titles" ref={titles}></div>
          <div className="subheading">find your dish and make it yourself 🍽️ </div>
          <div className="searchbar">
            <select name="menu" id="categories" onChange={selectCat}>
              {options.length > 0 ? options : <option disabled>Loading...</option>}
            </select>
            <input type="text" placeholder="search" />{" "}
            <button >search</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default NavBar;
