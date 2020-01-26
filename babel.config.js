module.exports = function(api) {
	const presets = [
		[
			"@babel/preset-env",
			{
				targets: {
					node: "12.14.0"
				}
			}
		]
	];

	api.cache(true);

	const plugins = [];

	return {
		presets,
		plugins
	};
};
