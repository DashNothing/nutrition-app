/** @jsxRuntime classic */
/** @jsx jsx */
import { useContext } from 'react'
import { jsx } from "@emotion/react";
import { FoodContext } from "../../FoodContext";
import { useHistory } from "react-router-dom";
import {
  ulStyle,
  ulGridStyle,
  FoodListItem
} from "./FoodListStyles";



const FoodList = ({ foods, isGrid }) => {
  const [food, setFood] = useContext(FoodContext);

  const history = useHistory();

  const handleClick = (foodItem) => {
    setFood(foodItem, history.push(`details/${foodItem.fdcId}`));
  }

  const foodList = foods.map((foodItem) => {
    return (
      <li key={foodItem.fdcId}>
        <FoodListItem
          onClick={() => handleClick(foodItem)}
        >
          {foodItem.description}
        </FoodListItem>
      </li >
    )
  });

  return (
    <ul css={[ulStyle, isGrid ? ulGridStyle : ""]}>
      {foodList}
    </ul>
  )
}

export default FoodList
