import { config, fields, collection } from '@keystatic/core';
import { wrapper } from '@keystatic/core/content-components';

// Define components
const components = {
    Tabs: wrapper({
        label: 'Список таб',
        schema: {}
    }),
    TabItem: wrapper({
        label: 'Таба',
        schema: {
            label: fields.text({
                label: 'Название вкладки',
                validation: { length: { min: 1 } }
            })
        }
    }),
    Icon: wrapper({
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
            layout: [6, 6]
        }),
        attrs: fields.object({
            target: fields.text({
                label: 'Target'
            }),
            class: fields.text({
                label: 'Class'
            }),
            id: fields.text({
                label: 'ID'
            })
        }, {
            label: 'HTML атрибуты',
            layout: [4, 4, 4]
        })
    }, {
        label: 'Настройки боковой панели',
        layout: [12, 6, 6, 12, 12]
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
        kind: 'github',
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