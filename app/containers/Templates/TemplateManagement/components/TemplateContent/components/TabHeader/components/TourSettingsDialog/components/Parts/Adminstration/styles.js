const styles = {
  root: {
    maxWidth: 550,
  },
  formWidth: {
    maxWidth: 400,
    padding: '0 16px',
  },
  grow: {
    flex: '1',
  },
  offsetGrid: {
    padding: 8,
  },
  expansionPanelDetails: {
    display: 'block',
    padding: 0,
  },
  expansionPanel: {
    boxShadow: 'unset',
    margin: 0,
  },
  panelSummaryClasses: {
    padding: 0,
  },
  expansionPanelSummaryContent: {
    // margin: '8px 0',
    paddingRight: 0,
  },
  expansionPanelSummaryExpanded: {
    // Jay: not sure how to override these without important
    margin: 'unset !important',
    // paddingRight: 8,
    paddingLeft: 0,
    minHeight: 'unset !important',
  },
};

export default styles;
