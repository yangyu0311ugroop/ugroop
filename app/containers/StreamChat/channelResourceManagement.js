import React, { useEffect } from 'react';
import _ from 'lodash';
import retry from 'async-retry';
import { useImmer } from 'use-immer';
import { useMessengerContext } from './messageStateContext';
import { sleep } from '../../utils/timeUtility';

export function ChannelResourceManagement() {
  const [state, dispatchContext] = useMessengerContext();
  const [stoppingChannel, setStoppingChannel] = useImmer([]);
  useEffect(() => {
    function moveToStoppingChannels() {
      if (stoppingChannel.length === 0) {
        const values = _.values(state.channelRemoveWaitingQueue);
        if (values.length > 0) {
          const ch = values[0];
          setStoppingChannel(draft => {
            if (draft.length === 0) {
              draft.push(ch);
            }
          });
          dispatchContext.removeFromWaitingListQueue(ch.cid);
        }
      }
    }
    moveToStoppingChannels();
  }, [state.channelRemoveWaitingQueue, stoppingChannel]);

  useEffect(() => {
    async function stopChannel() {
      if (stoppingChannel.length === 1) {
        const ch = stoppingChannel[0];
        const res = await retry(
          async () => {
            // if anything throws exception, we retry
            try {
              console.log('stopping channel', ch.cid);
              await sleep(250);
              const stop = await ch.stopWatching();
              return stop;
            } catch (e) {
              throw e;
            }
          },
          {
            retries: 5,
            minTimeout: 2000,
          },
        );
        if (res) {
          console.log('stop', res);
          setStoppingChannel(draft => {
            draft.splice(0, 1);
          });
          dispatchContext.dispatch(draft => {
            draft.stoppedChannel.push(ch.cid);
          });
        }
      }
    }
    stopChannel();
  }, [stoppingChannel]);
}

export default React.memo(ChannelResourceManagement);
