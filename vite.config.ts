import path from "node:path";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";

export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@": path.resolve(import.meta.dirname, "./src"),
		},
	},
	fmt: {
		ignorePatterns: ["node_modules/**", "dist/**"],
		useTabs: true,
		singleQuote: false,
		sortImports: true,
		sortTailwindcss: {
			stylesheet: "./src/index.css",
			functions: ["clsx", "cn", "cva"],
			preserveDuplicates: false,
		},
		sortPackageJson: true,
	},

	lint: {
		ignorePatterns: ["node_modules/**", "dist/**"],
		jsPlugins: [
			{
				name: "vite-plus",
				specifier: "vite-plus/oxlint-plugin",
			},
		],
		rules: {
			"vite-plus/prefer-vite-plus-imports": "error",
		},
		options: {
			typeAware: true,
			typeCheck: true,
		},
	},
});
