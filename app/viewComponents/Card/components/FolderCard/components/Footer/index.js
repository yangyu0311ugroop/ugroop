import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import UGCardFooter from 'ugcomponents/Card/UGCardFooter';
import { pluralizeText } from 'utils/stringAdditions';

import styles from './styles';

export class Footer extends PureComponent {
  renderEmptyFolderInfo = () => {
    const { classes } = this.props;
    return (
      <div className={classes.folderInfo}>
        <p className={classes.text}>Folder is empty</p>
      </div>
    );
  };

  renderFolderText = () => {
    const { subfolderCount, classes } = this.props;
    const pluralFolder = pluralizeText('Folder', subfolderCount);
    const folderText =
      subfolderCount > 0 ? (
        <p className={classes.text}>
          {subfolderCount} {pluralFolder}
        </p>
      ) : (
        ''
      );
    return folderText;
  };

  renderTourText = () => {
    const { classes, tourCount } = this.props;
    const pluralTour = pluralizeText('Tour', tourCount);

    const tourText =
      tourCount > 0 ? (
        <p className={classes.text}>
          {tourCount} {pluralTour}
        </p>
      ) : (
        ''
      );
    return tourText;
  };

  renderDot = () => {
    const { subfolderCount, tourCount, classes } = this.props;
    const dot =
      subfolderCount > 0 && tourCount > 0 ? (
        <p className={classnames(classes.dot, classes.text)} />
      ) : (
        ''
      );

    return dot;
  };

  renderFooterContent = () => {
    const { classes, tourCount, subfolderCount } = this.props;
    const content =
      tourCount + subfolderCount === 0 ? (
        this.renderEmptyFolderInfo()
      ) : (
        <div className={classes.folderInfo}>
          {this.renderFolderText()}
          {this.renderDot()}
          {this.renderTourText()}
        </div>
      );
    return content;
  };

  render = () => {
    const { classes, actions } = this.props;
    return (
      <UGCardFooter className={classes.templateFolderFooter}>
        {this.renderFooterContent()}
        {actions}
      </UGCardFooter>
    );
  };
}

Footer.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  tourCount: PropTypes.number,
  subfolderCount: PropTypes.number,
  actions: PropTypes.node,
};

Footer.defaultProps = {
  tourCount: 0,
  subfolderCount: 0,
  actions: '',
};

export default withStyles(styles, { name: 'FolderFooter' })(Footer);
