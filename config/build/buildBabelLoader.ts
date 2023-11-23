import {removeDataTestIdBabelPlugin} from "../babel/removeDataTestIdBabelPlugin";
import {BuildOptions} from "./types";

const buildBabelLoader = (options: BuildOptions) => {
  const {mode} = options;
  const isProduction = mode === 'production';
  const isDevelopment = mode === 'development';

  const plugins = [];

  if (isProduction) {
    plugins.push(
      [
        removeDataTestIdBabelPlugin,
        {
          props: ['data-testid'],
        }
      ]
    );
  }

  const presets = [
     '@babel/preset-env',
     '@babel/preset-typescript',
     [
       '@babel/preset-react',
       { runtime: isDevelopment ? 'automatic' : 'classic' }
     ],
   ];

  return {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        plugins: plugins.length ? plugins : undefined,
        presets,
      },
    },
  }
};

export default buildBabelLoader;
