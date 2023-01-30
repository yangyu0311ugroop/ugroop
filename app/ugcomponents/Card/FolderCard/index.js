/**
 * Created by paulcedrick on 7/17/17.
 */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import classnames from 'classnames';
import Sorter from 'utils/sorter';
import UGCard from 'ugcomponents/Card/index';
import FolderCardHeader from './components/Header';
import FolderCardContent from './components/Content';
import FolderCardFooter from './components/Footer';
import EditableFolder from './components/Editable';
import stylesheet from './styles';

export const FolderCard = ({
  id,
  folderItems,
  content,
  baseUrl,
  isLoading,
  classes,
  rootClassName,
  cardImageUrl,
  showActions,
  onEditSubmit,
  onEditCancel,
  isEditable,
  renderActions,
  templateQueryParam,
}) => {
  let overflow = <div />;
  let loading = <div />;
  if (isLoading) {
    overflow = <div className={classes.ugTemplateFolderOverride} />;
    loading = <CircularProgress className={classes.ugTemplateFolderLoading} />;
  }

  const tours = folderItems
    .filter(c => c.type === 'template')
    .sort(Sorter.sortFolderItemsByName());
  const subfolders = folderItems
    .filter(c => c.type === 'folder')
    .sort(Sorter.sortFolderItemsByName());

  const actions = showActions ? renderActions : '';

  const ilist = [{ url: cardImageUrl, key: 1 }, { key: 2 }, { key: 3 }];

  let card = (
    <div className={classes.ugTemplateFolder}>
      {overflow}
      {loading}
      <UGCard withBorder={false}>
        <FolderCardHeader
          id={id}
          images={ilist}
          content={content}
          baseUrl={baseUrl}
          folders={subfolders}
          tours={tours}
        />
        <FolderCardContent
          tours={tours}
          folders={subfolders}
          itemBaseUrl={baseUrl}
          templateQueryParam={templateQueryParam}
        />
        <FolderCardFooter
          tourCount={tours.length}
          subfolderCount={subfolders.length}
          actions={actions}
        />
      </UGCard>
    </div>
  );

  if (isEditable) {
    card = (
      <EditableFolder
        initContent={content}
        currFolderId={id}
        onSubmit={onEditSubmit}
        onCancel={onEditCancel(id)}
      />
    );
  }

  return (
    <Grid item xs={12} md={4} className={classnames(rootClassName)}>
      {card}
    </Grid>
  );
};

FolderCard.propTypes = {
  folderItems: PropTypes.array,
  content: PropTypes.string,
  id: PropTypes.number.isRequired,
  baseUrl: PropTypes.string,
  isLoading: PropTypes.bool,
  classes: PropTypes.object,
  rootClassName: PropTypes.string,
  cardImageUrl: PropTypes.string,
  showActions: PropTypes.bool,
  onEditSubmit: PropTypes.func,
  onEditCancel: PropTypes.func,
  isEditable: PropTypes.bool,
  renderActions: PropTypes.node,
  templateQueryParam: PropTypes.string,
};

FolderCard.defaultProps = {
  folderItems: [],
  content: '',
  rootClassName: '',
  cardImageUrl: '',
  showActions: true,
  isEditable: false,
  onEditSubmit: null,
  onEditCancel: null,
  renderActions: '',
  templateQueryParam: '',
};

export default withStyles(stylesheet)(FolderCard);
