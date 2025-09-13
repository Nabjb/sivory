import { defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (Rule) => Rule.required()
    },
    {
        name: 'category',
        title: 'Category',
        type: 'reference',
        to: { type: 'category' },
        validation: (Rule) => Rule.required()
    },
    {
        name: 'subcategory',
        title: 'Subcategory',
        type: 'reference',
        to: { type: 'subcategory' },
        options: {
        disableNew: true
        }
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string'
        }
      ],
      validation: (Rule) => Rule.required()
    },
    {
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string'
            }
          ]
        }
      ]
    },
    {
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Show this project on the homepage'
    },
    {
      name: 'projectDetails',
      title: 'Project Details',
      type: 'object',
      fields: [
        {
          name: 'location',
          title: 'Location',
          type: 'string'
        },
        {
          name: 'year',
          title: 'Year',
          type: 'number'
        },
        {
          name: 'materials',
          title: 'Materials',
          type: 'array',
          of: [{ type: 'string' }]
        },
        {
          name: 'dimensions',
          title: 'Dimensions',
          type: 'string'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      category: 'category.title'
    },
    prepare(selection) {
      const { title, media, category } = selection
      return {
        title,
        media,
        subtitle: category
      }
    }
  }
})