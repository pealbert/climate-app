import { format } from "date-fns";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import type { ForecastData } from "@/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HourlyTemperatureProps {
	data: ForecastData;
}

const HourlyTemperature = ({ data }: HourlyTemperatureProps) => {
	const chartData = data.list.slice(0, 8).map((item) => ({
		time: format(new Date(item.dt * 1000), "ha"),
		temp: Math.round(item.main.temp),
		feels_like: Math.round(item.main.feels_like),
	}));

	return (
		<Card className="min-w-0 flex-1">
			<CardHeader>
				<CardTitle>Today's Temperature</CardTitle>
			</CardHeader>
			<CardContent className="px-2 sm:px-4">
				<div className="h-48 w-full min-w-0 sm:h-50">
					<ResponsiveContainer width="100%" height="100%">
						<LineChart data={chartData}>
							<XAxis dataKey="time" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
							<YAxis
								stroke="#888"
								fontSize={12}
								tickLine={false}
								axisLine={false}
								tickFormatter={(value) => `${value}°`}
							/>
							<Tooltip
								content={({ active, payload }) => {
									if (active && payload?.length) {
										return (
											<div className="rounded-lg border bg-background p-2 shadow-sm">
												<div className="grid grid-cols-2 gap-2">
													<div className="flex flex-col">
														<span className="text-[0.7rem] text-muted-foreground uppercase">
															Temperature
														</span>
														<span className="font-bold">{payload[0].value}°</span>
													</div>
													<div className="flex flex-col">
														<span className="text-[0.7rem] text-muted-foreground uppercase">
															Feels Like
														</span>
														<span className="font-bold">{payload[1].value}°</span>
													</div>
												</div>
											</div>
										);
									}
									return null;
								}}
							/>
							<Line type="monotone" dataKey="temp" stroke="#2563eb" strokeWidth={2} dot={false} />
							<Line
								type="monotone"
								dataKey="feels_like"
								stroke="#64748b"
								strokeWidth={2}
								dot={false}
								strokeDasharray="5 5"
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	);
};

export default HourlyTemperature;
