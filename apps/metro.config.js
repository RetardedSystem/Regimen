// This configs the Expo and Metro Bundler

const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// This is the Configs for the svg imports, it tell Metro to use the react-native-svg-transformer for svg files and to treat them as source files instead of assets
config.transformer.babelTransformerPath =
  require.resolve("react-native-svg-transformer");

config.resolver.assetExts = config.resolver.assetExts.filter(
  (ext) => ext !== "svg",
);

config.resolver.sourceExts.push("svg");

module.exports = config;
