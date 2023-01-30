import dom from '../dom';

describe('dom ', () => {
  it('createCanvas ', () => {
    const canvas = dom.createCanvas();
    expect(canvas.tagName).toBe('CANVAS');
  });

  it('setTimeOut ', async () => {
    const promise = new Promise(resolve => {
      dom.setTimeOut(() => resolve('hello'), 10);
    });

    const val = await promise;

    expect(val).toBe('hello');
  });

  it('createImage ', () => {
    const img = dom.createImage();
    expect(img.tagName).toBe('IMG');
  });
});
