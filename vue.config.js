module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    externals: {
      typeorm: 'commonjs typeorm',
      sqlite3: 'commonjs sqlite3',
      electron: 'commonjs electron'
    }
  },
  pluginOptions: {
    electronBuilder: {
      externals: ['typeorm', 'sqlite3']
    }
  }
}
