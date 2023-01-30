import React from 'react';
import PropTypes from 'prop-types';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import GridContainer from 'components/GridContainer';

import Node from 'smartComponents/Node';
import { VARIANTS } from 'variantsConstants';

import { compose } from 'redux';
import resaga from 'resaga';
import { withRouter } from 'react-router-dom';
import { URL_CHECKER } from 'utils/helpers/url';
import get from 'lodash/get';
import { injectIntl } from 'react-intl';
import GridItem from 'components/GridItem';
import classnames from 'classnames';
import NewTour from 'smartComponents/Node/components/NewTour';
import Button from 'viewComponents/Button';
import Icon from 'ugcomponents/Icon';
import { withStyles } from 'components/material-ui';
import styles from './styles';
import {
  CONFIG,
  CONFIG_USER_ORGANISATIONS,
  CONFIG_ORG_MEMBERS,
  ROOT_NODE_IDS_CONFIG,
} from './config';
import ButtonActions from '../ButtonActions';

export function TemplateList(props) {
  const checkValue = val => val === 0;

  const {
    location,
    classes,
    organisationId,
    folderId,
    parentNodeId,
    folderFormOpen,
    templateQueryParam,
    folderIds,
    userId,
    memberIds,
    rootNodeIds,
    baseUrl,
    sortedIds,
    renderPagination,
    children,
  } = props;

  const isOnMyTours = () => {
    const pathname = get(location, 'pathname', null);

    const returned = LOGIC_HELPERS.ifElse(
      URL_CHECKER.isOnMyToursPage(pathname),
      true,
      false,
    );
    return returned;
  };

  const renderAddButtons = () => buttonActions => (
    <Button
      textAlign="left"
      block
      dense
      noPadding
      size="extraSmall"
      className={classnames(classes.grid, classes.newTourGrid)}
      onClick={buttonActions.onAddFolderBtnClicked}
    >
      <GridContainer direction="column" spacing={0}>
        <GridItem>
          <GridContainer alignItems="center">
            <GridItem>
              <Icon color="success" size="xsmall" bold icon="lnr-plus" />
            </GridItem>
            <GridItem>
              <span className={classes.newTour}>Create Folder</span>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </Button>
  );

  // eslint-disable-next-line react/prop-types
  const renderNewTourButton = ({ onClick }) => {
    if (folderFormOpen) return null;
    const id = parentNodeId ? folderId : null;
    const buttonContent = !organisationId
      ? 'Edit and share content with your friends or family'
      : 'Edit and share content with your team or the organisation';

    return (
      <GridItem item xs={12} s={6} md={4}>
        <GridContainer
          direction="column"
          className={classnames(classes.newGrid)}
        >
          <GridItem>
            <GridContainer alignItems="center" spacing={2} justify="center">
              <GridItem>
                <Icon icon="lnr-papers" size="small" color="grey" />
              </GridItem>
              <GridItem>
                <Icon icon="lnr-plane" size="small" color="grey" />
              </GridItem>
              <GridItem>
                <Icon icon="lnr-folder" size="small" color="grey" />
              </GridItem>
              <GridItem>
                <Icon icon="lnr-document2" size="small" color="grey" />
              </GridItem>
              <GridItem>
                <Icon icon="lnr-link" size="small" color="grey" />
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem>
            <span className={classes.newTourSubTitle}>{buttonContent}</span>
          </GridItem>
          <GridItem>
            <Button
              textAlign="left"
              block
              dense
              noPadding
              size="extraSmall"
              className={classnames(classes.grid, classes.newTourGrid)}
              onClick={onClick}
            >
              <GridContainer direction="column" spacing={0}>
                <GridItem>
                  <GridContainer alignItems="center" noWrap>
                    <GridItem>
                      <Icon
                        color="success"
                        size="xsmall"
                        bold
                        icon="lnr-plus"
                      />
                    </GridItem>
                    <GridItem>
                      <span className={classes.newTour}>
                        Add a new tour, trip or journey
                      </span>
                    </GridItem>
                  </GridContainer>
                </GridItem>
              </GridContainer>
            </Button>
          </GridItem>
          <GridItem>
            <ButtonActions>{renderAddButtons(id)}</ButtonActions>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  const renderNewTour = () => (
    <NewTour
      organisationId={organisationId}
      userId={userId}
      folderFormOpen={folderFormOpen}
    >
      {renderNewTourButton}
    </NewTour>
  );

  const renderTemplateItem = id => {
    const hasNoRootNodeIds = rootNodeIds.every(checkValue);

    return (
      <Node
        id={id}
        variant={VARIANTS.CARD_ITEM}
        baseUrl={`${baseUrl}`}
        templateQueryParam={templateQueryParam}
        memberIds={memberIds}
        hasNoRootNodeIds={hasNoRootNodeIds}
        isOnMyTours={isOnMyTours()}
        parentFolderIds={folderIds}
        isActionBtn
      />
    );
  };

  const renderTemplateList = ids =>
    Array.isArray(ids) ? (
      sortedIds.map(id => {
        if (id) {
          return renderTemplateItem(id);
        }

        return <div />;
      })
    ) : (
      <div />
    );

  const templateList = renderTemplateList(sortedIds);
  return (
    <GridContainer direction="column" spacing={2}>
      <GridItem>
        <GridContainer spacing={3}>
          {children}
          {renderNewTour()}
          {templateList}
          {renderPagination}
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
}
TemplateList.propTypes = {
  children: PropTypes.node.isRequired,
  renderPagination: PropTypes.node,
  templateQueryParam: PropTypes.string,
  folderIds: PropTypes.array,
  organisationId: PropTypes.number,
  folderId: PropTypes.number,

  // eslint-disable-next-line react/no-unused-prop-types
  sortFieldValue: PropTypes.string,
  // config
  parentNodeId: PropTypes.number,
  folderFormOpen: PropTypes.bool,
  // hoc
  classes: PropTypes.object.isRequired,
  baseUrl: PropTypes.string,
  location: PropTypes.object,

  // resaga
  memberIds: PropTypes.array,
  rootNodeIds: PropTypes.array,
  sortedIds: PropTypes.array,
  userId: PropTypes.number,
};

TemplateList.defaultProps = {
  renderPagination: '',
  templateQueryParam: '',
  folderIds: [],
  sortFieldValue: 'content',
};

export default compose(
  withRouter,
  withStyles(styles, { name: 'TemplateList' }),
  injectIntl,
  resaga(CONFIG),
  resaga(CONFIG_USER_ORGANISATIONS),
  resaga(CONFIG_ORG_MEMBERS),
  resaga(ROOT_NODE_IDS_CONFIG),
)(React.memo(TemplateList));
