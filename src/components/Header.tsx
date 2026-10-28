import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

import { useTheme } from "@/context/ThemeProvider";
import { cn } from "@/lib/utils";

import CitySearch from "./CitySearch";

const Header = () => {
	const { theme, setTheme } = useTheme();
	const isDark = theme === "dark";

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
			<div className="container mx-auto flex min-h-16 items-center gap-2 px-3 py-2 sm:gap-4 sm:px-4">
				<Link to="/" className="shrink-0" aria-label="Go to the weather dashboard">
					<img
						src={isDark ? "/dark_theme_logo.png" : "/light_theme_logo.png"}
						alt="Klimate Logo"
						className="size-11 object-contain sm:h-14 sm:w-auto"
					/>
				</Link>

				<div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-4">
					<div className="min-w-0 flex-1 sm:max-w-64">
						<CitySearch />
					</div>

					<button
						type="button"
						onClick={() => setTheme(isDark ? "light" : "dark")}
						aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
						className={cn(
							"flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg transition-all duration-500 hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
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
