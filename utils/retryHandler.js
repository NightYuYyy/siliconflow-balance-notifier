// utils/retryHandler.js
export async function retry(fn, options = { maxAttempts: 3, delay: 1000 }) {
    for (let attempt = 1; attempt <= options.maxAttempts; attempt++) {
      try {
        return await fn();
      } catch (error) {
        if (attempt === options.maxAttempts) throw error;
        await new Promise(res => setTimeout(res, options.delay * attempt));
      }
    }
  }
  