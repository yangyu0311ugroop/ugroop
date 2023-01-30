import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Container from 'components/Container';
import Empty from './components/Empty';
import Section from './components/Section';
import styles from './styles';

export class TabCustom extends PureComponent {
  render = () => {
    const { id, classes, sectionIds } = this.props;
    if (!sectionIds.length) {
      return <Empty id={id} />;
    }

    const sections = sectionIds.map(sectionId => (
      <Section id={sectionId} key={sectionId} />
    ));

    return <Container className={classes.root}>{sections}</Container>;
  };
}

TabCustom.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number.isRequired, // tab id

  // resaga props
  sectionIds: PropTypes.array,
};

TabCustom.defaultProps = {
  sectionIds: [],
};

export default compose(withStyles(styles, { name: 'TabCustom' }))(TabCustom);
