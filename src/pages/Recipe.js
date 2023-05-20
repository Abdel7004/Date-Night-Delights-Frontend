import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Recipe.css";

function Recipe() {
  const [recipeState, setRecipeState] = useState(null);

  const [number, setNumber] = useState(5);

  const { id } = useParams();
  console.log(useParams());
  const url = `http://localhost:4000/${id}`; //fetch a person by id this will reach our server.

  //useeffect will only run once []
  useEffect(() => {
    //this is the code that gets activated
    console.log("Componenet mounted.🏗️. This will only happen once");
  }, []); //faking out useeffect to "wait" on a change from the array of dependencies. But we don't have any in there...snicker snicker......

  useEffect(() => {
    const fetchRecipe = async () => {
      console.log("going to fetch recipe with id of: ", id);
      try {
        const responseData = await fetch(url);
        const recipeData = await responseData.json(); //converting our html response that we got from the server into a useable person {object}.
        console.log(recipeData); //usable person
        console.log(
          "Setting state, about to rerender..(not remount, just re-render)."
        );
        setRecipeState(recipeData);
      } catch (error) {}
    };
    //this is the code that gets activated
    console.log("#2: inside useeffect...component mounted, now we are here.");

    fetchRecipe(); //fetching data and setting state
  }, [id, number]);

  return (
    <div className="recipe">
      {console.log("#1: 🖼️Rendering component...")}
      {recipeState ? (
        <>
          <div className="recipe">
            <h2>{recipeState.name}</h2>
            <h3>{recipeState.title}</h3>
            <div className="recipe-pic">
              <img
                className="delight-pic"
                src={recipeState.image}
                alt="delight pic"
              />
            </div>

            <h3>Ingrdients:</h3>
            <ul>{recipeState.ingredients}</ul>
            <li>{recipeState.instructions}</li>
            <Link to={`/${recipeState._id}/edit`}>
              <button>EDIT</button>
            </Link>
          </div>
        </>
      ) : (
        "...loading"
      )}
    </div>
  );
}

export default Recipe;