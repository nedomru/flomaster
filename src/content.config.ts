import {defineCollection, z} from 'astro:content'
import {docsSchema, i18nSchema} from '@astrojs/starlight/schema';
import { docsLoader } from "@astrojs/starlight/loaders";
import { docSearchI18nSchema } from '@astrojs/starlight-docsearch/schema';

export const collections = {
	docs: defineCollection({ loader: docsLoader(), schema: docsSchema({extend: z.object({
				banner: z.object({ content: z.string() }).default({
					content: "Чатик только для классных спецов <a href='https://t.me/+2vVZ0vXJiWFkOWZi'>тута</a>",
				}),
			}),}
		) }),
	i18n: defineCollection({type: 'data', schema: i18nSchema({ extend: docSearchI18nSchema() })}),
};
