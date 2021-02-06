const path = require("path");
const fs = require("fs");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");

const exampleAppDir = fs.realpathSync(process.cwd());
const rootProjectPath = path.resolve(exampleAppDir, "../../");

const exampleAppBabelConfig = {
    test: /\.(js|jsx|ts|tsx)$/,
    include: rootProjectPath,
    loader: require.resolve("babel-loader"),
    options: {
        babelrc: false,
        presets: [require.resolve("babel-preset-react-app")],
        compact: true,
    },
};

module.exports = function override(config, env) {
    // disable ModuleScopePlugin
    config.resolve.plugins = config.resolve.plugins.filter(
        (plugin) => !(plugin instanceof ModuleScopePlugin)
    );
    // add carouschnell root to path
    config.resolve.modules.push(rootProjectPath);
    // add babel config for example app
    config.module.rules.push(exampleAppBabelConfig);
    return config;
};
