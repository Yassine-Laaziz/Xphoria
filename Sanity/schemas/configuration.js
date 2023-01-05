export default {
  name: 'configuration',
  title: 'Configuration',
  type: 'document',
  fields: [
    {
      name: 'brand',
      title: 'Brand',
      type: 'string',
    },
    {
      name: 'slogan',
      title: 'Slogan',
      type: 'string',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
    },
    {
      name: 'socials',
      title: 'Socials',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'social',
          title: 'Social',
          fields: [
            {name: 'name', title: 'Name', type: 'string'},
            {name: 'url', title: 'URL', type: 'url'},
            {name: 'logo', title: 'Logo', type: 'image'},
          ],
        },
      ],
    },
    {
      name: 'licence',
      title: 'License date and type',
      type: 'string',
    },
  ],
}
