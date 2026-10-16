import type { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
	return (
		<div className="bg-linear-to-br from-background to-muted">
			{/* header */}
			<main className="container mx-auto min-h-screen px-4 py-8">{children}</main>
			<footer className="border-t py-12 backdrop-blur supports-backdrop-filter:bg-background/60">
				<div className="container mx-auto px-4 text-center text-gray-400">
					<p>Made with 💖 {new Date().getFullYear()}</p>
				</div>
			</footer>
		</div>
	);
};

export default Layout;
