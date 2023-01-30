import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import resaga from 'resaga';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useImmer } from 'use-immer';
import GridContainer from '../../../components/GridContainer';
import GridItem from '../../../components/GridItem';
import Photo from '../../../smartComponents/Organisation/parts/Photo';
import {
  IMAGE_SIZES_CONSTANTS,
  IMAGE_VARIANTS_CONSTANTS,
} from '../../../smartComponents/File/types/Photo/constants';
import { VARIANTS } from '../../../variantsConstants';
import { makeSelectPublished } from '../dataStore/selectors';
import { makeStyles } from '../../../components/material-ui';
import Content from '../../../smartComponents/Node/parts/Content';
import PublishedBy from '../../../smartComponents/MarketPlace/components/publisherBy';
import { H3, Span } from '../../../viewComponents/Typography';
import Description from '../../../smartComponents/Node/parts/Description';
import Node from '../../../smartComponents/Node';
import { CHECKLISTS } from '../../../utils/modelConstants';
import Checklists from '../../../smartComponents/Node/components/Checklists';
import Button from '../../../viewComponents/Button';
import { PORTAL_HELPERS } from '../../Portal/helpers';
import { useMarketplaceContext } from '../context/marketPlaceStateContext';
import { isEmptyString } from '../../../utils/stringAdditions';
import { Category, HEADING, URL_HELPERS } from '../../../appConstants';
import {
  FETCH_EVENTS,
  GET_NODES_VIA_FILTER,
  GET_TEMPLATE_DETAIL,
  GET_TREE,
  NODE_API,
  TEMPLATE_API,
} from '../../../apis/constants';
import TabCardView from '../../Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabCardView';
import {
  makeSelectTourHeaderPhoto,
  makeSelectTimeLineTab,
} from '../../../datastore/nodeStore/selectorsViaConnect';
import { DATASTORE_UTILS } from '../../../datastore';
import { NODE_API_HELPERS } from '../../../apis/components/Node/helpers';
import { padFacadeURL } from '../../../utils/helpers/request';
import Hr from '../../../components/Hr';
import LoadingIndicator from '../../../components/LoadingIndicator';
import Breadcrumb from '../../../ugcomponents/Breadcrumbs';
import { useMarketBreadCrumbs } from '../hooks/useMarketBreadCrumbs';
/* eslint-disable no-return-assign  */
/* eslint-disable no-param-reassign  */

const useStyles = height =>
  // eslint-disable-next-line no-unused-vars
  makeStyles(({ colors }) => ({
    containerSize: {
      maxWidth: 825,
      paddingLeft: 16,
      paddingTop: 10,
    },
    photoBackground: {
      background: '#9e9e9e45',
      borderRadius: 50,
      minHeight: 80,
      minWidth: 80,
    },
    contentPadding: {
      padding: '8px 16px 16px 16px',
      marginBottom: 16,
    },
    contentSize: {
      height: 460,
      overflowY: height >= 460 ? 'scroll' : 'hidden',
      cursor: 'pointer',
    },
    checkList: {
      height: 200,
    },
    breadCrumbs: {
      paddingTop: '13px !important',
    },
  }));

const CONFIG = {
  setValue: {
    ...PORTAL_HELPERS.setValue,
  },
};

