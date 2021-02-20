module.exports = {
  runtimeCompiler: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8081',
        changOrigin: true, //开启代理
      },
    },
  },
}