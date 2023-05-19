import React, { useState } from "react";
import "./ListRecipe.css";

// FORM - CREATE
function ListRecipe() {
    const [nameState, setNameState] = useState("");
    const [imageState, setImageState] = useState("");
  
    //Here we are making a dynamic onChangeHandler that'll accept a state updater
    const onChangeHandler = (e, setValue) => {
      console.log(e.target.value);
      setValue(e.target.value); //this represents any state updater (setName) that we passed in
    }; //end of func
  
    const onSubmitHandler = async (event) => {
      event.preventDefault();
      const newPerson = {
        name: nameState,
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
        "https://people-api-qn7s.onrender.com/people/",
        options
      );
  
      const newRecipeObj = await responseData.json();
      console.log(newRecipeObj);
    }; 
    
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
        <input type="submit" value="Create a Recipe" />
      </form>
    </div>
  );
}

export default ListRecipe;