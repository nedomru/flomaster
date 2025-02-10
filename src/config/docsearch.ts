import type { DocSearchClientOptions } from '@astrojs/starlight-docsearch';

export default {
  appId: 'DN83H0EFK4',
  apiKey: '26993d897f7166569aaa44ad941e0475',
  indexName: 'flomaster-chrsnv',
  insights: true,
  getMissingResultsUrl({ query }) {
    return `https://t.me/roman_domru`;
  }
} satisfies DocSearchClientOptions;