import React from 'react';
import PropTypes from 'prop-types';
import GridContainer from 'components/GridContainer';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import GridItem from 'components/GridItem';
import { makeStyles } from 'components/material-ui';
import { H6 } from 'viewComponents/Typography';
import {
  TOUR_CONTRIBUTOR,
  TOUR_PARTICIPANT,
  TOUR_INTERESTED,
  TOUR_ORGANIZER,
  TOUR_COLLABORATOR,
  TOUR_VIEWER,
  TOUR_OWNER,
} from 'utils/modelConstants';
import { Avatar, Name } from 'ugcomponents/Person';
import { TEXT } from 'appConstants';

const styles = () => ({
  root: {
    marginTop: 4,
    marginBottom: 4,
  },
  grow: {
    flex: '1',
  },
  roleContainer: {
    marginTop: 0,
  },
});

const useStyles = makeStyles(styles);

function PeopleRow(props) {
  const classes = useStyles();
  const { userId } = props;

  const getRole = value => {
    const role = LOGIC_HELPERS.switchCase(value, {
      [TOUR_ORGANIZER]: 'Organiser',
      [TOUR_COLLABORATOR]: 'Collaborator',
      [TOUR_VIEWER]: 'Viewer',
      [TOUR_CONTRIBUTOR]: 'Contributor',
      [TOUR_PARTICIPANT]: 'Participant',
      [TOUR_INTERESTED]: 'Follower',
      [TOUR_OWNER]: 'Owner',
    });

    return role;
  };

  const sortRoles = () => {
    const { roles } = props;
    const order = [
      TOUR_OWNER,
      TOUR_COLLABORATOR,
      TOUR_ORGANIZER,
      TOUR_VIEWER,
      TOUR_PARTICIPANT,
      TOUR_INTERESTED,
    ];
    const sorted = roles.slice().sort((a, b) => {
      const delta = order.indexOf(a) - order.indexOf(b);
      if (delta === 0) {
        return a === b ? 0 : a < b ? -1 : 1; // eslint-disable-line
      }

      return delta;
    });

    return sorted;
  };

  const renderRoles = () => {
    const sorted = sortRoles();
    if (sorted.length === 1) {
      const role = getRole(sorted);

      return <H6 className={classes.roleContainer}>{role}</H6>;
    }

    const personRoles = sorted.reduce((acc, val, index) => {
      const role = getRole(val);
      if (index === 1) {
        const firstRole = getRole(acc);

        if (index === sorted.length - 1) {
          return `${firstRole} | ${role}`;
        }

        return `${firstRole} | ${role} |`;
      }

      if (index !== sorted.length - 1) {
        return `${acc} | ${role} |`;
      }

      return `${acc} ${role}`;
    });

    return <H6 className={classes.roleContainer}>{personRoles}</H6>;
  };

  return (
    <GridContainer direction="column" className={classes.root} spacing={0}>
      <GridItem xs={12} md={12}>
        <GridContainer>
          <GridItem>
            <Avatar
              noTooltip={false}
              sm
              userId={userId}
              fullName={userId}
              email={userId}
              showAvatarDetails={false}
            />
          </GridItem>
          <GridItem
            className={classes.grow}
            onClick={props.onClickPeopleRow({
              userId: props.userId,
            })}
          >
            <GridContainer direction="column" spacing={0}>
              <GridItem>
                <GridContainer direction="row" alignItems="center">
                  <GridItem className="j-text-ellipsis">
                    <Name id={userId} variant={TEXT} bold />
                    {renderRoles()}
                  </GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
}

PeopleRow.propTypes = {
  userId: PropTypes.number,
  roles: PropTypes.array, // eslint-disable-line
  onClickPeopleRow: PropTypes.func,
};

export default PeopleRow;
