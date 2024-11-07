import {defineCollection, z} from 'astro:content'
import {docsSchema, i18nSchema} from '@astrojs/starlight/schema';
import { docSearchI18nSchema } from '@astrojs/starlight-docsearch/schema';

export const collections = {
	docs: defineCollection({
		schema: docsSchema({
			extend: z.object({
				banner: z.object({content: z.string()}).default({
					content: 'Инструмент находится в <a href="https://github.com/AuthFailed/chat-flomaster">активной разработке</a>. Не использовать в работе!',
				}),
			}),
		})
	}),
	i18n: defineCollection({type: 'data', schema: i18nSchema({ extend: docSearchI18nSchema() })}),
};
