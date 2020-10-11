const path = require("path");

module.exports = {
  // change the output directory for the vue build process
  // typically it would create a dist folder in the main folder of the app (in this case client)
  outputDir: path.resolve(__dirname, "../server/public"),

  // create a proxy so we don't have the localhost url in the Service.js
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000/"
      }
    }
  }
};
