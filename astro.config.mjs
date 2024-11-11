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
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

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
            'import.meta.env.SUPABASE_URL': JSON.stringify(process.env.PUBLIC_SUPABASE_URL),
            'import.meta.env.SUPABASE_SERVICE_ROLE_KEY': JSON.stringify(process.env.PUBLIC_SUPABASE_SERVICE_ROLE_KEY),
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
                                autogenerate: {directory: "/chat-phrases/tech/internet"}
                            },
                            {
                                label: "Настройка оборудования",
                                autogenerate: {directory: "/chat-phrases/tech/setup"}
                            },
                            {
                                label: "Телевидение",
                                autogenerate: {directory: "/chat-phrases/tech/television"}
                            },
                            {
                                label: "Домофония",
                                autogenerate: {directory: "/chat-phrases/tech/intercom"}
                            },
                            {
                                label: "Видеонаблюдение",
                                autogenerate: {directory: "/chat-phrases/tech/cctv"}
                            },
                            {
                                label: "Заявки и аварии",
                                autogenerate: {directory: "/chat-phrases/tech/accidents"}
                            },
                        ],
                    },
                    {
                        label: "💭 Диалог",
                        items: [
                            {
                                label: "Общение с клиентом",
                                autogenerate: {directory: "/chat-phrases/dialog/communications"}
                            },
                            {
                                label: "Регламенты",
                                autogenerate: {directory: "/chat-phrases/dialog/reglaments"}
                            },
                            {
                                label: "Правовая часть",
                                autogenerate: {directory: "/chat-phrases/dialog/companylaw"}
                            },
                        ],
                    },
                    {
                        label: "🛒 Продажи",
                        items: [
                            {
                                label: "Продажа роутеров",
                                autogenerate: {directory: "/chat-phrases/sales/routers"}
                            },
                            {
                                label: "Продажа приставок",
                                autogenerate: {directory: "/chat-phrases/sales/decoders"}
                            },
                            {
                                label: "Продажа камер",
                                autogenerate: {directory: "/chat-phrases/sales/camcorders"}
                            },
                        ],
                    },
                ],
                plugins: [starlightUtils({
                    multiSidebar: {
                        switcherStyle: "horizontalList",
                    },
                }),
                    starlightDocSearch({
                        appId: "DN83H0EFK4",
                        apiKey: "dab20c5dad503493810a3cd2b65e11f5",
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
            [
                rehypeAutolinkHeadings,
                {
                    // Wrap the heading text in a link.
                    behavior: 'wrap',
                },
            ],
        ],
    },

});