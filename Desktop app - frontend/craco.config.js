{
    webpack: {
      plugins: {
        add: [
          new webpack.DefinePlugin({
            process: {env: {}}
          })
        ]
      }
    }
  }