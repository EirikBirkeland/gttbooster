'use strict';

const config = {

    // my custom
    extension_url: "chrome-extension://cjoicloomdlpbncchogkibphjpafibed/html/options.html",

    icon_appearance: "three cogs",

    // Your site title (format: page_title - site_title)
    site_title: 'GTT Booster - Help Center',

    site_subtitle: 'Welcome to the Help Center for GTT Booster.',

    get_in_touch: 'If we can be of any assistance, please <a href="mailto:gttbooster@gmail.com"><b>e-mail us directly</b></a> and we will get back to you as soon as possible!',

    // The base URL of your site (can use %base_url% in Markdown files)
    base_url: '',

    // Used for the "Get in touch" page footer link
    support_email: 'gttbooster@gmail.com',

    // Footer Text / Copyright
    copyright: 'Copyright &copy; ' + new Date().getFullYear() + ' - <a href="http://raneto.com">Powered by Raneto</a>',

    // Excerpt length (used in search)
    excerpt_length: 400,

    // The meta value by which to sort pages (value should be an integer)
    // If this option is blank pages will be sorted alphabetically
    page_sort_meta: 'sort',

    // Should categories be sorted numerically (true) or alphabetically (false)
    // If true category folders need to contain a "sort" file with an integer value
    category_sort: true,

    // Which Theme to Use?
    theme_dir: process.cwd() + '/node_modules/raneto/themes/',
    theme_name: 'default',

    // Specify the path of your content folder where all your '.md' files are located
    // Fix: Needs trailing slash for now!
    // Fix: Cannot be an absolute path
    content_dir: __dirname + '/content/',

    // Where is the public directory or document root?
    public_dir: __dirname + '/node_modules/raneto/themes/default/public/',

    // The base URL of your images folder,
    // Relative to config.public_dir
    // (can use %image_url% in Markdown files)
    image_url: '/images',

    // Add your analytics tracking code (including script tags)
    analytics: '',

    // Set to true to enable the web editor
    allow_editing: false,

    // Set to true to enable HTTP Basic Authentication
    authentication: false,
    credentials: [
        {
            username: 'eirik',
            password: 'lettmelk'
        }
    ],

    locale: 'en',

    // Set to true to render suitable layout for RTL languages
    rtl_layout: false,

    // Edit Home Page title, description, etc.
    home_meta: {
        title: 'GTT Booster Documentation',
        description: 'Custom Home Description'
    }

};

// Exports
module.exports = config;
