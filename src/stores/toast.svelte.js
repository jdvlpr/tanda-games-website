import { gameType } from "../components/emigration-emulator/EmigrationEmulator.svelte";

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

  /** * Tracks when the last toast in the queue is scheduled to dismiss
   * @type {number}
   */
  lastDismissalTime = 0;

  /**
   * @param {Omit<Toast, 'id'>} toast
   */
  add(toast) {
    if (gameType.value === "auto") return;
    const id = crypto.randomUUID();
    const duration = toast.duration !== undefined ? toast.duration : 3000;

    this.toasts.push({ ...toast, id, duration });

    // Auto-remove sequentially if duration is not 0 (persistent)
    if (duration !== 0) {
      const now = Date.now();
      let delay = duration;

      // If there are toasts already queued to dismiss in the future,
      // add this toast's duration to the end of that queue's time.
      if (this.lastDismissalTime > now) {
        delay = this.lastDismissalTime - now + duration;
      }

      this.lastDismissalTime = now + delay;

      setTimeout(() => this.remove(id), delay);
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
