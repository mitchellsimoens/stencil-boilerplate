exports.config = {
  namespace   : 'App',
  bundles     : [
    { components : [ 'my-app', 'my-header' ] },
    { components : [ 'my-home' ] },
    { components : [ 'my-form' ] },
    { components : [ 'my-about' ] }
  ],
  collections : [
    { name : '@stencil/router' }
  ]
};

exports.devServer = {
  httpPort  : 3030,
  root      : 'www',
  watchGlob : '**/**'
}
