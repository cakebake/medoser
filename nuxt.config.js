
export default {
  mode: 'universal',
  srcDir: 'client/',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Server middleware
  */
  serverMiddleware: [
    './api/index'
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: 'rgba(255, 255, 255, .7)' },
  /*
  ** Global CSS/SCSS
  */
  css: [
    '@/assets/scss/index.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // @see https://www.npmjs.com/package/nuxt-fontawesome
    ['nuxt-fontawesome', {
      component: 'awesome',
      imports: [
        // fas
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: [
            'faDragon',
            'faTasks',
            'faTools',
            'faPlug',
            'faSave',
            'faHandPeace'
          ]
        },
        // fab
        {
          set: '@fortawesome/free-brands-svg-icons',
          icons: ['faGithub']
        }
      ]
    }]
  ],
  /*
  ** bootstrap-vue
  */
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
