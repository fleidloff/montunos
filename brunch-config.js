module.exports = {
    files: {
        javascripts: {
            joinTo: {
                "vendor.js": /^node_modules\//,
                "app.js": /^app\/js/,
                "test.js": /^app\/test|^node_modules\//
            }
        },
        stylesheets: {
            joinTo: {
                "style.css": /^app\/less/
            },
            order: {
                before: [ "app/less/style.less" ]
            }
        }
    },

    plugins: {
        babel: {
            presets: ["es2015"]
        },
        less: {
            modules: false
        },
        eslint: {
            pattern: /^app\/js\/.*\.js?$/
        }
    }
};
