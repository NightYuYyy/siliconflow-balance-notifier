// services/apiService.js
import fetch from 'node-fetch';
import { config } from '../config/constants.js';
import { retry } from '../utils/retryHandler.js';

const DEFAULT_HEADERS = {
  'Authorization': `Bearer ${process.env.API_KEY || config.API_KEY}`,
  'Content-Type': 'application/json'
};

export async function fetchBalance() {
  const fetchOptions = {
    method: 'GET',
    headers: { ...DEFAULT_HEADERS, ...config.extraHeaders }
  };

  return retry(async () => {
    const response = await fetch(config.BALANCE_CHECK_URL, fetchOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.code !== 20000) {
      throw new Error(`API Error: ${result.message || 'Unknown error'}`);
    }

    return result.data.balance;
  }, {
    maxAttempts: 3,
    delay: 1000
  });
}
