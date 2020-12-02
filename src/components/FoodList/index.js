/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import { jsx } from "@emotion/react";
import {
  ulStyle,
  ulGridStyle,
  FoodListItem
} from "./FoodListStyles";



const FoodList = ({ foods, isGrid }) => {

  const foodList = foods.map((food) => {
    return (
      <li key={food.fdcId}>
        <FoodListItem to={{
          pathname: `/details/${food.fdcId}`,
          food: food,
        }}>
          {food.description}
        </FoodListItem>
      </li>
    )
  });

  return (
    <ul css={[ulStyle, isGrid ? ulGridStyle : ""]}>
      {foodList}
    </ul>
  )
}

export default FoodList
