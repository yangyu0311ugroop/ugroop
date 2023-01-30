import TemplateCard from 'viewComponents/Card/components/TemplateCard';
import { NODE_STORE, URL_HELPERS } from 'appConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { Can } from 'apis/components/Ability/components/Can';
import { FOLDER } from 'utils/modelConstants';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { compose } from 'redux';
import dotProp from 'dot-prop-immutable';
import util from 'containers/Templates/Components/GridView/util';
import { CONFIG as NODE_CONFIG } from 'apis/components/Node/config';
import { GET_PHOTOS } from 'apis/constants';

import ContributorList from '../../components/ContributorList';
import ActionButtons from '../../components/ActionButtons';
import { CONFIG } from './config';

export class TemplateCardItem extends PureComponent {
  componentDidMount() {
    const { id, cardImageUrl } = this.props;
    if (!cardImageUrl && cardImageUrl !== '') {
      // SK: Not a fan of this pattern as it produces a snapshot of the entire config...
      util.dispatch(NODE_CONFIG, GET_PHOTOS, {
        payload: {
          id,
        },
        onSuccess: this.getTemplateImageSuccess,
      });
    }
  }

  getTemplateImageSuccess = result => {
    this.props.resaga.setValue({
      cardImageList: this.getList(result),
    });
  };

  getList = result => (list = {}) =>
    dotProp.set(list, `${this.props.id}`, result[0].content || '');

  renderActions = () => {
    const {
      id,
      renderActions,
      type,
      content,
      parentFolderIdsLength,
      hasNoRootNodeIds,
      isOnMyTours,
    } = this.props;

    const hasFolders = !!parentFolderIdsLength || hasNoRootNodeIds === false;

    const checkFolders = LOGIC_HELPERS.ifElse(
      isOnMyTours,
      !!parentFolderIdsLength,
      hasFolders,
    );

    return LOGIC_HELPERS.ifFunction(
      renderActions,
      [{ id }],
      <Can do="create" on={FOLDER}>
        <ActionButtons
          id={id}
          type={type}
          content={content}
          canMove={checkFolders}
        />
      </Can>,
    );
  };

  render = () => {
    const {
      classes,
      content,
      description,
      startDate,
      weekDay,
      duration,
      showActions,
      id,
      cardImageUrl,
      isSharedTours,
      parentFolderIdsLength,
      isOnMyTours,
      hasNoRootNodeIds,
      isActionBtn,
    } = this.props;

    const hasActions = LOGIC_HELPERS.ifElse(isSharedTours, false, showActions);

    const hasFolders = !!parentFolderIdsLength || hasNoRootNodeIds === false;

    const checkFolders = LOGIC_HELPERS.ifElse(
      isOnMyTours,
      !!parentFolderIdsLength,
      hasFolders,
    );

    return (
      <TemplateCard
        id={id}
        content={content}
        weekDay={weekDay}
        startDate={startDate}
        description={description}
        classes={classes}
        rootClassName="template-entry"
        cardImageUrl={cardImageUrl}
        renderAdditionalContent={
          <ContributorList id={id} dataStore={NODE_STORE} />
        }
        showActions={hasActions}
        baseUrl={URL_HELPERS.tours(id)}
        duration={duration}
        renderActions={this.renderActions}
        checkFolders={checkFolders}
        isActionBtn={isActionBtn}
      />
    );
  };
}

TemplateCardItem.propTypes = {
  resaga: PropTypes.object.isRequired,
  classes: PropTypes.object,
  content: PropTypes.string,
  description: PropTypes.string,
  startDate: PropTypes.string,
  weekDay: PropTypes.number,
  duration: PropTypes.number,
  showActions: PropTypes.bool,
  id: PropTypes.number,
  cardImageUrl: PropTypes.string,
  renderActions: PropTypes.func,
  type: PropTypes.string,
  isSharedTours: PropTypes.string,
  hasNoRootNodeIds: PropTypes.bool,
  isOnMyTours: PropTypes.bool,
  parentFolderIdsLength: PropTypes.number,
  isActionBtn: PropTypes.bool,
};

export default compose(resaga(CONFIG))(TemplateCardItem);
