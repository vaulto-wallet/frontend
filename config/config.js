// ref: https://umijs.org/config/
import { primaryColor } from '../src/defaultSettings';

export default {
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: { hmr: true },
        targets: { ie: 11 },
        locale: {
          enable: true,
          default: 'en-US',
          baseNavigator: true,
        },
        // default true, when it is true, will use `navigator.language` overwrite default
        dynamicImport: { loadingComponent: './components/PageLoading/index' },
      },
    ],
    [
      'umi-plugin-pro-block',
      {
        moveMock: false,
        moveService: false,
        modifyRequest: true,
        autoAddMenu: true,
      },
    ],
  ],
  targets: { ie: 11 },
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          path: '/user',
          redirect: '/user/login',
        },
        {
          path: '/user/login',
          component: './user-login',
        },
        {
          path: '/user/register',
          component: './user-register',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/BasicLayout',
      routes: [
        {
          path: '/',
          redirect: '/dashboard',
        },
        {
          path: '/dashboard',
          name: 'Dashboard',
          icon: 'dashboard',
          component: './dashboard',
        },
  
        {
          path: '/privatekeys',
          name: 'PrivateKeys',
          icon: 'key',
          component: './privatekeys',
        },
        {
          path: '/wallets/',
          name: 'Wallets',
          icon: 'wallet',
          component: './wallets',
        },
        {
          path: '/firewall/',
          name: 'Firewall',
          icon: 'unlock',
          component: './firewall',
        },
        {
          path: '/transfers/',
          name: 'Transfers',
          icon: 'swap',
          component: './transfers',
        },
        {
          path: '/accounts',
          name: 'Accounts',
          icon: 'user',
          component: './accounts',
        },
        {
          path: '/settings',
          name: 'Settings',
          icon: 'setting',
          component: './settings',
        },
        {
          path: '/assets',
          name: 'Assets',
          icon: 'dollar',
          component: './assets',
        },        
      ],
    },
  ],
  disableRedirectHoist: true,
  /**
   * webpack 相关配置
   */
  define: { APP_TYPE: process.env.APP_TYPE || '' },
  // Theme for antd
  // https://ant.design/docs/react/customize-theme-cn
  theme: { 'primary-color': primaryColor },
  externals: { '@antv/data-set': 'DataSet' },
  ignoreMomentLocale: true,
  lessLoaderOptions: { javascriptEnabled: true },
};
