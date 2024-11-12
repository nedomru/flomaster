import { config, fields, collection } from '@keystatic/core';

export default config({
    storage: {
        kind: 'github',
        repo: 'AuthFailed/flomaster'
    },

    collections: {
        'tech/internet': collection({
            label: 'Технина/Интернет',
            slugField: 'title',
            path: 'src/content/docs/chat-phrases/tech/internet/**',
            entryLayout: 'content',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                content: fields.mdx({
                    label: 'Контент',
                }),
            },
        }),
        'tech/setup': collection({
            label: 'Технина/Настройка оборудования',
            slugField: 'title',
            path: 'src/content/docs/chat-phrases/tech/setup/**',
            entryLayout: 'content',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                content: fields.mdx({
                    label: 'Контент',
                }),
            },
        }),
        'tech/television': collection({
            label: 'Технина/Телевидение',
            slugField: 'title',
            path: 'src/content/docs/chat-phrases/tech/television/**',
            entryLayout: 'content',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                content: fields.mdx({
                    label: 'Контент',
                }),
            },
        }),
        'tech/intercom': collection({
            label: 'Технина/Домофония',
            slugField: 'title',
            path: 'src/content/docs/chat-phrases/tech/intercom/**',
            entryLayout: 'content',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                content: fields.mdx({
                    label: 'Контент',
                }),
            },
        }),
        'tech/cctv': collection({
            label: 'Технина/Видеонаблюдение',
            slugField: 'title',
            path: 'src/content/docs/chat-phrases/tech/cctv/**',
            entryLayout: 'content',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Название' } }),
                content: fields.mdx({
                    label: 'Контент',
                }),
            },
        }),
        'tech/accidents': collection({
            label: 'Технина/Заявки и аварии',
            slugField: 'title',
            path: 'src/content/docs/chat-phrases/tech/accidents/**',
            entryLayout: 'content',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Название' } }),
                content: fields.mdx({
                    label: 'Контент',
                }),
            },
        }),
        'dialog/communications': collection({
            label: 'Диалог/Общение с клиентом',
            slugField: 'title',
            path: 'src/content/docs/chat-phrases/dialog/communications/**',
            entryLayout: 'content',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Название' } }),
                content: fields.mdx({
                    label: 'Контент',
                }),
            },
        }),
        'dialog/companylaw': collection({
            label: 'Диалог/Правовая часть',
            slugField: 'title',
            path: 'src/content/docs/chat-phrases/dialog/companylaw/**',
            entryLayout: 'content',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Название' } }),
                content: fields.mdx({
                    label: 'Контент',
                }),
            },
        }),
        'dialog/reglaments': collection({
            label: 'Диалог/Регламенты',
            slugField: 'title',
            path: 'src/content/docs/chat-phrases/dialog/reglaments/**',
            entryLayout: 'content',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Название' } }),
                content: fields.mdx({
                    label: 'Контент',
                }),
            },
        }),
        'sales/routers': collection({
            label: 'Продажи/Роутеры',
            slugField: 'title',
            path: 'src/content/docs/chat-phrases/sales/routers/**',
            entryLayout: 'content',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Название' } }),
                content: fields.mdx({
                    label: 'Контент',
                }),
            },
        }),
        'sales/decoders': collection({
            label: 'Продажи/Декодеры',
            slugField: 'title',
            path: 'src/content/docs/chat-phrases/sales/decoders/**',
            entryLayout: 'content',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Название' } }),
                content: fields.mdx({
                    label: 'Контент',
                }),
            },
        }),
        'sales/camcorders': collection({
            label: 'Продажи/Камеры',
            slugField: 'title',
            path: 'src/content/docs/chat-phrases/sales/camcorders/**',
            entryLayout: 'content',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Название' } }),
                content: fields.mdx({
                    label: 'Контент',
                }),
            },
        }),
    },
});