/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { withRouter } from "react-router-dom";
import { jsx } from "@emotion/react";
import { Link } from "react-router-dom";
import Searcbar from "../Searchbar";
import {
	headerStyle,
	logoStyle,
	navigationStyle,
	NavigationItem,
	NavigationLink,
} from "./NavbarStyles";

const Navbar = () => {
	function renderSearchbar() {
		if (
			location.pathname.includes("search") ||
			location.pathname.includes("details")
		) {
			return <Searcbar nav />;
		}
	}

	return (
		<header css={headerStyle}>
			<Link to={`${process.env.PUBLIC_URL}`}>
				<h1 css={logoStyle}>NutritionApp</h1>
			</Link>
			{renderSearchbar()}
			<nav>
				<ul css={navigationStyle}>
					<NavigationItem>
						<NavigationLink to={`${process.env.PUBLIC_URL}/`}>
							Explore
						</NavigationLink>
					</NavigationItem>
					<NavigationItem>
						<NavigationLink to={`${process.env.PUBLIC_URL}/about`}>
							About
						</NavigationLink>
					</NavigationItem>
				</ul>
			</nav>
		</header>
	);
};

export default withRouter(Navbar);
