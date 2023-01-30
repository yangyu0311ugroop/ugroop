/**
 * Created by edil on 8/4/17.
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  hidden: {
    display: 'none !important',
    width: 'inherit',
    height: 'inherit',
  },
};

export class UGImageInput extends PureComponent {
  state = {
    value: '',
  };

  componentWillReceiveProps(props) {
    if (this.props.shouldReset !== props.shouldReset) {
      this.resetInput();
    }
  }

  onChange = e => {
    e.preventDefault();
    this.setState({ value: e.target.value });
    let files = [];
    files = e.target.files;
    if (files.length > 0 && files[0].type.includes('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        this.props.setValueOnChange(files[0], reader.result);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  resetInput = () => {
    this.setState({ value: '' });
  };

  render = () => {
    const classes = this.props.classes;
    return (
      <input
        data-testid="image-input"
        type="file"
        id={this.props.fileId}
        accept="image/*"
        onChange={this.onChange}
        value={this.state.value}
        className={classes.hidden}
      />
    );
  };
}

UGImageInput.propTypes = {
  setValueOnChange: PropTypes.func,
  shouldReset: PropTypes.number,
  classes: PropTypes.object,
  fileId: PropTypes.string.isRequired,
};

export default withStyles(styles, { name: 'UGImageInput' })(UGImageInput);
