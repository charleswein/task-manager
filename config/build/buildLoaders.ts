import { ModuleOptions } from 'webpack';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types";
import ReactRefreshTypescript from 'react-refresh-typescript';
import {removeDataTestIdBabelPlugin} from "../babel/removeDataTestIdBabelPlugin";
import buildBabelLoader from "./buildBabelLoader";

export const buildLoaders = (options: BuildOptions): ModuleOptions['rules'] => {
  const isDevelopment = options.mode === 'development';

  const styleLoader = isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader;

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  }

  const cssLoader = {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: isDevelopment ? '[path][name]__[local]' : '[name]__[local]___[hash:base64:8]',
      },
    },
  }

  const tsLoader = {
     test: /\.tsx?$/,
     use: {
       loader: 'ts-loader',
       options: {
         transpileOnly: true,
         getCustomTransformers: () => ({
           before: [isDevelopment && ReactRefreshTypescript()].filter(Boolean),
         })
       },
     },
     exclude: /node_modules/,
   };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      styleLoader,
      // Translates CSS into CommonJS
      cssLoader,
      // Compiles Sass to CSS
      "sass-loader",
    ],
  };

  const svgrLoader = {
    test: /\.svg$/,
    issuer: /\.(js|ts)x?$/,
    use: [{
      loader: '@svgr/webpack',
      options: {
        icon: true,
        svgoConfig: {
          plugins: [
            {
              name: 'convertColors',
              params: {
                currentColor: true,
              }
            },
          ],
        },
      }
    }],
  };

  const babelLoader = buildBabelLoader(options);

  return [
    babelLoader,
    scssLoader,
    assetLoader,
    svgrLoader,
  ];
}
