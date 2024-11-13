import { config, fields, collection } from '@keystatic/core';
import { wrapper } from '@keystatic/core/content-components';

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
        badge: fields.object({
            text: fields.text({
                label: 'Текст значка'
            }),
            variant: fields.select({
                label: 'Тип значка',
                options: [
                    { label: 'По умолчанию', value: 'default' },
                    { label: 'Подсказка', value: 'tip' },
                    { label: 'Замечание', value: 'note' },
                    { label: 'Предупреждение', value: 'caution' },
                    { label: 'Ошибка', value: 'danger' },
                    { label: 'Успех', value: 'success' }
                ],
                defaultValue: 'default'
            })
        }, {
            label: 'Значок',
            description: 'Оставьте пустым, если значок не нужен',
        }),
        attrs: fields.object({
            class: fields.text({
                label: 'Class'
            }),
            id: fields.text({
                label: 'ID'
            })
        }, {
            label: 'HTML атрибуты',
            description: 'Дополнительные HTML атрибуты',
        })
    }),
    content: fields.mdx({
        label: 'Контент',
        components: components
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
            "Диалог": ['dialog/communications', 'dialog/companylaw', 'dialog/reglaments'],
            "Продажи": ['sales/routers', 'sales/decoders', 'sales/camcorders']
        }
    },

    storage: {
        kind: 'local',
        repo: 'AuthFailed/flomaster'
    },

    collections: {
        'tech/internet': createCollection('Интернет', 'tech/internet'),
        'tech/setup': createCollection('Настройка оборудования', 'tech/setup'),
        'tech/television': createCollection('Телевидение', 'tech/television'),
        'tech/intercom': createCollection('Домофония', 'tech/intercom'),
        'tech/cctv': createCollection('Видеонаблюдение', 'tech/cctv'),
        'tech/accidents': createCollection('Заявки и аварии', 'tech/accidents'),
        'dialog/communications': createCollection('Общение с клиентом', 'dialog/communications'),
        'dialog/companylaw': createCollection('Правовая часть', 'dialog/companylaw'),
        'dialog/reglaments': createCollection('Регламенты', 'dialog/reglaments'),
        'sales/routers': createCollection('Роутеры', 'sales/routers'),
        'sales/decoders': createCollection('Декодеры', 'sales/decoders'),
        'sales/camcorders': createCollection('Камеры', 'sales/camcorders'),
    },
});