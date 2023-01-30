import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import UGCardFooter from 'ugcomponents/Card/UGCardFooter';
import { pluralizeText } from 'utils/stringAdditions';
import styles from './styles';

const renderEmptyFolderInfo = classes => (
  <div className={classes.ugFolderInfo}>
    <p className={classes.text}>Folder is empty</p>
  </div>
);

export const FolderCardFooter = ({
  tourCount,
  subfolderCount,
  classes,
  actions,
}) => {
  const pluralFolder = pluralizeText('Folder', subfolderCount);
  const pluralTour = pluralizeText('Tour', tourCount);

  const folderText =
    subfolderCount > 0 ? (
      <p className={classes.text}>
        {subfolderCount} {pluralFolder}
      </p>
    ) : (
      ''
    );
  const tourText =
    tourCount > 0 ? (
      <p className={classes.text}>
        {tourCount} {pluralTour}
      </p>
    ) : (
      ''
    );

  const dot =
    subfolderCount > 0 && tourCount > 0 ? (
      <p className={classnames(classes.dot, classes.text)} />
    ) : (
      ''
    );

  let content = (
    <div className={classes.ugFolderInfo}>
      {folderText}
      {dot}
      {tourText}
    </div>
  );

  if (tourCount + subfolderCount === 0) {
    content = renderEmptyFolderInfo(classes);
  }

  return (
    <UGCardFooter className={classes.ugTemplateFolderFooter}>
      {content}
      {actions}
    </UGCardFooter>
  );
};

FolderCardFooter.propTypes = {
  classes: PropTypes.object,
  tourCount: PropTypes.number,
  subfolderCount: PropTypes.number,
  actions: PropTypes.node,
};

FolderCardFooter.defaultProps = {
  classes: {},
  tourCount: 0,
  subfolderCount: 0,
  actions: '',
};

export default withStyles(styles)(FolderCardFooter);
