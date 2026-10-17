import type { PropsWithChildren } from "react";

import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }: PropsWithChildren) => {
	return (
		<div className="bg-linear-to-br from-background to-muted">
			<Header />
			<main className="container mx-auto min-h-screen px-4 py-8">{children}</main>
			<Footer />
		</div>
	);
};

export default Layout;
