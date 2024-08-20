import EArcGISOrgs from '../../../testUtils/orgEnums.js';

export default {
  webmaps: [
    {
      id: '5b2d08964e5848128e0fef31854fc13d',
      org: EArcGISOrgs.Holistic,
      config: [
        {
          id: '1786615cac0-layer-6',
          increments: 'weeks',
          min: '2024-04-05T01:34:49.000Z',
          max: '2024-07-02T20:26:33.000Z',
          rangeStart: new Date('2024-04-05'),
          rangeEnd: new Date('2024-07-15'),
        },
      ],
    },
    {
      id: 'c527e54af94c4d3988f6fba86a6b1a8f',
      org: EArcGISOrgs.Holistic,
      config: [
        {
          id: '1910f491fa6-layer-3',
          increments: 'days',
          min: '2019-05-06T21:19:35.000Z',
          max: '2019-07-30T12:25:33.000Z',
          rangeStart: new Date('2019-05-23T21:19:35.000Z'),
          rangeEnd: new Date('2019-05-31T12:25:33.000Z'),
        },
        {
          id: '19137ba8b91-layer-4',
          increments: 'weeks',
          min: '2016-12-31',
          max: '2017-12-30',
          rangeStart: new Date('2017-01-31'),
          rangeEnd: new Date('2017-02-15'),
        },
      ],
    },
  ],
  webscenes: [
    {
      id: 'daab29aca87e4eb3bdafd11ebf6167ec',
      org: 'holistic.mapsdevext',
    },
    { id: '12b7f34cbcc340a585ef8147f444b6de', org: EArcGISOrgs.Holistic },
  ],
};
