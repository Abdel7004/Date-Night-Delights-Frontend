import { useNavigate, useParams } from "react-router-dom";
import "./UpdateRecipe.css";
import { useEffect, useState } from "react";

function UpdateRecipe() {
  const [nameState, setNameState] = useState("");
  const [imageState, setImageState] = useState("");
  const [ingredientsState, setIngredientsState] = useState("");
  const [instructionsState, setInstructionsState] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const url = `http://localhost:4000/${id}`;
  //---------fetch data here
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

        const { name,image, ingredients, instructions } = recipeData;

        setNameState(name);
        setImageState(image);
        setIngredientsState(ingredients);
        setInstructionsState(instructions);
      } catch (error) {}
    };
    //this is the code that gets activated
    console.log("#2: inside useeffect...component mounted, now we are here.");

    fetchRecipe(); //fetching data and setting state
  }, [id]);
  //-----------

  //Here we are making a dynamic onChangeHandler that'll accept a state updater
  const onChangeHandler = (e, setValue) => {
    console.log(e.target.value);
    setValue(e.target.value); //this represents any state updater (setName) that we passed in
  }; //end of func

  //onSubmit
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const updatedRecipe = {
      name: nameState,
      image: imageState,
      ingredients: ingredientsState,
      instructions: instructionsState,
    };

    console.log("updated Recipe: ", updatedRecipe);

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedRecipe),
    };

    const responseData = await fetch(url, options);

    const updatedRecipeObj = await responseData.json();
    console.log(updatedRecipeObj);
    navigate(`/${id}`); //--Take us home 🚀
  }; //end of submitH

  //-------------onSubmit end

  //--------onDeleteHandler
  const onDeleteHandler = async (event) => {
    event.preventDefault();

    console.log("Deleting recipe with id of: ", id);

    const options = {
      method: "DELETE",
    };

    const responseData = await fetch(url, options);

    const response = await responseData.json();
    console.log(response);

    navigate(`/`); //--Take us home 🚀
  }; //end of submitH
  //---------

  return (
    <div className="newrecipe">
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          value={nameState}
          name="name"
          placeholder="name"
          onChange={(e) => onChangeHandler(e, setNameState)}
        />
        <input
          type="text"
          value={imageState}
          name="image"
          placeholder="image URL"
          onChange={(e) => onChangeHandler(e, setImageState)}
        />
        <input
          type="text"
          value={ingredientsState}
          name="ingredients"
          placeholder="ingredients"
          onChange={(e) => onChangeHandler(e, setIngredientsState)}
        />
        <input
          type="text"
          value={instructionsState}
          name="instructions"
          placeholder="instructions"
          onChange={(e) => onChangeHandler(e, setInstructionsState)}
        />

        <input type="submit" value="✅UPDATE RECIPE" />
        <input
          onClick={onDeleteHandler}
          type="button"
          value="😵DELETE Recipe"
        />
      </form>
    </div>
  );
}

export default UpdateRecipe;
