// شبیه‌سازی عملیات اتومیک با استفاده از قفل (Mutex)
class AtomicCounter {
    constructor() {
      this.value = 0;
      this.lock = false; // قفل
    }
  
    // عملیات اتومیک افزایش شمارنده
    increment() {
      return new Promise((resolve, reject) => {
        const tryIncrement = () => {
          if (this.lock) {
            // اگر قفل فعال است، دوباره تلاش می‌کنیم
            setTimeout(tryIncrement, 10);
          } else {
            this.lock = true; // فعال کردن قفل
            this.value += 1;  // عملیات اتومیک
            this.lock = false; // غیرفعال کردن قفل
            resolve(this.value); // نتیجه را برمی‌گردانیم
          }
        };
        tryIncrement(); // شروع تلاش برای افزایش شمارنده
      });
    }
  }
  
  const counter = new AtomicCounter();
  
  // نمونه استفاده از شمارنده اتومیک
  async function testAtomicCounter() {
    const results = await Promise.all([counter.increment(), counter.increment(), counter.increment()]);
    console.log(results);  // [1, 2, 3]
  }
  
  testAtomicCounter();
  