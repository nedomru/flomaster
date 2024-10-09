import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";


// https://astro.build/config
export default defineConfig({
  site: "https://flomaster.chrsnv.ru",
  base: "/",

  integrations: [
    starlight({
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
      customCss: ["/src/styles/custom.css"],
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
        { label: "🤔Что это такое?", link: "/chat-phrases" },
        {
          label: "🛠️Технические вопросы",
          autogenerate: { directory: "chat-phrases/tech" },
        },
        {
          label: "💸 Абонентские вопросы",
          autogenerate: { directory: "chat-phrases/abon" },
        },
        {
          label: "💭 Отработка диалога",
          autogenerate: { directory: "chat-phrases/dialog" },
        },
        {
          label: "🛒 Продажи",
          autogenerate: { directory: "chat-phrases/sales" },
        },
      ],
      editLink: {
        baseUrl: "https://github.com/authfailed/flomaster/edit/main/",
      },
    }),
  ],
});
