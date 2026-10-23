import { AlertTriangle, MapPin, RefreshCw } from "lucide-react";

import CurrentWeather from "@/components/CurrentWeather";
import HourlyTemperature from "@/components/HourlyTemperature";
import WeatherSkeleton from "@/components/LoadingSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import WeatherDetails from "@/components/WeatherDetails";
import { useGeolocation } from "@/hooks/use-geolocation";
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from "@/hooks/use-weather";
import { cn } from "@/lib/utils";

const WeatherDashboard = () => {
	const {
		coordinates,
		error: locationError,
		getLocation,
		isLoading: locationLoading,
	} = useGeolocation();

	const weatherQuery = useWeatherQuery(coordinates);
	const forecastQuery = useForecastQuery(coordinates);
	const locationQuery = useReverseGeocodeQuery(coordinates);

	const handleRefresh = () => {
		getLocation();
		if (coordinates) {
			void weatherQuery.refetch();
			void forecastQuery.refetch();
			void locationQuery.refetch();
		}
	};

	if (locationLoading) {
		return <WeatherSkeleton />;
	}

	if (locationError) {
		return (
			<Alert variant="destructive">
				<AlertTriangle className="size-4" />
				<AlertTitle>Location Error</AlertTitle>
				<AlertDescription className="flex flex-col gap-4">
					<p>{locationError}</p>
					<Button onClick={getLocation} variant="outline" className="w-fit">
						<MapPin className="mr-2 size-4" />
						Enable Location
					</Button>
				</AlertDescription>
			</Alert>
		);
	}

	if (!coordinates) {
		return (
			<Alert variant="destructive">
				<AlertTitle>Location Required</AlertTitle>
				<AlertDescription className="flex flex-col gap-4">
					<p>Please enable location access to see your local weather.</p>
					<Button onClick={getLocation} variant="outline" className="w-fit">
						<MapPin className="mr-2 size-4" />
						Enable Location
					</Button>
				</AlertDescription>
			</Alert>
		);
	}

	const locationName = locationQuery.data?.[0];

	if (weatherQuery.error || forecastQuery.error) {
		return (
			<Alert variant="destructive">
				<AlertTriangle className="size-4" />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription className="flex flex-col gap-4">
					<p>Failed to fetch weather data. Please try again.</p>
					<Button onClick={handleRefresh} variant="outline" className="w-fit">
						<RefreshCw className="mr-2 size-4" />
						retry
					</Button>
				</AlertDescription>
			</Alert>
		);
	}

	if (!weatherQuery.data || !forecastQuery.data) {
		return <WeatherSkeleton />;
	}

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-bold tracking-tight">My Location</h1>
				<Button
					variant="outline"
					size="icon"
					onClick={handleRefresh}
					disabled={weatherQuery.isFetching || forecastQuery.isFetching}
				>
					<RefreshCw className={cn("size-4", weatherQuery.isFetching ? "animate-spin" : "")} />
				</Button>
			</div>

			<div className="grid gap-6">
				<div className="flex flex-col gap-4 lg:flex-row">
					<CurrentWeather data={weatherQuery.data} locationName={locationName} />
					<HourlyTemperature data={forecastQuery.data} />
				</div>

				<div>
					<WeatherDetails data={weatherQuery.data} />
				</div>
			</div>
		</div>
	);
};

export default WeatherDashboard;
