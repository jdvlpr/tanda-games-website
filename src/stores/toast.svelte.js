/**
 * @typedef {'info' | 'success' | 'warning' | 'error'} ToastType
 */

/**
 * @typedef {Object} Toast
 * @property {string} id
 * @property {ToastType} type
 * @property {string} message
 * @property {number} [duration]
 */

class ToastManager {
  /** * $state makes this array reactive anywhere it's imported
   * @type {Toast[]}
   */
  toasts = $state([]);

  /**
   * @param {Omit<Toast, 'id'>} toast
   */
  add(toast) {
    const id = crypto.randomUUID();
    this.toasts.push({ ...toast, id });

    // Auto-remove after duration (default 3000ms, use 0 for persistent)
    if (toast.duration !== 0) {
      setTimeout(() => this.remove(id), toast.duration || 3000);
    }
  }

  /**
   * @param {string} id
   */
  remove(id) {
    this.toasts = this.toasts.filter((t) => t.id !== id);
  }

  /**
   * @param {string} message
   * @param {number} [duration]
   */
  success(message, duration) {
    this.add({ type: "success", message, duration });
  }

  /**
   * @param {string} message
   * @param {number} [duration]
   */
  error(message, duration) {
    this.add({ type: "error", message, duration });
  }

  /**
   * @param {string} message
   * @param {number} [duration]
   */
  info(message, duration) {
    this.add({ type: "info", message, duration });
  }

  /**
   * @param {string} message
   * @param {number} [duration]
   */
  warning(message, duration) {
    this.add({ type: "warning", message, duration });
  }
}

// Export a single instance to be used globally
export const toast = new ToastManager();
