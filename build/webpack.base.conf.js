'use strict'

const path = require('path')
const rm = require('rimraf')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const resolve = (dir) => {
  return path.join(__dirname, '..', dir)
}

/* delete files */
rm.sync(resolve('prod'))
rm.sync(resolve('dist'))

module.exports = {
  output: {
    path: resolve('dist'),
    publicPath: '/'
  },
  entry: {
    app: './src/main.ts'
  },
  resolve: {
    extensions: ['.js', '.ts', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        include: path.resolve('src'),
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: require('os').cpus().length - 1,
            },
          },
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
              happyPackMode: true,
              compilerOptions: {
                module: 'esnext',
              },
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          esModule: true,
          cacheBusting: true,
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            scss: 'vue-style-loader!css-loader!postcss-loader!sass-loader',
            sass: 'vue-style-loader!css-loader!postcss-loader!sass-loader?indentedSyntax',
            css: 'vue-style-loader!css-loader!postcss-loader',
          },
          // other vue-loader options go here
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'img/[name].[ext]',
            esModule: false,
          }
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html',
      inject: true,
    }),
    new VueLoaderPlugin(),
  ]
}
