import type {ExpressiveCodePlugin} from 'astro-expressive-code';
import {h} from '@expressive-code/core/hast';

export function codePhotoPlugin(): ExpressiveCodePlugin {
    return {
        name: 'Показать фото',
        baseStyles: `
      .actions {
        display: flex;
        font-size: var(--sl-text-xs);
        justify-content: flex-end;
        padding-inline: 0.5em;
      }
      .actions button {
        color: var(--sl-color-gray-3);
        margin-left: 1em;
        cursor: pointer;
        background: none;
        border: none;
        padding: 0;
        font: inherit;
      }
      .modal-overlay {
        display: none;
        position: fixed;
        z-index: 9998;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.7);
        animation: fadeIn 0.3s;
      }
      .modal {
        display: none;
        position: fixed;
        z-index: 9999;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        animation: fadeIn 0.3s;
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      .modal-content {
        background-color: #fff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        width: 450px;
        max-width: 90%;
        max-height: 90vh;
        overflow: auto;
        position: relative;
      }
      .modal-content img {
        width: 100%;
        height: auto;
        border-radius: 5px;
        display: block;
      }
      .close {
        position: absolute;
        top: 5px;
        right: 10px;
        color: #aaa;
        font-size: 24px;
        font-weight: bold;
        cursor: pointer;
        transition: color 0.3s;
      }
      .close:hover {
        color: #000;
      }
    `,
        hooks: {
            postprocessRenderedBlock: ({codeBlock, renderData}) => {
                // Parse metadata to get image path
                const metaParts = codeBlock.meta ? codeBlock.meta.split(' ') : [];
                const showPhotoIndex = metaParts.indexOf('show-photo');
                const imagePath = showPhotoIndex !== -1 && showPhotoIndex + 1 < metaParts.length
                    ? metaParts[showPhotoIndex + 1]
                    : null;

                if (!imagePath) return;

                const modalId = `modal-${Math.random().toString(36).substr(2, 9)}`;

                renderData.blockAst = h('div', [
                    renderData.blockAst,
                    h('div', {class: 'actions'},
                        h('button', {className: 'show-photo-btn', 'data-modal-id': modalId}, 'Показать фото')
                    ),
                    h('div', {className: 'modal-overlay', id: `${modalId}-overlay`}),
                    h('div', {className: 'modal', id: modalId},
                        h('div', {className: 'modal-content'},
                            h('span', {className: 'close'}, '×'),
                            h('img', {src: imagePath, alt: 'Изображение для кода'})
                        )
                    ),
                    h('script', `
            (function() {
              const modalId = '${modalId}';
              const showPhotoBtn = document.querySelector('button[data-modal-id="${modalId}"]');
              const modalOverlay = document.getElementById('${modalId}-overlay');
              const modal = document.getElementById('${modalId}');
              const closeBtn = modal.querySelector('.close');
              const img = modal.querySelector('img');

              function openModal() {
                modalOverlay.style.display = 'block';
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
              }

              function closeModal() {
                modalOverlay.style.display = 'none';
                modal.style.display = 'none';
                document.body.style.overflow = '';
              }

              showPhotoBtn.addEventListener('click', openModal);
              closeBtn.addEventListener('click', closeModal);
              modalOverlay.addEventListener('click', closeModal);

              modal.addEventListener('click', (event) => {
                event.stopPropagation();
              });

              // Preload image
              const preloadImg = new Image();
              preloadImg.src = '${imagePath}';
            })();
          `)
                ]);
            },
        },
    };
}