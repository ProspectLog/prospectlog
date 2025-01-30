// setupTests.ts (or setupTests.js)

// A basic mock class for ResizeObserver:
class MockResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  
  // Make it globally available in Vitest/JSDOM:
  global.ResizeObserver = MockResizeObserver;
  