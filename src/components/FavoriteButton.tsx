import { Star } from "lucide-react";
import { toast } from "sonner";

import type { WeatherData } from "@/api/types";
import { useFavorite } from "@/hooks/use-favorite";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";

interface FavoriteButtonProps {
	data: WeatherData;
}

const FavoriteButton = ({ data }: FavoriteButtonProps) => {
	const { addFavorite, isFavorite, removeFavorite } = useFavorite();
	const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon);

	const handleToggleFavorite = () => {
		if (isCurrentlyFavorite) {
			removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`, {
				onSuccess: () => toast.success(`Removed ${data.name} from favorites`),
				onError: () => toast.error(`Could not remove ${data.name} from favorites`),
			});
		} else {
			addFavorite.mutate(
				{
					name: data.name,
					lat: data.coord.lat,
					lon: data.coord.lon,
					country: data.sys.country,
				},
				{
					onSuccess: () => toast.success(`Added ${data.name} to favorites`),
					onError: () => toast.error(`Could not add ${data.name} to favorites`),
				},
			);
		}
	};

	return (
		<Button
			variant={isCurrentlyFavorite ? "default" : "outline"}
			size="icon"
			className={isCurrentlyFavorite ? "bg-yellow-500 hover:bg-yellow-600" : ""}
			onClick={handleToggleFavorite}
			aria-label={
				isCurrentlyFavorite ? `Remove ${data.name} from favorites` : `Add ${data.name} to favorites`
			}
			aria-pressed={isCurrentlyFavorite}
			title={isCurrentlyFavorite ? "Remove from favorites" : "Add to favorites"}
		>
			<Star className={cn("size-4", isCurrentlyFavorite ? "fill-current" : "")} />
		</Button>
	);
};

export default FavoriteButton;
