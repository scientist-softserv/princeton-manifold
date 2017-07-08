const paths = require("../paths");
const fs = require("fs");
const mkdirp = require("mkdirp");

function statsPlugin(options) {
  this.options = options;
}

statsPlugin.prototype.apply = function apply(compiler) {
  compiler.plugin("after-emit", (compilation, done) => {
    const stats = compilation.getStats().toJson({
      hash: true,
      version: true,
      timings: false,
      assets: true,
      chunks: false,
      chunkModules: false,
      chunkOrigins: false,
      modules: false,
      cached: false,
      reasons: false,
      children: false,
      source: false,
      errors: false,
      errorDetails: false,
      warnings: false,
      publicPath: true
    });
    delete stats.assets;
    const out = { assetsByChunkName: stats.assetsByChunkName };
    const base = `${paths.output}/manifest`;
    const path = `${base}/${this.options.fileName}`;
    mkdirp.sync(base);
    fs.writeFile(path, JSON.stringify(out, null, 2), done);
  });
};

module.exports = statsPlugin;
