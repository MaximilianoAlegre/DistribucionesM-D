import path from 'path'

module.exports = {
  entry: './src/index.js', // o './src/index.tsx' si es TypeScript
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.tsx?$/, // Para TypeScript
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/, // Para React
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    fallback: {
      "fs": false,
      "path": false,
      "os": false
    }
  },
  mode: 'development' // O 'production' dependiendo de tu entorno
};