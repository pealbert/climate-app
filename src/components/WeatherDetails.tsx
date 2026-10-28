import { format } from "date-fns";
import { Compass, Gauge, Sunrise, Sunset } from "lucide-react";

import type { WeatherData } from "@/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface WeatherDetailsProps {
	data: WeatherData;
}

const WeatherDetails = ({ data }: WeatherDetailsProps) => {
	const { wind, main, sys } = data;

	const getWindDirection = (degree: number) => {
		const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

		const normalizedDegree = ((degree % 360) + 360) % 360;
		const index = Math.round(normalizedDegree / 45) % 8;

		return directions[index];
	};

	const formatTime = (timestamp: number) => {
		return format(new Date(timestamp * 1000), "h:mm a");
	};

	const details = [
		{
			title: "Sunrise",
			value: formatTime(sys.sunrise),
			icon: Sunrise,
			color: "text-orange-500",
		},
		{
			title: "Sunset",
			value: formatTime(sys.sunset),
			icon: Sunset,
			color: "text-blue-500",
		},
		{
			title: "Wind Direction",
			value: `${getWindDirection(wind.deg)} (${wind.deg})°`,
			icon: Compass,
			color: "text-green-500",
		},
		{
			title: "Pressure",
			value: `${main.pressure} hPa`,
			icon: Gauge,
			color: "text-purple-500",
		},
	];

	return (
		<Card className="min-w-0">
			<CardHeader>
				<CardTitle>Weather Details</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:gap-6">
					{details.map((detail) => {
						return (
							<div
								key={detail.title}
								className="flex min-w-0 items-center gap-3 rounded-lg border p-3 sm:p-4"
							>
								<detail.icon className={cn("size-5 shrink-0", detail.color)} />
								<div className="min-w-0">
									<p className="text-sm leading-none font-medium">{detail.title}</p>
									<p className="text-sm break-words text-muted-foreground">{detail.value}</p>
								</div>
							</div>
						);
					})}
				</div>
			</CardContent>
		</Card>
	);
};

export default WeatherDetails;
