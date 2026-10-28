import { Loader2, X } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { useFavorite } from "@/hooks/use-favorite";
import { useWeatherQuery } from "@/hooks/use-weather";

import { Button } from "./ui/button";

interface FavoriteCityCardProps {
	name: string;
	lat: number;
	lon: number;
	country: string;
	onRemove: () => void;
}

const FavoriteCities = () => {
	const { favorites, removeFavorite } = useFavorite();

	if (!favorites.length) {
		return null;
	}

	return (
		<>
			<h1 className="text-xl font-bold tracking-tight">Favorites</h1>
			<div className="w-full overflow-x-auto overscroll-x-contain pb-3 sm:pb-4">
				<div className="flex gap-3 pb-2 sm:gap-4">
					{favorites.map((city) => (
						<FavoriteCityCard
							key={city.id}
							name={city.name}
							lat={city.lat}
							lon={city.lon}
							country={city.country}
							onRemove={() =>
								removeFavorite.mutate(city.id, {
									onSuccess: () => toast.success(`Removed ${city.name} from favorites`),
									onError: () => toast.error(`Could not remove ${city.name} from favorites`),
								})
							}
						/>
					))}
				</div>
			</div>
		</>
	);
};

function FavoriteCityCard({ name, lat, lon, country, onRemove }: FavoriteCityCardProps) {
	const { data: weather, isError, isLoading } = useWeatherQuery({ lat, lon });
	const cityUrl = {
		pathname: `/city/${encodeURIComponent(name)}`,
		search: new URLSearchParams({ lat: String(lat), lon: String(lon) }).toString(),
	};

	return (
		<div className="relative w-[calc(100vw-1.5rem)] max-w-72 shrink-0 rounded-lg border bg-card shadow-sm transition-all hover:shadow-md sm:w-72">
			<Link
				to={cityUrl}
				className="flex min-h-18 items-center gap-3 rounded-lg p-4 pr-10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
				aria-label={`View weather for ${name}`}
			>
				{isLoading ? (
					<Loader2 className="size-8 animate-spin" aria-label="Loading weather" />
				) : weather ? (
					<img
						src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
						alt={weather.weather[0].description}
						className="size-8"
					/>
				) : null}

				<div className="min-w-0 flex-1">
					<p className="truncate font-medium">{name}</p>
					<p className="text-xs text-muted-foreground">{country}</p>
				</div>

				{weather && (
					<div className="ml-auto min-w-0 shrink-0 text-right">
						<p className="text-xl font-bold">{Math.round(weather.main.temp)}°</p>
						<p className="max-w-24 truncate text-xs text-muted-foreground capitalize">
							{weather.weather[0].description}
						</p>
					</div>
				)}
				{isError && <p className="ml-auto text-xs text-muted-foreground">Weather unavailable</p>}
			</Link>

			<Button
				variant="ghost"
				size="icon"
				className="absolute top-1 right-1 size-6 rounded-full p-0 hover:text-destructive"
				aria-label={`Remove ${name} from favorites`}
				onClick={onRemove}
			>
				<X className="size-4" />
			</Button>
		</div>
	);
}

export default FavoriteCities;
