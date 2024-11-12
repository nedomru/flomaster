import { config, fields, collection } from '@keystatic/core';

export default config({
    storage: {
        kind: 'github',
        repo: 'AuthFailed/flomaster'
    },

    collections: {
        'tech/internet': collection({
            label: 'Технина - Интернет',
            slugField: 'title',
            path: 'src/content/docs/chat-phrases/tech/internet/**',
            entryLayout: 'content',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                content: fields.mdx({
                    label: 'Content',
                }),
            },
        }),
        'tech/setup': collection({
            label: 'Технина - Настройка оборудования',
            slugField: 'title',
            path: 'src/content/docs/chat-phrases/tech/setup/**',
            entryLayout: 'content',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                content: fields.mdx({
                    label: 'Content',
                }),
            },
        }),
        'tech/television': collection({
            label: 'Технина - Телевидение',
            slugField: 'title',
            path: 'src/content/docs/chat-phrases/tech/television/**',
            entryLayout: 'content',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                content: fields.mdx({
                    label: 'Content',
                }),
            },
        }),
        'tech/intercom': collection({
            label: 'Технина - Домофония',
            slugField: 'title',
            path: 'src/content/docs/chat-phrases/tech/intercom/**',
            entryLayout: 'content',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                content: fields.mdx({
                    label: 'Content',
                }),
            },
        }),
        'tech/cctv': collection({
            label: 'Технина - Видеонаблюдение',
            slugField: 'title',
            path: 'src/content/docs/chat-phrases/tech/cctv/**',
            entryLayout: 'content',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Название' } }),
                content: fields.mdx({
                    label: 'Content',
                }),
            },
        }),
        'tech/incidents': collection({
            label: 'Технина - Заявки и аварии',
            slugField: 'title',
            path: 'src/content/docs/chat-phrases/tech/accidents/**',
            entryLayout: 'content',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Название' } }),
                content: fields.mdx({
                    label: 'Content',
                }),
            },
        }),
        dialog: collection({
            label: 'Диалог',
            slugField: 'title',
            path: 'src/content/docs/chat-phrases/dialog/**',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                content: fields.mdx({
                    label: 'Content',
                }),
            },
        },),
        sales: collection({
            label: 'Продажи',
            slugField: 'title',
            path: 'src/content/docs/chat-phrases/sales/**',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                content: fields.mdx({
                    label: 'Content',
                }),
            },
        },),
    },
});