export function ProductDetail(props) {
  const [state, dispatchCtx] = useMarketplaceContext();
  const [localState, setLocalState] = useImmer({
    status: '',
    loading: true,
  });
  const classes = useStyles(state.tabCardViewDetectHeight)();

  const renderText = item => <Span>{item.label}</Span>;

  const breadcrumbsItems = useMarketBreadCrumbs(props.category);

  const renderBreadCrumbs = () => (
    <GridItem className={classes.breadCrumbs}>
      <Breadcrumb
        showAllActive
        showLastItem
        renderText={renderText}
        items={[
          ...breadcrumbsItems,
          {
            label: <Content id={id} variant={VARIANTS.VALUE_ONLY} />,
            url: `${URL_HELPERS.productDetail({ category, id })}`,
          },
        ]}
      />
    </GridItem>
  );

  const fetchNodeTree = id => {
    props.resaga.dispatchTo(NODE_API, GET_TREE, {
      payload: {
        id,
      },
      onSuccess: ({ node, eventNodes }) => {
        const ids = [
          ...DATASTORE_UTILS.getObjectIds(node),
          ...DATASTORE_UTILS.getObjectIds(eventNodes),
        ];
        NODE_API_HELPERS.getTimes(
          {
            id: ids[0],
            ids,
          },
          props,
        );
      },
    });
  };

  const fetchEvents = onSuccess => {
    props.resaga.dispatchTo(TEMPLATE_API, FETCH_EVENTS, {
      payload: {
        templateId: id,
      },
      onSuccess,
    });
  };

  const fetchTemplateDetail = onSuccess => {
    props.resaga.dispatchTo(TEMPLATE_API, GET_TEMPLATE_DETAIL, {
      payload: {
        id,
      },
      onSuccess,
    });
  };

  const onSuccessFetchedEvents = () => {
    fetchNodeTree(id);
  };

  const onSuccessFetchTemplate = () => {
    setLocalState(draft => {
      draft.loading = false;
    });
    fetchEvents(onSuccessFetchedEvents);
  };
  const { publisher, id, category, tabId, photoString } = props;
  useEffect(() => {
    if (props.category === Category.CheckList) {
      // get Node details
      const filter = {
        where: {
          id,
          type: {
            inq: ['checkgroup', 'checkitem', 'checklist'],
          },
        },
        include: ['checklists', 'customData'],
      };
      props.resaga.dispatchTo(NODE_API, GET_NODES_VIA_FILTER, {
        payload: {
          filter: JSON.stringify(filter),
        },
      });
    } else {
      // get Template details
      fetchTemplateDetail(onSuccessFetchTemplate);
    }
  }, []);

  useEffect(() => {
    if (!isEmptyString(state.newlyAppliedTemplateRedirectUrl)) {
      if (state.newlyAppliedTemplateRedirectUrl === 'pending') {
        setLocalState(draft => {
          draft.status = 'creating';
        });
      } else {
        // redirect
        setLocalState(draft => {
          draft.status = 'redirecting';
        });
        setTimeout(() => {
          props.history.push(state.newlyAppliedTemplateRedirectUrl);
          dispatchCtx.setNewlyAppliedTemplateRedirectUrl(null);
        }, 2000);
      }
    }
  }, [state.newlyAppliedTemplateRedirectUrl]);

  useEffect(() => {
    if (props.tabId) {
      fetchNodeTree(props.tabId);
    }
  }, [props.tabId]);
  const photoProps = {
    shape: IMAGE_VARIANTS_CONSTANTS.ROUND,
    variant: VARIANTS.READ_ONLY,
    size: IMAGE_SIZES_CONSTANTS.NORMAL,
  };

  const useTemplate = () => {
    PORTAL_HELPERS.openCloneMarketTemplate(
      { id: props.id, category, cb: appliedTemplateSuccessCb },
      { resaga: props.resaga },
    );
  };

  const appliedTemplateSuccessCb = extraData => result => {
    if (extraData.category === Category.CheckList) {
      if (extraData.orgId > 0) {
        dispatchCtx.setNewlyAppliedTemplateRedirectUrl(
          URL_HELPERS.orgChecklists(extraData.orgId),
        );
      } else {
        dispatchCtx.setNewlyAppliedTemplateRedirectUrl(
          URL_HELPERS.checklists(),
        );
      }
    } else {
      dispatchCtx.setNewlyAppliedTemplateRedirectUrl(
        URL_HELPERS.tours(result.cloneId),
      );
    }
  };

  const buttonText = () => {
    if (localState.status === 'creating') {
      return 'Creating...';
    }
    if (localState.status === 'redirecting') {
      return 'Redirecting...';
    }
    return 'Use Template';
  };

  const renderHeader = () => (
    <GridItem>
      <GridContainer justify="space-between" alignItems="center">
        <GridItem>
          <GridContainer alignItems="center" spacing={2}>
            <GridItem>
              <div className={classes.photoBackground}>
                <Photo id={publisher && publisher.orgId} {...photoProps} />
              </div>
            </GridItem>
            <GridItem>
              <GridContainer direction="column">
                <GridItem>
                  <Content id={id} variant={HEADING} />
                </GridItem>
                <GridItem>
                  <PublishedBy id={id} showImage={false} by="Created by" />
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem>
          <Button
            color="primary"
            onClick={useTemplate}
            disabled={!isEmptyString(localState.status)}
          >
            {buttonText()}
          </Button>
        </GridItem>
      </GridContainer>
    </GridItem>
  );

  const renderDescription = () => (
    <GridItem>
      <GridContainer direciton="column">
        <GridItem md={12}>
          <H3 noMargin weight="bold">
            About this template
          </H3>
        </GridItem>
        <GridItem md={12}>
          <Description id={id} renderSeeMore={false} />
        </GridItem>
      </GridContainer>
    </GridItem>
  );

  const renderBody = () => (
    <Checklists
      readOnly
      variant={VARIANTS.READ_ONLY}
      parentNodeId={id}
      showChecklists
      showCheckitems={false}
      editingCheckItem={false}
      editing={false}
    />
  );

  const renderChecklist = () => (
    <Node
      key={id}
      id={id}
      parentNodeId={id}
      childKey={CHECKLISTS}
      renderBody={renderBody}
    />
  );

  // This will render only the header and day view
  const renderTour = () => {
    if (localState.loading) {
      return <LoadingIndicator />;
    }
    return (
      <TabCardView
        templateId={id}
        tabId={tabId}
        isPublic
        showLayout={false}
        image={padFacadeURL(photoString)}
        isLazyLoad={false}
      />
    );
  };

  const onClickTour = event => {
    event.preventDefault();
    props.history.push(URL_HELPERS.tours(id));
  };

  const renderContent = () => {
    let content;
    if (category === Category.CheckList) {
      content = <GridItem md={12}>{renderChecklist()}</GridItem>;
    } else {
      content = (
        <GridItem
          md={12}
          className={classes.contentSize}
          onClick={onClickTour}
          data-testid="previewContent"
        >
          {renderTour()}
        </GridItem>
      );
    }
    return (
      <GridContainer
        direction="column"
        className={classes.contentPadding}
        spacing={3}
      >
        <GridItem md={12}>
          <H3 noMargin weight="bold">
            Preview
          </H3>
        </GridItem>
        {content}
      </GridContainer>
    );
  };
  return (
    <GridContainer
      direction="column"
      className={classes.containerSize}
      spacing={4}
    >
      {renderBreadCrumbs()}
      {renderHeader()}
      {renderDescription()}
      <Hr />
      {renderContent()}
    </GridContainer>
  );
}

ProductDetail.propTypes = {
  id: PropTypes.number,
  publisher: PropTypes.object,
  category: PropTypes.string,
  resaga: PropTypes.object,
  history: PropTypes.object,
  tabId: PropTypes.number,
  photoString: PropTypes.string,
};

ProductDetail.defaultProps = {};

const mapStateToProps = createStructuredSelector({
  publisher: makeSelectPublished,
  tabId: makeSelectTimeLineTab,
  photoString: makeSelectTourHeaderPhoto,
});

export default compose(
  resaga(CONFIG),
  withRouter,
  connect(
    mapStateToProps,
    null,
  ),
)(React.memo(ProductDetail));
