import dotProp from 'dot-prop-immutable';
import template from '../template';

// TODO: Jay please refactor the testing.
describe('utils - template management', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('updateTemplate', () => {
    const sampleInput = {
      id: 123,
      content: 'Sample',
      description: { hi: 'KROOOOO!' },
    };
    const sampleTemplate = {
      123: {
        content: 'qqqqq',
        customData: {
          day: 1,
          another: 'qweqwe',
          description: { hi: 'qqqqq' },
        },
      },
    };

    it('should update title and customData', () => {
      const expectedCustomData = {
        ...sampleTemplate['123'].customData,
        description: sampleInput.description,
      };
      const actualResult = template.update(123, 'Sample', {
        description: sampleInput.description,
      })(sampleTemplate);
      expect(actualResult).toEqual({
        123: { content: 'Sample', customData: expectedCustomData },
      });
    });
  });

  describe('insertTabId', () => {
    it('should insert tab id', () => {
      dotProp.merge = jest.fn(() => 133);
      expect(template.insertTabId()()).toEqual(133);
      expect(dotProp.merge).toBeCalled();
    });
  });

  describe('removeTabId', () => {
    it('should remove tab id', () => {
      dotProp.delete = jest.fn(() => 133);
      expect(template.removeTabId()()).toEqual(133);
      expect(dotProp.delete).toBeCalled();
    });
  });
});
