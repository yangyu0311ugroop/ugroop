import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import TreeViewWithContainer, { TreeView } from './index';

const stories = storiesOf('TreeView', module);

stories.addDecorator(withKnobs);

const items = [
  {
    id: 1,
    content: 'First',
    children: [
      {
        id: 5,
        content: 'Five',
        children: [],
      },
      {
        id: 6,
        content: 'Six',
        children: [
          {
            id: 8,
            content: 'Eight',
            children: [
              {
                id: 13,
                content: 'asdasd adad sadsad sadsa dsad sadsa',
                children: [],
              },
              {
                id: 14,
                content: 'asd asdsa dsad sad sadsa dasd sad as dsad asd sad as',
                children: [
                  {
                    id: 15,
                    content:
                      'asd asd asdasd asdas jdlkasjdlk asdlkasj lkak lasd dajaj',
                    children: [],
                  },
                  {
                    id: 16,
                    content:
                      ' eritreoi utwpir ewpriweoripweori poeweirpwirpwoipoi',
                    children: [
                      {
                        id: 17,
                        content:
                          'qweqweqwe opidpoigfsdpofipods fodsifpodsifopifpdoidsfdofipofdo dpof spdfoidspfo qweqweqwe opidpoigfsdpofipods fodsifpodsifopifpdoidsfdofipofdo dpof spdfoidspfo qweqweqwe opidpoigfsdpofipods fodsifpodsifopifpdoidsfdofipofdo dpof spdfoidspfo qweqweqwe opidpoigfsdpofipods fodsifpodsifopifpdoidsfdofipofdo dpof spdfoidspfo qweqweqwe opidpoigfsdpofipods fodsifpodsifopifpdoidsfdofipofdo dpof spdfoidspfo qweqweqwe opidpoigfsdpofipods fodsifpodsifopifpdoidsfdofipofdo dpof spdfoidspfo qweqweqwe opidpoigfsdpofipods fodsifpodsifopifpdoidsfdofipofdo dpof spdfoidspfo qweqweqwe opidpoigfsdpofipods fodsifpodsifopifpdoidsfdofipofdo dpof spdfoidspfo',
                        children: [
                          {
                            id: 19,
                            content:
                              'qweqweqwe opidpoigfsdpofipods fodsifpodsifopifpdoidsfdofipofdo dpof spdfoidspfo qweqweqwe opidpoigfsdpofipods fodsifpodsifopifpdoidsfdofipofdo dpof spdfoidspfo',
                            children: [],
                          },
                          {
                            id: 20,
                            content:
                              'cvm,bcvn,xcvbc xbvx bmcvxcnb vnxmbvmnxbvnmxbmnxbcvmnxcbnmvxbv mnxbcmnvbxmx asd qweqweqwe opidpoigfsdpofipods fodsifpodsifopifpdoidsfdofipofdo dpof spdfoidspfo',
                            children: [
                              {
                                id: 21,
                                content:
                                  'qweqweqwe opidpoigfsdpofipods fodsifpodsifopifpdoidsfdofipofdo dpof spdfoidspfo qweqweqwe opidpoigfsdpofipods fodsifpodsifopifpdoidsfdofipofdo dpof spdfoidspfo',
                                children: [
                                  {
                                    id: 23,
                                    content:
                                      'qweqweqwe opidpoigfsdpofipods fodsifpodsifopifpdoidsfdofipofdo dpof spdfoidspfo qweqweqwe opidpoigfsdpofipods fodsifpodsifopifpdoidsfdofipofdo dpof spdfoidspfo',
                                    children: [
                                      {
                                        id: 25,
                                        content:
                                          'qweqweqwe opidpoigfsdpofipods fodsifpodsifopifpdoidsfdofipofdo dpof spdfoidspfo qweqweqwe opidpoigfsdpofipods fodsifpodsifopifpdoidsfdofipofdo dpof spdfoidspfo',
                                        children: [],
                                      },
                                      {
                                        id: 26,
                                        content:
                                          'cvm,bcvn,xcvbc xbvx bmcvxcnb vnxmbvmnxbvnmxbmnxbcvmnxcbnmvxbv mnxbcmnvbxmx asd qweqweqwe opidpoigfsdpofipods fodsifpodsifopifpdoidsfdofipofdo dpof spdfoidspfo',
                                        children: [
                                          {
                                            id: 27,
                                            content:
                                              'qweqweqwe opidpoigfsdpofipods fodsifpodsifopifpdoidsfdofipofdo dpof spdfoidspfo qweqweqwe opidpoigfsdpofipods fodsifpodsifopifpdoidsfdofipofdo dpof spdfoidspfo',
                                            children: [],
                                          },
                                          {
                                            id: 28,
                                            content:
                                              'cvm,bcvn,xcvbc xbvx bmcvxcnb vnxmbvmnxbvnmxbmnxbcvmnxcbnmvxbv mnxbcmnvbxmx asd qweqweqwe opidpoigfsdpofipods fodsifpodsifopifpdoidsfdofipofdo dpof spdfoidspfo',
                                            children: [
                                              {
                                                id: 29,
                                                content:
                                                  'qweqweqwe opidpoigfsdpofipods fodsifpodsifopifpdoidsfdofipofdo dpof spdfoidspfo qweqweqwe opidpoigfsdpofipods fodsifpodsifopifpdoidsfdofipofdo dpof spdfoidspfo',
                                                children: [],
                                              },
                                              {
                                                id: 30,
                                                content:
                                                  'cvm,bcvn,xcvbc xbvx bmcvxcnb vnxmbvmnxbvnmxbmnxbcvmnxcbnmvxbv mnxbcmnvbxmx asd qweqweqwe opidpoigfsdpofipods fodsifpodsifopifpdoidsfdofipofdo dpof spdfoidspfo',
                                                children: [
                                                  {
                                                    id: 31,
                                                    content:
                                                      'qweqweqwe opidpoigfsdpofipods fodsifpodsifopifpdoidsfdofipofdo dpof spdfoidspfo qweqweqwe opidpoigfsdpofipods fodsifpodsifopifpdoidsfdofipofdo dpof spdfoidspfo',
                                                    children: [],
                                                  },
                                                  {
                                                    id: 32,
                                                    content:
                                                      'cvm,bcvn,xcvbc xbvx bmcvxcnb vnxmbvmnxbvnmxbmnxbcvmnxcbnmvxbv mnxbcmnvbxmx asd qweqweqwe opidpoigfsdpofipods fodsifpodsifopifpdoidsfdofipofdo dpof spdfoidspfo',
                                                    children: [
                                                      {
                                                        id: 33,
                                                        content:
                                                          'qweqweqwe opidpoigfsdpofipods fodsifpodsifopifpdoidsfdofipofdo dpof spdfoidspfo qweqweqwe opidpoigfsdpofipods fodsifpodsifopifpdoidsfdofipofdo dpof spdfoidspfo',
                                                        children: [],
                                                      },
                                                      {
                                                        id: 34,
                                                        content:
                                                          'cvm,bcvn,xcvbc xbvx bmcvxcnb vnxmbvmnxbvnmxbmnxbcvmnxcbnmvxbv mnxbcmnvbxmx asd qweqweqwe opidpoigfsdpofipods fodsifpodsifopifpdoidsfdofipofdo dpof spdfoidspfo',
                                                        children: [
                                                          {
                                                            id: 35,
                                                            content:
                                                              'qweqweqwe opidpoigfsdpofipods fodsifpodsifopifpdoidsfdofipofdo dpof spdfoidspfo qweqweqwe opidpoigfsdpofipods fodsifpodsifopifpdoidsfdofipofdo dpof spdfoidspfo',
                                                            children: [],
                                                          },
                                                          {
                                                            id: 36,
                                                            content:
                                                              'cvm,bcvn,xcvbc xbvx bmcvxcnb vnxmbvmnxbvnmxbmnxbcvmnxcbnmvxbv mnxbcmnvbxmx asd qweqweqwe opidpoigfsdpofipods fodsifpodsifopifpdoidsfdofipofdo dpof spdfoidspfo',
                                                            children: [
                                                              {
                                                                id: 37,
                                                                content:
                                                                  'qweqweqwe opidpoigfsdpofipods fodsifpodsifopifpdoidsfdofipofdo dpof spdfoidspfo qweqweqwe opidpoigfsdpofipods fodsifpodsifopifpdoidsfdofipofdo dpof spdfoidspfo',
                                                                children: [],
                                                              },
                                                              {
                                                                id: 38,
                                                                content:
                                                                  'cvm,bcvn,xcvbc xbvx bmcvxcnb vnxmbvmnxbvnmxbmnxbcvmnxcbnmvxbv mnxbcmnvbxmx asd qweqweqwe opidpoigfsdpofipods fodsifpodsifopifpdoidsfdofipofdo dpof spdfoidspfo',
                                                                children: [],
                                                              },
                                                            ],
                                                          },
                                                        ],
                                                      },
                                                    ],
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                  {
                                    id: 24,
                                    content:
                                      'cvm,bcvn,xcvbc xbvx bmcvxcnb vnxmbvmnxbvnmxbmnxbcvmnxcbnmvxbv mnxbcmnvbxmx asd',
                                    children: [],
                                  },
                                ],
                              },
                              {
                                id: 22,
                                content:
                                  'cvm,bcvn,xcvbc xbvx bmcvxcnb vnxmbvmnxbvnmxbmnxbcvmnxcbnmvxbv mnxbcmnvbxmx asd',
                                children: [],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        id: 18,
                        content:
                          'cvm,bcvn,xcvbc xbvx bmcvxcnb vnxmbvmnxbvnmxbmnxbcvmnxcbnmvxbv mnxbcmnvbxmx asd',
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 9,
            content: 'Nine',
            children: [],
          },
          {
            id: 10,
            content: 'Ten',
            children: [],
          },
        ],
      },
      {
        id: 7,
        content: 'Five',
        children: [],
      },
    ],
  },
  {
    id: 2,
    content: 'Second',
    children: [
      {
        id: 11,
        content: 'Eleven',
        children: [],
      },
      {
        id: 12,
        content: 'Twelve',
        children: [],
      },
    ],
  },
  {
    id: 3,
    content: 'Third',
    children: [],
  },
  {
    id: 4,
    content: 'Fourth',
    children: [],
  },
];

stories.add(
  'Basic Usage',
  withInfo({
    text:
      'This is the basic usage of the component' +
      'Note: just remove withStyles function and that is how you will use the component',
    inline: false,
    propTables: [TreeView],
    propTablesExclude: [TreeViewWithContainer],
  })(() => {
    const onSelect = action('onSelect');
    return <TreeViewWithContainer items={items} onSelect={onSelect} />;
  }),
);
