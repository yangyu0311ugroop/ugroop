import { compose } from 'redux';
import PropTypes from 'prop-types';
import React from 'react';
import resaga from 'resaga';
import TextTruncate from 'react-text-truncate';
import classnames from 'classnames';
import GridItem from '../../../../../../components/GridItem';
import { Category, CONTENT, URL_HELPERS } from '../../../../../../appConstants';
import NodeProp from '../../../../components/NodeProp';
import { makeStyles } from '../../../../../../components/material-ui';
import GridContainer from '../../../../../../components/GridContainer';
import Hr from '../../../../../../components/Hr';
import { CHECKLISTS } from '../../../../../../utils/modelConstants';
import { VARIANTS } from '../../../../../../variantsConstants';
import Checklist from '../../../Checklist';
import PublishedBy from '../../../../../MarketPlace/components/publisherBy';
import UGNavLink from '../../../../../../components/NavLink';

export const CONFIG = {
  value: {},
};

const style = () => ({
  root: {},
  grow: {
    flex: '1',
  },
  ellipsisDiv: {
    width: '100%',
    // minHeight: 46,
  },
  relative1: {
    position: 'relative',
    zIndex: 1,
  },
  content: {
    color: '#1a2b49',
    fontWeight: 600,
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    maxHeight: 42,
    whiteSpace: 'normal',
    fontSize: 14,
  },
  subtitle: {
    color: '#6d7688',
    fontSize: 12,
    padding: '8px 16px 8px 16px',
    minHeight: 100,
    maxHeight: 120,
  },
  checkList: {
    color: '#6d7688',
    fontSize: 11,
  },
  checkListItem: {
    padding: '2px 4px 2px 4px',
  },
  title: {
    width: '100%',
    padding: '8px 16px',
    background: '#e3eaf0',
    maxHeight: 35,
    height: 35,
  },
  grid: {
    // cursor: 'pointer',
  },
  tourGrid: {
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '1px 1px 3px 0px #c5c5c5',
    borderRadius: 4,
    transition: '300ms cubic-bezier(.08,.52,.52,1) box-shadow',

    '& $starred': {
      visibility: 'hidden',
    },

    '&:hover $starred': {
      transition: 'transform 0.2s, visibility 0.4s',
      transform: 'translate3d(-8px, 0, 0)',
      visibility: 'visible',
    },
    // '&:hover': {
    //   boxShadow: '1px 1px 3px 2px #c5c5c5',
    // },
  },
  card: {
    minHeight: 190,
    maxHeight: 210,
    background: 'white',
    borderRadius: 4,
  },
  publishBy: {
    padding: '4px 16px 8px 16px',
  },
});

const useStyles = makeStyles(style);
function CheckGroupDoubleCard(props) {
  const classes = useStyles();
  const { id, checklists } = props;

  const renderTitle = () => (
    <UGNavLink
      to={URL_HELPERS.productDetail({ category: Category.CheckList, id })}
    >
      <GridItem className={classnames(classes.ellipsisDiv, classes.relative1)}>
        <NodeProp
          id={id}
          valueKey={CONTENT}
          editable={false}
          showEmpty
          ellipsis
          className={classes.content}
          ellipsisClassName={classes.ellipsisDiv}
          component={TextTruncate}
          isTextAttrb
          componentProps={{
            lines: 1,
            ellipsis: '...',
            textElement: 'span',
            maxCalculateTimes: 1,
          }}
        />
      </GridItem>
    </UGNavLink>
  );

  const renderCheckGroupTitle = () => (
    <div className={classnames(classes.title)}>
      <GridContainer direction="column" spacing={0}>
        {renderTitle()}
      </GridContainer>
    </div>
  );

  const andReadMore = () => {
    if (checklists && checklists.length > 4) {
      return (
        <GridItem className={classes.checkListItem}>
          <UGNavLink
            to={URL_HELPERS.productDetail({
              category: Category.CheckList,
              id,
            })}
          >
            and more
          </UGNavLink>
        </GridItem>
      );
    }
    return null;
  };
  const renderCheckLists = () => {
    const strippedCheckList = checklists && checklists.slice(0, 4);
    const checkLists =
      strippedCheckList &&
      strippedCheckList.map((cid, index) => (
        <GridItem className={classes.checkListItem}>
          <Checklist
            key={cid}
            variant={VARIANTS.ONE_LINE_PREVIEW}
            id={cid}
            index={index}
            childKey={CHECKLISTS}
            isTextAttrb
            componentProps={{
              lines: 1,
              ellipsis: '...',
              textElement: 'span',
              maxCalculateTimes: 1,
            }}
            component={TextTruncate}
          />
        </GridItem>
      ));
    return (
      <GridItem>
        <GridContainer direction="column" spacing={0}>
          {checkLists}
          {andReadMore()}
        </GridContainer>
      </GridItem>
    );
  };

  return (
    <div className={classnames(classes.grid, classes.tourGrid)}>
      <GridContainer
        direction="column"
        spacing={0}
        className={classnames(classes.card)}
      >
        {<GridItem>{renderCheckGroupTitle()}</GridItem>}
        <GridItem>
          <GridContainer
            direction="column"
            className={classnames(classes.subtitle)}
          >
            {renderCheckLists()}
          </GridContainer>
        </GridItem>
        <GridItem>
          <Hr half />
          <div className={classes.publishBy}>
            <PublishedBy id={id} />
          </div>
        </GridItem>
      </GridContainer>
    </div>
  );
}

CheckGroupDoubleCard.propTypes = {
  checklists: PropTypes.array,
  id: PropTypes.number,
};

export default compose(resaga(CONFIG))(React.memo(CheckGroupDoubleCard));
