import { type SchemaTypeDefinition } from 'sanity'

import { product } from './product'
import { post } from './post'
import { page } from './page'
import { seo } from './seo'
import { technicalResource } from './technicalResource'
import { blockContent } from './blockContent'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, post, page, seo, technicalResource, blockContent],
}
