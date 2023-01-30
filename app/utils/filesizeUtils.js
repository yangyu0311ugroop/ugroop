/**
 * Created by Yang on 28/10/16.
 */

function formatBytes(a, b) {
  if (a === 0) return '0 Bytes';
  const c = 1024;
  const d = b || 2;
  const e = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const f = Math.floor(Math.log(a) / Math.log(c));
  // eslint-disable-next-line no-restricted-properties
  return `${parseFloat((a / Math.pow(c, f)).toFixed(d))} ${e[f]}`;
}

export { formatBytes };
