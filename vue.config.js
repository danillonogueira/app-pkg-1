module.exports = {
  publicPath: 'http://localhost:8081/',
  chainWebpack: (config) => {
    config.optimization.delete('splitChunks');
    config
      .plugin('module-federation-plugin')
      .use(require('webpack').container.ModuleFederationPlugin, [
        {
          name: 'app_pkg_1',
          filename: 'remoteEntry.js',
          exposes: {
            './Table': './src/components/Table.vue',
          },
          shared: [
            {
              vue: {
                singleton: true,
                eager: true,
              }
            }
          ]
        }
      ]);
  },
  devServer: {
    port: 8081,
  }
};