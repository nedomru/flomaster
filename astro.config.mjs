import {defineConfig} from "astro/config";
import starlight from "@astrojs/starlight";
import node from "@astrojs/node";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import starlightUtils from "@lorenzo_lewis/starlight-utils";
import starlightDocSearch from '@astrojs/starlight-docsearch';


import {reportErrorPlugin} from '/src/plugins/reportError';
import {clickToCopyPlugin} from '/src/plugins/copyCodeBlock';
import {codePhotoPlugin} from "/src/plugins/codeShowPhoto";
import {rehypeHeadingIds} from "@astrojs/markdown-remark";


// https://astro.build/config
export default defineConfig({
    output: 'server',
    adapter: node({
        mode: "standalone"
    }),

    site: "https://flomaster.chrsnv.ru",
    base: "/",

    vite: {
        define: {
            'import.meta.env.SUPABASE_URL': JSON.stringify(process.env.SUPABASE_URL),
            'import.meta.env.SUPABASE_SERVICE_ROLE_KEY': JSON.stringify(process.env.SUPABASE_SERVICE_ROLE_KEY),
            'import.meta.env.PUBLIC_ALGOLIA_APIKEY': JSON.stringify(process.env.ALGOLIA_APIKEY),
            'import.meta.env.PUBLIC_ALGOLIA_APPID': JSON.stringify(process.env.ALGOLIA_APPID),
        },
    },

    integrations: [
        starlight(
            {
                title: "Фломастер",
                logo: {
                    src: "/src/assets/flomaster.png",
                },
                locales: {
                    root: {
                        label: "Русский",
                        lang: "ru",
                    },
                },
                customCss: ["/src/styles/custom.css", "/src/styles/headings.css",],
                tableOfContents: {
                    maxHeadingLevel: 4
                },
                components: {
                    Header: '/src/overrides/CustomHeader.astro',
                },
                social: {
                    github: "https://github.com/AuthFailed/flomaster/",
                    telegram: "https://t.me/+jH1mblw0ytcwOWUy",
                },
                lastUpdated: true,
                sidebar: [
                    {
                        label: "🛠️ Технина",
                        items: [
                            {
                                label: "Интернет",
                                autogenerate: {directory: "/chat-phrases/tech/internet"},
                                badge: {text: "Не готово", variant: "caution"}
                            },
                            {
                                label: "Телевидение",
                                autogenerate: {directory: "/chat-phrases/tech/television"},
                                badge: {text: "Не готово", variant: "caution"}
                            },
                            {
                                label: "Домофония",
                                autogenerate: {directory: "/chat-phrases/tech/intercom"},
                                badge: {text: "Не готово", variant: "caution"}
                            },
                            {
                                label: "Видеонаблюдение",
                                autogenerate: {directory: "/chat-phrases/tech/cctv"},
                                badge: {text: "Не готово", variant: "caution"}
                            },
                            {
                                label: "Заявки и аварии",
                                autogenerate: {directory: "/chat-phrases/tech/accidents"},
                                badge: {text: "Не готово", variant: "caution"}
                            },
                        ],
                    },
                    {
                        label: "💭 Диалог",
                        items: [
                            {
                                label: "Общение с клиентом",
                                autogenerate: {directory: "/chat-phrases/dialog/communications"},
                                badge: {text: "Готово", variant: "success"}
                            },
                            {
                                label: "Регламенты",
                                autogenerate: {directory: "/chat-phrases/dialog/reglaments"},
                                badge: {text: "Готово", variant: "success"}
                            },
                            {
                                label: "Правовая часть",
                                autogenerate: {directory: "/chat-phrases/dialog/companylaw"},
                                badge: {text: "Готово", variant: "success"}
                            },
                        ],
                    },
                    {
                        label: "🛒 Продажи",
                        items: [
                            {
                                label: "Роутеры",
                                autogenerate: {directory: "/chat-phrases/sales/routers"},
                                badge: {text: "Актуально", variant: "success"}
                            },
                            {
                                label: "Приставки",
                                autogenerate: {directory: "/chat-phrases/sales/decoders"},
                                badge: {text: "Актуально", variant: "success"}
                            },
                            {
                                label: "Камеры",
                                autogenerate: {directory: "/chat-phrases/sales/camcorders"},
                                badge: {text: "Актуально", variant: "success"}
                            },
                        ],
                    },
                ],
                editLink: {
                    baseUrl: "https://github.com/authfailed/flomaster/edit/main/",
                },
                plugins: [starlightUtils({
                    multiSidebar: {
                        switcherStyle: "horizontalList",
                    },
                }),
                    starlightDocSearch({
                        appId: import.meta.env.ALGOLIA_APPID,
                        apiKey: import.meta.env.ALGOLIA_APIKEY,
                        indexName: 'flomaster-chrsnv',
                    }),],
                expressiveCode: {
                    plugins: [
                        reportErrorPlugin(),
                        clickToCopyPlugin(),
                        codePhotoPlugin(),
                        {
                            name: 'Hide copy button',
                            baseStyles: `
                          .expressive-code .copy button {
                            display: none;
                          }
                        `,
                        },

                    ],
                    styleOverrides: {
                        borderRadius: '0.5rem',
                        frames: {
                            shadowColor: '#124',
                        },
                    },
                }
            }),
        react(),
        tailwind(),
    ],

    markdown: {
        rehypePlugins: [
            rehypeHeadingIds,
        ],
    },

});