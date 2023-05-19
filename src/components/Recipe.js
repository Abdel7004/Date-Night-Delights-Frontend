import "./Recipe.css";
import { NavLink } from "react-router-dom";

function Recipe(props) {
  const { recipe } = props;

  return (
    <li className="recipe">
      <NavLink to={`/${recipe._id}`} state={recipe}>
        <h3>{recipe.name}</h3>
        <img className="food" src={person.image} alt="food" />
      </NavLink>
    </li>
  );
}

export default Recipe;