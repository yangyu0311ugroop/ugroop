import React, { useContext, useState } from 'react';
import { useImmer } from 'use-immer';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import {
  TOUR_CONTRIBUTOR,
  TOUR_PARTICIPANT,
  TOUR_INTERESTED,
  TOUR_ORGANIZER,
  TOUR_COLLABORATOR,
  TOUR_VIEWER,
  TOUR_OWNER,
  ALL,
} from 'utils/modelConstants';
import { H3, H5, Span } from 'viewComponents/Typography';
import ChipInput from 'material-ui-chip-input';
import Popper from 'components/Popper';
import MenuItem from 'components/Popper/components/MenuItem';
import { VARIANTS } from 'variantsConstants';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Form from '../../../../ugcomponents/Form';
import GridContainer from '../../../../components/GridContainer';
import GridItem from '../../../../components/GridItem';
import Hr from '../../../../components/Hr';
import { PORTAL_HELPERS } from '../../helpers';
import Button from '../../../../viewComponents/Button';
import Dialog from '../../../../components/Dialog';
import DialogTitle from '../../../../components/Dialog/UGDialogTitle';
import DialogContent from '../../../../components/Dialog/UGDialogContent';
import {
  CloseButton,
  Title,
} from '../../../../ugcomponents/DialogForm/Complex';
import { makeStyles } from '../../../../components/material-ui';
import PeopleRow from './components/peopleRow';
import { padFacadeURL } from '../../../../utils/helpers/request';
import {
  getChatStreamId,
  isEmptyString,
} from '../../../../utils/stringAdditions';

import { ChatTypes } from '../../../../lib/streamChat/chatType';
import { StreamChatContext } from '../../../../lib/streamChat';
const styles = ({ colors }) => ({
  root: {
    width: '100%',
    paddingTop: 4,
    border: colors.borderColor,
  },
  inputRoot: {
    marginLeft: 10,
  },
  grow: {
    flex: '1',
  },

  fade: {
    opacity: 0.3,
  },
  heading: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.metallicGray,
  },
  chip: {
    fontSize: 12,
    padding: 10,
    marginRight: 4,
    marginLeft: 4,
  },
  goButton: {
    width: '100%',
    minHeight: 40,
  },
  noMorePeople: {
    marginBottom: '8px !important',
  },
});

const useStyles = makeStyles(styles);

const renderTitle = handleClose => (
  <>
    <Title heading="Add People" />
    <CloseButton onClick={handleClose} />
  </>
);

