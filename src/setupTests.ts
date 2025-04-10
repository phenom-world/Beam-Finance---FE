import '@testing-library/jest-dom';

import { afterEach } from '@jest/globals';
import { cleanup } from '@testing-library/react';

// Add ResizeObserver polyfill
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Cleanup after each test case
afterEach(() => {
  cleanup();
});
