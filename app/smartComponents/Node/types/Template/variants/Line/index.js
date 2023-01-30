import { NODE_PROP, URL_HELPERS } from 'appConstants';
import classnames from 'classnames';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Star from 'smartComponents/Node/components/Star';
import Content from 'smartComponents/Node/parts/Content';
import Photo from 'smartComponents/Node/parts/Photo';
import Icon from 'ugcomponents/Icon';
import NavLink from 'ugcomponents/NavLink';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Button from 'viewComponents/Button';
import { CONFIG } from './config';
import styles from './styles';

export class Line extends PureComponent {
  isActive = () => false;

  handleClickTour = () => {
    const { id, onClick } = this.props;

    LOGIC_HELPERS.ifFunction(onClick, [id]);

    // this.props.resaga.setValue({ id });
  };

  renderStarButton = ({ starred, ...props }) => {
    const { classes } = this.props;

    return (
      <Button
        dense
        size="extraSmall"
        className={classnames(
          LOGIC_HELPERS.ifElse(
            starred,
            classes.defaultUnstar,
            classes.defaultStar,
          ),
        )}
        {...props}
      >
        <Icon size="normal" bold icon="lnr-star" />
      </Button>
    );
  };

  render = () => {
    const { classes, id, className, showPhoto, ellipsisClassName } = this.props;

    return (
      <NavLink
        onClick={this.handleClickTour}
        isActive={this.isActive}
        className={classes.link}
        gridClassName={classes.defaultGrid}
        to={URL_HELPERS.tours(id)}
        photo={
          showPhoto && (
            <Photo
              size={24}
              resizeSize={100}
              placeholderProps={{ showOverlay: false }}
              editable={false}
              showPreview={false}
              id={id}
              renderEmpty
              component={GridItem}
            />
          )
        }
        heading={
          <Content
            id={id}
            variant={NODE_PROP}
            className={className}
            ellipsis
            ellipsisClassName={ellipsisClassName}
          />
        }
        actions={<Star id={id}>{this.renderStarButton}</Star>}
      />
    );
  };
}

Line.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  className: PropTypes.string,
  ellipsisClassName: PropTypes.string,
  showPhoto: PropTypes.bool,
  onClick: PropTypes.func,

  // resaga props
};

Line.defaultProps = {
  showPhoto: true,
};

export default compose(
  withStyles(styles, { name: 'Line' }),
  resaga(CONFIG),
)(Line);
