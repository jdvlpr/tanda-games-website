/**
 * @typedef {'info' | 'success' | 'warning' | 'error'} ToastType
 */

/**
 * @typedef {Object} ToastOptions
 * @property {number} [indent] - Visual nesting level (0 = root, 1 = child effect, 2 = grandchild, etc.)
 */

/**
 * @typedef {Object} Toast
 * @property {string} id
 * @property {ToastType} type
 * @property {string} message
 * @property {number} [indent]
 */

class ToastManager {
  /** * $state makes this array reactive anywhere it's imported
   * @type {Toast[]}
   */
  toasts = $state([]);

  enabled = $state(true);

  timeoutMs = $state(3000);

  /** * Tracks when the last toast in the queue is scheduled to dismiss
   * @type {number}
   */
  lastDismissalTime = 0;

  /**
   * @param {Omit<Toast, 'id'>} toast
   */
  add(toast) {
    if (!this.enabled) return;
    const id = crypto.randomUUID();

    this.toasts.push({ ...toast, id });

    const now = Date.now();
    let delay = this.timeoutMs;

    // If there are toasts already queued to dismiss in the future,
    // add this toast's duration to the end of that queue's time.
    if (this.lastDismissalTime > now) {
      delay = this.lastDismissalTime - now + this.timeoutMs;
    }

    this.lastDismissalTime = now + delay;

    setTimeout(() => this.remove(id), delay);
  }

  /**
   * @param {string} id
   */
  remove(id) {
    this.toasts = this.toasts.filter((t) => t.id !== id);
  }

  /**
   * @param {string} message
   * @param {ToastOptions} [opts]
   */
  success(message, opts) {
    this.add({ type: "success", message, ...opts });
  }

  /**
   * @param {string} message
   * @param {ToastOptions} [opts]
   */
  error(message, opts) {
    this.add({ type: "error", message, ...opts });
  }

  /**
   * @param {string} message
   * @param {ToastOptions} [opts]
   */
  info(message, opts) {
    this.add({ type: "info", message, ...opts });
  }

  /**
   * @param {string} message
   * @param {ToastOptions} [opts]
   */
  warning(message, opts) {
    this.add({ type: "warning", message, ...opts });
  }

  /**
   * @param {string} message
   * @param {ToastOptions} [opts]
   */
  money(message, opts) {
    this.add({ type: "money", message, ...opts });
  }
  /**
   * @param {string} message
   * @param {ToastOptions} [opts]
   */
  assurance(message, opts) {
    this.add({ type: "assurance", message, ...opts });
  }
  /**
   * @param {string} message
   * @param {ToastOptions} [opts]
   */
  document(message, opts) {
    this.add({ type: "document", message, ...opts });
  }
  /**
   * @param {string} message
   * @param {ToastOptions} [opts]
   */
  connection(message, opts) {
    this.add({ type: "connection", message, ...opts });
  }
  /**
   * @param {string} message
   * @param {ToastOptions} [opts]
   */
  life(message, opts) {
    this.add({ type: "life", message, ...opts });
  }
}

// Export a single instance to be used globally
export const toast = new ToastManager();
