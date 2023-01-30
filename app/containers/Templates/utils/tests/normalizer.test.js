import { normalizeTemplate } from '../normalizer';

describe('normalizer utils', () => {
  describe('normalizeTemplate function', () => {
    it('should convert the template to id, folders, and children object', () => {
      const mockTemplate = {
        id: 1,
        content: 'Jesus is my Redeemer',
        children: [{ id: 2 }, { id: 3 }],
      };
      const result = normalizeTemplate(mockTemplate);
      expect(result).toEqual({
        id: 1,
        folder: {
          1: {
            id: mockTemplate.id,
            content: mockTemplate.content,
            children: [2, 3],
          },
        },
        node: {
          2: {
            id: 2,
          },
          3: {
            id: 3,
          },
        },
      });
    });
  });
});
