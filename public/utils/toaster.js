export const TOAST_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
};

export const toaster = {
  toasts: [],

  autoRemoveToast($newToast) {
    const timeId = setTimeout(() => {
      document.body.removeChild(this.toasts.pop());
    }, 3000);

    $newToast.lastElementChild.onclick = () => {
      document.body.removeChild($newToast);
      this.toasts.splice(this.toasts.indexOf($newToast), 1);
      clearTimeout(timeId);
    };
  },

  appendToast() {
    const $toasts = document.querySelectorAll('.toast');
    $toasts.forEach($toast => {
      $toast.style.top = `${
        this.toasts.indexOf($toast) * parseInt(getComputedStyle($toast).getPropertyValue('--toast-height'), 10) + 80
      }px`;
    });
  },

  add({ type, title, message }) {
    const $fragment = document.createElement('div');
    $fragment.innerHTML = `
    <div class="toast toast-${type}"">
      <h4 class="toast-heading">${title}</h4>
      <div class="toast-message">
        <svg width="24" height="24">
          <use xlink:href="#${type}" />
        </svg>
        <p>${message}</p>
      </div>
      <a class="close">&times;</a>
    </div>`;
    const $newToast = $fragment.firstElementChild;
    this.toasts.unshift($newToast);

    this.autoRemoveToast($newToast);
    this.appendToast();

    document.body.appendChild($newToast);
  },
};

export const createToastAction = (type, title, message) => ({ type, title, message });
