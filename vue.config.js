module.exports = {
    devServer:{
      host:'localhost',
      port:8080,
      proxy:{
        '/mi':{
          target:'http://mi.rzi2016.online/mi/',
          changeOrigin:true,
          pathRewrite:{
            '^/mi':''
          }
        }
      }
    }
}