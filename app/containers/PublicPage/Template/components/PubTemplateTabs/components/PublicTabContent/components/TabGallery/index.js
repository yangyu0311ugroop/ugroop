import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Container from 'components/Container';
import { TAB_GALLERY } from 'utils/modelConstants';
import Gallery from 'smartComponents/Node/types/TabGallery';
import styles from './styles';

export class TabGallery extends PureComponent {
  render = () => {
    const { id, classes, templateId } = this.props;
    const tabGallery = (
      <Gallery id={id} templateId={templateId} variant={TAB_GALLERY} isPublic />
    );
    return <Container className={classes.root}>{tabGallery}</Container>;
  };
}

TabGallery.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  // parent props
  id: PropTypes.number.isRequired, // tab id
  templateId: PropTypes.number,
};

TabGallery.defaultProps = {};

export default compose(withStyles(styles, { name: 'TabGallery' }))(TabGallery);
