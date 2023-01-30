import { VARIANTS } from 'variantsConstants';
import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  DOUBLE_CARD,
  CARD,
  COMPRESSED,
  DEFAULT,
  LINE,
  SIMPLE_VIEW,
} from 'appConstants';
import GridItem from 'components/GridItem';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import omit from 'lodash/omit';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

import { CONFIG, CONFIG2 } from './config';
import styles from './styles';
import Card from './variants/Card';
import DoubleCard from './variants/DoubleCard';
import Compressed from './variants/Compressed';
import Line from './variants/Line';
import TemplateCardItem from './variants/TemplateCardItem';
import TemplateListItem from './variants/TemplateListItem';
import SimpleView from './variants/SimpleView';

export class Template extends PureComponent {
  renderDoubleCard = () => {
    const { minimise } = this.props;
    const gridProps = LOGIC_HELPERS.ifElse(
      minimise,
      { xs: 12 },
      { xs: 12, sm: 6, md: 4, lg: 3 },
    );

    return (
      <GridItem {...gridProps}>
        <DoubleCard minimise={minimise} {...this.getProps()} />
      </GridItem>
    );
  };

  // dashboard tours page
  renderCard = () => {
    const { minimise } = this.props;

    const gridProps = LOGIC_HELPERS.ifElse(
      minimise,
      { xs: 12 },
      { xs: 6, sm: 6, md: 4, lg: 3 },
    );

    return (
      <GridItem {...gridProps}>
        <Card minimise={minimise} {...this.getProps()} />
      </GridItem>
    );
  };

  getProps = () => omit(this.props, ['classes']);

  // dashboard home menu tour list on the right
  renderLine = () => <Line {...this.getProps()} />;

  // tour list on the left drawer
  renderCompressed = () => <Compressed {...this.getProps()} />;

  renderSimpleView = () => <SimpleView {...this.getProps()} />;

  renderCardView = () => {
    const {
      showActions,
      id,
      renderActions,
      hasFolders,
      isSharedTours,
      parentFolderIds,
      parentParentNodeId,
      isOnMyTours,
      searchTemplateView,
      content,
      isActionBtn,
      memberIds,
    } = this.props;

    if (typeof searchTemplateView === 'string' && searchTemplateView) {
      const lcSearchTemplateView = searchTemplateView.toLowerCase();
      const lcContentTemplateView = content.toLowerCase();
      if (lcContentTemplateView.indexOf(lcSearchTemplateView) === -1)
        return null;
    }

    return (
      <TemplateCardItem
        id={id}
        showActions={showActions}
        renderActions={renderActions}
        canMove={hasFolders}
        isSharedTours={isSharedTours}
        parentFolderIdsLength={parentFolderIds.length}
        hasNoRootNodeIds={!parentParentNodeId}
        isOnMyTours={isOnMyTours}
        isActionBtn={isActionBtn}
        memberIdsLength={memberIds.length}
      />
    );
  };

  renderListItemView = () => {
    const {
      classes,
      id,
      showActions,
      checkboxProps,
      parentFolderIds,
      memberIds,
      parentParentNodeId,
      isOnMyTours,
      isSharedTours,
      content,
      searchTemplateView,
    } = this.props;

    if (typeof searchTemplateView === 'string' && searchTemplateView) {
      const lcSearchTemplateView = searchTemplateView.toLowerCase();
      const lcContentTemplateView = content.toLowerCase();
      if (lcContentTemplateView.indexOf(lcSearchTemplateView) === -1)
        return null;
    }

    return (
      <TemplateListItem
        parentFolderIdsLength={parentFolderIds.length}
        memberIdsLength={memberIds.length}
        hasNoRootNodeIds={!parentParentNodeId}
        isOnMyTours={isOnMyTours}
        isSharedTours={isSharedTours}
        id={id}
        showActions={showActions}
        classes={classes}
        checkboxProps={checkboxProps}
      />
    );
  };

  // to be implemented
  renderDefault = () => null;

  render = () => {
    const { variant, children, content, search, shouldFilter } = this.props;

    if (typeof search === 'string' && search && shouldFilter) {
      if (!content) return null;
      const lcSearch = search.toLowerCase();
      const lcContent = content.toLowerCase();

      if (lcContent.indexOf(lcSearch) === -1) return null;
    }

    const rendered = LOGIC_HELPERS.switchCase(variant, {
      [DOUBLE_CARD]: this.renderDoubleCard,
      [CARD]: this.renderDoubleCard,
      [COMPRESSED]: this.renderCompressed,
      [LINE]: this.renderLine,
      [VARIANTS.LIST_ITEM]: this.renderListItemView,
      [VARIANTS.CARD_ITEM]: this.renderCardView,
      [SIMPLE_VIEW]: this.renderSimpleView,
      [DEFAULT]: this.renderDefault,
    });

    if (typeof children === 'function') {
      return children({ content: rendered });
    }

    return rendered;
  };
}

Template.propTypes = {
  // hoc
  classes: PropTypes.object,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  variant: PropTypes.string,
  renderActions: PropTypes.func,
  showActions: PropTypes.bool,
  hasFolders: PropTypes.bool,
  checkboxProps: PropTypes.object,
  parentFolderIds: PropTypes.array,
  memberIds: PropTypes.array,
  hasNoRootNodeIds: PropTypes.bool,
  isOnMyTours: PropTypes.bool,
  children: PropTypes.func,
  content: PropTypes.string,

  // resaga
  cardImageUrl: PropTypes.string,
  isSharedTours: PropTypes.number,
  search: PropTypes.string,
  searchTemplateView: PropTypes.string,
  parentParentNodeId: PropTypes.number,

  // customisable props
  minimise: PropTypes.bool,
  shouldFilter: PropTypes.bool,
  isActionBtn: PropTypes.bool,
};

Template.defaultProps = {
  showActions: true,
  cardImageUrl: null,
  parentFolderIds: [],
  memberIds: [],
  variant: DEFAULT,
  searchTemplateView: '',
};

export default compose(
  withStyles(styles, { name: 'TemplateNode' }),
  resaga(CONFIG),
  resaga(CONFIG2),
)(Template);
