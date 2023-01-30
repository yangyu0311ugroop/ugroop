import { withStyles } from '@material-ui/core';
import { USER_ID_CONFIG } from 'apis/components/User/config';
import classnames from 'classnames';
import dotProp from 'dot-prop-immutable';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Button from 'viewComponents/Button';
import { CONFIG } from './config';
import styles from './styles';

export const toggleStar = id => (stars = []) => {
  if (stars.indexOf(id) !== -1) {
    return dotProp.delete(stars, stars.indexOf(id));
  }

  return stars.concat(id);
};

export class Star extends PureComponent {
  toggleStar = ev => {
    ev.stopPropagation();
    const { id } = this.props;

    this.props.resaga.setValue({
      stars: toggleStar(Number.parseInt(id, 10)),
    });
  };

  render = () => {
    const { classes, children, starred } = this.props;

    const buttonTitle =
      'Click to star or unstar. Starred items show up at the top of your list.';

    if (typeof children === 'function') {
      return children({ buttonTitle, starred, onClick: this.toggleStar });
    }

    return (
      <Button
        dense
        size="extraSmall"
        buttonTitle={buttonTitle}
        className={classnames(
          LOGIC_HELPERS.ifElse(
            starred,
            classes.defaultUnstar,
            classes.defaultStar,
          ),
        )}
        icon="lnr-star"
        iconButton
        onClick={this.toggleStar}
      />
    );
  };
}

Star.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  children: PropTypes.func,
  id: PropTypes.number,

  // resaga props
  starred: PropTypes.bool,
};

Star.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'Star' }),
  resaga(USER_ID_CONFIG),
  resaga(CONFIG),
)(Star);
