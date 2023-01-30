import { makeCancelable } from 'utils/index';
import { photoType } from 'utils/constant';
import { fetchImage } from 'utils/request';
import uuidv4 from 'uuid/v4';
import generateHash from 'utils/helpers/generateHash';
import dom from './dom';
const maxSize = 2048;

const imageResize = image => {
  const canvas = dom.createCanvas();
  let { width, height } = image;
  if (width > height) {
    if (width > maxSize) {
      height *= maxSize / width;
      width = maxSize;
    }
  } else if (height > maxSize) {
    width *= maxSize / height;
    height = maxSize;
  }
  canvas.width = width;
  canvas.height = height;
  canvas.getContext('2d').drawImage(image, 0, 0, width, height);
  return {
    size: { width, height },
    resource: canvas.toDataURL(photoType.jpeg),
  };
};

const resizePromiseFunc = (image, resolve, reject) => {
  const newImage = dom.createImage();
  newImage.onload = () => {
    const resizedImage = imageResize(newImage);
    resolve(resizedImage);
  };
  newImage.onerror = () => {
    const error = 'Image Load Error';
    reject({ error });
  };
  newImage.src = image;

  return newImage;
};

const resizeImagePromise = image => {
  const resizePromise = new Promise((resolve, reject) => {
    dom.setTimeOut(() => resizePromiseFunc(image, resolve, reject), 500);
  });
  return makeCancelable(resizePromise);
};

const convertFormData = (blob, options) => {
  const hashData = `${options.filename}:${Date.now()}:${uuidv4()}`;
  const hashName = `${generateHash(hashData)}.jpeg`;
  const data = new FormData();
  data.append('file-to-upload', blob, hashName);
  return data;
};

const BlobtoDataURL = blob => {
  const promise = new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
  return promise;
};

const getInitialSize = (imageSize, canvasSize) => {
  let newHeight;
  let newWidth;

  const canvasRatio = canvasSize.height / canvasSize.width;
  const imageRatio = imageSize.height / imageSize.width;

  if (canvasRatio > imageRatio) {
    newHeight = canvasSize.height;
    newWidth = imageSize.width * (newHeight / imageSize.height);
  } else {
    newWidth = canvasSize.width;
    newHeight = imageSize.height * (newWidth / imageSize.width);
  }

  return {
    height: newHeight,
    width: newWidth,
  };
};

const makeNewImage = src =>
  new Promise((resolve, reject) => {
    const newImage = dom.createImage();
    newImage.setAttribute('crossOrigin', 'anonymous');
    newImage.onload = () => resolve(newImage);
    newImage.onerror = () => {
      const err = new Error(
        `Unable to load image for cropping and transforming: ${src}`,
      );
      reject(err);
    };

    newImage.setAttribute('src', src);
  });

const cropImage = async (
  oriImage,
  orgImageSize,
  canvasSize,
  scale,
  croppingRect,
  rotate,
  border = 0,
) => {
  const canvasNetSize = {
    width: canvasSize.width - 2 * border,
    height: canvasSize.height - 2 * border,
  };

  const newImage = await makeNewImage(oriImage);
  const newImageSize = getInitialSize(orgImageSize, canvasNetSize);
  const canvas = paintImage(
    { size: newImageSize, resource: newImage },
    canvasNetSize.width,
    canvasNetSize.height,
    scale,
    croppingRect,
    rotate,
  );

  return canvas.toDataURL(photoType.jpeg); // Image in data URL format
};

const calculatePosition = (image, croppingRect) => ({
  x: image.width * croppingRect.x,
  y: image.height * croppingRect.y,
  width: image.width * croppingRect.width,
  height: image.height * croppingRect.height,
});

const paintImage = (
  image,
  canvasWidth,
  canvasHeight,
  scaleFactor, // eslint-disable-line no-unused-vars
  croppingRect,
  rotate,
) => {
  const canvas = dom.createCanvas();

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  const context = canvas.getContext('2d');
  if (image) {
    const naturalSize = {
      width: image.resource.naturalWidth,
      height: image.resource.naturalHeight,
    };
    const position = calculatePosition(naturalSize, croppingRect);

    let targetWidth;
    let targetHeight;

    if (rotate === 90 || rotate === 270) {
      targetWidth = canvasHeight;
      targetHeight = canvasWidth;
    } else {
      // rotate === 0 || rotate === 180 || rotate === any other value
      targetWidth = canvasWidth;
      targetHeight = canvasHeight;
    }

    context.save();

    if (rotate === 90 || rotate === 180 || rotate === 270) {
      // Apply rotation about the point (0, 0)
      context.rotate((rotate * Math.PI) / 180);
    }

    if (rotate === 90) {
      context.translate(0, -canvasWidth);
    } else if (rotate === 180) {
      context.translate(-canvasWidth, 0);
      context.translate(0, -canvasHeight);
    } else if (rotate === 270) {
      context.translate(-canvasHeight, 0);
    } // else if (rotate === 0 || rotate === any other value) then nothing to do

    context.scale(1, 1);

    context.globalCompositeOperation = 'destination-over';

    // scaleFactor is no longer used, since it's now implied in context.drawImage()
    context.drawImage(
      image.resource,
      position.x,
      position.y,
      position.width,
      position.height,
      0,
      0,
      targetWidth,
      targetHeight,
    );

    context.restore();
  }
  return canvas;
};

const fetchAndProcessImage = (photo, queryWidth, canvasSize) => {
  const resizePromise = new Promise(resolve => {
    fetchImage('GET', `/${photo.content}?width=${queryWidth}`).then(data => {
      const { scale, ...rest } = photo.metaInfo;
      data.blob.then(blob => {
        cropImage(blob, data.size, canvasSize, scale, rest).then(image => {
          resolve({ image, data });
        });
      });
    });
  });
  return makeCancelable(resizePromise);
};

const processImage = (data, canvasSize, photo, func) => {
  const { scale, ...rest } = photo.metaInfo;
  data.blob.then(blob => {
    cropImage(blob, data.size, canvasSize, scale, rest).then(image => {
      func(image);
    });
  });
};

export const fn = {
  maxSize,
  imageResize,
  getInitialSize,
  makeNewImage,
  calculatePosition,
  paintImage,
  resizePromiseFunc,
};

const ImageUtility = {
  resizeImagePromise,
  convertFormData,
  BlobtoDataURL,
  cropImage,
  fetchAndProcessImage,
  processImage,
};
export default ImageUtility;
