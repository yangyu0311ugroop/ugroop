import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import P from 'viewComponents/Typography';
import classnames from 'classnames';
import { convertStyleClass } from 'utils/style-utils';
import styles from './styles';

export const Photo = ({ classes, fileId, label, size, shape }) => (
  <label
    htmlFor={fileId}
    className={classnames(
      classes.root,
      convertStyleClass(classes, size),
      LOGIC_HELPERS.ifElse(shape === VARIANTS.ROUND, classes.round),
    )}
  >
    {LOGIC_HELPERS.ifElse(label, <P>{label}</P>)}
    <Icon icon="lnr-camera2" size="mediumXPlus" />
  </label>
);

Photo.propTypes = {
  classes: PropTypes.object.isRequired,
  fileId: PropTypes.string,
  label: PropTypes.node,
  size: PropTypes.string,
  shape: PropTypes.string,
};

Photo.defaultProps = {
  fileId: '',
  label: '',
  size: '',
};

export default withStyles(styles, { name: 'PhotoPlaceholder' })(Photo);
