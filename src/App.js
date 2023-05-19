import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Recipe from "./pages/Recipe";
import ListRecipe from "./pages/ListRecipe";
import AllRecipes from "./pages/AllRecipes";
import SearchRecipe from "./pages/SearchRecipe"
//container comp
function App() {
  let routes;

  routes = (
    <Routes>
      <Route exact={true} path="/" element={<AllRecipes />} />
      <Route path="/new" element={<ListRecipe />} />
      <Route path="/:id" element={<Recipe />} />
      <Route path="/:id" element={<SearchRecipe />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );

  return (
    <div className="App">
      App.js
      <header>
        <h1>Date Night Delights</h1>
      </header>
      <main>{routes}</main>
    </div>
  );
}

export default App;
