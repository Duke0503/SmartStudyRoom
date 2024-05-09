// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const MetroConfig = require('@ui-kitten/metro-config');

const evaConfig = {
    evaPackage: '@eva-design/eva',
    // Optional, but may be useful when using mapping customization feature.
    customMappingPath: './mapping.json',
  };

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

module.exports = config;
