import { type SchemaTypeDefinition } from 'sanity'
import { category } from './category'
import { subcategory } from './subcategory'
import { project } from './project'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [category, subcategory, project],
}