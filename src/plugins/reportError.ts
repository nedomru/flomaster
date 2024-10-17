import type {ExpressiveCodePlugin} from 'astro-expressive-code';
import {h} from '@expressive-code/core/hast'

export function reportErrorPlugin(): ExpressiveCodePlugin {
    return {
        name: 'Сообщить об ошибке',
        baseStyles: `
      .actions {
        display: flex;
        font-size: var(--sl-text-xs);
        justify-content: flex-end;
        padding-inline: 0.5em;

        & a {
          color: var(--sl-color-gray-3);
        }
      }
    `,
        hooks: {
            postprocessRenderedBlock: ({codeBlock, renderData}) => {
                const url = new URL(`https://github.com/AuthFailed/chat-flomaster/issues/new`);
                url.searchParams.set('title', 'Ошибка в речевом модуле');
                url.searchParams.set(
                    'body',
                    `В текущем речевом модуле есть ошибка:

\`\`\`${codeBlock.language}
${codeBlock.code}
\`\`\`

Информация об ошибке:
`
                );

                renderData.blockAst = h('div', [
                    renderData.blockAst,
                    h(
                        'div',
                        {class: 'actions'},
                        h('a', {href: url.toString()}, 'Сообщить об ошибке')
                    ),
                ]);
            },
        },
    };
}