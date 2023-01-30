import React, { memo, useState } from 'react';
import resaga from 'resaga';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { DEFAULT, FLAT_BUTTON, SECTION_ACTION } from 'appConstants';
import { makeStyles } from 'components/material-ui';
import GridItem from 'components/GridItem';
import GridContainer from 'components/GridContainer';

import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Icon from 'ugcomponents/Icon';
import IconButton from 'ugcomponents/Buttons/IconButton';
import { VARIANTS } from 'variantsConstants';
import Popper from 'components/Popper';
import JText from 'components/JText';
import Button from 'viewComponents/Button';
import Formsy from 'formsy-react';
import withDayIds from 'smartComponents/Node/types/Template/hocs/withDayIds';
import { useSelector } from 'react-redux';
import { scrollOptions } from 'utils/constant';
import { scroller } from 'react-scroll';
import { NODE_STORE_RESELECTORS } from 'datastore/nodeStore/selectorsViaConnect';
import tabs from 'datastore/templateManagementStore/helpers/tabs';
import { capitalizeFirstLetter } from 'utils/stringAdditions';
import { get, last } from 'lodash';

import {
  MOVE_NODE_AFTER,
  MOVE_NODE_BEFORE,
  MOVE_NODE_CHILD,
  NODE_API,
} from 'apis/constants';
import { DAY } from 'utils/modelConstants';
import classnames from 'classnames';
import { CONFIG, CONFIG2 } from './config';
import DayfieldSelect from './components/DayFieldSelect';
import SectionFieldSelect from './components/SectionFieldSelect';

// eslint-disable-next-line no-unused-vars
const styles = ({ colors }) => ({
  noPadding: {
    padding: 0,
  },
  container: {
    // margin: 16,
    padding: 8,
  },
  popper: {
    zIndex: 1000,
    minWidth: 300,
  },
  grow: {
    flex: 1,
  },
  rotate45: {
    transform: 'rotate(45deg)',
    color: '#E91E63 !important',
    fontWeight: 'bold',
  },
  icon: {
    transition: 'transform 0.15s ease-in',
  },
  actionButtons: {
    overflow: 'hidden',
    borderRadius: 2,
  },
});

