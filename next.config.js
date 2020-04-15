const withTypescript = require("@zeit/next-typescript");
const withSass = require("@zeit/next-sass");

module.exports = withTypescript(
    withSass({
        webpack(config) {
            config.module.rules.push({
                test: /\.(png|jpg|gif|svg)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 100000,
                    },
                },
            });

            return config;
        },
    })
);