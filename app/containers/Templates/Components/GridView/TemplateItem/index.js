import { Can } from 'apis/components/Ability/components/Can';
import { GET_PHOTOS } from 'apis/constants';
import { URL_HELPERS } from 'appConstants';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import dotProp from 'dot-prop-immutable';
import resaga from 'resaga';
import TemplateCard from 'ugcomponents/Card/TemplateCard';
import { CONFIG as NODE_CONFIG } from 'apis/components/Node/config';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { FOLDER } from 'utils/modelConstants';

import ContributorsList from './components/ContributorsList';
import ActionButtons from './components/ActionButtons';
import { CONFIG } from './config';
import util from '../util';

export class UGTemplateItem extends PureComponent {
  componentDidMount = () => {
    const { id, cardImageUrl } = this.props;
    if (!cardImageUrl && cardImageUrl !== '') {
      // SK: Not a fan of this pattern as it produces a snapshot of the entire config...
      // SK: Still not a fan...
      util.dispatch(NODE_CONFIG, GET_PHOTOS, {
        payload: {
          id,
        },
        onSuccess: this.getTemplateImageSuccess,
      });
    }
  };

  getTemplateImageSuccess = result => {
    this.props.resaga.setValue({
      cardImageList: (list = {}) =>
        dotProp.set(list, `${this.props.id}`, result[0].content || ''),
    });
  };

  renderActions = () => {
    const {
      id,
      onDelete,
      onMove,
      onCopy,
      renderActions,
      hasFolders,
    } = this.props;

    return LOGIC_HELPERS.ifFunction(
      renderActions,
      [{ id }],
      <Can do="create" on={FOLDER}>
        <ActionButtons
          onMove={onMove}
          onCopy={onCopy}
          onDelete={onDelete}
          canMove={hasFolders}
        />
      </Can>,
    );
  };

  render = () => {
    const {
      id,
      content,
      classes,
      onDelete,
      isLoading,
      customData,
      rootClassName,
      cardImageUrl,
      showActions,
      dataStore,
      templateQueryParam,
    } = this.props;

    return (
      <TemplateCard
        id={id}
        content={content}
        classes={classes}
        onDelete={onDelete}
        isLoading={isLoading}
        customData={customData}
        rootClassName={rootClassName}
        cardImageUrl={cardImageUrl}
        showActions={showActions}
        dataStore={dataStore}
        templateQueryParam={templateQueryParam}
        baseUrl={URL_HELPERS.tours(id)}
        renderAdditionalContent={
          <ContributorsList id={id} dataStore={dataStore} />
        }
        renderActions={this.renderActions()}
      />
    );
  };
}

UGTemplateItem.propTypes = {
  id: PropTypes.number.isRequired,
  content: PropTypes.node.isRequired,
  classes: PropTypes.object,
  onDelete: PropTypes.func,
  onMove: PropTypes.func,
  onCopy: PropTypes.func,
  isLoading: PropTypes.bool,
  customData: PropTypes.object.isRequired,
  rootClassName: PropTypes.string,
  cardImageUrl: PropTypes.string,
  resaga: PropTypes.object.isRequired,
  showActions: PropTypes.bool,
  dataStore: PropTypes.string,
  templateQueryParam: PropTypes.string,
  renderActions: PropTypes.func,
  hasFolders: PropTypes.bool,
};

UGTemplateItem.defaultProps = {
  cardImageUrl: null,
  rootClassName: '',
  showActions: true,
  dataStore: '',
  templateQueryParam: '',
};

export default compose(resaga(CONFIG))(UGTemplateItem);
