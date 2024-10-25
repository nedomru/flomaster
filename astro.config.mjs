import {defineConfig} from "astro/config";
import starlight from "@astrojs/starlight";
import vercel from '@astrojs/vercel/serverless';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import starlightUtils from "@lorenzo_lewis/starlight-utils";


import {reportErrorPlugin} from '/src/plugins/reportError';
import {clickToCopyPlugin} from '/src/plugins/copyCodeBlock';
import {codePhotoPlugin} from "/src/plugins/codeShowPhoto";
import {rehypeHeadingIds} from "@astrojs/markdown-remark";


// https://astro.build/config
export default defineConfig({
    output: 'server',
    adapter: vercel({
        webAnalytics: {enabled: true}
    }),

    site: "https://flomaster.chrsnv.ru",
    base: "/",

    vite: {
        define: {
            'import.meta.env.SUPABASE_URL': JSON.stringify(process.env.SUPABASE_URL),
            'import.meta.env.SUPABASE_SERVICE_ROLE_KEY': JSON.stringify(process.env.SUPABASE_SERVICE_ROLE_KEY),
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
                                label: "Интернет", autogenerate: {directory: "/chat-phrases/tech/internet"},
                            },
                            {
                                label: "Телевидение", autogenerate: {directory: "/chat-phrases/tech/television"},
                            },
                            {
                                label: "Домофония", autogenerate: {directory: "/chat-phrases/tech/intercom"},
                            },
                            {
                                label: "Видеонаблюдение", autogenerate: {directory: "/chat-phrases/tech/cctv"},
                            },
                            {
                                label: "Заявки и аварии", autogenerate: {directory: "/chat-phrases/tech/accidents"},
                            },
                        ],
                    },
                    {
                        label: "💸 Абон",
                        items: [
                            {
                                label: "Начисления", autogenerate: {directory: "/chat-phrases/abon"},
                            },
                        ]
                    },
                    {
                        label: "💭 Диалог",
                        items: [
                            {
                                label: "Общение с клиентом",
                                autogenerate: {directory: "/chat-phrases/dialog/communications"},
                            },
                            {
                                label: "Регламенты", autogenerate: {directory: "/chat-phrases/dialog/reglaments"},
                            },
                            {
                                label: "Правовая часть", autogenerate: {directory: "/chat-phrases/dialog/companylaw"},
                            },
                        ],
                    },
                    {
                        label: "🛒 Продажи",
                        items: [
                            {
                                label: "Роутеры", autogenerate: {directory: "/chat-phrases/sales/routers"},
                            },
                            {
                                label: "Приставки", autogenerate: {directory: "/chat-phrases/sales/decoders"},
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