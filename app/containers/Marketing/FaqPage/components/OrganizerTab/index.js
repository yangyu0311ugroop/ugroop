import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Header from 'containers/Marketing/Components/Header';
import Description from 'containers/Marketing/Components/Description';
import List from '@material-ui/core/List';
import UGListItem from '../ListItem';
import stylesheet from './style';

export class OrganizerTab extends PureComponent {
  state = {
    tableContentSelected: 0,
  };

  onHandleTableContentClick = e => {
    e.preventDefault();
    const selected = e.target.attributes.getNamedItem('data-index').value;
    this.setState({
      tableContentSelected: parseInt(selected, 10),
    });
  };

  render = () => {
    const { className, classes } = this.props;
    const options = [
      {
        label: 'General',
        url: '/general',
        id: 'general',
      },
      {
        label: 'Accounts',
        url: '/accounts',
        id: 'accounts',
      },
      {
        label: 'Organisation',
        url: '/organisation',
        id: 'organisation',
      },
      {
        label: 'Template',
        url: '/template',
        id: 'template',
      },
    ];
    const items = options.map((option, index) => {
      let classname = `${classes.items}`;
      if (index === this.state.tableContentSelected) {
        classname += ` ${classes.itemSelected}`;
      }
      return (
        <li key={`${option.id}`} className={classname}>
          <a
            href={`#${option.id}`}
            data-index={index}
            onClick={this.onHandleTableContentClick}
          >
            {option.label}
          </a>
        </li>
      );
    });
    return (
      <GridContainer className={`${className}`}>
        <GridItem md={3}>
          <Header as="h2">Table of Content</Header>
          <ul className={classes.itemList}>{items}</ul>
        </GridItem>
        <GridItem md={9}>
          <List>
            <UGListItem itemTitle="Sample 1">
              <Description size={16}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                lacinia lacus. Vivamus vel cursus dolor, a sollicitudin ligula.
                Maecenas nec mollis lorem. Pellentesque sed aliquam dolor, a
                fermentum odio. Donec sit amet iaculis odio. Nulla pulvinar in
                urna eget vehicula. Curabitur at fermentum est. Vestibulum et
                tellus dolor. Praesent ultricies mauris vitae tristique dapibus.
              </Description>
            </UGListItem>
            <UGListItem itemTitle="Sample 2">
              <Description size={16}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                lacinia lacus. Vivamus vel cursus dolor, a sollicitudin ligula.
                Maecenas nec mollis lorem. Pellentesque sed aliquam dolor, a
                fermentum odio. Donec sit amet iaculis odio. Nulla pulvinar in
                urna eget vehicula. Curabitur at fermentum est. Vestibulum et
                tellus dolor. Praesent ultricies mauris vitae tristique dapibus.
              </Description>
            </UGListItem>
            <UGListItem itemTitle="Sample 3">
              <Description size={16}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                lacinia lacus. Vivamus vel cursus dolor, a sollicitudin ligula.
                Maecenas nec mollis lorem. Pellentesque sed aliquam dolor, a
                fermentum odio. Donec sit amet iaculis odio. Nulla pulvinar in
                urna eget vehicula. Curabitur at fermentum est. Vestibulum et
                tellus dolor. Praesent ultricies mauris vitae tristique dapibus.
              </Description>
            </UGListItem>
            <UGListItem itemTitle="Sample 4">
              <Description size={16}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                lacinia lacus. Vivamus vel cursus dolor, a sollicitudin ligula.
                Maecenas nec mollis lorem. Pellentesque sed aliquam dolor, a
                fermentum odio. Donec sit amet iaculis odio. Nulla pulvinar in
                urna eget vehicula. Curabitur at fermentum est. Vestibulum et
                tellus dolor. Praesent ultricies mauris vitae tristique dapibus.
              </Description>
            </UGListItem>
          </List>
        </GridItem>
      </GridContainer>
    );
  };
}

OrganizerTab.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
};
OrganizerTab.defaultProps = {};

export default withStyles(stylesheet, { name: 'OrganizerTab' })(OrganizerTab);
