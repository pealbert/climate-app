import { format } from "date-fns";
import { Clock, Loader2, Search, Star, XCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useFavorite } from "@/hooks/use-favorite";
import { useSearchHistory } from "@/hooks/use-search-history";
import { useLocationSearch } from "@/hooks/use-weather";

import { Button } from "./ui/button";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "./ui/command";

const CitySearch = () => {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const navigate = useNavigate();

	const { data: locations, isLoading } = useLocationSearch(query);
	const { history, clearHistory, addToHistory } = useSearchHistory();
	const { favorites } = useFavorite();

	const handleSelect = (cityData: string) => {
		const [lat, lon, name, country] = cityData.split("|");

		addToHistory.mutate({
			query,
			name,
			lat: parseFloat(lat),
			lon: parseFloat(lon),
			country,
		});

		setOpen(false);
		setQuery("");
		void navigate({
			pathname: `/city/${encodeURIComponent(name)}`,
			search: new URLSearchParams({ lat, lon }).toString(),
		});
	};

	return (
		<>
			<Button
				onClick={() => setOpen(true)}
				variant="outline"
				className="relative w-full min-w-0 justify-start overflow-hidden px-2 text-sm text-muted-foreground sm:px-2.5 sm:pr-12"
			>
				<Search className="size-4 shrink-0 sm:mr-1" />
				<span className="truncate">Search cities...</span>
			</Button>

			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder="Search cities..." value={query} onValueChange={setQuery} />
				<CommandList>
					{query.length > 2 && isLoading && (
						<div className="flex items-center justify-center p-4">
							<Loader2 className="size-4 animate-spin" />
							<span className="sr-only">Searching cities</span>
						</div>
					)}
					{query.length > 2 && !isLoading && <CommandEmpty>No cities found.</CommandEmpty>}

					{favorites.length > 0 && (
						<CommandGroup heading="Favorites">
							{favorites.map((location) => (
								<CommandItem
									key={location.id}
									value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
									onSelect={handleSelect}
								>
									<Star className="size-4 shrink-0 text-yellow-500" />
									<span className="min-w-0 flex-1 truncate">
										{location.name}
										<span className="text-muted-foreground">
											{location.state ? `, ${location.state}` : ""}, {location.country}
										</span>
									</span>
								</CommandItem>
							))}
						</CommandGroup>
					)}

					{history.length > 0 && (
						<>
							<CommandSeparator />

							<CommandGroup>
								<div className="my-2 flex items-center justify-between px-2">
									<p className="text-xs text-muted-foreground">Recent Searches</p>
									<Button variant="ghost" size="sm" onClick={() => clearHistory.mutate()}>
										<XCircle className="size-4" />
										Clear
									</Button>
								</div>

								{history.map((location) => (
									<CommandItem
										key={`${location.lat}-${location.lon}`}
										value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
										onSelect={handleSelect}
									>
										<Clock className="size-4 shrink-0 text-muted-foreground" />
										<span className="min-w-0 flex-1 truncate">
											{location.name}
											<span className="text-muted-foreground">
												{location.state ? `, ${location.state}` : ""}, {location.country}
											</span>
										</span>
										<span className="ml-auto hidden shrink-0 text-xs text-muted-foreground sm:inline">
											{format(location.searchedAt, "MMM d, h:mm a")}
										</span>
									</CommandItem>
								))}
							</CommandGroup>
						</>
					)}

					{locations && locations.length > 0 && (
						<>
							<CommandSeparator />

							<CommandGroup heading="Suggestions">
								{locations.map((location) => (
									<CommandItem
										key={`${location.lat}-${location.lon}`}
										value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
										onSelect={handleSelect}
									>
										<Search className="size-4 shrink-0" />
										<span className="min-w-0 flex-1 truncate">
											{location.name}
											<span className="text-muted-foreground">
												{location.state ? `, ${location.state}` : ""}, {location.country}
											</span>
										</span>
									</CommandItem>
								))}
							</CommandGroup>
						</>
					)}
				</CommandList>
			</CommandDialog>
		</>
	);
};

export default CitySearch;
