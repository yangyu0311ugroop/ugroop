import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { FormattedMessage as M } from 'react-intl';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Loader from 'react-loading';
import PropTypes from 'prop-types';
import Icon from 'ugcomponents/Icon';
import IconButton from '@material-ui/core/IconButton';
import m from './messages';
import styles from './styles';

export const BatchDelete = ({
  classes,
  itemSelectedCount,
  onBatchDeleteClicked,
  isBatchDeleteLoading,
}) => {
  const actionText = isBatchDeleteLoading ? (
    <Loader type="spin" width={24} height={24} />
  ) : (
    <Icon icon="trash2" />
  );
  return (
    <GridContainer
      alignItems="center"
      className={classNames(classes.root, classes.text)}
      spacing={0}
    >
      <GridItem xs={11} className={classes.textContainer}>
        {itemSelectedCount} <M {...m.countText} />
      </GridItem>
      <GridItem xs={1} className={classes.actionContainer}>
        <IconButton
          disabled={isBatchDeleteLoading}
          onClick={onBatchDeleteClicked}
        >
          {actionText}
        </IconButton>
      </GridItem>
    </GridContainer>
  );
};

BatchDelete.propTypes = {
  classes: PropTypes.object.isRequired,
  itemSelectedCount: PropTypes.number,
  onBatchDeleteClicked: PropTypes.func.isRequired,
  isBatchDeleteLoading: PropTypes.bool.isRequired,
};

BatchDelete.defaultProps = {
  itemSelectedCount: -1,
};

export default withStyles(styles, { name: 'BatchDelete' })(BatchDelete);
