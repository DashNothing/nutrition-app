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



const Details = ({ location, match }) => {

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
    if (food == null) {
      setFood(JSON.parse(localStorage.getItem("food")));
    }
  }, []);

  useEffect(() => {
    if (food != null) {
      const nutrients = food.foodNutrients;

      let newBasicInfo = basicInfo;
      for (let [key, value] of basicNames.entries()) {
        nutrients.forEach(nutrient => {
          if (nutrient.nutrientName === value) {
            newBasicInfo[key] = nutrient.value.toString() + nutrient.unitName.toLowerCase();
          }
        });
      }
      setBasicInfo(newBasicInfo);

      let newVitaminInfo = vitaminInfo;
      for (let [key, value] of vitaminNames.entries()) {
        nutrients.forEach(nutrient => {
          if (nutrient.nutrientName === value) {
            newVitaminInfo[key] = nutrient.value.toString() + nutrient.unitName.toLowerCase();
          }
        });
      }
      setVitaminInfo(newVitaminInfo);

      let newMineralInfo = mineralInfo;
      for (let [key, value] of mineralNames.entries()) {
        nutrients.forEach(nutrient => {
          if (nutrient.nutrientName === value) {
            newMineralInfo[key] = nutrient.value.toString() + nutrient.unitName.toLowerCase();
          }
        });
      }
      setMineralInfo(newMineralInfo);

      setIsLoaded(true);
    }
  }, [food]);

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

export default Details
