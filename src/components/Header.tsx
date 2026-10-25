import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

import { useTheme } from "@/context/ThemeProvider";
import { cn } from "@/lib/utils";

import CitySearch from "./CitySearch";

const Header = () => {
	const { theme, setTheme } = useTheme();
	const isDark = theme === "dark";

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 py-2 backdrop-blur supports-backdrop-filter:bg-background/60">
			<div className="container mx-auto flex h-16 items-center justify-between px-4">
				<Link to="/">
					<img
						src={isDark ? "/dark_theme_logo.png" : "/light_theme_logo.png"}
						alt="Klimate Logo"
						className="h-14"
					/>
				</Link>

				<div className="flex gap-4">
					<CitySearch />

					<button
						type="button"
						onClick={() => setTheme(isDark ? "light" : "dark")}
						className={cn(
							"flex cursor-pointer items-center transition-transform duration-500",
							isDark ? "rotate-180" : "rotate-0",
						)}
					>
						{isDark ? (
							<Sun className="size-6 rotate-0 text-yellow-500 transition-all" />
						) : (
							<Moon className="size-6 rotate-0 text-blue-500 transition-all" />
						)}
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
