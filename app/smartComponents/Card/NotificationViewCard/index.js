import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { DO_NOTHING_FUNC } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { compose } from 'redux';
import GridItem from 'components/GridItem';
import GridContainer from 'components/GridContainer';
import Header from 'smartComponents/Card/NotificationViewCard/components/Header';
import Content from 'smartComponents/Card/NotificationViewCard/components/Content';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import styles from './styles';

export class NotificationViewCard extends PureComponent {
  render = () => {
    const { classes, fixHeight, onClose, fixWidth, smDown } = this.props;
    return (
      <div
        className={classnames(
          classes.root,
          LOGIC_HELPERS.ifElse(
            fixWidth,
            smDown ? classes.fixWidthSM : classes.fixWidth,
          ),
        )}
      >
        <GridContainer
          direction="column"
          className={classes.relative}
          spacing={0}
        >
          <Header onClose={onClose} />
          <GridItem
            className={classnames(classes.body, fixHeight && classes.fixHeight)}
          >
            <div className={classes.paddingContent}>
              <Content onClose={onClose} />
            </div>
          </GridItem>
        </GridContainer>
      </div>
    );
  };
}

NotificationViewCard.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  fixWidth: PropTypes.bool,
  fixHeight: PropTypes.bool,
  onClose: PropTypes.func,
  smDown: PropTypes.bool,
};
NotificationViewCard.defaultProps = {
  onClose: DO_NOTHING_FUNC,
};

export default compose(
  withStyles(styles, { name: 'NotificationViewCard' }),
  resaga(),
  withSMDown,
)(NotificationViewCard);
