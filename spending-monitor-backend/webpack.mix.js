const mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js')
   .react()
   .sass('resources/sass/app.scss', 'public/css')
   .options({
        processCssUrls: false,
        postCss: [require('autoprefixer')],
    })
   .sourceMaps();

// Add aliases for easier imports
mix.webpackConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/js'),
            '@atoms': path.resolve(__dirname, 'resources/js/atoms'),
            '@molecules': path.resolve(__dirname, 'resources/js/molecules'),
            '@organisms': path.resolve(__dirname, 'resources/js/organisms'),
            '@templates': path.resolve(__dirname, 'resources/js/templates'),
            '@pages': path.resolve(__dirname, 'resources/js/pages'),
            '@contexts': path.resolve(__dirname, 'resources/js/contexts'),
            '@api': path.resolve(__dirname, 'resources/js/api'),
        }
    }
}); 