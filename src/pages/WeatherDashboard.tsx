import { AlertTriangle, MapPin, RefreshCw } from "lucide-react";

import WeatherSkeleton from "@/components/LoadingSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useGeolocation } from "@/hooks/use-geolocation";

const WeatherDashboard = () => {
	const {
		coordinates,
		error: locationError,
		getLocation,
		isLoading: locationLoading,
	} = useGeolocation();

	const handleRefresh = () => {
		getLocation();
		if (coordinates) {
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

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-bold tracking-tight">My Location</h1>
				<Button
					variant="outline"
					size="icon"
					onClick={handleRefresh}
					// disabled={}
				>
					<RefreshCw className="size-4" />
				</Button>
			</div>
		</div>
	);
};

export default WeatherDashboard;
