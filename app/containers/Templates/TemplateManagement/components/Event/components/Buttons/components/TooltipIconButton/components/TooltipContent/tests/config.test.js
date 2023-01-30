/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE } from 'appConstants';
import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { FIRST_CONFIG, SECOND_CONFIG, THIRD_CONFIG } from '../config';

describe('containers/TemplateManagement/Event/Buttons/TooltipIconButton/TooltipContent/config', () => {
  describe('CONFIG', () => {
    it('exists', () => {
      expect(FIRST_CONFIG).toBeDefined();
    });

    describe('#value', () => {
      it('contains required properties', () => {
        const props = { dataId: 1 };
        expect(FIRST_CONFIG.value.trail).toEqual(NODE_STORE_SELECTORS.trail);
        expect(FIRST_CONFIG.value.event(props)).toEqual(
          EVENT_STORE_DATA_SELECTORS.event({ id: props.dataId }),
        );
        expect(FIRST_CONFIG.value.iconOverride(props)).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: props.dataId,
            path: EVENT_PATHS.iconOverride,
          }),
        );
      });
    });
  });

  describe('CONFIG_EVENT_DATA', () => {
    it('exists', () => {
      expect(SECOND_CONFIG).toBeDefined();
    });

    describe('value', () => {
      describe('templateId', () => {
        describe('getter', () => {
          it('should return last item if trail is array', () => {
            expect(
              SECOND_CONFIG.value.templateId.getter({
                trail: [1, 2],
              }),
            ).toBe(2);
          });

          it('should return 0 if trail is not array', () => {
            expect(
              SECOND_CONFIG.value.templateId.getter({
                trail: null,
              }),
            ).toBe(0);
          });
        });
      });
    });
  });

  describe('THIRD_CONFIG', () => {
    describe('links', () => {
      it('should have keyPath', () => {
        const eventAttachments = [1];
        expect(THIRD_CONFIG.value.links.keyPath({ eventAttachments })).toEqual(
          eventAttachments.map(id => [EVENT_STORE, 'attachments', id, 'link']),
        );
      });
      it('should have keyPath if nothing is passed', () => {
        expect(THIRD_CONFIG.value.links.keyPath({})).toEqual([]);
      });
      it('should have cacheKey', () => {
        const eventAttachments = [1];
        expect(THIRD_CONFIG.value.links.cacheKey({ eventAttachments })).toEqual(
          `Event.Button.TooltipIconButton.TooltipContent.attachment${eventAttachments.toString()}.link`,
        );
      });
      it('should have cacheKey if eventAttachments is null', () => {
        const eventAttachments = null;
        expect(THIRD_CONFIG.value.links.cacheKey({ eventAttachments })).toEqual(
          `Event.Button.TooltipIconButton.TooltipContent.attachment${null}.link`,
        );
      });
      it('should have prop', () => {
        const eventAttachments = [1];
        expect(THIRD_CONFIG.value.links.prop({ eventAttachments })).toEqual(
          eventAttachments,
        );
      });
      it('should have getter', () => {
        const links = ['link1'];
        expect(THIRD_CONFIG.value.links.getter(...links)).toEqual(links);
      });
    });

    describe('names', () => {
      it('should have keyPath', () => {
        const eventAttachments = [1];
        expect(THIRD_CONFIG.value.names.keyPath({ eventAttachments })).toEqual(
          eventAttachments.map(id => [EVENT_STORE, 'attachments', id, 'name']),
        );
      });
      it('should have keyPath if nothing is passed', () => {
        expect(THIRD_CONFIG.value.names.keyPath({})).toEqual([]);
      });
      it('should have cacheKey', () => {
        const eventAttachments = [1];
        expect(THIRD_CONFIG.value.names.cacheKey({ eventAttachments })).toEqual(
          `Event.Button.TooltipIconButton.TooltipContent.attachment${eventAttachments.toString()}.name`,
        );
      });
      it('should have cacheKey if eventAttachments is null', () => {
        const eventAttachments = null;
        expect(THIRD_CONFIG.value.names.cacheKey({ eventAttachments })).toEqual(
          `Event.Button.TooltipIconButton.TooltipContent.attachment${null}.name`,
        );
      });
      it('should have prop', () => {
        const eventAttachments = [1];
        expect(THIRD_CONFIG.value.names.prop({ eventAttachments })).toEqual(
          eventAttachments,
        );
      });
      it('should have getter', () => {
        const names = ['name1'];
        expect(THIRD_CONFIG.value.names.getter(...names)).toEqual(names);
      });
    });
  });
});
