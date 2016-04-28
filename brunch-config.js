module.exports = {
    files: {
        javascripts: {
            joinTo: {
                "vendor.js": /^app\/vendor/,
                "app.js": /^app\/js/
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
