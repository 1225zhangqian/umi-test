import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
  sass: {},
  webpack5: {},
  dynamicImportSyntax: {},
  cssLoader: {},
  dynamicImport: {
    loading: '@/Loading',
  },
  chainWebpack(config) {
    console.log(JSON.stringify(config.toConfig()));
  },
});
