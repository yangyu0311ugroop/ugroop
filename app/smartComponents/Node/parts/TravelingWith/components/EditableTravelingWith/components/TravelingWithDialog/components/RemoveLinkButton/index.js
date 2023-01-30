import { DELETE_LINK, NODE_API } from 'apis/constants';
import {
  LINK_STORE_RESELECTORS,
  NODE_STORE_RESELECTORS,
} from 'datastore/nodeStore/selectorsViaConnect';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import withResaga from 'resaga';
import DeleteButton from 'viewComponents/DeleteButton';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Name from 'smartComponents/Node/parts/Name';
import { DEFAULT, TEXT } from 'appConstants';
import JText from 'components/JText';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { makeStyles } from '@material-ui/core/styles';
import { VARIANTS } from 'variantsConstants';
import Content from '../../../../../../../Content';

const useStyles = makeStyles(() => ({
  root: {},
  name: {
    display: 'flex',
  },
}));

export const RemoveLinkButton = memo(props => {
  const classes = useStyles();
  const { label, onSuccess } = props;
  const groupLinkIds = useSelector(state =>
    NODE_STORE_RESELECTORS.getNodeGroups(state, props.nodeId),
  );
  const groups = useSelector(state =>
    LINK_STORE_RESELECTORS.getLinkNextNodeIds(state, groupLinkIds),
  );
  const fk = groups[0];

  const onSuccessDelete = ({ onClose }) => result => {
    LOGIC_HELPERS.ifFunction(onClose);
    LOGIC_HELPERS.ifFunction(onSuccess, [result]);
  };

  const handleClick = ({ onClose }) => {
    props.resaga.dispatchTo(NODE_API, DELETE_LINK, {
      payload: {
        id: props.nodeId,
        fk,
        linkKey: props.linkId,
        nextNodeChildKey: 'participants',
        prevNodeChildKey: 'groups',
      },
      onSuccess: onSuccessDelete({ onClose }),
    });
  };

  const renderText = () => (
    <JText italic danger link onClick={handleClick} underline>
      {label}
    </JText>
  );

  const headlineText = (
    <JText nowrap>
      <GridContainer noWrap>
        <GridItem>Are you sure you would like to remove</GridItem>
        <GridItem className={classes.name}>
          <Name id={props.nodeId} variant={VARIANTS.TEXT_ONLY} />
          {'?'}
        </GridItem>
      </GridContainer>
    </JText>
  );
  const title = (
    <JText nowrap>
      <GridContainer noWrap>
        <GridItem>This person will be remove from</GridItem>
        <GridItem>
          <JText nowrap ellipsis>
            <Content
              variant={VARIANTS.VALUE_ONLY}
              id={props.parentId}
              ellipsis
            />
          </JText>
        </GridItem>
      </GridContainer>
    </JText>
  );

  const renderDefault = () => (
    <DeleteButton
      dialogTitle={title}
      headlineText={headlineText}
      confirmButton="Remove"
      onClick={handleClick}
    />
  );

  return LOGIC_HELPERS.switchCase(props.variant, {
    [TEXT]: renderText,
    [DEFAULT]: renderDefault,
  });
});

RemoveLinkButton.propTypes = {
  variant: PropTypes.string,
  label: PropTypes.string,
  resaga: PropTypes.object.isRequired,
  nodeId: PropTypes.number,
  linkId: PropTypes.number,
  parentId: PropTypes.number,
  onSuccess: PropTypes.func,
};

export default withResaga()(RemoveLinkButton);
