import type {ExpressiveCodePlugin} from 'astro-expressive-code';
import {h} from '@expressive-code/core/hast';

export function clickToCopyPlugin(): ExpressiveCodePlugin {
    return {
        name: 'Click to Copy',
        baseStyles: `
            .ec-code-block {
                position: relative;
            }
            .ec-code-block pre {
                cursor: crosshair;
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
                opacity: 0;
                transition: opacity 0.3s;
                font-size: 90%;
                pointer-events: none;
            }
            .ec-code-block:hover .ec-copy-button {
                opacity: 1;
            }
        `,

        hooks: {
            postprocessRenderedBlock: ({codeBlock, renderData}) => {
                const copyScript = `
                    (function() {
                        const container = document.currentScript.parentElement;
                        const preElement = container.querySelector('pre');
                        const copyButton = container.querySelector('.ec-copy-button');
                        
                        function copyToClipboard(text, isFullBlock) {
                            navigator.clipboard.writeText(text).then(() => {
                                const originalText = copyButton.textContent;
                                copyButton.textContent = isFullBlock ? 'Скопировал полностью' : 'Скопировал часть';
                                copyButton.style.opacity = '1';
                                setTimeout(() => {
                                    copyButton.textContent = originalText;
                                    if (!preElement.matches(':hover')) {
                                        copyButton.style.opacity = '0';
                                    }
                                }, 2000);
                            }).catch(err => {
                                console.error('Failed to copy: ', err);
                            });
                        }
                        
                        preElement.addEventListener('click', (event) => {
                            const selectedText = window.getSelection().toString();
                            if (selectedText) {
                                copyToClipboard(selectedText, false);
                            } else {
                                copyToClipboard(${JSON.stringify(codeBlock.code)}, true);
                            }
                        });

                        preElement.addEventListener('mouseover', () => {
                            copyButton.style.opacity = '1';
                        });

                        preElement.addEventListener('mouseout', () => {
                            if (copyButton.textContent === 'Нажми чтобы скопировать') {
                                copyButton.style.opacity = '0';
                            }
                        });

                        // Prevent text selection when double-clicking
                        preElement.addEventListener('mousedown', (e) => {
                            if (e.detail > 1) { // Check for double-click
                                e.preventDefault();
                            }
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