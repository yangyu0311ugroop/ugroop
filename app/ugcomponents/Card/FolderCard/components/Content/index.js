import { URL_HELPERS } from 'appConstants';
/**
 * Created by paulcedrick on 7/17/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import UGCardContent from 'ugcomponents/Card/UGCardContent';
import TourEntryListView from './components/ListView';
import TourEntryListItem from './components/ListItem';
import styles from './styles';

export const makeViewDelegate = (viewDef, coll, ...args) => ({
  numberOfRow: () => coll.length,
  itemCellView: index => viewDef(coll[index], index, args),
});

export const subFolderViewDef = (elem, index, baseUrl) => (
  <TourEntryListItem
    key={index}
    type="folder"
    content={elem.content}
    index={index}
    url={`${baseUrl}?current=${elem.id}`}
  />
);

export const tourViewDef = (elem, index, queryParam) => (
  <TourEntryListItem
    key={index}
    type="tour"
    content={elem.content}
    index={index}
    url={`${URL_HELPERS.tours(elem.id)}?${queryParam}`}
  />
);

export const FolderCardContent = ({
  itemBaseUrl,
  classes,
  tours,
  folders,
  templateQueryParam,
}) => {
  const subfoldersViewDelegate = makeViewDelegate(
    subFolderViewDef,
    folders,
    itemBaseUrl,
  );

  const toursViewDelegate = makeViewDelegate(
    tourViewDef,
    tours,
    templateQueryParam,
  );

  let content = (
    <div className={classes.ugTemplateFolderContentContainer}>
      <ul className={classes.ugTemplateItemListContainer}>
        <TourEntryListView
          noULWrap
          key="folders"
          viewDelegate={subfoldersViewDelegate}
        />
        <TourEntryListView
          noULWrap
          key="tours"
          viewDelegate={toursViewDelegate}
        />
      </ul>
    </div>
  );

  if (folders.length + tours.length === 0) {
    content = (
      <div
        className={classnames(
          classes.ugTemplateFolderContentContainer,
          classes.ugEmptyFolder,
        )}
      >
        <p>No items included</p>
      </div>
    );
  }

  return (
    <UGCardContent
      className={classnames(classes.ugTemplateFolderContent, {
        [classes.ugTemplateFolderContentEmpty]:
          tours.length + folders.length === 0,
      })}
    >
      {content}
    </UGCardContent>
  );
};

FolderCardContent.propTypes = {
  classes: PropTypes.object,
  itemBaseUrl: PropTypes.string.isRequired,
  tours: PropTypes.array,
  folders: PropTypes.array,
  templateQueryParam: PropTypes.string,
};

FolderCardContent.defaultProps = {
  classes: {},
  tours: [],
  folders: [],
  templateQueryParam: '',
};

export default withStyles(styles)(FolderCardContent);
