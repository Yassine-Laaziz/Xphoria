export default {
  name: 'config',
  title: 'Configuration',
  type: 'document',
  fields: [
    {
      name: 'brand',
      title: 'Brand',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slogan',
      title: 'Slogan',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'footerText',
      title: 'Footer Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'recommended',
      title: 'Recommended product url',
      type: 'url',
      validation: (Rule) => Rule.required(),
    },
  ],
}
