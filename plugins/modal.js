//added new method to global class Element
Element.prototype.appendAfter = function (element) {
  element.parentNode.insertBefore(this, element.nextSibling)
};

function noop() {}

function _createModalFooter(buttons = []) {
  if (buttons.length === 0) {
    return document.createElement('div')
  }

  const wrap = document.createElement('div');
  wrap.classList.add('modal-footer');

  buttons.forEach(button => {
    const $button = document.createElement('button');
    $button.textContent = button.text;
    $button.classList.add('btn');
    $button.classList.add(`btn-${button.type || 'secondary'}`);
    $button.onclick = button.handler || noop;

    wrap.appendChild($button);
  });

  return wrap;
}

function _createModal(options) {
  const DEFAULT_WIDTH = '600px';
  const modal = document.createElement('div');
  modal.classList.add('my-modal');

  modal.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay" data-close="true">
      <div class="modal-window" style="width: ${options.width || DEFAULT_WIDTH}">
        <div class="modal-header">
          <span class="modal-title">${options.title || 'Default Title'}</span>
          ${options.closable ? `<span class="modal-close" data-close="true">&times;</span>` : ''}
        </div>
        <div class="modal-body" data-content>
          ${options.content || 'Default content'}
        </div>
      </div>
    </div>
  `);
  const footer = _createModalFooter(options.footerButtons);
  footer.appendAfter(modal.querySelector('[data-content]'));
  document.body.appendChild(modal);
  return modal;
}

$.modal = function (options) {
  const ANIMATION_SPEED = 300;
  const $modal = _createModal(options);
  let closing = false;
  let destroyed = false;

  const modal = {
    open() {
      if (!destroyed) {
        !closing && $modal.classList.add('open');
      }
    },
    close() {
      closing = true;
      $modal.classList.remove('open');
      $modal.classList.add('hiding');
      setTimeout(() => {
        $modal.classList.remove('hiding');
        closing = false;
        if (typeof options.onClose === 'function') {
          options.onClose();
        }
      }, ANIMATION_SPEED)
    }
  };

  const listener = event => {
    event.target.dataset.close && modal.close();
  };

  $modal.addEventListener('click', listener);

  return Object.assign(modal, {
    destroy() {
      $modal.parentNode.removeChild($modal);
      $modal.removeEventListener('click', listener);
      destroyed = true;
    },
    setContent(html) {
      $modal.querySelector(`[data-content]`).innerHTML = html;
    }
  });
};
