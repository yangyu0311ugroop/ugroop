import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';

export const styles = {
  root: {
    width: '100%',
    marginTop: 10,
  },
};

export class LinearDeterminate extends React.Component {
  state = {
    completed: 0,
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, this.props.timer);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state;
    const diff = Math.random() * 10;
    let value = completed + diff;
    if (value >= 98) {
      value = 98;
    }
    this.setState({ completed: value });
  };

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <LinearProgress variant="determinate" value={this.state.completed} />
      </div>
    );
  }
}

LinearDeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
  timer: PropTypes.number.isRequired,
};

export default withStyles(styles)(LinearDeterminate);
