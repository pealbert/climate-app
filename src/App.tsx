import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "@/components/Layout";
import { ThemeProvider } from "@/context/ThemeProvider";
import CityPage from "@/pages/CityPage";
import WeatherDashboard from "@/pages/WeatherDashboard";

function App() {
	return (
		<BrowserRouter>
			<ThemeProvider defaultTheme="dark">
				<Layout>
					<Routes>
						<Route path="/" element={<WeatherDashboard />} />
						<Route path="/city/:cityName" element={<CityPage />} />
					</Routes>
				</Layout>
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;
