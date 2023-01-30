import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { CONFIG, CHECK_USER_REACTION, GET_LINKS_USERNODE } from './config';

export class ReactionCount extends PureComponent {
  render = () => {
    const { userReactionId, reactions, children } = this.props;
    const hasReacted = userReactionId !== 0;

    return children(reactions.length, hasReacted, userReactionId);
  };
}

ReactionCount.propTypes = {
  // hoc props

  // parent props
  children: PropTypes.func,

  // resaga props
  reactions: PropTypes.array,
  userReactionId: PropTypes.number,
};

ReactionCount.defaultProps = {
  reactions: [],
  userReactionId: 0,
};

export default compose(
  resaga(CONFIG),
  resaga(GET_LINKS_USERNODE),
  resaga(CHECK_USER_REACTION),
)(ReactionCount);
