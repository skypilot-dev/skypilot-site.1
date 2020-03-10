import * as module from '../index';

describe('index.ts', () => {
  it('should export a module', () => {
    expect(typeof module).toBe('object');
  });
});
