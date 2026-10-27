import { format } from "date-fns";
import { Clock, Loader2, Search, XCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
		void navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
	};

	return (
		<>
			<Button
				onClick={() => setOpen(true)}
				variant="outline"
				className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
			>
				<Search className="mr-2 size-4" />
				Search cities...
			</Button>

			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder="Search cities..." value={query} onValueChange={setQuery} />
				<CommandList>
					{query.length > 2 && !isLoading && <CommandEmpty>No cities found.</CommandEmpty>}
					<CommandGroup heading="Favorites">
						<CommandItem>Calendar</CommandItem>
					</CommandGroup>

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
										<Clock className="mr-2 size-4 text-muted-foreground" />
										<span>{location.name}</span>
										{location.state && (
											<span className="text-sm text-muted-foreground">, {location.state}</span>
										)}
										<span className="text-sm text-muted-foreground">, {location.country}</span>
										<span className="ml-auto text-xs text-muted-foreground">
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
								{isLoading && (
									<div className="flex items-center justify-center p-4">
										<Loader2 className="size-4 animate-spin" />
									</div>
								)}
								{locations.map((location) => (
									<CommandItem
										key={`${location.lat}-${location.lon}`}
										value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
										onSelect={handleSelect}
									>
										<Search className="mr-2 size-4" />
										<span>{location.name}</span>
										{location.state && (
											<span className="text-sm text-muted-foreground">, {location.state}</span>
										)}
										<span className="text-sm text-muted-foreground">, {location.country}</span>
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
