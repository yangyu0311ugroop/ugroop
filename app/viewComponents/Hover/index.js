import PropTypes from 'prop-types';
import { PureComponent } from 'react';

export class Hover extends PureComponent {
  state = {
    entered: false,
    anchorEl: null,
  };

  handleMouseEnter = ev =>
    this.setState({ entered: true, anchorEl: ev.currentTarget });

  handleMouseLeave = () => this.setState({ entered: false, anchorEl: null });

  render = () => {
    const { children } = this.props;

    return children({
      entered: this.state.entered,
      anchorEl: this.state.anchorEl,
      handleMouseEnter: this.handleMouseEnter,
      handleMouseLeave: this.handleMouseLeave,
    });
  };
}

Hover.propTypes = {
  // hoc props

  // parent props
  children: PropTypes.func.isRequired,

  // resaga props
};

Hover.defaultProps = {};

export default Hover;
