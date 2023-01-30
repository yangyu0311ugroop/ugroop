/**
 * Created by edil on 9/6/17.
 */
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';

const generateHash = data => {
  const hashDigest = sha256(data);
  const hexDigest = Base64.stringify(hashDigest);
  return hexDigest.replace(/\//g, '_');
};

export default generateHash;
