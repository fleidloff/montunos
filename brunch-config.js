module.exports = {
    files: {
        javascripts: {
            joinTo: {
                "vendor.js": /^node_modules|^bower_components\//,
                "app.js": /^app\/js|^app\/montunos/,
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
        }, 
        assetsmanager: {
            copyTo: {
                "montunos" : ["app/montunos/*"],
                "bower_components" : ["bower_components/*"]
            },
            minTimeSpanSeconds: 10 // assets won"t be copied more frequent than once per X seconds.
        }
    }
};
