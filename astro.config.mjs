import {defineConfig} from "astro/config";
import starlight from "@astrojs/starlight";
import vercel from '@astrojs/vercel/serverless';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";


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
                        label: "🏠 Главная",
                        link: "/",
                    },
                    {label: "🤔Что это такое?", link: "/chat-phrases"},
                    {
                        label: "🛠️Технические вопросы",
                        items: [
                            {
                                label: "Интернет", items:
                                    [
                                        {slug: "chat-phrases/tech/internet/internet-base"},
                                        {slug: "chat-phrases/tech/internet/internet-setup"},
                                        {slug: "chat-phrases/tech/internet/internet-cmd"}
                                    ]
                            },
                            {slug: "chat-phrases/tech/television"},
                            {slug: "chat-phrases/tech/intercom"},
                            {slug: "chat-phrases/tech/applications"},
                            {slug: "chat-phrases/tech/accidents"},
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
                            {slug: "chat-phrases/dialog/fastchat"},
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