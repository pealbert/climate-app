import type { PropsWithChildren } from "react";

import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }: PropsWithChildren) => {
	return (
		<div className="min-h-dvh min-w-0 overflow-x-hidden bg-linear-to-br from-background to-muted">
			<Header />
			<main className="container mx-auto min-h-screen min-w-0 px-3 py-4 sm:px-4 sm:py-8">
				{children}
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
