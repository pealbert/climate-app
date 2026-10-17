import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "@/components/Layout";
import { ThemeProvider } from "@/context/ThemeProvider";
import CityPage from "@/pages/CityPage";
import WeatherDashboard from "@/pages/WeatherDashboard";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60 * 1000,
			retry: 1,
			refetchOnWindowFocus: false,
		},
	},
});

function App() {
	return (
		<QueryClientProvider client={queryClient}>
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
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App;
