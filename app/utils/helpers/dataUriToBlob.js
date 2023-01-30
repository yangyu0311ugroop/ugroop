/**
 * Created by edil on 8/11/17.
 */
const dataUriToBlob = (dataUri, type) => {
  const binary = atob(dataUri.split(',')[1]);
  const array = [];
  for (let i = 0; i < binary.length; ) {
    array.push(binary.charCodeAt(i));
    i += 1;
  }
  return new Blob([new Uint8Array(array)], { type });
};

export default { dataUriToBlob };
