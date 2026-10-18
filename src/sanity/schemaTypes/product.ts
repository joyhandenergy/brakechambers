import { defineArrayMember, defineField, defineType } from 'sanity'

const categoryList = ['Spring Brake', 'Service Brake', 'Air Disc Actuator', 'Parts & Kits'];

const chamberTypeList = [
  'Type 30/30',
  'Type 30',
  'Type 30/36',
  'Type 30/24',
  'Type 30/28',
  'Type 36/36',
  'Type 36',
  'Type 24/30',
  'Type 24/24',
  'Type 24',
  'Type 24/16',
  'Type 20/30',
  'Type 20/24',
  'Type 20',
  'Type 16/24',
  'Type 16/16',
  'Type 16',
  'Type 14/24',
  'Type 12/20',
  'Type 12',
  'Type 09/20',
  'Type 9',
  'RAM 24/30',
  'RAM 24/25',
  'RAM 20/30',
  'RAM 20/25',
  'RAM 16/20',
  '10PC1 330 Rear',
  '10PD1 340 Rear',
  'CW520 Rear',
  'FV310',
  'Hino HE',
  'Hino SH',
  'UD340 Rear',
];

const strokeSizeList = ['Standard', 'Long Stroke', 'N/A'];

const strokeInchList = [
  { title: '2-1/2 in (Standard 2.5")', value: '2-1/2 in' },
  { title: '3 in (Long Stroke 3.0")', value: '3 in' },
  { title: '2-1/4 in (2.25")', value: '2-1/4 in' },
  { title: '2-3/4 in (2.75")', value: '2-3/4 in' },
  { title: '2 in (2.0")', value: '2 in' },
  { title: 'N/A (Accessories & Kits)', value: 'N/A' },
];

const pushRodLengthList = [
  { title: '8 in (Standard Heavy-Duty 8.0")', value: '8 in' },
  { title: '5-5/8 in (5.625")', value: '5-5/8 in' },
  { title: '2-1/4 in (2.25")', value: '2-1/4 in' },
  { title: 'Universal / Cut-to-Length', value: 'Universal' },
  { title: 'N/A (Accessories & Kits)', value: 'N/A' },
];

const applicationList = [
  { title: 'S-Cam Drum Brake (Standard)', value: 'S-Cam Brake' },
  { title: 'Air Disc Brake (ADB)', value: 'Air Disc Brake' },
  { title: 'Universal (RH/LH)', value: 'Universal (RH/LH)' },
  { title: 'Heavy Truck Rear Axle', value: 'Heavy Truck Rear' },
  { title: 'Steer Axle', value: 'Steer Axle' },
  { title: 'Trailer Axle', value: 'Trailer Axle' },
  { title: 'Tipper / Dump Body Special', value: 'Tipper / Dump Body Special' },
  { title: 'Mitsubishi Fuso & Hino', value: 'Mitsubishi Fuso & Hino' },
];

const brandList = [
  { title: 'Bendix', value: 'Bendix' },
  { title: 'Haldex', value: 'Haldex' },
  { title: 'MGM', value: 'MGM' },
  { title: 'Meritor', value: 'Meritor' },
  { title: 'Wabco', value: 'Wabco' },
  { title: 'Knorr-Bremse', value: 'Knorr-Bremse' },
  { title: 'TSE', value: 'TSE' },
  { title: 'Provia', value: 'Provia' },
  { title: 'Automann', value: 'Automann' },
  { title: 'FleetSpec', value: 'FleetSpec' },
  { title: 'HD Plus', value: 'HD Plus' },
  { title: 'SAF-Holland', value: 'SAF-Holland' },
  { title: 'Hendrickson', value: 'Hendrickson' },
  { title: 'Dexter', value: 'Dexter' },
  { title: 'Euclid', value: 'Euclid' },
  { title: 'KENNO', value: 'KENNO' },
  { title: 'Isuzu', value: 'Isuzu' },
  { title: 'Hino', value: 'Hino' },
  { title: 'Nissan UD', value: 'Nissan UD' },
  { title: 'Mitsubishi Fuso', value: 'Mitsubishi Fuso' },
  { title: 'Generic/Unbranded', value: 'Generic/Unbranded' },
];

