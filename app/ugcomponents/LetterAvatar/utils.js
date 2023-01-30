import bg from './colors';

function getAbbr(name) {
  if (name) {
    let abbr;

    const leanName = name.trim();

    if (leanName) {
      const segments = leanName.trim().split(/ +/);
      if (segments && segments.length > 1) {
        abbr =
          segments[0][0].toUpperCase() +
          segments[segments.length - 1][0].toUpperCase();
      } else {
        abbr = leanName[0].toUpperCase();
      }
    } else {
      abbr = '';
    }

    return abbr;
  }

  return '';
}

function generateColorFromString(str) {
  let color = bg.availableColors[0];

  if (str) {
    const numColorsAvailable = bg.availableColors.length;

    const sum = str.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    const colorIndex = sum % numColorsAvailable;

    color = bg.availableColors[colorIndex];
  }

  return color;
}

export default { getAbbr, generateColorFromString };
