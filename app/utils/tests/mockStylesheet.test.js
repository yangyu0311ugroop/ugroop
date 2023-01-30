import mockStylesheet from '../mockStylesheet';

describe('mockStylesheet util', () => {
  it('should convert the value of the object to name of the key together with the component name', () => {
    const componentName = 'Sample';
    const sampleStylesheet = {
      root: {
        width: '1px',
      },
    };
    const expectedStylesheet = {
      root: `${componentName}-root`,
    };
    const actualResult = mockStylesheet(componentName, sampleStylesheet);
    expect(actualResult).toEqual(expectedStylesheet);
  });
  it('should return blank object if no stylesheet was passed or the stylesheet is undefined or null', () => {
    const componentName = 'Sample';
    const expectedStylesheet = {};
    const actualResult = mockStylesheet(componentName, null);
    expect(actualResult).toEqual(expectedStylesheet);
  });

  it('should convert the value of the object returned by a function stylesheet given the theme passed on it', () => {
    const componentName = 'Sample';
    const sampleStylesheet = theme => ({
      root: {
        width: '1px',
      },
      color: theme.color.sample,
    });
    const expectedStylesheet = {
      root: `${componentName}-root`,
      color: `${componentName}-color`,
    };
    const sampleTheme = {
      color: {
        sample: 111,
      },
    };

    const actualResult = mockStylesheet(
      componentName,
      sampleStylesheet,
      sampleTheme,
    );
    expect(actualResult).toEqual(expectedStylesheet);
  });
});