// Mirrors the BrakeChamber type in src/types/index.ts so products can be
// moved from src/lib/data.ts into Sanity without losing any information.
const productGroups = [
  { name: 'basic', title: 'Basic Info', default: true },
  { name: 'specs', title: 'Specifications' },
  { name: 'oem', title: 'OEM & Search' },
  { name: 'media', title: 'Images' },
  { name: 'sales', title: 'Sales' },
  { name: 'seo', title: 'SEO' },
];

const productOrderings = [
  { title: 'Name A–Z', name: 'nameAsc', by: [{ field: 'name', direction: 'asc' }] as any },
  { title: 'Category', name: 'categoryAsc', by: [{ field: 'category', direction: 'asc' }, { field: 'name', direction: 'asc' }] as any },
];

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  groups: productGroups,
  fields: [
    // ── Basic ─────────────────────────────────────────────
    defineField({ name: 'name', title: 'Product Name', type: 'string', group: 'basic', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'basic',
      description: 'The last part of the product URL. Changing it changes the page address, so avoid editing live products.',
      options: { source: 'name', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'basic',
      options: {
        list: categoryList,
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'type',
      title: 'Chamber Type / Model',
      type: 'string',
      group: 'basic',
      description: 'Select standard chamber size or enter custom. Used for sidebar Model filtering.',
      options: {
        list: chamberTypeList,
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'modelDesignation', title: 'Model Designation', type: 'string', group: 'basic', description: 'e.g. T16, T3030' }),
    defineField({ name: 'brakingMethod', title: 'Braking Method', type: 'string', group: 'basic', description: 'e.g. Single Diaphragm, Double Diaphragm' }),
    defineField({
      name: 'strokeSize',
      title: 'Stroke Size',
      type: 'string',
      group: 'basic',
      options: { list: strokeSizeList },
    }),
    defineField({
      name: 'strokeInch',
      title: 'Stroke (inches)',
      type: 'string',
      group: 'basic',
      description: 'Used for sidebar Stroke filtering.',
      options: {
        list: strokeInchList,
      },
    }),
    defineField({
      name: 'pushRodLengthInch',
      title: 'Push Rod Length (inches)',
      type: 'string',
      group: 'basic',
      description: 'Used for sidebar Push Rod Length filtering.',
      options: {
        list: pushRodLengthList,
      },
    }),
    defineField({ name: 'dutySpec', title: 'Duty Spec', type: 'string', group: 'basic', description: 'e.g. severe-duty, standard' }),
    defineField({ name: 'mountType', title: 'Mount Type', type: 'string', group: 'basic', description: 'e.g. MGM Style, welded clevis, round port' }),
    defineField({
      name: 'application',
      title: 'Application',
      type: 'string',
      group: 'basic',
      description: 'Used for sidebar Application filtering.',
      options: {
        list: applicationList,
      },
    }),
    defineField({ name: 'material', title: 'Material', type: 'string', group: 'basic' }),
    defineField({ name: 'brandSlug', title: 'Brand', type: 'string', group: 'basic', initialValue: 'brc', hidden: true }),
    defineField({
      name: 'description',
      title: 'Product Description',
      type: 'text',
      rows: 4,
      group: 'basic',
      description: 'Shown on the product page. Enter product details or overview.',
    }),
    defineField({
      name: 'includedItems',
      title: 'Included Items',
      type: 'array',
      group: 'basic',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
    }),

    // ── Specifications ────────────────────────────────────
    defineField({
      name: 'specifications',
      title: 'Specifications',
      type: 'object',
      group: 'specs',
      options: { collapsible: false },
      fields: [
        { name: 'maxOperatingPressure', title: 'Max Operating Pressure', type: 'string' },
        { name: 'operatingTemperature', title: 'Operating Temperature', type: 'string' },
        { name: 'pushRodLength', title: 'Push Rod Length', type: 'string' },
        { name: 'portSize', title: 'Port Size', type: 'string' },
        { name: 'weight', title: 'Weight', type: 'string' },
        { name: 'strokeMetric', title: 'Stroke (metric)', type: 'string' },
        { name: 'pushrodLengthMetric', title: 'Pushrod Length (L, metric)', type: 'string' },
        { name: 'mountingBoltSpacing', title: 'Mounting Bolt Spacing (A)', type: 'string' },
        { name: 'mountingStudThread', title: 'Mounting Stud Thread (B)', type: 'string' },
        { name: 'mountingStudLength', title: 'Mounting Stud Length (C)', type: 'string' },
        { name: 'clevisPinDiameter', title: 'Clevis Pin Diameter (D)', type: 'string' },
        { name: 'yokeClevisGapWidth', title: 'Yoke / Clevis Gap Width (E)', type: 'string' },
        { name: 'inletPortThreadSize', title: 'Inlet Port Thread Size (M)', type: 'string' },
        { name: 'sphericalRadius', title: 'Spherical Radius (R)', type: 'string' },
        { name: 'boltCircleDiameter', title: 'Bolt Circle Diameter', type: 'string' },
        { name: 'flangeHoleConfiguration', title: 'Flange Hole Configuration', type: 'string' },
        { name: 'pilotDiameter', title: 'Pilot Diameter', type: 'string' },
        { name: 'flangeDimension', title: 'Flange Dimension', type: 'string' },
        { name: 'bodyLength', title: 'Body Length', type: 'string' },
        { name: 'bodyOffset', title: 'Body Offset', type: 'string' },
        { name: 'hydraulicPortSize', title: 'Hydraulic Port Size', type: 'string' },
        { name: 'centerBossThread', title: 'Center Boss Thread', type: 'string' },
      ],
    }),

    // ── OEM & search ─────────────────────────────────────
    defineField({
      name: 'oemPartNumbers',
      title: 'OEM Part Numbers',
      type: 'array',
      group: 'oem',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'oemPart',
          fields: [
            { name: 'brand', title: 'Brand', type: 'string' },
            { name: 'partNumber', title: 'Part Number', type: 'string' },
            { name: 'notes', title: 'Notes', type: 'string' },
          ],
          preview: { select: { title: 'partNumber', subtitle: 'brand' } },
        }),
      ],
    }),
    defineField({
      name: 'crossReferenceBrands',
      title: 'Cross-Reference Brands',
      type: 'array',
      group: 'oem',
      description: 'Select matching brands for OEM cross-referencing and sidebar filtering.',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        list: brandList,
      },
    }),
    defineField({
      name: 'hiddenSearchTags',
      title: 'Hidden Search Tags',
      type: 'array',
      group: 'oem',
      description: 'Extra words people search for (part numbers, alternative names). Used by site search only.',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
    }),

    // ── Media ─────────────────────────────────────────────
    defineField({
      name: 'galleryUrls',
      title: 'Gallery Image Paths',
      type: 'array',
      group: 'media',
      description: 'Existing images stored in the website /public/productsImage folder, e.g. /productsImage/brc-t16-single-brake-1.jpg',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'images',
      title: 'Uploaded Images',
      type: 'array',
      group: 'media',
      description: 'Upload new images here. When present they are shown before the gallery paths above.',
      of: [defineArrayMember({ type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', title: 'Alt text', type: 'string' }] })],
    }),
    defineField({ name: 'factoryVideoUrl', title: 'Factory Video URL', type: 'url', group: 'media' }),
    defineField({ name: 'promoVideoUrl', title: 'Promo Video URL', type: 'url', group: 'media' }),

    // ── Sales ─────────────────────────────────────────────
    defineField({ name: 'priceUSD', title: 'Price (USD)', type: 'number', group: 'sales' }),
    defineField({ name: 'moq', title: 'Minimum Order Quantity', type: 'number', group: 'sales' }),
    defineField({ name: 'palletQuantity', title: 'Units per Pallet', type: 'number', group: 'sales' }),
    defineField({ name: 'stock', title: 'Stock', type: 'number', group: 'sales' }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime', group: 'sales' }),

    // ── SEO ───────────────────────────────────────────────
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
      group: 'seo',
      description: 'Leave empty to use the automatic title and description.',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'category', media: 'images.0' },
  },
})
