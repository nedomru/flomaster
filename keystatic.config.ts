import { config, fields, collection, singleton } from '@keystatic/core';
import { wrapper, block } from '@keystatic/core/content-components';

const components = {
    "starlight.Tabs": wrapper({
        label: 'Список таб',
        schema: {}
    }),
    "starlight.TabItem": wrapper({
        label: 'Таба',
        schema: {
            label: fields.text({
                label: 'Название вкладки',
                validation: { length: { min: 1 } }
            }),
            icon: fields.text({
                label: 'Иконка'
            })
        }
    }),
    "starlight.Icon": wrapper({
        label: 'Иконка',
        schema: {
            name: fields.text({
                label: 'Название иконки',
                validation: { length: { min: 1 } }
            }),
            label: fields.text({
                label: 'Текст иконки',
                validation: { length: { min: 1 } },
            })
        }
    }),
    "starlight.LinkCard": wrapper({
        label: 'Карточка-ссылка',
        schema: {
            title: fields.text({
                label: 'Заголовок',
                validation: { length: { min: 1 } }
            }),
            href: fields.text({
                label: 'Ссылка',
                validation: { length: { min: 1 } }
            }),
            description: fields.text({
                label: 'Описание',
                validation: { length: { min: 1 } }
            }),
            target: fields.select({
                label: 'Открывать в',
                options: [
                    { label: 'В этом же окне', value: '_self' },
                    { label: 'В новом окне', value: '_blank' }
                ],
                defaultValue: '_self'
            })
        }
    }),
    "starlight.Aside": wrapper({
        label: 'Сноска',
        schema: {
            type: fields.select({
                label: 'Тип заметки',
                options: [
                    { label: 'Заметка (синяя)', value: 'note' },
                    { label: 'Подсказка (фиолетовая)', value: 'tip' },
                    { label: 'Предупреждение (жёлтая)', value: 'caution' },
                    { label: 'Опасность (красная)', value: 'danger' }
                ],
                defaultValue: 'note'
            }),
            title: fields.text({
                label: 'Заголовок',
                validation: { length: { min: 1 } },
                required: false
            }),
            content: fields.text({
                label: 'Содержимое',
                validation: { length: { min: 1 } },
                multiline: true
            })
        }
    }),
    "starlight.CardGrid": wrapper({
        label: 'Сетка карточек',
        schema: {
            stagger: fields.checkbox({
                label: 'Смещать карточки',
                defaultValue: false
            })
        }
    }),
    "starlight.Card": wrapper({
        label: 'Карточка',
        schema: {
            title: fields.text({
                label: 'Заголовок',
                validation: { length: { min: 1 } }
            }),
            icon: fields.text({
                label: 'Иконка',
                required: false
            }),
            content: fields.text({
                label: 'Содержимое',
                validation: { length: { min: 1 } },
                multiline: true
            })
        }
    }),
    "starlight.Steps": wrapper({
        label: 'Пошаговая инструкция',
        schema: {}
    }),
    "astroassets.Image": block({
        label: 'Картинка',
        schema: {
            src: fields.image({
                label: 'Картинка',
                directory: 'src/assets/images/pages',
                publicPath: '/src/assets/images/pages/',
                validation: {
                    isRequired: true
                }
            }),
            alt: fields.text({
                label: 'Альтернативный текст',
                validation: {
                    isRequired: true
                }
            }),
            width: fields.text({
                label: 'Ширина',
                defaultValue: '600',
                validation: {
                    isRequired: true
                }
            }),
            height: fields.text({
                label: 'Высота',
                defaultValue: '100',
                validation: {
                    isRequired: true
                }
            }),
            loading: fields.select({
                label: 'Загрузка',
                options: [
                    { label: 'Lazy', value: 'lazy' },
                    { label: 'Eager', value: 'eager' }
                ],
                defaultValue: 'lazy'
            }),
            decoding: fields.select({
                label: 'Декодирование',
                options: [
                    { label: 'Async', value: 'async' },
                    { label: 'Sync', value: 'sync' },
                    { label: 'Auto', value: 'auto' }
                ],
                defaultValue: 'async'
            })
        }
    })
};

const commonSchema = {
    title: fields.slug({ name: { label: 'Название' } }),
    sidebar: fields.object({
        order: fields.integer({
            label: 'Порядок',
            validation: {
                min: 0
            }
        }),
        hidden: fields.checkbox({
            label: 'Скрыть из меню',
            defaultValue: false
        }),
        attrs: fields.object({
            class: fields.text({
                label: 'Class',
                defaultValue: undefined
            }),
            id: fields.text({
                label: 'ID',
                defaultValue: undefined
            })
        }, {
            label: 'HTML атрибуты',
            description: 'Дополнительные HTML атрибуты',
            shouldRender: (value) => value?.class || value?.id
        })
    }, {
        label: 'Боковая панель'
    }),
    content: fields.mdx({
        label: 'Контент',
        components: components,
        options: {
            image: {
                directory: 'src/assets/images/images',

                publicPath: '@assets/images/'
            }
        }
    }),
};

