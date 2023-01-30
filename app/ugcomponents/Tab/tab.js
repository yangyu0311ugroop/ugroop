import React, { Fragment } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Icon from 'ugcomponents/Icon';
import { Tab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

export const stylesheet = theme => ({
  rootPrimarySelected: {
    color: theme.colors.tabHeadColor,
    fontWeight: 800,
    zIndex: '9999',
    borderBottom: 'none',
  },
  rootPrimary: {
    maxWidth: 'unset',
  },
  label: {
    fontSize: 14,
  },
  labelContainer: {
    minHeight: 38,
    padding: '8px 16px',
    width: '100%',
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  labelNoWrap: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  lock: {
    paddingLeft: 8,
  },
  secondary: {
    color: '#b0b9c3',
  },
  selected: {
    color: '#0a2644 !important',
    borderBottom: '#fff !important',
    backgroundColor: '#fff !important',
    fontWeight: 600,
  },
});

const renderLabelDefault = ({ classes, label, privateTab }) => () => (
  <Fragment>
    {label}
    {privateTab && (
      <Icon size="normal" icon="lnr-lock" className={classes.lock} />
    )}
  </Fragment>
);

export const UGTab = ({
  label,
  tabId,
  index,
  active,
  privateTab,
  // eslint-disable-next-line react/prop-types
  accessible,
  classes,
  className,
  renderLabel,
  ...props
}) => (
  <Tab
    label={
      <div className={classes.labelNoWrap}>
        {LOGIC_HELPERS.ifFunction(
          renderLabel,
          [
            {
              index,
              active,
              label,
              privateTab,
              renderLabelDefault: renderLabelDefault({
                classes,
                label,
                privateTab,
              }),
            },
          ],
          renderLabelDefault({ classes, label, privateTab })(),
        )}
      </div>
    }
    className={classnames(className, classes.root)}
    {...props}
    classes={{
      selected: classes.selected,
      root: classes.rootPrimarySelected,
    }}
    component="div"
  />
);

UGTab.propTypes = {
  tabId: PropTypes.number,
  index: PropTypes.number,
  className: PropTypes.string,
  privateTab: PropTypes.bool,
  active: PropTypes.bool,
  classes: PropTypes.object,
  renderLabel: PropTypes.any,
  label: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

UGTab.defaultProps = {
  tabId: 0,
  index: 0,
  label: '',
  className: '',
  privateTab: false,
  classes: {},
};

export default withStyles(stylesheet, { name: 'UGTab' })(UGTab);
