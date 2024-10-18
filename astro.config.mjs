import {defineConfig, envField} from "astro/config";
import starlight from "@astrojs/starlight";
import vercel from '@astrojs/vercel/serverless';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";


import {reportErrorPlugin} from './src/plugins/reportError';
import {clickToCopyPlugin} from './src/plugins/copyCodeBlock';
import {rehypeHeadingIds} from "@astrojs/markdown-remark";


// https://astro.build/config
export default defineConfig({
    output: 'server',
    adapter: vercel({
        webAnalytics: {enabled: true}
    }),
    experimental: {
        serverIslands: true,
        env: {
            schema: {
                HYPERPING_STATUS_PAGE_URL: envField.string({context: 'server', access: 'secret'}),
            },
        },
    },

    site: "https://flomaster.chrsnv.ru",
    base: "/",

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
                components: {
                    Header: '/src/overrides/CustomHeader.astro',
                    SocialIcons: './src/overrides/SocialIcons.astro',
                },
                social: {
                    github: "https://github.com/AuthFailed/flomaster/",
                    telegram: "https://t.me/+jH1mblw0ytcwOWUy",
                },
                lastUpdated: true,
                sidebar: [
                    {
                        label: "🏠 Главная",
                        link: "/",
                    },
                    {label: "🤔Что это такое?", link: "/chat-phrases"},
                    {
                        label: "🛠️Технические вопросы",
                        items: [
                            {slug: "chat-phrases/tech/internet"},
                            {slug: "chat-phrases/tech/television"},
                            {slug: "chat-phrases/tech/intercom"},
                            {slug: "chat-phrases/tech/applications"},
                        ],
                    },
                    {
                        label: "💸 Абонентские вопросы",
                        items: [
                            {slug: "chat-phrases/abon/money"},
                            {slug: "chat-phrases/abon/promotions"},
                            {slug: "chat-phrases/abon/tariffs"},
                        ],
                    },
                    {
                        label: "💭 Диалог",
                        items: [
                            {slug: "chat-phrases/dialog/greetings"},
                            {slug: "chat-phrases/dialog/parting"},
                            {slug: "chat-phrases/dialog/selfservice"},
                            {slug: "chat-phrases/dialog/legal"},
                            {slug: "chat-phrases/dialog/negative"},
                        ],
                    },
                    {
                        label: "🛒 Продажи",
                        items: [
                            {slug: "chat-phrases/sales/routers"},
                            {slug: "chat-phrases/sales/decoders"},
                        ],
                    },
                ],
                editLink: {
                    baseUrl: "https://github.com/authfailed/flomaster/edit/main/",
                },
                plugins: [],
                expressiveCode: {
                    plugins: [
                        reportErrorPlugin(),
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