import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import RemainingTasks from '../../logics/RemainingTasks';
import BadgeProgressUI from './components/BadgeProgressUI';

export class BadgeProgress extends PureComponent {
  componentWillMount = () => {
    this.placeholderProps = {
      smallIcons: true,
      deleteIcon: true,
      centerIcons: true,
    };
  };

  renderUI = props => hocProps => <BadgeProgressUI {...props} {...hocProps} />;

  render = () => {
    const { id, ...props } = this.props;

    return <RemainingTasks id={id}>{this.renderUI(props)}</RemainingTasks>;
  };
}

BadgeProgress.propTypes = {
  // hoc props

  // parent props
  id: PropTypes.oneOfType([PropTypes.array, PropTypes.number]), // could be a single ID or an array of IDs

  // resaga props
};

BadgeProgress.defaultProps = {
  id: 0,
};

export default BadgeProgress;
