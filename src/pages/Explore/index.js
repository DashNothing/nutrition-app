/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/react";
import Searchbar from "../../components/Searchbar";
import Heading from "../../components/Heading";
import { exploreStyle, wrapperStyle, tipStyle, TipLink } from "./ExploreStyles";

const Explore = () => {
	return (
		<main css={exploreStyle}>
			<div css={wrapperStyle}>
				<Heading big>
					Search the USDA FoodData Central to find the nutritional information
					of over 8.500 food items.
				</Heading>
				<Searchbar />
				<p css={tipStyle}>
					You can search for raw ingredients (eg.{" "}
					<TipLink to={`${process.env.PUBLIC_URL}/search?q=egg`}>egg</TipLink>{" "}
					or <TipLink to="/search?q=banana">banana</TipLink>),
					<br />
					as well as dishes (eg.{" "}
					<TipLink to={`${process.env.PUBLIC_URL}/search?q=pizza`}>
						pizza
					</TipLink>{" "}
					or{" "}
					<TipLink to={`${process.env.PUBLIC_URL}/search?q=chicken%20soup`}>
						chicken soup
					</TipLink>
					).
				</p>
			</div>
		</main>
	);
};

export default Explore;
