import scalingFontSize from 'theme/scalingFontSize';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: 16,
  },
  grow: {
    flex: '1',
  },
  padding: {
    padding: '0 5%',
  },
  dayPadding: {
    paddingBottom: 32,
  },
  contentStyle: {
    backgroundColor: '#f6f8fa',
  },
  sectionContainer: {
    width: 'unset',
    padding: '0 5%',
    boxSizing: 'content-box',
  },
  borderBottom: {
    borderBottom: 'solid 1px #cbdbe3',
  },
  carouselPadding: {
    padding: '0 5%',
  },
  paddingLarge: {
    padding: '0 18%',
  },
  eventsRoot: {
    padding: '14px 0',
  },
  eventsLabel: {
    fontWeight: 600,
    color: '#495873',
    ...scalingFontSize(theme).TITLE,
    marginBottom: 8,
    padding: 0,
  },
});
export default styles;
