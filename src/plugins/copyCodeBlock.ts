import type {ExpressiveCodePlugin} from 'astro-expressive-code';
import {h} from '@expressive-code/core/hast';

export function clickToCopyPlugin(): ExpressiveCodePlugin {
    return {
        name: 'Click to Copy',
        baseStyles: `
      .ec-code-block {
        cursor: pointer;
        transition: border-color 0.3s ease, background-color 0.3s ease;
        position: relative;
      }
      .ec-code-block:hover {
        background-color: var(--sl-color-gray-7);
      }
      .ec-copy-message {
        position: absolute;
        top: 0.5em;
        right: 0.5em;
        background-color: var(--sl-color-accent);
        color: var(--sl-color-white);
        padding: 0.25em 0.5em;
        border-radius: 0.25em;
        font-size: var(--sl-text-sm);
        opacity: 0;
        transition: opacity 0.3s ease;
      }
    `,
        hooks: {
            postprocessRenderedBlock: ({codeBlock, renderData}) => {
                const copyScript = `
                    (function() {
                        const container = document.currentScript.parentElement;
                        const copyMessage = container.querySelector('.ec-copy-message');
                        const originalBorderColor = getComputedStyle(container).borderColor;
                        const originalBackgroundColor = getComputedStyle(container).backgroundColor;
                        
                        function copyToClipboard(text) {
                            navigator.clipboard.writeText(text).then(() => {
                                container.style.borderColor = '#4CAF50'; // Green color
                                copyMessage.style.opacity = '1';
                                
                                setTimeout(() => {
                                    container.style.borderColor = originalBorderColor;
                                    copyMessage.style.opacity = '0';
                                }, 1500);
                            }).catch(err => {
                                console.error('Failed to copy: ', err);
                            });
                        }
                        
                        container.addEventListener('click', (event) => {
                            // Prevent copying when clicking on the report error button
                            if (event.target.closest('.actions')) {
                                return;
                            }
                            
                            event.preventDefault();
                            const selectedText = window.getSelection().toString();
                            const textToCopy = selectedText || ${JSON.stringify(codeBlock.code)};
                            copyToClipboard(textToCopy);
                        });
                        
                        // Hover effect
                        container.addEventListener('mouseover', () => {
                            container.style.backgroundColor = 'var(--sl-color-gray-7)';
                        });
                        container.addEventListener('mouseout', () => {
                            container.style.backgroundColor = originalBackgroundColor;
                        });
                    })();
                `;

                renderData.blockAst = h('div', {class: 'ec-code-block'}, [
                    renderData.blockAst,
                    h('div', {class: 'ec-copy-message'}, 'Copied!'),
                    h('script', copyScript)
                ]);
            },
        },
    };
}