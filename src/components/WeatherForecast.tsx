import { format } from "date-fns";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

import type { ForecastData } from "@/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WeatherForecastProps {
	data: ForecastData;
}

interface DailyForecast {
	date: number;
	temp_min: number;
	temp_max: number;
	humidity: number;
	wind: number;
	weather: {
		id: number;
		main: string;
		description: string;
		icon: string;
	};
}

const WeatherForecast = ({ data }: WeatherForecastProps) => {
	const dailyForecasts = data.list.reduce(
		(acc, forecast) => {
			const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");

			if (!acc[date]) {
				acc[date] = {
					temp_min: forecast.main.temp_min,
					temp_max: forecast.main.temp_max,
					humidity: forecast.main.humidity,
					wind: forecast.wind.speed,
					weather: forecast.weather[0],
					date: forecast.dt,
				};
			} else {
				acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
				acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
			}

			return acc;
		},
		{} as Record<string, DailyForecast>,
	);

	const nextDays = Object.values(dailyForecasts).slice(0, 6);

	const formatTemp = (temp: number) => `${Math.round(temp)}°`;

	return (
		<Card className="min-w-0">
			<CardHeader>
				<CardTitle>5-Day Forecast</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid gap-3 sm:gap-4">
					{nextDays.map((day) => {
						return (
							<div
								key={day.date}
								className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-3 rounded-lg border p-3 sm:p-4"
							>
								<div className="min-w-32 flex-1">
									<p className="font-medium">{format(new Date(day.date * 1000), "EEE, MMM d")}</p>
									<p className="truncate text-sm text-muted-foreground capitalize">
										{day.weather.description}
									</p>
								</div>

								<div className="flex shrink-0 justify-center gap-3 sm:gap-4">
									<span className="flex items-center text-blue-500">
										<ArrowDown className="mr-1 size-4" />
										{formatTemp(day.temp_min)}
									</span>
									<span className="flex items-center text-red-500">
										<ArrowUp className="mr-1 size-4" />
										{formatTemp(day.temp_max)}
									</span>
								</div>

								<div className="flex shrink-0 justify-end gap-3 sm:gap-4">
									<span className="flex items-center gap-1">
										<Droplets className="size-4 text-blue-500" />
										<span className="text-sm">{day.humidity}%</span>
									</span>
									<span className="flex items-center gap-1">
										<Wind className="size-4 text-blue-500" />
										<span className="text-sm">{day.wind}m/s</span>
									</span>
								</div>
							</div>
						);
					})}
				</div>
			</CardContent>
		</Card>
	);
};

export default WeatherForecast;
