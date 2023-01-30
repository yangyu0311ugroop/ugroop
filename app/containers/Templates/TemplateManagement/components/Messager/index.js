import React, { useEffect } from 'react';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { compose } from 'redux';
import resaga from 'resaga';
import Messenger from 'smartComponents/Messenger';
import PropTypes from 'prop-types';
import { makeStyles } from 'components/material-ui';
import { useImmer } from 'use-immer';
import { CONFIG } from './config';
import { ChatTypes } from '../../../../../lib/streamChat/chatType';
/* eslint-disable no-param-reassign */

const useStyles = () =>
  makeStyles(() => ({
    channelGridItem: {
      "& > div[class^='str-chat str-chat-channel-list team light']": {
        height: 'auto',
      },
      "& > div > div[class^='str-chat str-chat-channel-list team light']": {
        height: 'auto',
      },
      "& > div[class^='str-chat str-chat-channel team light']": {
        height: 'auto',
        '& > div > div > div[class^=str-chat__list]': {
          padding: '10px 0 0 0',
        },
      },
    },
  }));

function TabMessenger(props) {
  const classes = useStyles()();
  const [data, setData] = useImmer({
    templateId: -1,
    members: [],
  });

  const [filter, setFilter] = useImmer({
    type: '',
  });

  useEffect(() => {
    if (
      data.templateId !== props.templateId &&
      JSON.stringify(data.members) !== JSON.stringify(props.members)
    ) {
      setData(draft => {
        draft.templateId = props.templateId;
        draft.members = props.members;
      });
    } else if (data.templateId !== props.templateId) {
      setData(draft => {
        draft.templateId = props.templateId;
      });
    } else if (JSON.stringify(data.members) !== JSON.stringify(props.members)) {
      setData(draft => {
        draft.members = props.members;
      });
    }
  }, [props.templateId, props.members]);

  useEffect(() => {
    setFilter(draft => {
      if (data.members && data.members.length > 0) {
        draft.type = ChatTypes.UGroop;
        draft.members = {
          $in: data.members,
        };
      }
    });
  }, [data.members]);

  useEffect(() => {
    setFilter(draft => {
      if (data.templateId > 0) {
        draft.type = ChatTypes.UGroop;
        draft.templateId = data.templateId;
      }
    });
  }, [data.templateId]);
  return (
    <>
      <GridContainer direction="column" spacing={0}>
        <GridItem className={classes.channelGridItem}>
          <Messenger
            filters={filter}
            sort={props.sort}
            mobileSort={props.mobileSort}
            height={props.height}
          />
        </GridItem>
      </GridContainer>
    </>
  );
}

TabMessenger.propTypes = {
  sort: PropTypes.object,
  mobileSort: PropTypes.object,
  height: PropTypes.number,
  templateId: PropTypes.number,
  members: PropTypes.array,
};

export default compose(resaga(CONFIG))(React.memo(TabMessenger));
