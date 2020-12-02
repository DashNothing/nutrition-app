/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import {
  aboutStyle,
  wrapperStyle,
  pStyle,
  pLinkStyle,
  footerStyle,
} from "./AboutStyles";
import Heading from "../../components/Heading";


const About = () => {
  return (
    <main css={aboutStyle}>
      <div css={wrapperStyle}>
        <Heading>About <span>NutritionApp</span></Heading>
        <p css={pStyle}>
          NutritionApp was made using U.S. Department of Agriculture’s FoodData Central as the
          source of the data. Specifically, only using FNDDS data (Food and Nutrient Database for
          Dietary Studies 2013-2014), which contains data on the nutrient and food component values
          and weights for foods and beverages reported in the What We Eat in America dietary survey
          component of the National Health and Nutrition Examination Survey.
        </p>
        <p css={pStyle}>
          To find out more visit <a css={pLinkStyle} href="https://fdc.nal.usda.gov" target="_blank">fdc.nal.usda.gov</a>
        </p>
      </div>
      <footer css={footerStyle}>
        Toni Stokić 2020
      </footer>
    </main>
  )
}

export default About
