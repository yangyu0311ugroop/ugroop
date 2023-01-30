import { CREATE_LINK, DELETE_LINK, NODE_API } from 'apis/constants';
import { REACTION_LIST, USER_ACTION_LIST } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { FormattedMessage as M } from 'react-intl';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { REACTIONS } from 'utils/modelConstants';
import { VARIANTS } from 'variantsConstants';
import Button from 'viewComponents/Button';
import Icon from 'viewComponents/Icon';
import P from 'viewComponents/Typography';

import { CONFIG } from './config';
import m from './messages';
import styles from './styles';

export class ReactButton extends PureComponent {
  state = {
    loading: false,
  };

  stopLoading = () => this.setState({ loading: false });

  handleClick = () => {
    this.setState({ loading: true });
    const { userNodeId, parentNodeId, id, hasReacted } = this.props;

    // Create node and link the created node
    if (hasReacted) {
      return this.props.resaga.dispatchTo(NODE_API, DELETE_LINK, {
        payload: {
          id: parentNodeId,
          fk: userNodeId,
          linkKey: id,
          parentNodeId,
          prevNodeChildKey: REACTIONS,
          nextNodeChildKey: REACTIONS,
        },
        onSuccess: this.stopLoading,
      });
    }
    // Create link
    return this.props.resaga.dispatchTo(NODE_API, CREATE_LINK, {
      payload: {
        id: parentNodeId,
        data: {
          nextNodeId: userNodeId,
          action: USER_ACTION_LIST.REACT,
          actionContent: {
            type: REACTION_LIST.LIKE,
          },
        },
        prevNodeChildKey: REACTIONS,
        nextNodeChildKey: REACTIONS,
        upsertLinkId: true,
      },
      onSuccess: this.stopLoading,
      onError: this.stopLoading,
    });
  };

  render = () => {
    const { classes, hasReacted } = this.props;
    const { loading } = this.state;

    const color = LOGIC_HELPERS.ifElse(hasReacted, 'base', 'black');
    const iconColor = LOGIC_HELPERS.ifElse(hasReacted, 'blue', 'black');

    const content = loading ? null : (
      <>
        <GridItem>
          <Icon size="xxs" icon="thumbs-up" color={iconColor} />
        </GridItem>
        <GridItem className={classes.label}>
          <P dense success={hasReacted}>
            <M {...m.label} />
          </P>
        </GridItem>
      </>
    );

    return (
      <GridContainer
        className={classes.root}
        alignItems="center"
        justify="center"
        wrap="nowrap"
      >
        <GridItem>
          <Button
            onClick={this.handleClick}
            dense
            color={color}
            size="xxs"
            variant={VARIANTS.INLINE}
            loading={loading}
          >
            <GridContainer alignItems="center" wrap="nowrap">
              {content}
            </GridContainer>
          </Button>
        </GridItem>
      </GridContainer>
    );
  };
}

ReactButton.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  hasReacted: PropTypes.bool,
  id: PropTypes.number,
  parentNodeId: PropTypes.number,

  // resaga props
  userNodeId: PropTypes.number,
};

ReactButton.defaultProps = {
  hasReacted: false,
};

export default compose(
  withStyles(styles, { name: 'ReactButton' }),
  resaga(CONFIG),
)(ReactButton);
