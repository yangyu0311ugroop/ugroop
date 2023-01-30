/**
 * Created by edil on 8/11/17.
 */
import helper from '../dataUriToBlob';

describe('dataUriToBlob', () => {
  it('should generate correct blob using dataUri', () => {
    const data = 'Test';
    const type = 'text/plain';
    const dataUri = 'data:text/plain;charset=utf-8;base64,VGVzdA==';
    const expectedBlob = new Blob([data], { type });
    const recievedBlob = helper.dataUriToBlob(dataUri, type);
    expect(recievedBlob).toEqual(expectedBlob);
  });
});
