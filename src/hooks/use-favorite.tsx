import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface FavoriteCity {
	id: string;
	name: string;
	lat: number;
	lon: number;
	country: string;
	state?: string;
	addedAt: number;
}

const FAVORITES_KEY = ["favorites"] as const;
const FAVORITES_STORAGE_KEY = "favorites";

function isFavoriteCity(value: unknown): value is FavoriteCity {
	if (!value || typeof value !== "object") return false;

	const city = value as Partial<FavoriteCity>;
	return (
		typeof city.id === "string" &&
		typeof city.name === "string" &&
		typeof city.country === "string" &&
		typeof city.lat === "number" &&
		Number.isFinite(city.lat) &&
		typeof city.lon === "number" &&
		Number.isFinite(city.lon) &&
		typeof city.addedAt === "number" &&
		(city.state === undefined || typeof city.state === "string")
	);
}

function readFavorites(): FavoriteCity[] {
	try {
		const storedFavorites = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
		if (!storedFavorites) return [];

		const parsedFavorites: unknown = JSON.parse(storedFavorites);
		return Array.isArray(parsedFavorites) ? parsedFavorites.filter(isFavoriteCity) : [];
	} catch (error) {
		console.error("Unable to read favorite cities", error);
		return [];
	}
}

function writeFavorites(favorites: FavoriteCity[]) {
	window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
}

export function useFavorite() {
	const queryClient = useQueryClient();

	const favoritesQuery = useQuery({
		queryKey: FAVORITES_KEY,
		queryFn: readFavorites,
		initialData: readFavorites,
		staleTime: Infinity,
		gcTime: Infinity,
	});

	const addFavorite = useMutation({
		mutationFn: async (city: Omit<FavoriteCity, "id" | "addedAt">) => {
			const favorites = queryClient.getQueryData<FavoriteCity[]>(FAVORITES_KEY) ?? readFavorites();
			const newFavorite: FavoriteCity = {
				...city,
				id: `${city.lat}-${city.lon}`,
				addedAt: Date.now(),
			};

			const exists = favorites.some((fav) => fav.id === newFavorite.id);
			if (exists) return favorites;

			const newFavorites = [...favorites, newFavorite].slice(0, 10);

			writeFavorites(newFavorites);
			queryClient.setQueryData(FAVORITES_KEY, newFavorites);

			return newFavorites;
		},
	});

	const removeFavorite = useMutation({
		mutationFn: async (cityId: string) => {
			const favorites = queryClient.getQueryData<FavoriteCity[]>(FAVORITES_KEY) ?? readFavorites();
			const newFavorites = favorites.filter((city) => city.id !== cityId);
			writeFavorites(newFavorites);
			queryClient.setQueryData(FAVORITES_KEY, newFavorites);
			return newFavorites;
		},
	});

	const favorites = favoritesQuery.data ?? [];

	return {
		favorites,
		addFavorite,
		removeFavorite,
		isFavorite: (lat: number, lon: number) =>
			favorites.some((city) => city.lat === lat && city.lon === lon),
	};
}
