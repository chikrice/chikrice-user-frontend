import { getStorage, setStorage, removeStorage } from 'src/hooks/use-local-storage';

describe('Local Storage Functions', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('setStorage', () => {
    it('should store a string value', () => {
      setStorage('test-key', 'test-value');
      expect(localStorage.getItem('test-key')).toBe('"test-value"');
    });

    it('should store an object value', () => {
      const testObject = { name: 'John', age: 30 };
      setStorage('test-object', testObject);
      expect(localStorage.getItem('test-object')).toBe(JSON.stringify(testObject));
    });

    it('should store an array value', () => {
      const testArray = [1, 2, 3, 'test'];
      setStorage('test-array', testArray);
      expect(localStorage.getItem('test-array')).toBe(JSON.stringify(testArray));
    });

    it('should handle null value', () => {
      setStorage('test-null', null);
      expect(localStorage.getItem('test-null')).toBe('null');
    });

    it('should handle undefined value', () => {
      setStorage('test-undefined', undefined);
      expect(localStorage.getItem('test-undefined')).toBe('undefined');
    });
  });

  describe('getStorage', () => {
    it('should retrieve a string value', () => {
      localStorage.setItem('test-key', '"test-value"');
      const result = getStorage('test-key');
      expect(result).toBe('test-value');
    });

    it('should retrieve an object value', () => {
      const testObject = { name: 'John', age: 30 };
      localStorage.setItem('test-object', JSON.stringify(testObject));
      const result = getStorage('test-object');
      expect(result).toEqual(testObject);
    });

    it('should retrieve an array value', () => {
      const testArray = [1, 2, 3, 'test'];
      localStorage.setItem('test-array', JSON.stringify(testArray));
      const result = getStorage('test-array');
      expect(result).toEqual(testArray);
    });

    it('should return null for non-existent key', () => {
      const result = getStorage('non-existent-key');
      expect(result).toBe(null);
    });

    it('should return null for invalid JSON', () => {
      localStorage.setItem('invalid-json', 'invalid-json-string');
      const result = getStorage('invalid-json');
      expect(result).toBe(null);
    });

    it('should handle null value', () => {
      localStorage.setItem('test-null', 'null');
      const result = getStorage('test-null');
      expect(result).toBe(null);
    });
  });

  describe('removeStorage', () => {
    it('should remove an existing key', () => {
      localStorage.setItem('test-key', 'test-value');
      expect(localStorage.getItem('test-key')).toBe('test-value');

      removeStorage('test-key');
      expect(localStorage.getItem('test-key')).toBe(null);
    });

    it('should handle removing non-existent key gracefully', () => {
      expect(() => removeStorage('non-existent-key')).not.toThrow();
    });
  });

  describe('Integration tests', () => {
    it('should work together: set, get, remove', () => {
      const testData = { user: 'John', settings: { theme: 'dark' } };

      // Set data
      setStorage('user-data', testData);
      expect(localStorage.getItem('user-data')).toBe(JSON.stringify(testData));

      // Get data
      const retrieved = getStorage('user-data');
      expect(retrieved).toEqual(testData);

      // Remove data
      removeStorage('user-data');
      expect(getStorage('user-data')).toBe(null);
    });

    it('should handle multiple keys independently', () => {
      setStorage('key1', 'value1');
      setStorage('key2', { nested: 'value2' });
      setStorage('key3', [1, 2, 3]);

      expect(getStorage('key1')).toBe('value1');
      expect(getStorage('key2')).toEqual({ nested: 'value2' });
      expect(getStorage('key3')).toEqual([1, 2, 3]);

      removeStorage('key2');

      expect(getStorage('key1')).toBe('value1');
      expect(getStorage('key2')).toBe(null);
      expect(getStorage('key3')).toEqual([1, 2, 3]);
    });
  });
});