function AddPeopleInChannel(props) {
  const client = useContext(StreamChatContext);
  const [chipValues, setChipValues] = useImmer([]);
  const [peopleFilter, setPeopleFilter] = useState('all');
  const [people, setPeople] = useImmer(props.data);
  const classes = useStyles();
  const handleValidSubmit = async () => {
    const members = chipValues.map(o =>
      getChatStreamId(props.data[o].email, o),
    );
    const channelId = props.channelId;
    const filter = { type: ChatTypes.UGroop, cid: channelId };
    const channels = await client.queryChannels(
      filter,
      {},
      { state: false, limit: 1 },
    );
    if (channels.length > 0) {
      try {
        if (channels[0].cid === channelId) {
          await channels[0].addMembers(members);
        }
        PORTAL_HELPERS.close(props);
      } catch (e) {
        // display error
        console.log(e);
      }
    }
  };
  const handleDelete = userId => () => {
    setChipValues(draft => {
      const index = draft.indexOf(userId);
      if (index > -1) {
        draft.splice(index, 1);
      }
    });
    setPeople(draft => {
      // eslint-disable-next-line no-param-reassign
      draft[userId] = props.data[userId];
    });
  };

  const findUserObject = id => props.data[id];

  const onClickPeopleRow = ({ userId }) => () => {
    setChipValues(draft => {
      draft.push(userId);
    });
    setPeople(draft => {
      // eslint-disable-next-line no-param-reassign
      delete draft[userId];
    });
  };

  const handleFilterSelect = filter => () => {
    setPeopleFilter(filter);
  };

  // eslint-disable-next-line react/prop-types
  const renderFilterPopperButton = ({ openMenu }) => {
    const filterBy = LOGIC_HELPERS.switchCase(peopleFilter, {
      [ALL]: 'All People',
      [TOUR_CONTRIBUTOR]: 'Contributors',
      [TOUR_PARTICIPANT]: 'Participants',
      [TOUR_INTERESTED]: 'Followers',
    });
    return (
      <Button
        variant={VARIANTS.BORDERLESS}
        dense
        size="extraSmall"
        onClick={openMenu}
      >
        <GridContainer alignItems="baseline" wrap="nowrap" spacing={0}>
          <GridItem>Filter by: {filterBy}</GridItem>
          <GridItem>
            <Icon icon="lnr-chevron-down" size="xsmall" paddingLeft />
          </GridItem>
        </GridContainer>
      </Button>
    );
  };

  // eslint-disable-next-line react/prop-types
  const renderFilterPopperOptions = ({ closeMenu }) => (
    <GridContainer direction="column" spacing={0}>
      <GridItem>
        <MenuItem
          selected={peopleFilter === 'all'}
          closeMenu={closeMenu}
          onClick={handleFilterSelect('all')}
        >
          Show All
        </MenuItem>
      </GridItem>
      <GridItem>
        <MenuItem
          selected={peopleFilter === TOUR_CONTRIBUTOR}
          closeMenu={closeMenu}
          onClick={handleFilterSelect(TOUR_CONTRIBUTOR)}
        >
          Contributors
        </MenuItem>
      </GridItem>
      <GridItem>
        <MenuItem
          selected={peopleFilter === TOUR_PARTICIPANT}
          closeMenu={closeMenu}
          onClick={handleFilterSelect(TOUR_PARTICIPANT)}
        >
          Participant
        </MenuItem>
      </GridItem>
      <GridItem>
        <MenuItem
          selected={peopleFilter === TOUR_INTERESTED}
          closeMenu={closeMenu}
          onClick={handleFilterSelect(TOUR_INTERESTED)}
        >
          Follower
        </MenuItem>
      </GridItem>
    </GridContainer>
  );

  const renderFilterPopper = () => (
    <Popper
      placement="bottom"
      renderButton={renderFilterPopperButton}
      stopPropagation
    >
      {renderFilterPopperOptions}
    </Popper>
  );

  const filterValues = () => {
    const values = _.values(people);

    if (peopleFilter === 'all') {
      return values;
    }

    if (peopleFilter === TOUR_CONTRIBUTOR) {
      const filterCollab = values.filter(
        item =>
          item.roles.includes(TOUR_COLLABORATOR) ||
          item.roles.includes(TOUR_VIEWER) ||
          item.roles.includes(TOUR_ORGANIZER) ||
          item.roles.includes(TOUR_OWNER),
      );
      return filterCollab;
    }

    return values.filter(item => item.roles.includes(peopleFilter));
  };

  const renderPeopleList = () => {
    const allValues = _.values(people);
    if (allValues.length === 0) {
      return renderNoPeople();
    }
    const values = filterValues();
    if (values.length === 0) {
      return renderNoPeople();
    }
    return values.map(o => (
      <PeopleRow
        key={o.userId}
        userId={o.userId}
        roles={o.roles}
        onClickPeopleRow={onClickPeopleRow}
      />
    ));
  };

  const renderNoPeople = () => {
    const filteredValues = filterValues();
    const nonFilteredValues = _.values(people);

    if (nonFilteredValues.length === 0) {
      return (
        <GridItem xs={12} md={12}>
          <GridContainer direction="column" spacing={0} alignItems="center">
            <H3 className={classes.noMorePeople} weight="bold">
              There are no more people to be added.
            </H3>
            <H5>Maybe try inviting more people to your tour?</H5>
          </GridContainer>
        </GridItem>
      );
    }

    if (filteredValues.length === 0) {
      return (
        <GridItem xs={12} md={12}>
          <GridContainer direction="column" spacing={0} alignItems="center">
            <H3 className={classes.noMorePeople} weight="bold">
              There are no more people to be added from this category of people.
            </H3>
            <H5>Maybe try changing the filter to see more people?</H5>
          </GridContainer>
        </GridItem>
      );
    }

    return null;
  };

  // eslint-disable-next-line react/prop-types
  const chipRender = ({ value }) => {
    const user = findUserObject(value);
    const avatar = !isEmptyString(user.photo) ? (
      <Avatar src={padFacadeURL(user.photo)} alt={user.name} />
    ) : null;
    return (
      <Chip
        key={user.id}
        className={classes.chip}
        variant="outlined"
        avatar={avatar}
        label={user.name}
        color="primary"
        onDelete={handleDelete(value)}
      />
    );
  };

  const renderContent = () => {
    const values = _.values(people);
    return (
      <Form onValidSubmit={handleValidSubmit}>
        <GridContainer direction="column">
          <GridItem xs={12} md={12}>
            <GridContainer spacing={1}>
              <GridItem xs={10} md={10}>
                <ChipInput
                  className={classnames(classes.root)}
                  classes={{
                    inputRoot: classes.inputRoot,
                  }}
                  value={chipValues}
                  placeholder="Click on a person name to add them to this channel"
                  chipRenderer={chipRender}
                  readOnly
                  disableUnderline
                />
              </GridItem>
              <GridItem xs={2} md={2}>
                <Button
                  size="xs"
                  color="primary"
                  type="submit"
                  className={classes.goButton}
                >
                  <Span white>GO</Span>
                </Button>
              </GridItem>
            </GridContainer>
          </GridItem>
          {values.length !== 0 && <GridItem>{renderFilterPopper()}</GridItem>}
          <GridItem xs={12} md={12}>
            <GridContainer direction="column" spacing={0}>
              {renderPeopleList()}
            </GridContainer>
          </GridItem>
          <Hr half />
        </GridContainer>
      </Form>
    );
  };

  const handleClose = () => {
    PORTAL_HELPERS.close(props);
  };

  return (
    <Dialog maxWidth="sm" fullWidth open onClose={handleClose}>
      <DialogTitle noPaddingBottom>{renderTitle(handleClose)}</DialogTitle>
      <DialogContent halfPaddingTop>{renderContent()}</DialogContent>
    </Dialog>
  );
}

AddPeopleInChannel.propTypes = {
  channelId: PropTypes.string,
  data: PropTypes.object,
};

AddPeopleInChannel.defaultProps = {};

export default React.memo(AddPeopleInChannel);
