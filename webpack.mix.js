const mix = require('laravel-mix');
let tailwindcss = require('tailwindcss');
let conf = require('dotenv').config();
require('laravel-mix-ignore');
let path = require('path');
mix.js('app.js',  'public/js').vue()
    .webpackConfig({
        cache: {
            type: 'filesystem',
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '@assets': path.resolve(__dirname, 'assets'),
                '@sass': path.resolve(__dirname, 'sass')
            }
        }

    })
    .sass('sass/app.scss', 'public/css').options({
        postCss:[require('autoprefixer'), require('postcss-rtl')]
    })
    .postCss('assets/css/main.css', 'public/css', [
        tailwindcss('tailwind.js'), require('postcss-rtl')()
    ])
    .copy('assets/vuesax/vuesax.css', 'public/css/vuesax.css') // Vuesax framework css
    .copy('assets/css/iconfont.css', 'public/css/iconfont.css') // Feather Icon Font css
    .copyDirectory('assets/fonts', 'public/fonts') // Feather Icon fonts
    .copyDirectory('assets/iconfont', 'public/css/material-icons') // Material Icon fonts
    .copyDirectory('assets/iconfont/material-icons.css', 'public/css/material-icons/material-icons.css') // Material Icon fonts css
    .copy('assets/themes/prism-tomorrow.css', 'public/css/prism-tomorrow.css') // Prism Tomorrow theme css
    .copyDirectory('assets/images', 'public/images'); // Copy all images from resources to public folder


mix.webpackConfig({
    output: {

        chunkFilename: 'js/chunks/[name].[chunkhash].js',

    },

});



