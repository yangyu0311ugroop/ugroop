import ListItem from 'viewComponents/ListItem';
import { URL_HELPERS } from 'appConstants';
import UGLink from 'components/Link';
import React, { PureComponent } from 'react';
import TextTruncate from 'react-text-truncate';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

import ActionButtonsCell from '../../components/ActionButtonsCell';
import ListItemSubtitle from '../../components/ListItemSubtitle';

import { CONFIG } from './config';

export class TemplateListItem extends PureComponent {
  renderSubtitle = () => {
    const { id, duration, lastModifiedBy } = this.props;
    return (
      <ListItemSubtitle
        id={id}
        duration={duration}
        lastModifiedBy={lastModifiedBy}
        type="lastModifiedBy"
      />
    );
  };

  renderDescription = () => {
    const { shortDescription } = this.props;
    const renderDescription = shortDescription || '';
    return (
      <TextTruncate lines={1} text={renderDescription} maxCalculateTimes={1} />
    );
  };

  renderTitle = () => {
    const { classes, id, content } = this.props;
    return (
      <UGLink className={classes.linkItem} to={`${URL_HELPERS.tours(id)}`}>
        {content}
      </UGLink>
    );
  };

  renderSecondColumn = () => {
    const { id, createdBy } = this.props;
    return <ListItemSubtitle id={id} createdBy={createdBy} type="createdBy" />;
  };

  renderActions = () => {
    const {
      id,
      showActions,
      /* parentFolderIdsLength,
      memberIdsLength,
      hasNoRootNodeIds,
      isOnMyTours, */
      isSharedTours,
    } = this.props;

    const hasActions = LOGIC_HELPERS.ifElse(isSharedTours, false, showActions);

    /* const hasFolders =
      !!parentFolderIdsLength ||
      (memberIdsLength !== 0 && hasNoRootNodeIds === false); */

    /* const checkFolders = LOGIC_HELPERS.ifElse(
      isOnMyTours,
      !!parentFolderIdsLength,
      hasFolders,
    ); */

    const actions = hasActions ? <ActionButtonsCell id={id} canMove /> : null;

    return actions;
  };

  render = () => {
    const { checkboxProps, showActions, classes, isSharedTours } = this.props;
    const hasActions = LOGIC_HELPERS.ifElse(isSharedTours, false, showActions);
    return (
      <ListItem
        checkboxProps={checkboxProps}
        hasCheckbox={hasActions}
        icon="document2"
        className={classes.item}
        subtitle={this.renderSubtitle()}
        description={this.renderDescription()}
        title={this.renderTitle()}
        secondColumn={this.renderSecondColumn()}
        action={this.renderActions()}
      />
    );
  };
}

TemplateListItem.propTypes = {
  showActions: PropTypes.bool,
  classes: PropTypes.object,
  id: PropTypes.number,
  checkboxProps: PropTypes.object,
  /* parentFolderIdsLength: PropTypes.number,
  memberIdsLength: PropTypes.number,
  hasNoRootNodeIds: PropTypes.bool,
  isOnMyTours: PropTypes.bool, */
  isSharedTours: PropTypes.string,

  // resaga
  content: PropTypes.string,
  createdBy: PropTypes.object,
  shortDescription: PropTypes.string,
  duration: PropTypes.number,
  lastModifiedBy: PropTypes.object,
};

export default compose(resaga(CONFIG))(TemplateListItem);
