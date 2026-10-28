import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

import type { GeocodingResponse, WeatherData } from "@/api/types";
import { Card, CardContent } from "@/components/ui/card";

interface CurrentWeatherProps {
	data: WeatherData;
	locationName?: GeocodingResponse;
}

const CurrentWeather = ({ data, locationName }: CurrentWeatherProps) => {
	const {
		weather: [currentWeather],
		main: { temp, feels_like, temp_min, temp_max, humidity },
		wind: { speed },
	} = data;
	const displayName = locationName?.name ?? data.name;
	const displayCountry = locationName?.country ?? data.sys.country;

	const formatTemp = (temp: number) => `${Math.round(temp)}°`;

	return (
		<Card className="min-w-0 flex-1 overflow-hidden">
			<CardContent className="p-4 sm:p-6">
				<div className="grid min-w-0 gap-4 sm:grid-cols-[minmax(0,1fr)_10rem] sm:items-center md:grid-cols-2 md:gap-6">
					<div className="space-y-4">
						<div className="space-y-2">
							<div className="flex min-w-0 flex-wrap items-end gap-x-2">
								<h2 className="min-w-0 text-2xl font-bold tracking-tighter wrap-break-word">
									{displayName}
								</h2>
								{locationName?.state && (
									<span className="mb-0.5 text-muted-foreground">{locationName.state}</span>
								)}
							</div>
							<p className="text-sm text-muted-foreground">{displayCountry}</p>
						</div>

						<div className="flex flex-wrap items-center gap-2">
							<p className="text-6xl font-bold tracking-tighter sm:text-7xl">{formatTemp(temp)}</p>

							<div className="space-y-1">
								<p className="text-sm font-medium text-muted-foreground">
									Feels like {formatTemp(feels_like)}
								</p>
								<div className="flex gap-2 text-sm font-medium">
									<span className="flex items-center gap-1 text-blue-500">
										<ArrowDown className="size-3" />
										{formatTemp(temp_min)}
									</span>
									<span className="flex items-center gap-1 text-red-500">
										<ArrowUp className="size-3" />
										{formatTemp(temp_max)}
									</span>
								</div>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-3 sm:gap-4">
							<div className="flex items-center gap-2">
								<Droplets className="size-4 text-blue-500" />
								<div className="space-y-0.5">
									<p className="text-sm font-medium">Humidity</p>
									<p className="text-sm text-muted-foreground">{humidity}%</p>
								</div>
							</div>

							<div className="flex items-center gap-2">
								<Wind className="size-4 text-blue-500" />
								<div className="space-y-0.5">
									<p className="text-sm font-medium">Wind Speed</p>
									<p className="text-sm text-muted-foreground">{speed} m/s</p>
								</div>
							</div>
						</div>
					</div>

					<div className="flex flex-col items-center justify-center">
						<div className="relative flex aspect-square w-full max-w-32 items-center justify-center sm:max-w-40 md:max-w-50">
							<img
								className="size-full object-contain"
								src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
								alt={currentWeather.description}
							/>
							<div className="absolute bottom-0 text-center">
								<p className="text-sm font-medium capitalize">{currentWeather.description}</p>
							</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default CurrentWeather;
