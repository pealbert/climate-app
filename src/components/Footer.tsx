const Footer = () => {
	return (
		<footer className="border-t py-8 backdrop-blur supports-backdrop-filter:bg-background/60 sm:py-12">
			<div className="container mx-auto px-3 text-center text-gray-400 sm:px-4">
				<p>Made with 💖 {new Date().getFullYear()}</p>
			</div>
		</footer>
	);
};

export default Footer;