// Helper function to create a collection with common configuration
const createCollection = (label, path) => ({
    label,
    slugField: 'title',
    path: `src/content/docs/chat-phrases/${path}/**`,
    entryLayout: 'content',
    format: { contentField: 'content' },
    schema: commonSchema,
});

export default config({
    ui: {
        brand: { name: 'Фломастер | Админка'},
        navigation: {
            "Технина": ['tech/internet', 'tech/setup', 'tech/television', 'tech/intercom', 'tech/cctv', 'tech/accidents'],
            "Диалог": ['dialog/communications', 'dialog/objectionworkbook', 'dialog/companylaw', 'dialog/reglaments'],
            "Продажи": ['sales/routers', 'sales/decoders', 'sales/camcorders'],
            "Внешние страницы": ["index"],
        },
    },
    locale: "ru-RU",

    storage: {
        kind: 'github',
        repo: 'AuthFailed/flomaster',
    },

    singletons: {
        index: singleton({
            label: 'Главная страница',
            path: 'src/content/docs/index',
            format: { contentField: 'content' },
            schema: {
                title: fields.text({
                    label: 'Заголовок',
                    validation: { length: { min: 1 } }
                }),
                template: fields.select({
                    label: 'Шаблон',
                    options: [
                        { label: 'Splash', value: 'splash' }
                    ],
                    defaultValue: 'splash'
                }),
                hero: fields.object({
                    tagline: fields.text({
                        label: 'Подзаголовок',
                        validation: { length: { min: 1 } }
                    }),
                    image: fields.object({
                        file: fields.text({
                            label: 'Путь к изображению',
                            validation: { length: { min: 1 } }
                        })
                    }, {
                        label: 'Изображение'
                    }),
                    actions: fields.array(
                        fields.object({
                            text: fields.text({
                                label: 'Текст кнопки',
                                validation: { length: { min: 1 } }
                            }),
                            link: fields.text({
                                label: 'Ссылка',
                                validation: { length: { min: 1 } }
                            }),
                            icon: fields.select({
                                label: 'Иконка',
                                options: [
                                    { label: 'Стрелка вправо', value: 'right-arrow' },
                                    { label: 'Ракета', value: 'rocket' },
                                    { label: 'Внешняя ссылка', value: 'external' }
                                ],
                                defaultValue: 'right-arrow'  // Added default value
                            }),
                            variant: fields.select({
                                label: 'Вариант',
                                options: [
                                    { label: 'По умолчанию', value: 'default' },
                                    { label: 'Минимальный', value: 'minimal' }
                                ],
                                defaultValue: 'default'
                            })
                        }),
                        {
                            label: 'Действия',
                            itemLabel: props => props.text
                        }
                    )
                }, {
                    label: 'Hero секция'
                }),
                prev: fields.checkbox({
                    label: 'Показывать кнопку "Назад"',
                    defaultValue: false
                }),
                next: fields.checkbox({
                    label: 'Показывать кнопку "Вперед"',
                    defaultValue: false
                }),
                content: fields.mdx({
                    label: 'Контент',
                    components: components
                })
            }
        })
    },
    collections: {
        'tech/internet': createCollection('Интернет', 'tech/internet'),
        'tech/setup': createCollection('Настройка оборудования', 'tech/setup'),
        'tech/television': createCollection('Телевидение', 'tech/television'),
        'tech/intercom': createCollection('Домофония', 'tech/intercom'),
        'tech/cctv': createCollection('Видеонаблюдение', 'tech/cctv'),
        'tech/accidents': createCollection('Заявки и аварии', 'tech/accidents'),
        'dialog/communications': createCollection('Общение с клиентом', 'dialog/communications'),
        'dialog/objectionworkbook': createCollection('Книга возражений', 'dialog/objectionworkbook'),
        'dialog/companylaw': createCollection('Правовая часть', 'dialog/companylaw'),
        'dialog/reglaments': createCollection('Регламенты', 'dialog/reglaments'),
        'sales/routers': createCollection('Роутеры', 'sales/routers'),
        'sales/decoders': createCollection('Декодеры', 'sales/decoders'),
        'sales/camcorders': createCollection('Камеры', 'sales/camcorders'),
    },
});