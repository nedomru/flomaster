import {defineConfig} from "astro/config";
import starlight from "@astrojs/starlight";
import starlightUtils from "@lorenzo_lewis/starlight-utils";
import starlightCoolerCredit from "starlight-cooler-credit";

import {clickToCopyPlugin} from '/src/plugins/copyCodeBlock';
import {rehypeHeadingIds} from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import starlightDocSearch from "@astrojs/starlight-docsearch";
import starlightThemeRapide from 'starlight-theme-rapide'
import starlightScrollToTop from "starlight-scroll-to-top";
import starlightLlmsTxt from 'starlight-llms-txt'


// https://astro.build/config
export default defineConfig({
    output: 'static', site: "https://flomaster.chrsnv.ru", base: "/",

    integrations: [starlight({
        title: "Фломастер", head: [{
            tag: 'script', attrs: {
                defer: true,
                src: 'https://webstats.chrsnv.ru/script.js',
                'data-website-id': 'e8ff0de4-de47-420c-8b71-d8ef93efde62'
            },
        },], logo: {
            src: "/src/assets/flomaster.png",
        }, locales: {
            root: {
                label: "Русский", lang: "ru",
            },
        }, customCss: ["/src/styles/custom.css", "/src/styles/headings.css"], tableOfContents: {
            maxHeadingLevel: 6
        }, pagination: false, social: [{
            icon: "github", label: "Github", href: "https://github.com/AuthFailed/flomaster/"
        }, {
            icon: "telegram", label: "Telegram", href: "https://t.me/+jH1mblw0ytcwOWUy",
        }], pagefind: false, sidebar: [{
            label: "🛠️", items: [{
                label: "🌐 Интернет", autogenerate: {directory: "/phrases/tech/internet"},
            }, {
                label: "📺 Телевидение", autogenerate: {directory: "/phrases/tech/television"}
            }, {
                label: "📟 Домофония", autogenerate: {directory: "/phrases/tech/intercom"}
            }, {
                label: "📼 Видеонаблюдение", autogenerate: {directory: "/phrases/tech/cctv"}
            }, {
                label: "🔧 Настройка оборудки", autogenerate: {directory: "/phrases/tech/setup"}
            }, {
                label: "📝 Заявки, задачи, аварии", autogenerate: {directory: "/phrases/tech/accidents"}
            },],
        }, {
            label: "💭", items: [{
                label: "🗣️ Общение с клиентом", autogenerate: {directory: "/phrases/dialog/communications"}
            }, {
                label: "😡 Книга возражений", autogenerate: {directory: "/phrases/dialog/objectionworkbook"}
            }, {
                label: "📚 Регламенты", autogenerate: {directory: "/phrases/dialog/reglaments"}
            },],
        }, {
            label: "🛒", items: [{
                label: "🗣️ Диалог", autogenerate: {directory: "/phrases/sales/dialog"}
            }, {
                label: "🚀 Продажа услуг/сервиса", autogenerate: {directory: "/phrases/sales/service"}, badge: {
                    variant: "success", text: "Акт 05.05"
                }
            }, {
                label: "📡 Продажа роутеров", autogenerate: {directory: "/phrases/sales/routers"}, badge: {
                    variant: "success", text: "Акт 05.05"
                }
            }, {
                label: "📺 Продажа декодеров", autogenerate: {directory: "/phrases/sales/decoders"}, badge: {
                    variant: "success", text: "Акт 05.05"
                }
            }, {
                label: "🎥 Продажа камер", autogenerate: {directory: "/phrases/sales/camcorders"}, badge: {
                    variant: "success", text: "Акт 05.05"
                }
            },],
        },], plugins: [starlightLlmsTxt({
            projectName: "Фломастер",
            description: "База речевых модулей для операторов онлайн контакт-центра. Речевые модули предназначены для использования в рамках чата с клиентом в специализированной программе.",
            details: "Проект Фломастер — это незаменимый инструмент для операторов онлайн-контакт-центров, предлагающий структурированную базу речевых модулей (РМ). Эти модули разработаны для эффективного общения с клиентами в чате через специализированное программное обеспечение. Суть \"Фломастера\" заключается в его способности обеспечить быстрый и удобный поиск наиболее подходящего речевого модуля для любой ситуации взаимодействия с клиентом. Все модули представлены внутри тегов code, что обеспечивает их лёгкую интеграцию в ответы в чате. Проект организован с чёткой файловой структурой для упрощения управления и извлечения модулей. Пути, определённые в customSets (например, tech/**, dialog/**, sales/**), указывают на структуру каталогов, где хранятся эти конкретные типы речевых модулей. Например, технические речевые модули (tech/**) расположены в папке с названием tech и её подкаталогах, где содержится контент, связанный с диагностикой и устранением неполадок. Аналогично, dialog/** указывает на каталог dialog для элементов диалога и выдержек из регламентов, в то время как sales/** относится к каталогу sales для информации о характеристиках продуктов, ценах и контенте, связанном с продажами. Такая иерархическая организация гарантирует, что операторы могут быстро перейти к нужной категории речевых модулей, оптимизируя свой рабочий процесс и сокращая время ответа.",
            customSets: [
                {
                    label: 'Технические РМы',
                    description: 'Речевые модули, предназначенные для проведения диагностики и решения технических проблем',
                    paths: ['phrases/tech/**'],
                },
                {
                    label: 'Диалоговые РМы',
                    description: 'Речевые модули, предназначенные для ведения диалога с клиентом, содержащие вырезки из регламентов и другие полезные моменты',
                    paths: ['phrases/dialog/**'],
                },
                {
                    label: 'Продажные РМы',
                    description: 'Речевые модули, предназначенные для информирования и продажи оборудования клиентам, содержащие характеристики и стоимости',
                    paths: ['phrases/sales/**'],
                },
            ],
            exclude: ["404", "index", "phrases/index"]
        }), starlightScrollToTop(), starlightThemeRapide(), starlightCoolerCredit({
            credit: {
                title: "Предложить РМ",
                href: "https://t.me/roman_domru",
                description: "Здесь ты можешь предложить изменения"
            }, showImage: false
        }), starlightUtils({
            multiSidebar: {
                switcherStyle: "horizontalList",
            },
        }), starlightDocSearch({
            clientOptionsModule: './src/config/docsearch.ts',
        }),], expressiveCode: {
            plugins: [clickToCopyPlugin(), {
                name: 'Hide copy button', baseStyles: `
                      .expressive-code .copy button {
                        display: none;
                      }
                    `,
            },

            ], styleOverrides: {
                borderRadius: '0.8rem', frames: {
                    shadowColor: '#124',
                },
            }, defaultProps: {
                wrap: true,
            },
        }
    }),],

    markdown: {
        rehypePlugins: [rehypeHeadingIds, [rehypeAutolinkHeadings, {
            // Wrap the heading text in a link.
            behavior: 'wrap',
        },],],
    },

});
