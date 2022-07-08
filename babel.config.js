const path = require('path');

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    ['@babel/plugin-proposal-optional-catch-binding'],
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: [path.resolve(__dirname, './src')],
        extensions: [
          '.jsx',
          '.js',
          '.json',
          // we'd uncomment the below if we ever started using
          // typescript
          // '.ios.ts',
          // '.android.ts',
          // '.ts',
          // '.ios.tsx',
          // '.android.tsx',
          // '.tsx',
        ],
        alias: {
          api: path.resolve(__dirname, 'src/api/'),
          assets: path.resolve(__dirname, 'src/assets/'),
          components: path.resolve(__dirname, 'src/components/'),
          navigation: path.resolve(__dirname, 'src/navigation/'),
          screens: path.resolve(__dirname, 'src/screens/'),
          services: path.resolve(__dirname, 'src/services/'),
          store: path.resolve(__dirname, 'src/store/'),
          utils: path.resolve(__dirname, 'src/utils/'),
          hooks: path.resolve(__dirname, 'src/hooks/'),
        },
      },
    ],
  ],
};
