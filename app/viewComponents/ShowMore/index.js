import React from 'react';
import PropTypes from 'prop-types';
import A from 'htmlComponents/A';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';

export class ShowMore extends React.PureComponent {
  state = {
    more: undefined,
  };

  getMore = () => {
    const { initialMore } = this.props;
    const { more } = this.state;
    return more === undefined ? initialMore : more;
  };

  handleShowMoreClick = event => {
    const { more } = this.state;
    event.preventDefault();
    this.setState({ more: !more });
  };

  renderMore = () => {
    const { renderMore } = this.props;
    return this.getMore() && renderMore();
  };

  renderShowMore = () => (
    <A href="showMore" onClick={this.handleShowMoreClick}>
      Show more
    </A>
  );

  render = () => {
    const more = this.renderMore();
    return (
      <GridContainer direction="column">
        {!more && <GridItem>{this.renderShowMore()}</GridItem>}
        {more && <GridItem>{more}</GridItem>}
      </GridContainer>
    );
  };
}

ShowMore.propTypes = {
  // parent
  initialMore: PropTypes.bool,
  renderMore: PropTypes.func,
};

ShowMore.defaultProps = {
  initialMore: false,
  renderMore: () => null,
};

export default ShowMore;
