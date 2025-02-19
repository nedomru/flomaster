import {defineConfig} from "astro/config";
import starlight from "@astrojs/starlight";
import starlightUtils from "@lorenzo_lewis/starlight-utils";
import starlightCoolerCredit from 'starlight-cooler-credit'


import {clickToCopyPlugin} from '/src/plugins/copyCodeBlock';
import {rehypeHeadingIds} from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import starlightDocSearch from "@astrojs/starlight-docsearch";

// https://astro.build/config
export default defineConfig({
    output: 'static',
    site: "https://flomaster.chrsnv.ru",
    base: "/",

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
                            'data-website-id': 'e8ff0de4-de47-420c-8b71-d8ef93efde62'
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
                pagination: false,
                social: {
                    github: "https://github.com/AuthFailed/flomaster/",
                    telegram: "https://t.me/+jH1mblw0ytcwOWUy",
                },
                pagefind: false,
                sidebar: [
                    {
                        label: "🛠️ Технина",
                        items: [
                            {
                                label: "🌐 Интернет",
                                autogenerate: {directory: "/phrases/tech/internet"},
                            },
                            {
                                label: "📺 Телевидение",
                                autogenerate: {directory: "/phrases/tech/television"}
                            },
                            {
                                label: "📟 Домофония",
                                autogenerate: {directory: "/phrases/tech/intercom"}
                            },
                            {
                                label: "📼 Видеонаблюдение",
                                autogenerate: {directory: "/phrases/tech/cctv"}
                            },
                            {
                                label: "🔧 Настройка оборудки",
                                autogenerate: {directory: "/phrases/tech/setup"}
                            },
                            {
                                label: "📝 Заявки, задачи, аварии",
                                autogenerate: {directory: "/phrases/tech/accidents"}
                            },
                        ],
                    },
                    {
                        label: "💭 Диалог",
                        items: [
                            {
                                label: "🗣️ Общение с клиентом",
                                autogenerate: {directory: "/phrases/dialog/communications"}
                            },
                            {
                                label: "😡 Книга возражений",
                                autogenerate: {directory: "/phrases/dialog/objectionworkbook"}
                            },
                            {
                                label: "📚 Регламенты",
                                autogenerate: {directory: "/phrases/dialog/reglaments"}
                            },
                        ],
                    },
                    {
                        label: "🛒 Продажи",
                        items: [
                            {
                                label: "🗣️ Диалог",
                                autogenerate: {directory: "/phrases/sales/dialog"}
                            },
                            {
                                label: "💳 Платная помощь",
                                autogenerate: {directory: "/phrases/sales/paid-help"}
                            },
                            {
                                label: "🚀 Продажа услуг",
                                autogenerate: {directory: "/phrases/sales/service"}
                            },
                            {
                                label: "📡 Продажа роутеров",
                                autogenerate: {directory: "/phrases/sales/routers"},
                                badge: {
                                    variant: "success",
                                    text: "Акт 19.02"
                                }
                            },
                            {
                                label: "📺 Продажа декодеров",
                                autogenerate: {directory: "/phrases/sales/decoders"},
                                badge: {
                                    variant: "success",
                                    text: "Акт 19.02"
                                }
                            },
                            {
                                label: "🎥 Продажа камер",
                                autogenerate: {directory: "/phrases/sales/camcorders"},
                                badge: {
                                    variant: "success",
                                    text: "Акт 19.02"
                                }
                            },
                        ],
                    },
                ],
                plugins: [
                    starlightCoolerCredit({
                        credit: {
                            title: "Предложить РМ",
                            href: "https://t.me/roman_domru",
                            description: "Здесь ты можешь предложить изменения"
                        },
                        showImage: false
                    }),
                    starlightUtils({
                        multiSidebar: {
                            switcherStyle: "horizontalList",
                        },
                    }),
                    starlightDocSearch({
                        clientOptionsModule: './src/config/docsearch.ts',
                      }),
                ],
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
                        borderRadius: '0.8rem',
                        frames: {
                            shadowColor: '#124',
                        },
                    },
                    defaultProps: {
                        wrap: true,
                    },
                }
            }),
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
