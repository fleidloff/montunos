module.exports = {
    files: {
        javascripts: {
            joinTo: {
                "vendor.js": /^app\/vendor/,
                "app.js": /^app\/js/
            }
        },
        stylesheets: {
            joinTo: "app.css"
        }
    },
    
    plugins: {
        babel: {
            presets: ["es2015"]
        }
    }
};
