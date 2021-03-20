/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { useState, useEffect, useContext } from "react";
import { FoodContext } from "../../FoodContext";
import Heading from "../../components/Heading";
import NutrientDisplayMenu from "../../components/NutrientDisplayMenu";
import CalorieBurnInfo from "../../components/CalorieBurnInfo";
import {
  detailsStyle,
  wrapperStyle,
  NutritionCell,
  tableStyle,
} from "./DetailsStyles";
import { useLocation } from "react-router-dom";


const basicNames = new Map()
  .set("Energy", "Energy")
  .set("Carbohydrates", "Carbohydrate, by difference")
  .set("Sugars", "Sugars, total including NLEA")
  .set("Fiber", "Fiber, total dietary")
  .set("Protein", "Protein")
  .set("Fats", "Total lipid (fat)");

const mineralNames = new Map()
  .set("Iron", "Iron, Fe")
  .set("Calcium", "Calcium, Ca")
  .set("Sodium", "Sodium, Na")
  .set("Potassium", "Potassium, K")
  .set("Magnesium", "Magnesium, Mg")
  .set("Phosphorus", "Phosphorus, P")
  .set("Zinc", "Zinc, Zn")
  .set("Selenium", "Selenium, Se")
  .set("Copper", "Copper, Cu");

const vitaminNames = new Map()
  .set("Vitamin A", "Vitamin A, RAE")
  .set("Vitamin B-6", "Vitamin B-6")
  .set("Vitamin B-12", "Vitamin B-12")
  .set("Vitamin C", "Vitamin C, total ascorbic acid")
  .set("Vitamin D", "Vitamin D (D2 + D3)")
  .set("Vitamin E", "Vitamin E (alpha-tocopherol)")
  .set("Vitamin K", "Vitamin K (phylloquinone)");



const Details = ({ match }) => {

  const [food, setFood] = useContext(FoodContext);

  const [selectedNutrientType, setSelectedNutrientType] = useState("basic");

  const [basicInfo, setBasicInfo] = useState({});
  const [vitaminInfo, setVitaminInfo] = useState({});
  const [mineralInfo, setMineralInfo] = useState({});

  const [isLoaded, setIsLoaded] = useState(false);

  const API_KEY = "WCsllB7f9m6qRwybiPba4f2IScSYGPzVyBWJAgUh";

  const abortController = new AbortController();
  const abortSignal = abortController.signal;

  useEffect(() => {
    const localStorageFood = JSON.parse(localStorage.getItem("food"));
    const foodId = match.params.id;
    let allInfo;

    // If food is saved to localtorage and it matches the id of currently open food
    if (localStorageFood != null && localStorageFood.fdcId == foodId) {
      setFood(localStorageFood);
      allInfo = getInfoFromLocalStorage();

      setBasicInfo(allInfo.basicInfo);
      setVitaminInfo(allInfo.vitaminInfo);
      setMineralInfo(allInfo.mineralInfo);

      setIsLoaded(true);
    } else {
      let foodId = match.params.id;
      fetch(`https://api.nal.usda.gov/fdc/v1/food/${foodId}?api_key=${API_KEY}`, {
        method: "GET",
        signal: abortSignal,
      })
        .then(res => res.json())
        .then(data => {
          allInfo = getInfoFromRequest(data);

          setBasicInfo(allInfo.basicInfo);
          setVitaminInfo(allInfo.vitaminInfo);
          setMineralInfo(allInfo.mineralInfo);

          setIsLoaded(true);
        })
        .catch(err => console.log(err));
    }
  }, []);

  function handleNutritionMenuClick(event) {
    const selectedNutrientType = event.target.id;
    setSelectedNutrientType(selectedNutrientType);
  }

  let basicInfoItems = Object.keys(basicInfo).map((key, index) =>
    <tr key={index}>
      <NutritionCell>{key}</NutritionCell>
      <NutritionCell>{basicInfo[key]}</NutritionCell>
    </tr>
  );

  let vitaminInfoItems = Object.keys(vitaminInfo).map((key, index) =>
    <tr key={index}>
      <NutritionCell>{key}</NutritionCell>
      <NutritionCell>{vitaminInfo[key]}</NutritionCell>
    </tr>
  );

  let mineralInfoItems = Object.keys(mineralInfo).map((key, index) =>
    <tr key={index}>
      <NutritionCell>{key}</NutritionCell>
      <NutritionCell>{mineralInfo[key]}</NutritionCell>
    </tr>
  );

  function renderNutrients() {
    switch (selectedNutrientType) {
      case "basic":
        return basicInfoItems;
      case "vitamins":
        return vitaminInfoItems;
      case "minerals":
        return mineralInfoItems;
      default:
        return <tr><td>No nutrient category selected</td></tr>
    }
  }

  return (
    <main css={detailsStyle}>
      {isLoaded ?
        <div css={wrapperStyle}>
          <Heading big>{food.description}</Heading>
          <p css={css`margin-bottom: 40px;`}>100g</p>
          <NutrientDisplayMenu
            onClick={handleNutritionMenuClick}
            selectedNutrientType={selectedNutrientType} />
          <table css={tableStyle}>
            <tbody>
              {renderNutrients()}
            </tbody>
          </table>
          <CalorieBurnInfo calories={basicInfo["Energy"]} />
        </div>
        : null}
    </main>
  )
}

function getInfoFromLocalStorage(basicNames, vitaminNames, mineralNames) {
  let allInfo;

  const food = JSON.parse(localStorage.getItem("food"));
  const nutrients = food.foodNutrients;

  for (let [key, value] of basicNames.entries()) {
    nutrients.forEach(nutrient => {
      if (nutrient.nutrientName === value) {
        allInfo.basicInfo[key] = nutrient.value.toString() + nutrient.unitName.toLowerCase();
      }
    });
  }

  for (let [key, value] of vitaminNames.entries()) {
    nutrients.forEach(nutrient => {
      if (nutrient.nutrientName === value) {
        allInfo.vitaminInfo[key] = nutrient.value.toString() + nutrient.unitName.toLowerCase();
      }
    });
  }

  for (let [key, value] of mineralNames.entries()) {
    nutrients.forEach(nutrient => {
      if (nutrient.nutrientName === value) {
        allInfo.mineralInfo[key] = nutrient.value.toString() + nutrient.unitName.toLowerCase();
      }
    });
  }

  return allInfo;
}


function getInfoFromRequest(data) {
  let allInfo;

  const nutrients = data.foodNutrients;

  for (let [key, value] of basicNames.entries()) {
    nutrients.forEach(item => {
      if (item.nutrient.name === value) {
        allInfo.basicInfo[key] = item.amount.toString() + item.nutrient.unitName.toLowerCase();
      }
    });
  }

  for (let [key, value] of vitaminNames.entries()) {
    nutrients.forEach(item => {
      if (item.nutrient.name === value) {
        allInfo.vitaminInfo[key] = item.amount.toString() + item.nutrient.unitName.toLowerCase();
      }
    });
  }

  for (let [key, value] of mineralNames.entries()) {
    nutrients.forEach(item => {
      if (item.nutrient.name === value) {
        allInfo.mineralInfo[key] = item.amount.toString() + item.nutrient.unitName.toLowerCase();
      }
    });
  }

  return allInfo;
}


export default Details
