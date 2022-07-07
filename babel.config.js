module.exports ={
    presets:[
        ['@babel/preset-env',{targets:{node:'current'}}],
        '@babel/preset-typescript',
    ],
    plugins: [
        "@babel/plugin-transform-modules-commonjs",
        "babel-plugin-transform-typescript-metadata",
        ["@babel/plugin-proposal-decorators",{"legacy":true}],
        ["@babel/plugin-proposal-class-properties",{"loose":true}]
    ],
    env: {
        test: {
          plugins: ["@babel/plugin-transform-modules-commonjs"]
        }
    }
}
