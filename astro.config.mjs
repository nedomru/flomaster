import {defineConfig} from "astro/config";
import starlight from "@astrojs/starlight";
import node from "@astrojs/node";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from '@keystatic/astro'
import tailwind from "@astrojs/tailwind";
import starlightUtils from "@lorenzo_lewis/starlight-utils";
import starlightDocSearch from '@astrojs/starlight-docsearch';


import {clickToCopyPlugin} from '/src/plugins/copyCodeBlock';
import {rehypeHeadingIds} from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import AutoImport from "astro-auto-import";

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
                head: [
                    {
                        tag: 'script',
                        attrs: {
                            defer: true,
                            src: 'https://webstats.chrsnv.ru/script.js',
                            'data-website-id': '82c6bc5e-64b3-4d04-bfa6-ade9e2f2e38b'
                        },
                    },
                ],
                logo: {
                    src: "/src/assets/flomaster.png",
                },
                locales: {
                    root: {
                        label: "Русский",
                        lang: "ru",
                    },
                },
                customCss: ["/src/styles/custom.css", "/src/styles/headings.css"],
                tableOfContents: {
                    maxHeadingLevel: 6
                },
                social: {
                    github: "https://github.com/AuthFailed/flomaster/",
                    telegram: "https://t.me/+jH1mblw0ytcwOWUy",
                    openCollective: "https://planer.chrsnv.ru/spaces/issues/5e583276999e4698a27d703f8b7bfea0"
                },
                lastUpdated: true,
                sidebar: [
                    {
                        label: "🛠️ Технина",
                        items: [
                            {
                                label: "Интернет",
                                autogenerate: {directory: "/phrases/tech/internet"}
                            },
                            {
                                label: "Настройка оборудования",
                                autogenerate: {directory: "/phrases/tech/setup"}
                            },
                            {
                                label: "Телевидение",
                                autogenerate: {directory: "/phrases/tech/television"}
                            },
                            {
                                label: "Домофония",
                                autogenerate: {directory: "/phrases/tech/intercom"}
                            },
                            {
                                label: "Видеонаблюдение",
                                autogenerate: {directory: "/phrases/tech/cctv"}
                            },
                            {
                                label: "Заявки и аварии",
                                autogenerate: {directory: "/phrases/tech/accidents"}
                            },
                        ],
                    },
                    {
                        label: "💭 Диалог",
                        items: [
                            {
                                label: "Общение с клиентом",
                                autogenerate: {directory: "/phrases/dialog/communications"}
                            },
                            {
                                label: "Книга возражений",
                                autogenerate: {directory: "/phrases/dialog/objectionworkbook"}
                            },
                            {
                                label: "Регламенты",
                                autogenerate: {directory: "/phrases/dialog/reglaments"}
                            },
                            {
                                label: "Правовая часть",
                                autogenerate: {directory: "/phrases/dialog/companylaw"}
                            },
                        ],
                    },
                    {
                        label: "🛒 Продажи",
                        items: [
                            {
                                label: "Платная помощь",
                                autogenerate: {directory: "/phrases/sales/paid-help"}
                            },
                            {
                                label: "Продажа роутеров",
                                autogenerate: {directory: "/phrases/sales/routers"}
                            },
                            {
                                label: "Продажа приставок",
                                autogenerate: {directory: "/phrases/sales/decoders"}
                            },
                            {
                                label: "Продажа камер",
                                autogenerate: {directory: "/phrases/sales/camcorders"}
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
                        apiKey: "26993d897f7166569aaa44ad941e0475",
                        indexName: 'flomaster-chrsnv',
                        insights: true
                    }),],
                expressiveCode: {
                    plugins: [
                        clickToCopyPlugin(),
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
                    defaultProps: {
                        wrap: true,
                    },
                }
            }),
        AutoImport({
            imports: [{
                '@astrojs/starlight/components': 'starlight',
                'astro:assets': 'astroassets'
            }]
        }),
        react(),
        tailwind(),
        markdoc(),
        keystatic()],

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
