module.exports = {
	reactStrictMode: true,

	// Setup proxy for backend server
	async rewrites() {
		return [
			{
				source: "/request/:path*",
				destination: "http://localhost:8080/request/:path*",
			},
		];
	},
};
