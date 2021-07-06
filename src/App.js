import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Explore from "./pages/Explore";
import About from "./pages/About";
import Search from "./pages/Search";
import Details from "./pages/Details";
import { FoodProvider } from "./FoodContext";

function App() {
	return (
		<>
			<Router>
				<Navbar />
				<FoodProvider>
					<Switch>
						<Route
							path={`${process.env.PUBLIC_URL}/about`}
							component={About}
						></Route>
						<Route
							path={`${process.env.PUBLIC_URL}/search`}
							component={Search}
						></Route>
						<Route
							path={`${process.env.PUBLIC_URL}/details/:id`}
							component={Details}
						></Route>
						<Route
							path={`${process.env.PUBLIC_URL}/`}
							component={Explore}
						></Route>
					</Switch>
				</FoodProvider>
			</Router>
		</>
	);
}

export default App;
