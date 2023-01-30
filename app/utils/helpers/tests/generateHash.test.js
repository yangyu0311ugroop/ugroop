/**
 * Created by edil on 9/6/17.
 */
import generateHash from '../generateHash';

describe('generateHash', () => {
  it('should generate correct hash', () => {
    const data = 'Hello World!';
    const expectedHash = 'f4OxZX_x_FO5LcGBSKHWXfwtSx+j1ncoSt3SABJtkGk=';
    expect(generateHash(data)).toBe(expectedHash);
  });
});
