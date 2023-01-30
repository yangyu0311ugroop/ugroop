const createCanvas = () => document.createElement('canvas');
const setTimeOut = (fn, millis) => setTimeout(fn, millis);
const createImage = () => new Image();

export default { createCanvas, setTimeOut, createImage };
