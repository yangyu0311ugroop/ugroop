import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { pluralizeText } from 'utils/stringAdditions';
import { VARIANTS } from 'variantsConstants';
import { H6 } from 'viewComponents/Typography';
import Icon from 'viewComponents/Icon';
import ReactionCount from 'smartComponents/Node/logics/ReactionCount';
import Button from 'viewComponents/Button';
import classnames from 'classnames';
import ReactionList from '../ReactionList';
import { CONFIG } from './config';
import styles from './styles';

export class ReactionSummary extends PureComponent {
  state = {
    openList: false,
  };

  handleClick = () => this.setState({ openList: true });

  handleClose = () => this.setState({ openList: false });

  renderCountText = showCountOnly => (reactionCount, hasReacted) => {
    if (!hasReacted || showCountOnly)
      return (
        <H6 dense subtitle>
          {reactionCount}
        </H6>
      );

    const count = reactionCount - 1;

    if (count === 0)
      return (
        <H6 dense subtitle>
          You liked this
        </H6>
      );

    return (
      <H6 dense subtitle>
        You and {reactionCount - 1} {pluralizeText('other', count)}
      </H6>
    );
  };

  render = () => {
    const { classes, id, showCountOnly, reactions, showEmpty } = this.props;
    const { openList } = this.state;

    if (reactions.length === 0 && !showEmpty) return null;

    return (
      <>
        <Button
          variant={VARIANTS.INLINE}
          size="xs"
          dense
          onClick={this.handleClick}
        >
          <GridContainer
            className={classnames(classes.root, classes.noWrap)}
            wrap="nowrap"
          >
            <GridItem>
              <Icon color="blue" icon="lnr-thumbs-up" size="xxs" />
            </GridItem>
            <GridItem>
              <ReactionCount id={id}>
                {this.renderCountText(showCountOnly)}
              </ReactionCount>
            </GridItem>
          </GridContainer>
        </Button>
        <ReactionList onClose={this.handleClose} open={openList} id={id} />
      </>
    );
  };
}

ReactionSummary.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  showCountOnly: PropTypes.bool,
  showEmpty: PropTypes.bool,

  // resaga props
  reactions: PropTypes.array,
};

ReactionSummary.defaultProps = {
  showCountOnly: false,
  reactions: [],
};

export default compose(
  withStyles(styles, { name: 'ReactionSummary' }),
  resaga(CONFIG),
)(ReactionSummary);
