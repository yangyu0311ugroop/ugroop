import React, { PureComponent } from 'react';
import { Motion, spring } from 'react-motion';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Button from 'viewComponents/Button';
import { withStyles } from '@material-ui/core/styles';
import constants from '../defines/constants';
import styles from './footerStyles';

const sliderBlue = '#7097EB';
const sliderGrey = '#dee7eb';

export class CropperFooter extends PureComponent {
  state = {
    opacity: 0,
  };

  componentWillMount = () => {
    this.setState({ opacity: 1 });
  };

  content = style => {
    const { classes, defaultValue, saveLoading } = this.props;
    return (
      <div style={style}>
        <div className={classes.sliderWrapper}>
          <Slider
            min={this.props.min}
            max={this.props.max}
            handleStyle={{
              borderColor: sliderBlue,
              backgroundColor: sliderGrey,
            }}
            trackStyle={{
              backgroundColor: sliderBlue,
            }}
            defaultValue={defaultValue}
            onChange={this.props.onSliderChange}
          />
        </div>
        <div className={classes.footer}>
          <Button size="base" color="alert" onClick={this.props.onClose}>
            {constants.CANCEL}
          </Button>
          <div className={classes.actionBtnContainer}>
            <Button
              size="base"
              className={classes.actionBtn}
              color="base"
              onClick={this.props.onRotate}
            >
              {constants.ROTATE}
            </Button>
            <Button
              size="base"
              className={classes.actionBtn}
              color="primary"
              onClick={this.props.onSave}
              loading={saveLoading}
            >
              {constants.CROP}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  render = () => (
    <Motion
      defaultStyle={{ opacity: 0, height: 0 }}
      style={{ opacity: spring(this.state.opacity) }}
    >
      {style => this.content(style)}
    </Motion>
  );
}

CropperFooter.propTypes = {
  classes: PropTypes.object.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  onSliderChange: PropTypes.func,
  onRotate: PropTypes.func,
  defaultValue: PropTypes.number,
  saveLoading: PropTypes.bool,
};

export default withStyles(styles, { name: 'CropperFooter' })(CropperFooter);
