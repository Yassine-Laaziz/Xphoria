export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slogan',
      title: 'Slogan',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 90,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'noBgImages',
      title: 'Colours and their Transparent-Background Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'color',
              type: 'string',
              title: 'Color Hex code',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'images',
              type: 'array',
              title: 'Transparent-Background Images',
              of: [{type: 'image', options: {hotspot: true}}],
              validation: (Rule) => Rule.required().min(1).max(3),
            },
            {
              name: 'sizes',
              title: 'Sizes',
              type: 'array',
              of: [{type: 'string'}],
              validation: (Rule) => Rule.required().min(1),
            },
          ],
        },
      ],
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().min(1),
    },
  ],
}
