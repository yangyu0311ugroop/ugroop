import { photoType } from 'utils/constant';
import { fetchImage } from 'utils/request';
import ImageUtility, { fn } from '../imageUtils';
import dom from '../dom';

jest.mock('../dom', () => ({
  createCanvas: jest.fn(),
  setTimeOut: jest.fn(),
  createImage: jest.fn(),
}));

jest.mock('utils/request', () => ({
  fetchImage: jest.fn(),
}));

const mockCreateImage = () => {
  const img = {};
  img.setAttribute = (attr, val) => {
    img[attr] = val;

    if (attr === 'src') {
      if (img.onload) {
        img.onload({});
      }
    }
  };
  return img;
};

describe('imageUtils ', () => {
  const createImageFunc = () => new Image();

  beforeEach(() => {
    dom.createImage.mockImplementation(createImageFunc);
  });

  describe('imageResize ', () => {
    let ret;
    let image;
    let canvas;
    let drawImage;
    let imgWidth;
    let imgHeight;
    let newWidth;
    let newHeight;

    it('should return proper size if image width > height and width > maxSize', () => {
      drawImage = jest.fn();

      canvas = {
        getContext: () => ({ drawImage }),
        toDataURL: arg => arg,
      };

      dom.createCanvas.mockImplementation(() => canvas);

      imgWidth = fn.maxSize + 1024;
      imgHeight = imgWidth - 16;

      image = { width: imgWidth, height: imgHeight };

      newWidth = fn.maxSize;
      newHeight = (image.height * fn.maxSize) / image.width;

      ret = fn.imageResize(image);

      expect(drawImage).toHaveBeenCalledWith(image, 0, 0, newWidth, newHeight);
      expect(ret).toEqual({
        resource: photoType.jpeg,
        size: { height: newHeight, width: newWidth },
      });
    });

    it('should return proper size if image width > height and width <= maxSize', () => {
      drawImage = jest.fn();

      canvas = {
        getContext: () => ({ drawImage }),
        toDataURL: arg => arg,
      };

      dom.createCanvas.mockImplementation(() => canvas);

      imgWidth = fn.maxSize - 1024;
      imgHeight = imgWidth - 16;

      image = { width: imgWidth, height: imgHeight };

      ret = fn.imageResize(image);

      expect(drawImage).toHaveBeenCalledWith(image, 0, 0, imgWidth, imgHeight);
      expect(ret).toEqual({
        resource: photoType.jpeg,
        size: { height: imgHeight, width: imgWidth },
      });
    });

    it('should return proper size if image height > maxSize', () => {
      drawImage = jest.fn();

      canvas = {
        getContext: () => ({ drawImage }),
        toDataURL: arg => arg,
      };

      dom.createCanvas.mockImplementation(() => canvas);

      imgHeight = fn.maxSize + 1024;
      imgWidth = imgHeight - 16;

      image = { width: imgWidth, height: imgHeight };

      newWidth = (imgWidth * fn.maxSize) / imgHeight;
      newHeight = fn.maxSize;

      ret = fn.imageResize(image);

      expect(drawImage).toHaveBeenCalledWith(image, 0, 0, newWidth, newHeight);
      expect(ret).toEqual({
        resource: photoType.jpeg,
        size: { height: newHeight, width: newWidth },
      });
    });

    it('should return proper size if image height <= maxSize', () => {
      drawImage = jest.fn();

      canvas = {
        getContext: () => ({ drawImage }),
        toDataURL: arg => arg,
      };

      dom.createCanvas.mockImplementation(() => canvas);

      imgHeight = fn.maxSize - 1024;
      imgWidth = 800;

      image = { width: imgWidth, height: imgHeight };

      ret = fn.imageResize(image);

      expect(drawImage).toHaveBeenCalledWith(image, 0, 0, imgWidth, imgHeight);
      expect(ret).toEqual({
        resource: photoType.jpeg,
        size: { height: imgHeight, width: imgWidth },
      });
    });
  });

  describe('resizePromiseFunc ', () => {
    let canvas;
    let img;
    let resolve;
    let reject;
    let newImg;

    it('should run successfully if a new image has been created successfully', () => {
      canvas = {
        getContext: () => ({ drawImage: () => true }),
        toDataURL: arg => arg,
      };

      dom.createCanvas.mockImplementation(() => canvas);

      resolve = jest.fn();
      reject = jest.fn();
      newImg = fn.resizePromiseFunc(img, resolve, reject);

      newImg.width = 100;
      newImg.height = 100;

      newImg.onload();

      expect(resolve).toHaveBeenCalledWith({
        resource: 'image/jpeg',
        size: { height: 100, width: 100 },
      });
    });

    it('should run properly if a new image has failed to create', () => {
      canvas = {
        getContext: () => ({ drawImage: () => true }),
        toDataURL: arg => arg,
      };

      dom.createCanvas.mockImplementation(() => canvas);

      resolve = jest.fn();
      reject = jest.fn();
      newImg = fn.resizePromiseFunc(img, resolve, reject);

      newImg.width = 100;
      newImg.height = 100;

      newImg.onerror();

      expect(reject).toHaveBeenCalledWith({ error: 'Image Load Error' });
    });
  });

  describe('resizeImagePromise ', () => {
    let image;
    let cancellablePromise;
    let result;

    it('should be able to generate a cancellable promise ', async () => {
      image = '/some/image.jpg';
      cancellablePromise = ImageUtility.resizeImagePromise(image);

      expect(cancellablePromise).not.toBe(null);
      expect(cancellablePromise.promise).not.toBe(null);
      expect(typeof cancellablePromise.promise.then).toBe('function');
      expect(typeof cancellablePromise.cancel).toBe('function');
    });

    it('should be able to process the promise ', () => {
      let timeObj = {};
      dom.setTimeOut.mockImplementation((func, millis) => {
        timeObj = { ...timeObj, func, millis };
        return 1;
      });

      image = 'http://localhost/some/image.jpg';
      cancellablePromise = ImageUtility.resizeImagePromise(image);
      result = timeObj.func();

      expect(result.tagName).toBe('IMG');
      expect(result.src).toBe(image);
    });
  });

  describe('BlobtoDataURL ', () => {
    let blob;
    let result;

    it('should be able to run properly ', async () => {
      blob = new Blob(['hello world'], { type: 'text/plain' });
      result = await ImageUtility.BlobtoDataURL(blob);

      expect(result).toBe('data:text/plain;charset=undefined,hello%20world');
    });
  });

  describe('getInitialSize ', () => {
    let imageSize;
    let canvasSize;
    let canvasRatio;
    let imageRatio;
    let initSize;
    let newHeight;
    let newWidth;

    it('should return the proper size if canvas ratio > image ratio', () => {
      canvasRatio = 0.4;
      imageRatio = 0.2;

      canvasSize = { height: 10 * canvasRatio, width: 10 };
      imageSize = { height: 20 * imageRatio, width: 20 };

      initSize = fn.getInitialSize(imageSize, canvasSize);

      newHeight = canvasSize.height;
      newWidth = (imageSize.width * newHeight) / imageSize.height;

      expect(initSize).toEqual({ width: newWidth, height: newHeight });
    });

    it('should return the proper size if canvas ratio <= image ratio', () => {
      canvasRatio = 0.2;
      imageRatio = 0.4;

      canvasSize = { height: 10 * canvasRatio, width: 10 };
      imageSize = { height: 20 * imageRatio, width: 20 };

      initSize = fn.getInitialSize(imageSize, canvasSize);

      newWidth = canvasSize.width;
      newHeight = (imageSize.height * newWidth) / imageSize.width;

      expect(initSize).toEqual({ width: newWidth, height: newHeight });
    });
  });

  describe('makeNewImage ', () => {
    let newImage;

    it('should be able to run properly if a new image gets created successfully', async () => {
      dom.createImage.mockImplementation(mockCreateImage);

      newImage = await fn.makeNewImage('/some/image.jpg');

      expect(newImage.src).toBe('/some/image.jpg');
    });

    it('should be able to run properly if a new image fails to create', async () => {
      dom.createImage.mockImplementation(() => {
        const img = {};
        img.setAttribute = (attr, val) => {
          if (attr === 'src') {
            if (img.onerror) {
              img.onerror({});
            }
          } else {
            img[attr] = val;
          }
        };
        return img;
      });

      let except = null;
      try {
        newImage = await fn.makeNewImage('/some/image.jpg');
      } catch (ex) {
        except = ex;
      }

      expect(except.message).toBe(
        'Unable to load image for cropping and transforming: /some/image.jpg',
      );
    });
  });

  describe('cropImage ', () => {
    let canvas;
    let result;

    beforeEach(() => {
      dom.createImage.mockImplementation(mockCreateImage);
    });

    it('should be able to function correctly without border ', async () => {
      canvas = {
        getContext: () => ({
          drawImage: () => {},
          save: () => {},
          rotate: () => {},
          translate: () => {},
          scale: () => {},
          restore: () => {},
        }),
      };

      canvas.toDataURL = arg =>
        `data:${arg},canvas:${canvas.width}x${canvas.height}`;

      dom.createCanvas.mockImplementation(() => canvas);

      result = await ImageUtility.cropImage(
        '/some/image.jpg',
        { width: 800, height: 600 },
        { width: 400, height: 300 },
        1,
        {
          x: 0,
          y: 0,
          width: 0.5,
          height: 0.5,
        },
        0,
      );

      expect(result).toBe('data:image/jpeg,canvas:400x300');
    });

    it('should be able to function correctly with border ', async () => {
      canvas = {
        getContext: () => ({
          drawImage: () => {},
          save: () => {},
          rotate: () => {},
          translate: () => {},
          scale: () => {},
          restore: () => {},
        }),
      };

      canvas.toDataURL = arg =>
        `data:${arg},canvas:${canvas.width}x${canvas.height}`;

      dom.createCanvas.mockImplementation(() => canvas);

      result = await ImageUtility.cropImage(
        '/some/image.jpg',
        { width: 800, height: 600 },
        { width: 400, height: 300 },
        1,
        {
          x: 0,
          y: 0,
          width: 0.5,
          height: 0.5,
        },
        0,
        5,
      );

      expect(result).toBe('data:image/jpeg,canvas:390x290');
    });
  });

  describe('paintImage ', () => {
    let canvas;
    let drawImage;
    let rotate;
    let translate;
    let result;
    let image;
    let cropRect;
    let sx;
    let sy;
    let sw;
    let sh;
    let canvasWidth;
    let canvasHeight;

    beforeEach(() => {
      drawImage = jest.fn();
      rotate = jest.fn();
      translate = jest.fn();

      canvas = {
        getContext: () => ({
          drawImage,
          save: () => {},
          rotate,
          translate,
          scale: () => {},
          restore: () => {},
        }),
      };

      canvas.toDataURL = arg =>
        `data:${arg},canvas:${canvas.width}x${canvas.height}`;

      dom.createCanvas.mockImplementation(() => canvas);
    });

    it('should function properly if image data does not exist', () => {
      canvasWidth = 400;
      canvasHeight = 300;
      cropRect = {
        x: 0,
        y: 0,
        width: 0.5,
        height: 0.5,
      };

      result = fn.paintImage(null, canvasWidth, canvasHeight, 1, cropRect, 0);

      expect(rotate).not.toHaveBeenCalled();
      expect(translate).not.toHaveBeenCalled();
      expect(drawImage).not.toHaveBeenCalled();
      expect(result.width).toBe(canvasWidth);
      expect(result.height).toBe(canvasHeight);
    });

    it('should function properly if rotation is 0 degrees', () => {
      canvasWidth = 400;
      canvasHeight = 300;

      image = {
        resource: {
          naturalWidth: 500,
          naturalHeight: 800,
        },
      };

      cropRect = {
        x: 0.4,
        y: 0.2,
        width: 0.25,
        height: 0.4,
      };

      result = fn.paintImage(image, canvasWidth, canvasHeight, 1, cropRect, 0);

      sx = cropRect.x * image.resource.naturalWidth;
      sy = cropRect.y * image.resource.naturalHeight;
      sw = cropRect.width * image.resource.naturalWidth;
      sh = cropRect.height * image.resource.naturalHeight;

      expect(rotate).not.toHaveBeenCalled();
      expect(translate).not.toHaveBeenCalled();
      expect(drawImage).toHaveBeenCalledWith(
        image.resource,
        sx,
        sy,
        sw,
        sh,
        0,
        0,
        canvasWidth,
        canvasHeight,
      );
      expect(result.width).toBe(canvasWidth);
      expect(result.height).toBe(canvasHeight);
    });

    it('should function properly if rotation is 90 degrees', () => {
      canvasWidth = 400;
      canvasHeight = 300;

      image = {
        resource: {
          naturalWidth: 500,
          naturalHeight: 800,
        },
      };

      cropRect = {
        x: 0.4,
        y: 0.2,
        width: 0.25,
        height: 0.4,
      };

      result = fn.paintImage(image, canvasWidth, canvasHeight, 1, cropRect, 90);

      sx = cropRect.x * image.resource.naturalWidth;
      sy = cropRect.y * image.resource.naturalHeight;
      sw = cropRect.width * image.resource.naturalWidth;
      sh = cropRect.height * image.resource.naturalHeight;

      expect(rotate).toHaveBeenCalledWith(90 * (Math.PI / 180));
      expect(translate).toHaveBeenCalledWith(0, -canvasWidth);
      expect(drawImage).toHaveBeenCalledWith(
        image.resource,
        sx,
        sy,
        sw,
        sh,
        0,
        0,
        canvasHeight,
        canvasWidth,
      );
      expect(result.width).toBe(canvasWidth);
      expect(result.height).toBe(canvasHeight);
    });

    it('should function properly if rotation is 180 degrees', () => {
      canvasWidth = 400;
      canvasHeight = 300;

      image = {
        resource: {
          naturalWidth: 500,
          naturalHeight: 800,
        },
      };

      cropRect = {
        x: 0.4,
        y: 0.2,
        width: 0.25,
        height: 0.4,
      };

      result = fn.paintImage(
        image,
        canvasWidth,
        canvasHeight,
        1,
        cropRect,
        180,
      );

      sx = cropRect.x * image.resource.naturalWidth;
      sy = cropRect.y * image.resource.naturalHeight;
      sw = cropRect.width * image.resource.naturalWidth;
      sh = cropRect.height * image.resource.naturalHeight;

      expect(rotate).toHaveBeenCalledWith(180 * (Math.PI / 180));
      expect(translate).toHaveBeenCalledWith(-canvasWidth, 0);
      expect(translate).toHaveBeenCalledWith(0, -canvasHeight);
      expect(drawImage).toHaveBeenCalledWith(
        image.resource,
        sx,
        sy,
        sw,
        sh,
        0,
        0,
        canvasWidth,
        canvasHeight,
      );
      expect(result.width).toBe(canvasWidth);
      expect(result.height).toBe(canvasHeight);
    });

    it('should function properly if rotation is 270 degrees', () => {
      canvasWidth = 400;
      canvasHeight = 300;

      image = {
        resource: {
          naturalWidth: 500,
          naturalHeight: 800,
        },
      };

      cropRect = {
        x: 0.4,
        y: 0.2,
        width: 0.25,
        height: 0.4,
      };

      result = fn.paintImage(
        image,
        canvasWidth,
        canvasHeight,
        1,
        cropRect,
        270,
      );

      sx = cropRect.x * image.resource.naturalWidth;
      sy = cropRect.y * image.resource.naturalHeight;
      sw = cropRect.width * image.resource.naturalWidth;
      sh = cropRect.height * image.resource.naturalHeight;

      expect(rotate).toHaveBeenCalledWith(270 * (Math.PI / 180));
      expect(translate).toHaveBeenCalledWith(-canvasHeight, 0);
      expect(drawImage).toHaveBeenCalledWith(
        image.resource,
        sx,
        sy,
        sw,
        sh,
        0,
        0,
        canvasHeight,
        canvasWidth,
      );
      expect(result.width).toBe(canvasWidth);
      expect(result.height).toBe(canvasHeight);
    });
  });

  describe('fetchAndProcessImage ', () => {
    let data;
    let canvasSize;
    let photo;
    let result;
    let cprom;
    let queryWidth;
    let drawImage;
    let canvas;
    let save;
    let scale;
    let restore;

    beforeEach(() => {
      dom.createImage.mockImplementation(mockCreateImage);

      drawImage = jest.fn();
      save = () => {};
      scale = () => {};
      restore = () => {};

      canvas = {
        getContext: () => ({
          drawImage,
          save,
          scale,
          restore,
        }),
      };

      canvas.toDataURL = arg =>
        `data:${arg},canvas:${canvas.width}x${canvas.height}`;

      dom.createCanvas.mockImplementation(() => canvas);
    });

    it('should be working properly ', async () => {
      data = {
        size: { width: 500, height: 800 },
        blob: Promise.resolve(new Blob(['some data'], { type: 'image/jpeg' })),
      };

      fetchImage.mockImplementation(() => Promise.resolve(data));

      photo = {
        metaInfo: {
          x: 0,
          y: 0,
          width: 0.25,
          height: 0.25,
        },
      };
      queryWidth = 500;
      canvasSize = { width: 400, height: 300 };

      cprom = ImageUtility.fetchAndProcessImage(photo, queryWidth, canvasSize);

      expect(typeof cprom.promise).toBe('object');
      expect(typeof cprom.promise.then).toBe('function');
      expect(typeof cprom.cancel).toBe('function');

      result = await cprom.promise;

      expect(result.data.size).toEqual(data.size);
      expect(result.image).toBe('data:image/jpeg,canvas:400x300');
    });
  });

  describe('processImage ', () => {
    let data;
    let canvasSize;
    let photo;
    let result;
    let promise;
    let drawImage;
    let save;
    let scale;
    let restore;
    let canvas;

    beforeEach(() => {
      dom.createImage.mockImplementation(mockCreateImage);

      drawImage = jest.fn();
      save = () => {};
      scale = () => {};
      restore = () => {};

      canvas = {
        getContext: () => ({
          drawImage,
          save,
          scale,
          restore,
        }),
      };

      canvas.toDataURL = arg =>
        `data:${arg},canvas:${canvas.width}x${canvas.height}`;

      dom.createCanvas.mockImplementation(() => canvas);
    });

    it('should be working properly ', async () => {
      data = {
        size: { width: 500, height: 800 },
        blob: Promise.resolve(new Blob(['some data'], { type: 'image/jpeg' })),
      };

      canvasSize = { width: 400, height: 300 };

      photo = {
        metaInfo: {
          x: 0,
          y: 0,
          width: 0.25,
          height: 0.25,
        },
      };

      promise = new Promise(resolve => {
        ImageUtility.processImage(data, canvasSize, photo, resolve);
      });

      result = await promise;

      expect(result).toBe('data:image/jpeg,canvas:400x300');
    });
  });

  describe('Test ConvertFormData', () => {
    it('convertFormData', () => {
      const blob = new Blob(['some data'], {
        type: 'text/plain;charset=utf-8',
      });
      const content = ImageUtility.convertFormData(blob, { filename: 'abd' });
      expect(content.data).not.toBe(null);
    });
  });
});