const useStyles = makeStyles(styles);
// export const CopyMove = memo(props => {
export const CopyMove = memo(props => {
  // function CopyMove(props) {
  const {
    action,
    parentId,
    templateId,
    ids,
    dayIds,
    visibleTabIds,
    parentType,
    simpleMenu,
    ...prop
  } = props;
  const [selectedParentId, setStateParentId] = useState(parentId);
  const [selectedSectionId, setStateSectionId] = useState(
    LOGIC_HELPERS.ifElse(ids.length === 1, prop.id, last(ids)),
  );
  const [isLoading, setLoading] = useState(false);

  let closeMenuFn = null;

  const selectionIds = useSelector(state =>
    NODE_STORE_RESELECTORS.getNodeChildren(state, selectedParentId),
  );

  const customTabIds = useSelector(state =>
    NODE_STORE_RESELECTORS.getcustomTabIds(state, visibleTabIds),
  );

  const icon = open =>
    open
      ? 'lnr-plus'
      : LOGIC_HELPERS.ifElse(
          action === SECTION_ACTION.MOVE,
          'lnr-exit-right2',
          'lnr-copy',
        );

  const classes = useStyles();

  // eslint-disable-next-line react/prop-types
  const renderButton = ({ openMenu, open }) => (
    <IconButton
      onClick={openMenu}
      tooltip={capitalizeFirstLetter(action)}
      variant={FLAT_BUTTON}
      transparent
      data-testid="popperButton"
    >
      <Icon
        icon={icon(open)}
        className={classnames(
          classes.icon,
          LOGIC_HELPERS.ifElse(open, classes.rotate45),
        )}
      />
    </IconButton>
  );

  const onClose = () => {
    setLoading(false);
    setStateSectionId(
      LOGIC_HELPERS.ifElse(ids.length === 1, prop.id, last(ids)),
    );
    setStateParentId(parentId);
  };

  const getSectionIds = () =>
    // if (!Array.isArray(selectionIds)) return [];
    LOGIC_HELPERS.ifElse(parentId === selectedParentId, ids, [
      ...selectionIds,
      -1,
    ]);
  const onDayChanged = newId => {
    if (selectedParentId !== newId) {
      if (newId === parentId && ids.length === 1) {
        setStateSectionId(prop.id);
      } else {
        setStateSectionId(-1);
      }
      setStateParentId(newId);
    }
  };

  const onMoveSuccess = ({ sourceId, targetId, source, destination }) => () => {
    if (sourceId === targetId) {
      prop.resaga.setValue({
        nodes: tabs.moveChildren(sourceId, source, destination),
      });
    } else {
      prop.resaga.setValue({
        nodes: tabs.moveRemoveChildren(sourceId, targetId, source, destination),
        selectedId: selectedParentId,
      });
    }
    setLoading(false);
    if (dayIds.includes(selectedParentId)) {
      scroller.scrollTo(`scroller-node-${selectedParentId}`, scrollOptions);
    }
    return closeMenuFn();
  };

  const onMoveError = () => setLoading(false);

  const updateServer = (source, destination) => {
    const { id, sectionIds } = prop;

    let ACTION = MOVE_NODE_AFTER;
    if (!selectionIds.length) {
      ACTION = MOVE_NODE_CHILD;
    } else if (
      (destination < source && parentId === selectedParentId) ||
      (parentId !== selectedParentId && selectedSectionId !== -1)
    ) {
      ACTION = MOVE_NODE_BEFORE;
    }

    const toBeMovedId = id;
    const targetId = LOGIC_HELPERS.ifElse(
      selectedSectionId === -1,
      last(selectionIds),
      get(selectionIds, destination),
    );

    return prop.resaga.dispatchTo(NODE_API, ACTION, {
      payload: {
        id: targetId,
        toBeMovedId,
        tabId: toBeMovedId,
        children: sectionIds,
        parentNodeId: selectedParentId,
      },
      onSuccess: onMoveSuccess({
        sourceId: parentId,
        targetId: selectedParentId,
        source,
        destination,
      }),
      onError: onMoveError,
    });
  };

  const handleValidSubmit = () => {
    const destChildren = LOGIC_HELPERS.ifElse(
      parentId === selectedParentId,
      ids,
      selectionIds,
    );
    const source = ids.indexOf(prop.id);
    setLoading(true);

    let destination = destChildren.indexOf(selectedSectionId);
    if (destination === -1) {
      destination = destChildren.length;
    }
    return updateServer(source, destination);
  };

  const renderContent = param => {
    // eslint-disable-next-line no-unused-vars
    const { closeMenu } = param;
    const buttonDisabled =
      isLoading ||
      (parentId === selectedParentId && prop.id === selectedSectionId);

    closeMenuFn = closeMenu;
    return (
      <Formsy onValidSubmit={handleValidSubmit}>
        <GridContainer
          direction="column"
          className={classes.container}
          spacing={2}
        >
          <GridItem>
            <JText bold uppercase>
              Select Destination
            </JText>
          </GridItem>
          <GridItem>
            <GridContainer noWrap>
              <GridItem>
                <DayfieldSelect
                  selectedValue={selectedParentId}
                  templateId={templateId}
                  onClickMenu={onDayChanged}
                  ids={dayIds}
                  customTabIds={customTabIds}
                  currentValue={parentId}
                  type={parentType}
                  simple={simpleMenu}
                />
              </GridItem>
              <GridItem>
                <SectionFieldSelect
                  selectedValue={selectedSectionId}
                  onClickMenu={setStateSectionId}
                  ids={getSectionIds()}
                  id={prop.id}
                />
              </GridItem>
            </GridContainer>
          </GridItem>

          <GridItem>
            <Button
              noMargin
              dense
              size="xs"
              color={LOGIC_HELPERS.ifElse(buttonDisabled, 'gray', 'primary')}
              type="submit"
              disabled={buttonDisabled}
              loading={isLoading}
              data-testid="test-submit"
            >
              <JText capitalize>Move Section</JText>
            </Button>
          </GridItem>
        </GridContainer>
      </Formsy>
    );
  };

  const popperTitle = (
    <JText bold>
      <JText capitalize>{action} Section</JText>
    </JText>
  );

  const renderPopper = () => (
    <Popper
      placement="bottom"
      stopPropagation
      renderButton={renderButton}
      noPadding
      menuHeader={popperTitle}
      className={classes.popper}
      onExit={onClose}
      disableFullScreen
      // fullWidth
    >
      {renderContent}
    </Popper>
  );

  return LOGIC_HELPERS.switchCase(prop.variant, {
    [VARIANTS.MENU_ITEM]: renderPopper,
    [DEFAULT]: renderPopper,
  });
});

CopyMove.propTypes = {
  resaga: PropTypes.object.isRequired,
  id: PropTypes.number,
  parentId: PropTypes.number,
  templateId: PropTypes.number,
  action: PropTypes.string,
  variant: PropTypes.string,
  ids: PropTypes.array,
  dayIds: PropTypes.array,
  visibleTabIds: PropTypes.array,
  parentType: PropTypes.string,
  simpleMenu: PropTypes.bool,
};

CopyMove.defaultProps = {
  ids: [],
  dayIds: [],
  visibleTabIds: [],
  parentType: DAY,
};

export default compose(
  resaga(CONFIG),
  withDayIds,
  resaga(CONFIG2),
)(CopyMove);
