import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import last from 'lodash/last';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import styles from './styles';

export class Thumbnail extends PureComponent {
  renderThumbnailDefault = () => {
    const { classes } = this.props;

    return (
      <div className={classes.attachmentIcon}>
        <GridContainer alignItems="center" spacing={0}>
          <GridItem>
            <div className={classes.AttachmentHeight}>&nbsp;</div>
          </GridItem>
          <GridItem xs>
            <GridContainer direction="column">
              <GridItem>
                <Icon icon="lnr-paperclip" color="blue" />
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    );
  };

  isPhoto = () => {
    const ex = this.extension();

    if (!ex) return false;

    const ext = `${ex}`.toUpperCase();

    if (ext.indexOf('JPG') !== -1) return true;
    if (ext.indexOf('JPEG') !== -1) return true;
    if (ext.indexOf('GIF') !== -1) return true;
    if (ext.indexOf('PNG') !== -1) return true;
    if (ext.indexOf('BMP') !== -1) return true;
    if (ext.indexOf('ICO') !== -1) return true;

    return false;
  };

  extension = () => {
    const { name, type } = this.props;

    const typeExtension =
      type && (type.indexOf('/') !== -1 ? last(type.split('/')) : type);
    return typeExtension || last(name.split('.'));
  };

  padUrlQuery = (url, fileName, thumbnail) =>
    `${
      process.env.COORDINATE_BASE_URL
    }/${url}?filename=${fileName}${LOGIC_HELPERS.ifElse(
      thumbnail,
      '&width=100',
      '',
    )}`;

  renderImageThumbnail = () => {
    const { classes, link, name } = this.props;

    const linkQuery = this.padUrlQuery(link, name, true);

    return (
      <div className={classes.imagePlaceholder}>
        <img src={linkQuery} alt={name} className={classes.image} />
      </div>
    );
  };

  renderImage = () => {
    const { classes, name, type } = this.props;

    if (!name && !type) {
      return this.renderThumbnailDefault();
    }

    if (this.isPhoto()) {
      return this.renderImageThumbnail();
    }

    return (
      <div className={classes.attachmentIcon}>
        <GridContainer alignItems="center" spacing={0}>
          <GridItem>
            <div className={classes.AttachmentHeight}>&nbsp;</div>
          </GridItem>
          <GridItem xs>
            <GridContainer direction="column">
              <GridItem>
                <JText uppercase gray lg ellipsis>
                  {this.extension().substr(0, 4)}
                </JText>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    );
  };

  render = () => {
    const { id, link, name, description, createdAt } = this.props;

    const linkQuery = this.padUrlQuery(link, name);

    const main = LOGIC_HELPERS.ifElse(description, description, name);
    const sub = LOGIC_HELPERS.ifElse(description, name, description);

    return (
      <GridItem key={id}>
        <GridContainer alignItems="center" wrap="nowrap">
          <GridItem>{this.renderImage()}</GridItem>
          <GridItem>
            <GridContainer direction="column" spacing={0}>
              <GridItem>
                <JText
                  link
                  ellipsis
                  component="a"
                  href={linkQuery}
                  target="_blank"
                >
                  {main}
                </JText>
              </GridItem>

              {sub && (
                <GridItem>
                  <JText gray sm ellipsis>
                    {sub}
                  </JText>
                </GridItem>
              )}
              {createdAt && (
                <JText gray sm ellipsis>
                  {createdAt}
                </JText>
              )}
            </GridContainer>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };
}

Thumbnail.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  name: PropTypes.string,
  type: PropTypes.string,
  link: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.number,
  createdAt: PropTypes.any,

  // resaga props
};

Thumbnail.defaultProps = {
  // type: 'FILE',
};

// style only, no resaga
/* export const StyledThumbnail = compose(
  withStyles(styles, { name: 'StyledThumbnail' }),
)(Thumbnail); */

// export default StyledThumbnail; // compose(resaga(CONFIG))(StyledThumbnail);

export default compose(withStyles(styles, { name: 'Thumbnail' }))(Thumbnail);
