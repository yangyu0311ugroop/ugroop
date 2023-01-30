import { URL_HELPERS } from 'appConstants';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import UGCardContent from 'ugcomponents/Card/UGCardContent';

import FolderListView from './components/ListView';
import FolderListItem from './components/ListItem';
import styles from './styles';

export const makeViewDelegate = (viewDef, content, ids, ...args) => ({
  numberOfRow: () => ids.length,
  itemCellView: index => viewDef(content[index], ids[index], index, args),
});

export const subFolderViewDef = (content, id, index, baseUrl) => (
  <FolderListItem
    key={index}
    type="folder"
    content={content}
    index={index}
    url={`${baseUrl}?current=${id}`}
  />
);

export const tourViewDef = (content, id, index, queryParam) => (
  <FolderListItem
    key={index}
    type="tour"
    content={content}
    index={index}
    url={`${URL_HELPERS.tours(id)}?${queryParam}`}
  />
);

export class FolderContent extends PureComponent {
  renderContent = () => {
    const {
      classes,
      templateQueryParam,
      itemBaseUrl,
      templateIds,
      folderIds,
      tourContent,
      folderContent,
    } = this.props;
    const toursViewDelegate = makeViewDelegate(
      tourViewDef,
      tourContent,
      templateIds,
      templateQueryParam,
    );
    const subfoldersViewDelegate = makeViewDelegate(
      subFolderViewDef,
      folderContent,
      folderIds,
      itemBaseUrl,
    );
    return (
      <div className={classes.templateFolderContentContainer}>
        <ul className={classes.templateItemListContainer}>
          <FolderListView
            noULWrap
            key="folders"
            viewDelegate={subfoldersViewDelegate}
          />
          <FolderListView
            noULWrap
            key="tours"
            viewDelegate={toursViewDelegate}
          />
        </ul>
      </div>
    );
  };

  renderEmptyContent = () => {
    const { classes } = this.props;
    return (
      <div
        className={classnames(
          classes.templateFolderContentContainer,
          classes.emptyFolder,
        )}
      >
        <p>No items included</p>
      </div>
    );
  };

  render = () => {
    const { classes, templateIds, folderIds } = this.props;

    const content =
      folderIds.length + templateIds.length === 0
        ? this.renderEmptyContent()
        : this.renderContent();
    return (
      <UGCardContent
        className={classnames(classes.ugTemplateFolderContent, {
          [classes.ugTemplateFolderContentEmpty]:
            templateIds.length + folderIds.length === 0,
        })}
      >
        {content}
      </UGCardContent>
    );
  };
}

FolderContent.propTypes = {
  // hoc
  classes: PropTypes.object,

  // parent
  itemBaseUrl: PropTypes.string.isRequired,
  templateQueryParam: PropTypes.string,
  templateIds: PropTypes.array,
  folderIds: PropTypes.array,
  tourContent: PropTypes.array,
  folderContent: PropTypes.array,
};

FolderContent.defaultProps = {
  templateIds: [],
  folderIds: [],
  templateQueryParam: '',
};

export default withStyles(styles, { name: 'FolderContent' })(FolderContent);
