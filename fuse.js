const { FuseBox, WebIndexPlugin, QuantumPlugin } = require("fuse-box");
const { context, src, task } = require("fuse-box/sparky");

context(
  class {
    getConfig() {
      return FuseBox.init({
        target: "browser@es5",
        homeDir: "./src/renderer",
        output: "./dist/$name.js",
        cache: false,
        useTypescriptCompiler: true,
        plugins: [
          WebIndexPlugin({
            template: "./src/renderer/index.html",
            path: "./",
          }),
          this.isProduction &&
            QuantumPlugin({
              target: "browser",
              bakeApiIntoBundle: "vendor",
              treeshake: true,
              uglify: true,
            }),
        ],
      });
    }

    bundleApp(fuse) {
      return fuse.bundle("app").instructions(">[index.jsx]");
    }

    bundleVendor(fuse) {
      return fuse.bundle("vendor").instructions("~index.jsx");
    }
  }
);

task("clean", () =>
  src("dist")
    .clean("dist")
    .exec()
);

task("default", ["clean"], async context => {
  const fuse = context.getConfig();
  context.bundleVendor(fuse);
  context.bundleApp(fuse);
  await fuse.run();
});

task("prod", ["clean"], async context => {
  context.isProduction = true;
  const fuse = context.getConfig();
  context.bundleVendor(fuse);
  context.bundleApp(fuse);
  await fuse.run();
});
