export const processStylesheet = (keyName, stylesheet) => {
  const styleObjKey = Object.keys(stylesheet);
  let tempObj = stylesheet;
  for (let i = 0; i < styleObjKey.length; i += 1) {
    tempObj = Object.assign({}, tempObj, {
      [styleObjKey[i]]: `${keyName}-${styleObjKey[i]}`,
    });
  }
  return tempObj;
};

export default function mockStylesheet(
  componentName,
  stylesheet,
  theme = {},
  opt,
) {
  let mockStyle = {};

  if (stylesheet) {
    if (typeof stylesheet === 'object') {
      mockStyle = processStylesheet(componentName, stylesheet);
    } else {
      const style = stylesheet(theme, opt);
      mockStyle = processStylesheet(componentName, style);
    }
  }

  return mockStyle;
}
