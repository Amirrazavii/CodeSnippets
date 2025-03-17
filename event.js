class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    // بررسی اینکه آیا این رویداد قبلاً ثبت شده یا خیر
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    // اضافه کردن لیسنر به لیست رویداد
    this.events.get(event).push(listener);
  }

  emit(event, ...args) {
    if (this.events.has(event)) {
      const listeners = this.events.get(event);
      listeners.forEach(listener => listener(...args));
    }
  }
}
