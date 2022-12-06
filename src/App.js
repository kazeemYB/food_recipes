import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "./App.css";
import Footer from "./Footer";

function App() {
  const APP_ID = process.env.React_App_APP_ID;
  const APP_KEY = process.env.React_App_APP_KEY;

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [query, setQuery] = useState("chicken");

  const Req = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(Req).catch((error) => console.log(error));
    const data = await response.json();
    setRecipes(data.hits);
    console.log(`User searched for '${search}' --> ${data.hits}`);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  // let searchTitle = "";

  const getSearch = (e) => {
    e.preventDefault();
    console.log("New Search -------------->");
    setQuery(search);
    setSearchTitle(search);
    // setSearch("");
  };

  return (
    <div className="App">
      <div className="welcome">
        <h1>Welcome to Everything Recipe!</h1>
      </div>
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
          placeholder="find your favorite recipe"
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      {searchTitle && <h4>Search Results For: {searchTitle}</h4>}
      <div className="recipes">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
