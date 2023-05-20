import React, { useState } from "react";
import "./NewRecipe.css";

function NewRecipe() {
  const [nameState, setNameState] = useState("");
  const [ingredientsState, setIngredientsState] = useState("");

  const [instructionsState, setInstructionsState] = useState("");

  const [imageState, setImageState] = useState("");

  //Here we are making a dynamic onChangeHandler that'll accept a state updater
  const onChangeHandler = (e, setValue) => {
    console.log(e.target.value);
    setValue(e.target.value); //this represents any state updater (setName) that we passed in
  }; //end of func

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const newRecipe = {
      name: nameState,
      ingredients: ingredientsState,
      instructions: instructionsState,
      image: imageState,
    };

    console.log("New Recipe, yo: ", newRecipe);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipe),
    };

    const responseData = await fetch(
      "http://localhost:4000/",
      options
    );

    const newRecipeObj = await responseData.json();
    console.log(newRecipeObj);
  }; //end of submitH

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

        <input type="submit" value="Create a New Recipe" />
      </form>
    </div>
  );
}

export default NewRecipe;
