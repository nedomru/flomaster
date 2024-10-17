import type {ExpressiveCodePlugin} from 'astro-expressive-code';
import {h} from '@expressive-code/core/hast';

export function clickToCopyPlugin(): ExpressiveCodePlugin {
    return {
        name: 'Click to Copy',
        baseStyles: `
            .ec-code-block {
                position: relative;
                cursor: pointer;
            }
            .ec-copy-button {
                position: absolute;
                top: 0.5em;
                right: 0.5em;
                background-color: #0073aa;
                color: white;
                border: none;
                border-radius: 0.25em;
                padding: 0.25em 0.5em;
                cursor: pointer;
                opacity: 0;
                transition: opacity 0.3s;
                font-size: 90%;
            }
            .ec-code-block:hover .ec-copy-button {
                opacity: 1;
            }
            .ec-copy-button:hover {
                background-color: rgba(0, 0, 0, 0.9);
            }
        `,
        
        hooks: {
            postprocessRenderedBlock: ({codeBlock, renderData}) => {
                const copyScript = `
                    (function() {
                        const container = document.currentScript.parentElement;
                        const copyButton = container.querySelector('.ec-copy-button');
                        
                        function copyToClipboard(text, isFullBlock) {
                            navigator.clipboard.writeText(text).then(() => {
                                const originalText = copyButton.textContent;
                                copyButton.textContent = isFullBlock ? 'Скопировал полностью' : 'Скопировал часть';
                                setTimeout(() => {
                                    copyButton.textContent = originalText;
                                }, 2000);
                            }).catch(err => {
                                console.error('Failed to copy: ', err);
                            });
                        }
                        
                        container.addEventListener('click', (event) => {
                            if (event.target === copyButton || event.target.closest('.actions')) {
                                return;
                            }
                            
                            event.preventDefault();
                            const selectedText = window.getSelection().toString();
                            if (selectedText) {
                                copyToClipboard(selectedText, false);
                            } else {
                                copyToClipboard(${JSON.stringify(codeBlock.code)}, true);
                            }
                        });

                        copyButton.addEventListener('click', (event) => {
                            event.preventDefault();
                            copyToClipboard(${JSON.stringify(codeBlock.code)}, true);
                        });
                    })();
                `;

                renderData.blockAst = h('div', {class: 'ec-code-block'}, [
                    renderData.blockAst,
                    h('button', {class: 'ec-copy-button'}, 'Нажми чтобы скопировать'),
                    h('script', copyScript)
                ]);
            },
        },
    };
}