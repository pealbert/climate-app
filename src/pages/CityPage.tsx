import { AlertTriangle } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom";

import CurrentWeather from "@/components/CurrentWeather";
import FavoriteButton from "@/components/FavoriteButton";
import HourlyTemperature from "@/components/HourlyTemperature";
import WeatherSkeleton from "@/components/LoadingSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherForecast from "@/components/WeatherForecast";
import { useForecastQuery, useWeatherQuery } from "@/hooks/use-weather";

const CityPage = () => {
	const [searchParams] = useSearchParams();
	const params = useParams();
	const latParam = searchParams.get("lat");
	const lonParam = searchParams.get("lon");
	const lat = latParam === null ? Number.NaN : Number(latParam);
	const lon = lonParam === null ? Number.NaN : Number(lonParam);
	const coordinates =
		Number.isFinite(lat) &&
		Number.isFinite(lon) &&
		lat >= -90 &&
		lat <= 90 &&
		lon >= -180 &&
		lon <= 180
			? { lat, lon }
			: null;

	const weatherQuery = useWeatherQuery(coordinates);
	const forecastQuery = useForecastQuery(coordinates);

	if (!coordinates) {
		return (
			<Alert variant="destructive">
				<AlertTriangle className="size-4" />
				<AlertTitle>Invalid Location</AlertTitle>
				<AlertDescription>
					This city link does not contain valid coordinates. Please search for the city again.
				</AlertDescription>
			</Alert>
		);
	}

	if (weatherQuery.error || forecastQuery.error) {
		return (
			<Alert variant="destructive">
				<AlertTriangle className="size-4" />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription className="flex flex-col gap-4">
					Failed to fetch weather data. Please try again.
				</AlertDescription>
			</Alert>
		);
	}

	if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
		return <WeatherSkeleton />;
	}

	return (
		<div className="min-w-0 space-y-4 sm:space-y-6">
			<div className="flex min-w-0 items-start justify-between gap-3">
				<h1 className="min-w-0 text-2xl leading-tight font-bold tracking-tight break-words sm:text-3xl">
					{params.cityName}, {weatherQuery.data.sys.country}
				</h1>

				<FavoriteButton data={weatherQuery.data} />
			</div>

			<div className="grid min-w-0 gap-4 sm:gap-6">
				<div className="flex min-w-0 flex-col gap-4">
					<CurrentWeather data={weatherQuery.data} />
					<HourlyTemperature data={forecastQuery.data} />
				</div>

				<div className="grid min-w-0 items-start gap-4 sm:gap-6 md:grid-cols-2">
					<WeatherDetails data={weatherQuery.data} />
					<WeatherForecast data={forecastQuery.data} />
				</div>
			</div>
		</div>
	);
};

export default CityPage;
