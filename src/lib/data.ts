import { Brand, Market, BrakeChamber, BrakeAccessory, AccessoryCategory, ChamberCategory } from '../types';

export const MARKETS: Market[] = [
  { countryName: 'English', code: 'en', isActive: true, flag: '🇺🇸' },
  { countryName: '中文', code: 'zh-CN', isActive: true, flag: '🇨🇳' },
];

export const BRANDS: Brand[] = [
  { slug: 'brc', name: 'BRC', country: 'China' },
  { slug: 'generic', name: 'Generic', country: 'China' },
];

const seenChamberSlugs = new Set<string>();

const createChamber = (id: string, name: string, type: string, category: ChamberCategory, strokeSize: string, priceUSD: number, overrides?: Partial<BrakeChamber['specifications']> & Partial<Pick<BrakeChamber, 'crossReferenceBrands' | 'strokeInch' | 'pushRodLengthInch' | 'application' | 'oemPartNumbers' | 'moq' | 'palletQuantity' | 'dutySpec' | 'mountType' | 'modelDesignation' | 'brakingMethod' | 'hiddenSearchTags' | 'galleryUrls'>>): BrakeChamber => {
  const parts = [
    type,
    overrides?.dutySpec,
    overrides?.strokeInch ? overrides.strokeInch.replace(/ /g, '') : (strokeSize === 'Long Stroke' ? '3in' : '2-12in'),
    overrides?.mountType
  ].filter(Boolean);

  let newSlug = parts.map(p => p!.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')).join('-');
  newSlug = newSlug.replace(/-+/g, '-').replace(/^-|-$/g, '');

  if (seenChamberSlugs.has(newSlug)) {
    throw new Error('SLUG COLLISION DETECTED for ' + newSlug + '. Please add distinguishing attributes like dutySpec or mountType for product ID: ' + id);
  }
  seenChamberSlugs.add(newSlug);

  return {
    slug: newSlug,
    name: name,
    brandSlug: 'brc',
    category: category,
    type: type,
    modelDesignation: overrides?.modelDesignation,
    brakingMethod: overrides?.brakingMethod,
    strokeSize: strokeSize,
    strokeInch: overrides?.strokeInch || (strokeSize === 'Long Stroke' ? '3 in' : '2-1/2 in'),
    pushRodLengthInch: overrides?.pushRodLengthInch || '8 in',
    dutySpec: overrides?.dutySpec,
    mountType: overrides?.mountType,
    application: overrides?.application || 'S-Cam Brake',
    crossReferenceBrands: overrides?.crossReferenceBrands || ['Bendix', 'Haldex', 'MGM', 'Meritor', 'Wabco', 'Knorr-Bremse', 'TSE', 'Provia'],
    oemPartNumbers: overrides?.oemPartNumbers,
    hiddenSearchTags: overrides?.hiddenSearchTags,
    material: 'Steel',
    priceUSD: priceUSD,
    includedItems: ['Clevis', 'Nuts', 'Washers'],
    description: `<p>High quality ${strokeSize.toLowerCase()} ${category.toLowerCase()} directly from the factory. Tested for 1 million cycles.</p>`,
    specifications: {
      maxOperatingPressure: overrides?.maxOperatingPressure || '150 psi',
      operatingTemperature: overrides?.operatingTemperature || '-40°C to +80°C',
      pushRodLength: overrides?.pushRodLength || '8.0 inches',
      portSize: overrides?.portSize || '3/8" NPT',
      weight: overrides?.weight || '8.5 lbs',
      strokeMetric: overrides?.strokeMetric,
      pushrodLengthMetric: overrides?.pushrodLengthMetric,
      mountingBoltSpacing: overrides?.mountingBoltSpacing,
      mountingStudThread: overrides?.mountingStudThread,
      mountingStudLength: overrides?.mountingStudLength,
      clevisPinDiameter: overrides?.clevisPinDiameter,
      yokeClevisGapWidth: overrides?.yokeClevisGapWidth,
      inletPortThreadSize: overrides?.inletPortThreadSize,
      centerBossThread: overrides?.centerBossThread,
    },
    galleryUrls: overrides?.galleryUrls || (category === 'Spring Brake' ? ['/productsImage/spring-brake.png'] : category === 'Service Brake' ? ['/productsImage/service-brake.png'] : ['/productsImage/air-disc-actuator.png']),
    stock: Math.floor(Math.random() * 500) + 100,
    publishedAt: '2024-02-01T00:00:00Z',
    moq: overrides?.moq || 50,
    palletQuantity: overrides?.palletQuantity || 120,
  };
};

export const BRAKE_CHAMBERS: BrakeChamber[] = [
  createChamber('t16-single', 'Type 16 Single Diaphragm Air Brake Chamber (75mm Stroke)', 'Type 16', 'Service Brake', 'Standard', 22.00, {
    modelDesignation: 'T16',
    brakingMethod: 'Single Diaphragm',
    weight: '6 lbs',
    strokeMetric: '75 mm',
    pushrodLengthMetric: '190 mm',
    mountingBoltSpacing: '76.2 mm',
    mountingStudThread: '2-M12×1.5',
    mountingStudLength: '31 mm',
    clevisPinDiameter: '14 mm',
    yokeClevisGapWidth: '14.5 mm',
    inletPortThreadSize: '2-M16×1.5',
    hiddenSearchTags: ['423.104.900.0', '4231049000', '423 104 900 0', 'T16BrakeChamber', 'Type 16 air chamber', 'Single diaphragm T16'],
    galleryUrls: ['/productsImage/brc-t16-single-brake-1.jpg', '/productsImage/brc-t16-single-brake-1-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'Wabco', partNumber: '423.104.900.0', notes: 'Direct Match' }
    ]
  }),
  createChamber('t20-single', 'Type 20 Single Diaphragm Air Brake Chamber (75mm Stroke)', 'Type 20', 'Service Brake', 'Standard', 24.00, {
    modelDesignation: 'T20',
    brakingMethod: 'Single Diaphragm',
    weight: '7 lbs',
    strokeMetric: '75 mm',
    pushrodLengthMetric: '190 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '2-M16×1.5',
    mountingStudLength: '38 mm',
    clevisPinDiameter: '14 mm',
    yokeClevisGapWidth: '14.5 mm',
    inletPortThreadSize: '2-M16×1.5',
    hiddenSearchTags: ['423.105.900.0', '4231059000', '423 105 900 0', 'T20BrakeChamber', 'Type 20 air chamber', 'Single diaphragm T20'],
    galleryUrls: ['/productsImage/brc-t16-single-brake-1.jpg', '/productsImage/brc-t16-single-brake-1-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'Wabco', partNumber: '423.105.900.0', notes: 'Direct Match' }
    ]
  }),
  createChamber('t24-single', 'Type 24 Single Diaphragm Air Brake Chamber (75mm Stroke)', 'Type 24', 'Service Brake', 'Standard', 26.00, {
    modelDesignation: 'T24',
    brakingMethod: 'Single Diaphragm',
    weight: '8 lbs',
    strokeMetric: '75 mm',
    pushrodLengthMetric: '190 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '2-M16×1.5',
    mountingStudLength: '38 mm',
    clevisPinDiameter: '14 mm',
    yokeClevisGapWidth: '14.5 mm',
    inletPortThreadSize: '2-M16×1.5',
    hiddenSearchTags: ['423.106.900.0', '4231069000', '423 106 900 0', 'T24BrakeChamber', 'Type 24 air chamber', 'Single diaphragm T24'],
    galleryUrls: ['/productsImage/brc-t16-single-brake-1.jpg', '/productsImage/brc-t16-single-brake-1-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'Wabco', partNumber: '423.106.900.0', notes: 'Direct Match' }
    ]
  }),
  createChamber('t30-single', 'Type 30 Single Diaphragm Air Brake Chamber (75mm Stroke)', 'Type 30', 'Service Brake', 'Standard', 28.00, {
    modelDesignation: 'T30',
    brakingMethod: 'Single Diaphragm',
    weight: '9 lbs',
    strokeMetric: '75 mm',
    pushrodLengthMetric: '190 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '2-M16×1.5',
    mountingStudLength: '38 mm',
    clevisPinDiameter: '14 mm',
    yokeClevisGapWidth: '14.5 mm',
    inletPortThreadSize: '2-M16×1.5',
    hiddenSearchTags: ['423.107.900.0', '4231079000', '423 107 900 0', 'T30BrakeChamber', 'Type 30 air chamber', 'Single diaphragm T30'],
    galleryUrls: ['/productsImage/brc-t16-single-brake-1.jpg', '/productsImage/brc-t16-single-brake-1-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'Wabco', partNumber: '423.107.900.0', notes: 'Direct Match' }
    ]
  }),
  createChamber('t20-mgm', 'Type 20 Single Diaphragm Air Brake Chamber (MGM Style)', 'Type 20', 'Service Brake', 'Standard', 24.00, {
    modelDesignation: 'T20',
    mountType: 'MGM Style',
    brakingMethod: 'Single Diaphragm',
    weight: '7 lbs',
    strokeMetric: '57 mm',
    pushrodLengthMetric: '200 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '2-5/8”-11UNC',
    mountingStudLength: '38 mm',
    clevisPinDiameter: '12 mm',
    yokeClevisGapWidth: '14.5 mm',
    inletPortThreadSize: 'Z3/8" NPTF',
    hiddenSearchTags: ['1420001', 'T20MGMChamber', 'Type 20 MGM', 'American Standard Brake Chamber'],
    galleryUrls: ['/productsImage/brc-t20-mgm-single-brake-2.jpg', '/productsImage/brc-t20-mgm-single-brake-2-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'MGM', partNumber: '1420001', notes: 'Direct Match' }
    ]
  }),
  createChamber('t24-mgm', 'Type 24 Single Diaphragm Air Brake Chamber (MGM Style)', 'Type 24', 'Service Brake', 'Standard', 26.00, {
    modelDesignation: 'T24',
    mountType: 'MGM Style',
    brakingMethod: 'Single Diaphragm',
    weight: '8 lbs',
    strokeMetric: '64 mm',
    pushrodLengthMetric: '200 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '2-5/8”-11UNC',
    mountingStudLength: '38 mm',
    clevisPinDiameter: '12 mm',
    yokeClevisGapWidth: '14.5 mm',
    inletPortThreadSize: 'Z3/8" NPTF',
    hiddenSearchTags: ['1427001', 'T24MGMChamber', 'Type 24 MGM', 'American Standard Brake Chamber'],
    galleryUrls: ['/productsImage/brc-t20-mgm-single-brake-2.jpg', '/productsImage/brc-t20-mgm-single-brake-2-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'MGM', partNumber: '1427001', notes: 'Direct Match' }
    ]
  }),
  createChamber('t30-mgm', 'Type 30 Single Diaphragm Air Brake Chamber (MGM Style)', 'Type 30', 'Service Brake', 'Standard', 28.00, {
    modelDesignation: 'T30',
    mountType: 'MGM Style',
    brakingMethod: 'Single Diaphragm',
    weight: '9 lbs',
    strokeMetric: '64 mm',
    pushrodLengthMetric: '200 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '2-5/8”-11UNC',
    mountingStudLength: '38 mm',
    clevisPinDiameter: '12 mm',
    yokeClevisGapWidth: '14.5 mm',
    inletPortThreadSize: 'Z3/8" NPTF',
    hiddenSearchTags: ['1430001', 'T30MGMChamber', 'Type 30 MGM', 'American Standard Brake Chamber'],
    galleryUrls: ['/productsImage/brc-t20-mgm-single-brake-2.jpg', '/productsImage/brc-t20-mgm-single-brake-2-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'MGM', partNumber: '1430001', notes: 'Direct Match' }
    ]
  }),
  createChamber('t36-mgm', 'Type 36 Single Diaphragm Air Brake Chamber (MGM Style)', 'Type 36', 'Service Brake', 'Standard', 32.00, {
    modelDesignation: 'T36',
    mountType: 'MGM Style',
    brakingMethod: 'Single Diaphragm',
    weight: '11 lbs',
    strokeMetric: '76 mm',
    pushrodLengthMetric: '200 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '2-5/8”-11UNC',
    mountingStudLength: '38 mm',
    clevisPinDiameter: '12 mm',
    yokeClevisGapWidth: '14.5 mm',
    inletPortThreadSize: 'Z3/8" NPTF',
    hiddenSearchTags: ['1436001', 'T36MGMChamber', 'Type 36 MGM', 'American Standard Brake Chamber'],
    galleryUrls: ['/productsImage/brc-t20-mgm-single-brake-2.jpg', '/productsImage/brc-t20-mgm-single-brake-2-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'MGM', partNumber: '1436001', notes: 'Direct Match' }
    ]
  }),
  createChamber('t16-short', 'Type 16 Short-Stroke Single Diaphragm Brake Chamber (15mm Pushrod)', 'Type 16', 'Service Brake', 'Standard', 22.00, {
    modelDesignation: 'T16',
    mountType: 'Short-Stroke',
    brakingMethod: 'Single Diaphragm',
    weight: '6.5 lbs',
    strokeMetric: '57 mm',
    pushrodLengthMetric: '15 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '2-M16×1.5',
    mountingStudLength: '38 mm',
    inletPortThreadSize: '2-M16×1.5',
    sphericalRadius: 'SR8',
    hiddenSearchTags: ['423.104.020.0', '4231040200', 'T16ShortStroke', 'Stub Pushrod Air Pot', 'Type 16 short'],
    galleryUrls: ['/productsImage/brc-t20-short-stroke-single-3.jpg', '/productsImage/brc-t20-short-stroke-single-3-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'Wabco', partNumber: '423.104.020.0', notes: 'Direct Match' }
    ]
  }),
  createChamber('t20-short', 'Type 20 Short-Stroke Single Diaphragm Brake Chamber (15mm Pushrod)', 'Type 20', 'Service Brake', 'Standard', 24.00, {
    modelDesignation: 'T20',
    mountType: 'Short-Stroke',
    brakingMethod: 'Single Diaphragm',
    weight: '7 lbs',
    strokeMetric: '60 mm',
    pushrodLengthMetric: '15 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '2-M16×1.5',
    mountingStudLength: '38 mm',
    inletPortThreadSize: '2-M16×1.5',
    sphericalRadius: 'SR8',
    hiddenSearchTags: ['423.505.000.0', '4235050000', 'T20ShortStroke', 'Stub Pushrod Air Pot', 'Type 20 short'],
    galleryUrls: ['/productsImage/brc-t20-short-stroke-single-3.jpg', '/productsImage/brc-t20-short-stroke-single-3-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'Wabco', partNumber: '423.505.000.0', notes: 'Direct Match' }
    ]
  }),
  createChamber('t24-short', 'Type 24 Short-Stroke Single Diaphragm Brake Chamber (15mm Pushrod)', 'Type 24', 'Service Brake', 'Standard', 26.00, {
    modelDesignation: 'T24',
    mountType: 'Short-Stroke',
    brakingMethod: 'Single Diaphragm',
    weight: '8 lbs',
    strokeMetric: '64 mm',
    pushrodLengthMetric: '15 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '2-M16×1.5',
    mountingStudLength: '38 mm',
    inletPortThreadSize: '2-M16×1.5',
    sphericalRadius: 'SR8',
    hiddenSearchTags: ['423.506.001.0', '4235060010', 'T24ShortStroke', 'Stub Pushrod Air Pot', 'Type 24 short'],
    galleryUrls: ['/productsImage/brc-t20-short-stroke-single-3.jpg', '/productsImage/brc-t20-short-stroke-single-3-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'Wabco', partNumber: '423.506.001.0', notes: 'Direct Match' }
    ]
  }),
  createChamber('t24-flange', 'Type 24 Japanese Style 4-Bolt Flange Brake Chamber', 'Type 24', 'Service Brake', 'Standard', 26.00, {
    modelDesignation: 'T24',
    mountType: 'Japanese Flange',
    brakingMethod: 'Single Diaphragm',
    weight: '8 lbs',
    strokeMetric: '60 mm',
    boltCircleDiameter: 'φ87.5',
    flangeHoleConfiguration: '4-φ10.5',
    pilotDiameter: 'φ55',
    inletPortThreadSize: '1/4" NPT',
    pushrodLengthMetric: '215 mm',
    hiddenSearchTags: ['47830-3380', 'T24FlangeChamber', 'Hino Style Service Chamber', 'Type 24 flange'],
    galleryUrls: ['/productsImage/brc-t24-japanese-flange-brake-4.jpg', '/productsImage/brc-t24-japanese-flange-brake-4-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'Hino/Isuzu', partNumber: '47830-3380', notes: 'Direct Match' }
    ]
  }),
  createChamber('t30-flange', 'Type 30 Japanese Style 4-Bolt Flange Brake Chamber', 'Type 30', 'Service Brake', 'Standard', 28.00, {
    modelDesignation: 'T30',
    mountType: 'Japanese Flange',
    brakingMethod: 'Single Diaphragm',
    weight: '9 lbs',
    strokeMetric: '60 mm',
    boltCircleDiameter: 'φ87.5',
    flangeHoleConfiguration: '4-φ10.5',
    pilotDiameter: 'φ55',
    inletPortThreadSize: '1/4" NPT',
    pushrodLengthMetric: '215 mm',
    hiddenSearchTags: ['47830-3170', '47830-3180', 'T30FlangeChamber', 'Hino Style Service Chamber', 'Type 30 flange'],
    galleryUrls: ['/productsImage/brc-t24-japanese-flange-brake-4.jpg', '/productsImage/brc-t24-japanese-flange-brake-4-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'Hino/Isuzu', partNumber: '47830-3170/3180', notes: 'Direct Match' }
    ]
  }),
  createChamber('ram1620', 'RAM1620 Air-Hydraulic Combination Brake Actuator', 'RAM 16/20', 'Service Brake', 'Standard', 30.00, {
    modelDesignation: 'RAM1620',
    mountType: 'Air-Hydraulic RAM',
    brakingMethod: 'Air-Hydraulic Combination',
    weight: '9 lbs',
    strokeMetric: '75 mm',
    mountingBoltSpacing: '76.2 mm',
    mountingStudThread: '2-M12×1.5',
    mountingStudLength: '32 mm',
    clevisPinDiameter: '12.5 mm',
    yokeClevisGapWidth: '12.5 mm',
    inletPortThreadSize: '2-M16×1.5',
    hydraulicPortSize: 'G3/8"',
    hiddenSearchTags: ['RAM1620', 'Air Hydraulic Brake Actuator', 'RAM Brake Cylinder', 'Diaphragm Oil Cylinder'],
    galleryUrls: ['/productsImage/brc-ram2025-air-hydraulic-brake-5.jpg', '/productsImage/brc-ram2025-air-hydraulic-brake-5-drawing.jpg']
  }),
  createChamber('ram2025', 'RAM2025 Air-Hydraulic Combination Brake Actuator', 'RAM 20/25', 'Service Brake', 'Standard', 34.00, {
    modelDesignation: 'RAM2025',
    mountType: 'Air-Hydraulic RAM',
    brakingMethod: 'Air-Hydraulic Combination',
    weight: '10.5 lbs',
    strokeMetric: '75 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '2-M16×1.5',
    mountingStudLength: '40 mm',
    clevisPinDiameter: '14 mm',
    yokeClevisGapWidth: '14.5 mm',
    inletPortThreadSize: '2-M16×1.5',
    hydraulicPortSize: 'G3/8"',
    hiddenSearchTags: ['RAM2025', 'Air Hydraulic Brake Actuator', 'RAM Brake Cylinder', 'Diaphragm Oil Cylinder'],
    galleryUrls: ['/productsImage/brc-ram2025-air-hydraulic-brake-5.jpg', '/productsImage/brc-ram2025-air-hydraulic-brake-5-drawing.jpg']
  }),
  createChamber('ram2425', 'RAM2425 Air-Hydraulic Combination Brake Actuator', 'RAM 24/25', 'Service Brake', 'Standard', 36.00, {
    modelDesignation: 'RAM2425',
    mountType: 'Air-Hydraulic RAM',
    brakingMethod: 'Air-Hydraulic Combination',
    weight: '11 lbs',
    strokeMetric: '75 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '2-M16×1.5',
    mountingStudLength: '40 mm',
    clevisPinDiameter: '14 mm',
    yokeClevisGapWidth: '14.5 mm',
    inletPortThreadSize: '2-M16×1.5',
    hydraulicPortSize: 'G3/8"',
    hiddenSearchTags: ['RAM2425', 'Air Hydraulic Brake Actuator', 'RAM Brake Cylinder', 'Diaphragm Oil Cylinder'],
    galleryUrls: ['/productsImage/brc-ram2025-air-hydraulic-brake-5.jpg', '/productsImage/brc-ram2025-air-hydraulic-brake-5-drawing.jpg']
  }),
  createChamber('ram2030', 'RAM2030 Air-Hydraulic Combination Brake Actuator', 'RAM 20/30', 'Service Brake', 'Standard', 38.00, {
    modelDesignation: 'RAM2030',
    mountType: 'Air-Hydraulic RAM',
    brakingMethod: 'Air-Hydraulic Combination',
    weight: '12 lbs',
    strokeMetric: '75 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '2-M16×1.5',
    mountingStudLength: '40 mm',
    clevisPinDiameter: '14 mm',
    yokeClevisGapWidth: '14.5 mm',
    inletPortThreadSize: '2-M16×1.5',
    hydraulicPortSize: 'G3/8"',
    hiddenSearchTags: ['RAM2030', 'Air Hydraulic Brake Actuator', 'RAM Brake Cylinder', 'Diaphragm Oil Cylinder'],
    galleryUrls: ['/productsImage/brc-ram2025-air-hydraulic-brake-5.jpg', '/productsImage/brc-ram2025-air-hydraulic-brake-5-drawing.jpg']
  }),
  createChamber('ram2430', 'RAM2430 Air-Hydraulic Combination Brake Actuator', 'RAM 24/30', 'Service Brake', 'Standard', 42.00, {
    modelDesignation: 'RAM2430',
    mountType: 'Air-Hydraulic RAM',
    brakingMethod: 'Air-Hydraulic Combination',
    weight: '13 lbs',
    strokeMetric: '75 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '2-M16×1.5',
    mountingStudLength: '40 mm',
    clevisPinDiameter: '14 mm',
    yokeClevisGapWidth: '14.5 mm',
    inletPortThreadSize: '2-M16×1.5',
    hydraulicPortSize: 'G3/8"',
    hiddenSearchTags: ['RAM2430', 'Air Hydraulic Brake Actuator', 'RAM Brake Cylinder', 'Diaphragm Oil Cylinder'],
    galleryUrls: ['/productsImage/brc-ram2025-air-hydraulic-brake-5.jpg', '/productsImage/brc-ram2025-air-hydraulic-brake-5-drawing.jpg']
  }),
  createChamber('t2024-short', 'Type 20/24 Short-Rod Double Diaphragm Spring Brake Chamber', 'Type 20/24', 'Spring Brake', 'Standard', 45.00, {
    modelDesignation: 'T20/24',
    mountType: 'Short-Rod',
    brakingMethod: 'Double Diaphragm',
    weight: '16 lbs',
    strokeMetric: '60 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '2-M16×1.5',
    mountingStudLength: '37 mm',
    clevisPinDiameter: '14 mm',
    yokeClevisGapWidth: '15 mm',
    inletPortThreadSize: '2-M16×1.5',
    pushrodLengthMetric: '42 mm',
    hiddenSearchTags: ['S03055A', 'T2024HLM', '20/24 Brake Cylinder', 'Double Diaphragm Brake Chamber'],
    galleryUrls: ['/productsImage/brc-t2424-short-rod-spring-brake-6.jpg', '/productsImage/brc-t2424-short-rod-spring-brake-6-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'Generic/Unbranded', partNumber: 'S03055A', notes: 'Original No Variant A' },
      { brand: 'Generic/Unbranded', partNumber: 'T2024HLM', notes: 'Original No Variant B' }
    ]
  }),
  createChamber('t2424-short', 'Type 24/24 Short-Rod Double Diaphragm Spring Brake Chamber', 'Type 24/24', 'Spring Brake', 'Standard', 48.00, {
    modelDesignation: 'T24/24',
    mountType: 'Short-Rod',
    brakingMethod: 'Double Diaphragm',
    weight: '17 lbs',
    strokeMetric: '60 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '2-M16×1.5',
    mountingStudLength: '37 mm',
    clevisPinDiameter: '14 mm',
    yokeClevisGapWidth: '15 mm',
    inletPortThreadSize: '2-M16×1.5',
    pushrodLengthMetric: '42 mm',
    hiddenSearchTags: ['S03037F', 'T2424HLM', '24/24 Emergency Air Pot', 'Double Diaphragm Brake Chamber'],
    galleryUrls: ['/productsImage/brc-t2424-short-rod-spring-brake-6.jpg', '/productsImage/brc-t2424-short-rod-spring-brake-6-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'Generic/Unbranded', partNumber: 'S03037F', notes: 'Original No Variant A' },
      { brand: 'Generic/Unbranded', partNumber: 'T2424HLM', notes: 'Original No Variant B' }
    ]
  }),
  createChamber('t2424-mgm-spring', 'Type 24/24 Double Diaphragm Spring Brake Chamber (MGM Style)', 'Type 24/24', 'Spring Brake', 'Standard', 45.00, {
    modelDesignation: 'T24/24',
    mountType: 'MGM Spring',
    brakingMethod: 'Double Diaphragm',
    weight: '17 lbs',
    strokeMetric: '64 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '2-5/8-11" UNC',
    mountingStudLength: '38 mm',
    clevisPinDiameter: '12.5 mm',
    yokeClevisGapWidth: '14.5 mm',
    inletPortThreadSize: '2-3/8" NPT',
    pushrodLengthMetric: '200 mm',
    hiddenSearchTags: ['3427051', '2424MGMSpring', 'MGM Spring Brake Canister', '24/24 Long Stroke Air Pot'],
    galleryUrls: ['/productsImage/brc-t3030-mgm-spring-brake-7-v2.jpg', '/productsImage/brc-t3030-mgm-spring-brake-7-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'MGM', partNumber: '3427051', notes: 'Direct Match' }
    ]
  }),
  createChamber('t2430-mgm-spring', 'Type 24/30 Double Diaphragm Spring Brake Chamber (MGM Style)', 'Type 24/30', 'Spring Brake', 'Standard', 48.00, {
    modelDesignation: 'T24/30',
    mountType: 'MGM Spring',
    brakingMethod: 'Double Diaphragm',
    weight: '18 lbs',
    strokeMetric: '64 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '2-5/8-11" UNC',
    mountingStudLength: '38 mm',
    clevisPinDiameter: '12.5 mm',
    yokeClevisGapWidth: '14.5 mm',
    inletPortThreadSize: '2-3/8" NPT',
    pushrodLengthMetric: '200 mm',
    hiddenSearchTags: ['3429051', '2430MGMSpring', 'MGM Spring Brake Canister', 'Double Diaphragm Chamber'],
    galleryUrls: ['/productsImage/brc-t3030-mgm-spring-brake-7-v2.jpg', '/productsImage/brc-t3030-mgm-spring-brake-7-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'MGM', partNumber: '3429051', notes: 'Direct Match' }
    ]
  }),
  createChamber('t3030-mgm-spring', 'Type 30/30 Double Diaphragm Spring Brake Chamber (MGM Style)', 'Type 30/30', 'Spring Brake', 'Standard', 50.00, {
    modelDesignation: 'T30/30',
    mountType: 'MGM Spring',
    brakingMethod: 'Double Diaphragm',
    weight: '20 lbs',
    strokeMetric: '64 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '2-5/8-11" UNC',
    mountingStudLength: '38 mm',
    clevisPinDiameter: '12.5 mm',
    yokeClevisGapWidth: '14.5 mm',
    inletPortThreadSize: '2-3/8" NPT',
    pushrodLengthMetric: '200 mm',
    hiddenSearchTags: ['3430051', 'NT3030STD-WC', 'NT3030', '5009011', 'GC3030', '3030MGMSpring', '30/30 Spring Brake Pot', 'MGM Spring Brake Canister'],
    galleryUrls: ['/productsImage/brc-t3030-mgm-spring-brake-7-v2.jpg', '/productsImage/brc-t3030-mgm-spring-brake-7-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'MGM', partNumber: '3430051', notes: 'Direct Match' },
      { brand: 'Bendix', partNumber: 'NT3030STD-WC', notes: 'Direct Replacement' },
      { brand: 'Bendix', partNumber: '5009011', notes: 'Direct Replacement' },
      { brand: 'Haldex', partNumber: 'GC3030', notes: 'Direct Replacement' }
    ]
  }),
  createChamber('t3036-mgm-spring', 'Type 30/36 Double Diaphragm Spring Brake Chamber (MGM Style)', 'Type 30/36', 'Spring Brake', 'Standard', 55.00, {
    modelDesignation: 'T30/36',
    mountType: 'MGM Spring',
    brakingMethod: 'Double Diaphragm',
    weight: '22 lbs',
    strokeMetric: '64 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '2-5/8-11" UNC',
    mountingStudLength: '38 mm',
    clevisPinDiameter: '12.5 mm',
    yokeClevisGapWidth: '14.5 mm',
    inletPortThreadSize: '2-3/8" NPT',
    pushrodLengthMetric: '200 mm',
    hiddenSearchTags: ['3433051', '3036MGMSpring', 'MGM Spring Brake Canister', 'Double Diaphragm Chamber'],
    galleryUrls: ['/productsImage/brc-t3030-mgm-spring-brake-7-v2.jpg', '/productsImage/brc-t3030-mgm-spring-brake-7-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'MGM', partNumber: '3433051', notes: 'Direct Match' }
    ]
  }),
  createChamber('t3636-mgm-spring', 'Type 36/36 Double Diaphragm Spring Brake Chamber (MGM Style)', 'Type 36/36', 'Spring Brake', 'Standard', 60.00, {
    modelDesignation: 'T36/36',
    mountType: 'MGM Spring',
    brakingMethod: 'Double Diaphragm',
    weight: '24 lbs',
    strokeMetric: '76 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '2-5/8-11" UNC',
    mountingStudLength: '38 mm',
    clevisPinDiameter: '12.5 mm',
    yokeClevisGapWidth: '14.5 mm',
    inletPortThreadSize: '2-3/8" NPT',
    pushrodLengthMetric: '200 mm',
    hiddenSearchTags: ['3437051', '3636MGMSpring', 'MGM Spring Brake Canister', 'Double Diaphragm Chamber'],
    galleryUrls: ['/productsImage/brc-t3030-mgm-spring-brake-7-v2.jpg', '/productsImage/brc-t3030-mgm-spring-brake-7-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'MGM', partNumber: '3437051', notes: 'Direct Match' }
    ]
  }),
  createChamber('t1624-short-stroke-spring', 'Type 16/24 Short-Stroke Double Diaphragm Spring Brake Chamber (15mm Pushrod)', 'Type 16/24', 'Spring Brake', 'Standard', 42.00, {
    modelDesignation: 'T16/24',
    mountType: 'Short-Stroke Spring',
    brakingMethod: 'Double Diaphragm',
    weight: '15 lbs',
    strokeMetric: '57 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '2-M16×1.5',
    mountingStudLength: '38 mm',
    sphericalRadius: 'SR8',
    inletPortThreadSize: '2-M16×1.5',
    pushrodLengthMetric: '15 mm',
    hiddenSearchTags: ['925.384.001.0', '9253840010', '1624ShortStrokeSpring', 'Short Stroke Spring Brake', 'Metric Stub Rod Maxibrake'],
    galleryUrls: ['/productsImage/brc-t1624-short-stroke-spring-brake-8-v2.jpg', '/productsImage/brc-t1624-short-stroke-spring-brake-8-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'Generic/Unbranded', partNumber: '925.384.001.0', notes: 'Direct Match' }
    ]
  }),
  createChamber('t2024-short-stroke-spring', 'Type 20/24 Short-Stroke Double Diaphragm Spring Brake Chamber (15mm Pushrod)', 'Type 20/24', 'Spring Brake', 'Standard', 45.00, {
    modelDesignation: 'T20/24',
    mountType: 'Short-Stroke Spring',
    brakingMethod: 'Double Diaphragm',
    weight: '16 lbs',
    strokeMetric: '57 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '2-M16×1.5',
    mountingStudLength: '38 mm',
    sphericalRadius: 'SR8',
    inletPortThreadSize: '2-M16×1.5',
    pushrodLengthMetric: '15 mm',
    hiddenSearchTags: ['925.380.002.0', '9253800020', '2024ShortStrokeSpring', 'Short Stroke Spring Brake', 'SR8 Spherical Double Diaphragm'],
    galleryUrls: ['/productsImage/brc-t1624-short-stroke-spring-brake-8-v2.jpg', '/productsImage/brc-t1624-short-stroke-spring-brake-8-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'Generic/Unbranded', partNumber: '925.380.002.0', notes: 'Direct Match' }
    ]
  }),
  createChamber('t2024-japanese-flange-spring', 'Type 20/24 Japanese Style 4-Bolt Flange Double Diaphragm Spring Brake', 'Type 20/24', 'Spring Brake', 'Standard', 48.00, {
    modelDesignation: 'T20/24',
    mountType: 'Japanese Flange Spring',
    brakingMethod: 'Double Diaphragm',
    weight: '16.5 lbs',
    strokeMetric: '57 mm',
    pilotDiameter: 'φ55',
    flangeHoleConfiguration: '4-φ10.5',
    flangeDimension: '80 mm',
    clevisPinDiameter: '36 mm',
    yokeClevisGapWidth: '20 mm',
    inletPortThreadSize: 'Z1/4"',
    bodyLength: '340 mm',
    hiddenSearchTags: ['47850-4081', '47850-4091', 'Hino Maxibrake Chamber', 'Japanese Flange Spring Brake'],
    galleryUrls: ['/productsImage/brc-t2430-flange-spring-brake-9.jpg', '/productsImage/brc-t2430-flange-spring-brake-9-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'Hino/Isuzu', partNumber: '47850-4081', notes: 'Original No Variant A' },
      { brand: 'Hino/Isuzu', partNumber: '47850-4091', notes: 'Original No Variant B' }
    ]
  }),
  createChamber('t2424-japanese-flange-spring', 'Type 24/24 Japanese Style 4-Bolt Flange Double Diaphragm Spring Brake', 'Type 24/24', 'Spring Brake', 'Standard', 52.00, {
    modelDesignation: 'T24/24',
    mountType: 'Japanese Flange Spring',
    brakingMethod: 'Double Diaphragm',
    weight: '17.5 lbs',
    strokeMetric: '57 mm',
    pilotDiameter: 'φ55',
    flangeHoleConfiguration: '4-φ10.5',
    flangeDimension: '80 mm',
    clevisPinDiameter: '36 mm',
    yokeClevisGapWidth: '20 mm',
    inletPortThreadSize: 'S Z3/8" - P Z1/4"',
    bodyLength: '340 mm',
    hiddenSearchTags: ['47850-4001', '47850-4011', '4 Bolt Flange Parking Brake Pot', '47850 Air Canister'],
    galleryUrls: ['/productsImage/brc-t2430-flange-spring-brake-9.jpg', '/productsImage/brc-t2430-flange-spring-brake-9-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'Hino/Isuzu', partNumber: '47850-4001', notes: 'Original No Variant A' },
      { brand: 'Hino/Isuzu', partNumber: '47850-4011', notes: 'Original No Variant B' }
    ]
  }),
  createChamber('t2430-japanese-flange-spring', 'Type 24/30 Japanese Style 4-Bolt Flange Double Diaphragm Spring Brake', 'Type 24/30', 'Spring Brake', 'Standard', 55.00, {
    modelDesignation: 'T24/30',
    mountType: 'Japanese Flange Spring',
    brakingMethod: 'Double Diaphragm',
    weight: '19 lbs',
    strokeMetric: '76 mm',
    pilotDiameter: 'φ55',
    flangeHoleConfiguration: '4-φ10.5',
    flangeDimension: '80 mm',
    clevisPinDiameter: '36 mm',
    yokeClevisGapWidth: '20 mm',
    inletPortThreadSize: 'Z3/8"',
    bodyLength: '380 mm',
    hiddenSearchTags: ['47850-3931', 'Hino Maxibrake Chamber', 'Japanese Flange Spring Brake', '47850 Air Canister'],
    galleryUrls: ['/productsImage/brc-t2430-flange-spring-brake-9.jpg', '/productsImage/brc-t2430-flange-spring-brake-9-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'Hino/Isuzu', partNumber: '47850-3931', notes: 'Direct Match' }
    ]
  }),
  createChamber('ud340-rear', 'Nissan Diesel UD340 Rear Piston-Diaphragm Brake Actuator', 'UD340 Rear', 'Service Brake', 'Standard', 65.00, {
    modelDesignation: 'UD340',
    mountType: 'Nissan UD Piston-Diaphragm',
    brakingMethod: 'Piston + Diaphragm',
    weight: '18 lbs',
    strokeMetric: '60 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '4-M16×1.5',
    mountingStudLength: '37 mm',
    clevisPinDiameter: '12 mm',
    yokeClevisGapWidth: '12 mm',
    inletPortThreadSize: '3-M16×1.5',
    bodyOffset: '50 mm',
    hiddenSearchTags: ['44320-90165', '44320-90166', 'Nissan UD Brake Chamber', '44320 Brake Pot'],
    galleryUrls: ['/productsImage/brc-ud340-nissan-rear-brake-10.jpg', '/productsImage/brc-ud340-nissan-rear-brake-10-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'Nissan UD', partNumber: '44320-90165', notes: 'Original No Variant A' },
      { brand: 'Nissan UD', partNumber: '44320-90166', notes: 'Original No Variant B' }
    ]
  }),
  createChamber('cw520-rear', 'Nissan Diesel CW520 Rear Piston-Diaphragm Brake Actuator', 'CW520 Rear', 'Service Brake', 'Standard', 70.00, {
    modelDesignation: 'CW520',
    mountType: 'Nissan UD Piston-Diaphragm',
    brakingMethod: 'Piston + Diaphragm',
    weight: '20 lbs',
    strokeMetric: '60 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '4-M16×1.5',
    mountingStudLength: '37 mm',
    clevisPinDiameter: '12 mm',
    yokeClevisGapWidth: '12 mm',
    inletPortThreadSize: '3-1/4" NPT',
    bodyOffset: '240 mm',
    hiddenSearchTags: ['44320-90268', 'CW520 Rear Air Chamber', 'Piston Diaphragm Brake Cylinder'],
    galleryUrls: ['/productsImage/brc-ud340-nissan-rear-brake-10.jpg', '/productsImage/brc-ud340-nissan-rear-brake-10-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'Nissan UD', partNumber: '44320-90268', notes: 'Direct Match' }
    ]
  }),
  createChamber('t9a-boss', 'Type 9-A Boss-Mounted Single Diaphragm Brake Chamber', 'Type 9', 'Service Brake', 'Standard', 22.00, {
    modelDesignation: 'T9-A',
    mountType: 'Boss-Mounted',
    brakingMethod: 'Single Diaphragm',
    weight: '5 lbs',
    strokeMetric: '45 mm',
    bodyLength: '143 mm',
    centerBossThread: '1 3/4"-12UN-2A',
    inletPortThreadSize: '2-M16×1.5',
    hiddenSearchTags: ['300.100.02', 'Boss Mount Brake Chamber', 'T9-A Brake Cylinder'],
    galleryUrls: ['/productsImage/brc-t12b-boss-mount-brake-11.jpg', '/productsImage/brc-t12b-boss-mount-brake-11--drawing.jpg'],
    oemPartNumbers: [
      { brand: 'Generic/Unbranded', partNumber: '300.100.02', notes: 'Direct Match' }
    ]
  }),
  createChamber('t12b-boss', 'Type 12-B Boss-Mounted Single Diaphragm Brake Chamber', 'Type 12', 'Service Brake', 'Standard', 24.00, {
    modelDesignation: 'T12-B',
    mountType: 'Boss-Mounted',
    brakingMethod: 'Single Diaphragm',
    weight: '6 lbs',
    strokeMetric: '45 mm',
    bodyLength: '172 mm',
    centerBossThread: '1 3/4"-12UN-2A',
    inletPortThreadSize: '2-M16×1.5',
    hiddenSearchTags: ['Boss Mount Brake Chamber'],
    galleryUrls: ['/productsImage/brc-t12b-boss-mount-brake-11.jpg', '/productsImage/brc-t12b-boss-mount-brake-11--drawing.jpg']
  }),
  createChamber('hino-sh', 'Hino SH Heavy Truck Rear Piston-Diaphragm Brake Actuator', 'Hino SH', 'Service Brake', 'Standard', 65.00, {
    modelDesignation: 'HINO-SH',
    mountType: '4-Stud Heavy Duty',
    brakingMethod: 'Piston + Diaphragm',
    weight: '18 lbs',
    strokeMetric: '64 mm',
    mountingBoltSpacing: '120 mm',
    mountingStudThread: '4-M16×1.5',
    mountingStudLength: '35 mm',
    clevisPinDiameter: '12 mm',
    yokeClevisGapWidth: '14 mm',
    inletPortThreadSize: '2-3/8" NPT',
    bodyLength: '390 mm',
    application: 'Heavy Truck Rear',
    hiddenSearchTags: ['47850-1131', '47850-1091', 'Hino Truck Brake Chamber'],
    galleryUrls: ['/productsImage/brc-hino-he-rear-brake-12.jpg', '/productsImage/brc-hino-he-rear-brake-12-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'Hino', partNumber: '47850-1131', notes: 'Primary' },
      { brand: 'Hino', partNumber: '47850-1091', notes: 'Secondary' }
    ]
  }),
  createChamber('hino-he', 'Hino HE Heavy Truck Rear Piston-Diaphragm Brake Actuator', 'Hino HE', 'Service Brake', 'Standard', 65.00, {
    modelDesignation: 'HINO-HE',
    mountType: '4-Stud Heavy Duty',
    brakingMethod: 'Piston + Diaphragm',
    weight: '18 lbs',
    strokeMetric: '64 mm',
    mountingBoltSpacing: '120 mm',
    mountingStudThread: '4-M16×1.5',
    mountingStudLength: '35 mm',
    clevisPinDiameter: '12 mm',
    yokeClevisGapWidth: '14 mm',
    inletPortThreadSize: '2-3/8" NPT',
    bodyLength: '145 mm',
    application: 'Heavy Truck Rear',
    hiddenSearchTags: ['47850-1080', '47850-1180', 'Hino Truck Brake Chamber'],
    galleryUrls: ['/productsImage/brc-hino-he-rear-brake-12.jpg', '/productsImage/brc-hino-he-rear-brake-12-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'Hino', partNumber: '47850-1080', notes: 'Primary' },
      { brand: 'Hino', partNumber: '47850-1180', notes: 'Secondary' }
    ]
  }),
  createChamber('fv310-he', 'Mitsubishi Fuso FV310 Rear Piston-Diaphragm Brake Actuator', 'FV310', 'Service Brake', 'Standard', 65.00, {
    modelDesignation: 'FV310-HE',
    mountType: '4-Stud Heavy Duty',
    brakingMethod: 'Piston + Diaphragm',
    weight: '18 lbs',
    strokeMetric: '64 mm',
    mountingBoltSpacing: '120 mm',
    mountingStudThread: '4-M16×1.5',
    mountingStudLength: '35 mm',
    clevisPinDiameter: '14 mm',
    yokeClevisGapWidth: '14 mm',
    inletPortThreadSize: '2-1/4" NPT',
    bodyLength: '145 mm',
    application: 'Tipper / Dump Body Special',
    hiddenSearchTags: ['MC886520', 'Fuso FV310 Rear Air Cylinder', 'Dump Body Special Chamber'],
    galleryUrls: ['/productsImage/brc-hino-he-rear-brake-12.jpg', '/productsImage/brc-hino-he-rear-brake-12-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'Mitsubishi Fuso', partNumber: 'MC886520', notes: 'Direct Match' }
    ]
  }),
  createChamber('t0920-boss', 'Type 09/20 Boss-Mounted Piston-Diaphragm Brake Chamber', 'Type 09/20', 'Spring Brake', 'Standard', 45.00, {
    modelDesignation: 'T09/20',
    mountType: 'Boss-Mounted',
    brakingMethod: 'Piston + Diaphragm',
    weight: '16 lbs',
    strokeMetric: '50 mm',
    bodyLength: '312 mm',
    centerBossThread: '1 3/4"-12UN-2A',
    inletPortThreadSize: '2-M16×1.5',
    hiddenSearchTags: ['KENNO:9/6200', 'Boss Mount Brake Chamber', 'Kenno Brake Actuator'],
    galleryUrls: ['/productsImage/brc-t0920-boss-mount-spring-brake-13.jpg', '/productsImage/brc-t0920-boss-mount-spring-brake-13-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'KENNO', partNumber: '9/6200', notes: 'Direct Match' }
    ]
  }),
  createChamber('t1220a-boss', 'Type 12/20-A Boss-Mounted Piston-Diaphragm Brake Chamber', 'Type 12/20', 'Spring Brake', 'Standard', 48.00, {
    modelDesignation: 'T12/20-A',
    mountType: 'Boss-Mounted',
    brakingMethod: 'Piston + Diaphragm',
    weight: '17 lbs',
    strokeMetric: '50 mm',
    bodyLength: '318 mm',
    centerBossThread: '1 3/4"-12UN-2A',
    inletPortThreadSize: '2-M16×1.5',
    hiddenSearchTags: ['KENNO:12/6200', 'Boss Mount Brake Chamber', 'Kenno Brake Actuator'],
    galleryUrls: ['/productsImage/brc-t0920-boss-mount-spring-brake-13.jpg', '/productsImage/brc-t0920-boss-mount-spring-brake-13-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'KENNO', partNumber: '12/6200', notes: 'Direct Match' }
    ]
  }),
  createChamber('t1624-wabco-pd', 'Type 16/24 WABCO Style Metric Piston-Diaphragm Brake Chamber', 'Type 16/24', 'Spring Brake', 'Standard', 45.00, {
    modelDesignation: 'T16/24',
    mountType: 'WABCO Style',
    brakingMethod: 'Piston + Diaphragm',
    weight: '16 lbs',
    strokeMetric: '57 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '2-M16×1.5',
    mountingStudLength: '38 mm',
    clevisPinDiameter: '14 mm',
    yokeClevisGapWidth: '14.15 mm',
    inletPortThreadSize: '2-M16×1.5',
    bodyLength: '187 mm',
    hiddenSearchTags: ['925.324.100.0', 'WABCO Style Combination Chamber', 'Metric Truck Air Canister'],
    galleryUrls: ['/productsImage/brc-t1624-wabco-spring-brake-14.jpg', '/productsImage/brc-t1624-wabco-spring-brake-14-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'Wabco', partNumber: '925.324.100.0', notes: 'Direct Match' }
    ]
  }),
  createChamber('t2024-wabco-pd', 'Type 20/24 WABCO Style Metric Piston-Diaphragm Brake Chamber', 'Type 20/24', 'Spring Brake', 'Standard', 48.00, {
    modelDesignation: 'T20/24',
    mountType: 'WABCO Style',
    brakingMethod: 'Piston + Diaphragm',
    weight: '17 lbs',
    strokeMetric: '57 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '2-M16×1.5',
    mountingStudLength: '38 mm',
    clevisPinDiameter: '14 mm',
    yokeClevisGapWidth: '14.5 mm',
    inletPortThreadSize: '2-M16×1.5',
    bodyLength: '187 mm',
    hiddenSearchTags: ['925.320.120.0', 'WABCO Style Combination Chamber'],
    galleryUrls: ['/productsImage/brc-t1624-wabco-spring-brake-14.jpg', '/productsImage/brc-t1624-wabco-spring-brake-14-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'Wabco', partNumber: '925.320.120.0', notes: 'Direct Match' }
    ]
  }),
  createChamber('t2424-wabco-pd', 'Type 24/24 WABCO Style Metric Piston-Diaphragm Brake Chamber', 'Type 24/24', 'Spring Brake', 'Standard', 50.00, {
    modelDesignation: 'T24/24',
    mountType: 'WABCO Style',
    brakingMethod: 'Piston + Diaphragm',
    weight: '18 lbs',
    strokeMetric: '57 / 67 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '2-M16×1.5',
    mountingStudLength: '38 mm',
    clevisPinDiameter: '14 mm',
    yokeClevisGapWidth: '14.15 mm',
    inletPortThreadSize: '2-M22×1.5',
    bodyLength: '290 mm',
    hiddenSearchTags: ['925.321.202.0', 'WABCO Style Combination Chamber'],
    galleryUrls: ['/productsImage/brc-t1624-wabco-spring-brake-14.jpg', '/productsImage/brc-t1624-wabco-spring-brake-14-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'Wabco', partNumber: '925.321.202.0', notes: 'Direct Match' }
    ]
  }),
  createChamber('t2030-metric-pd', 'Type 20/30 Metric Heavy-Duty Piston-Diaphragm Brake Chamber', 'Type 20/30', 'Spring Brake', 'Standard', 50.00, {
    modelDesignation: 'T20/30',
    mountType: 'Metric Heavy-Duty',
    brakingMethod: 'Piston + Diaphragm',
    weight: '19 lbs',
    strokeMetric: '64 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '2-M16×1.5',
    mountingStudLength: '38 mm',
    clevisPinDiameter: '14 mm',
    yokeClevisGapWidth: '14.5 mm',
    inletPortThreadSize: '2-M16×1.5',
    bodyLength: '250 mm',
    hiddenSearchTags: ['890.400.349.0', 'Heavy Duty Combination Chamber', 'Metric Maxibrake Pot'],
    galleryUrls: ['/productsImage/brc-t2430-metric-hd-spring-brake-15-v3.jpg', '/productsImage/brc-t2430-metric-hd-spring-brake-15-drawing-v3.jpg'],
    oemPartNumbers: [
      { brand: 'Generic/Unbranded', partNumber: '890.400.349.0', notes: 'Direct Match' }
    ]
  }),
  createChamber('t2430-metric-pd', 'Type 24/30 Metric Heavy-Duty Piston-Diaphragm Brake Chamber', 'Type 24/30', 'Spring Brake', 'Standard', 52.00, {
    modelDesignation: 'T24/30',
    mountType: 'Metric Heavy-Duty',
    brakingMethod: 'Piston + Diaphragm',
    weight: '20 lbs',
    strokeMetric: '64 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '2-M16×1.5',
    mountingStudLength: '38 mm',
    clevisPinDiameter: '14 mm',
    yokeClevisGapWidth: '14.5 mm',
    inletPortThreadSize: '2-M16×1.5',
    bodyLength: '250 mm',
    hiddenSearchTags: ['890.400.351.0', 'Heavy Duty Combination Chamber'],
    galleryUrls: ['/productsImage/brc-t2430-metric-hd-spring-brake-15-v3.jpg', '/productsImage/brc-t2430-metric-hd-spring-brake-15-drawing-v3.jpg'],
    oemPartNumbers: [
      { brand: 'Generic/Unbranded', partNumber: '890.400.351.0', notes: 'Direct Match' }
    ]
  }),
  createChamber('t3030-metric-pd', 'Type 30/30 Metric Heavy-Duty Piston-Diaphragm Brake Chamber', 'Type 30/30', 'Spring Brake', 'Standard', 55.00, {
    modelDesignation: 'T30/30',
    mountType: 'Metric Heavy-Duty',
    brakingMethod: 'Piston + Diaphragm',
    weight: '21 lbs',
    strokeMetric: '64 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '2-M16×1.5',
    mountingStudLength: '38 mm',
    clevisPinDiameter: '14 mm',
    yokeClevisGapWidth: '14.5 mm',
    inletPortThreadSize: '2-M16×1.5',
    bodyLength: '250 mm',
    hiddenSearchTags: ['890.400.353.0', 'Heavy Duty Combination Chamber', 'T30/30 Piston Diaphragm Cylinder'],
    galleryUrls: ['/productsImage/brc-t2430-metric-hd-spring-brake-15-v3.jpg', '/productsImage/brc-t2430-metric-hd-spring-brake-15-drawing-v3.jpg'],
    oemPartNumbers: [
      { brand: 'Generic/Unbranded', partNumber: '890.400.353.0', notes: 'Direct Match' }
    ]
  }),
  createChamber('t2024-voss', 'Type 20/24 WABCO Style Metric Piston-Diaphragm Brake Chamber (VOSS Port)', 'Type 20/24', 'Spring Brake', 'Standard', 48.00, {
    modelDesignation: 'T20/24',
    mountType: 'VOSS Port',
    brakingMethod: 'Piston + Diaphragm',
    weight: '17 lbs',
    strokeMetric: '57 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '2-M16×1.5',
    mountingStudLength: '38 mm',
    clevisPinDiameter: '14 mm',
    yokeClevisGapWidth: '14.5 mm',
    inletPortThreadSize: '2-VOSS 22×1.5',
    bodyLength: '200 mm',
    hiddenSearchTags: ['925.490.925.0', 'VOSS 22x1.5 Brake Chamber', 'European Truck Spring Brake'],
    galleryUrls: ['/productsImage/brc-t2424-wabco-standard-port-16-v3.jpg', '/productsImage/brc-t2424-wabco-standard-port-16-drawing-v3.jpg'],
    oemPartNumbers: [
      { brand: 'Wabco', partNumber: '925.490.925.0', notes: 'Direct Match' }
    ]
  }),
  createChamber('t2424-wabco-pd-std', 'Type 24/24 WABCO Style Metric Piston-Diaphragm Brake Chamber (Standard Port)', 'Type 24/24', 'Spring Brake', 'Standard', 50.00, {
    modelDesignation: 'T24/24',
    mountType: 'Standard Port',
    brakingMethod: 'Piston + Diaphragm',
    weight: '18 lbs',
    strokeMetric: '64 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '2-M16×1.5',
    mountingStudLength: '38 mm',
    clevisPinDiameter: '14 mm',
    yokeClevisGapWidth: '14.5 mm',
    inletPortThreadSize: '2-M16×1.5',
    bodyLength: '200 mm',
    hiddenSearchTags: ['925.491.110.0', 'WABCO Piston Diaphragm Cylinder'],
    galleryUrls: ['/productsImage/brc-t2424-wabco-standard-port-16-v3.jpg', '/productsImage/brc-t2424-wabco-standard-port-16-drawing-v3.jpg'],
    oemPartNumbers: [
      { brand: 'Wabco', partNumber: '925.491.110.0', notes: 'Direct Match' }
    ]
  }),
  createChamber('t3030-voss', 'Type 30/30 WABCO Style Metric Piston-Diaphragm Brake Chamber (VOSS Port)', 'Type 30/30', 'Spring Brake', 'Standard', 55.00, {
    modelDesignation: 'T30/30',
    mountType: 'VOSS Port',
    brakingMethod: 'Piston + Diaphragm',
    weight: '21 lbs',
    strokeMetric: '64 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '2-M16×1.5',
    mountingStudLength: '38 mm',
    clevisPinDiameter: '14 mm',
    yokeClevisGapWidth: '14.5 mm',
    inletPortThreadSize: '2-VOSS 22×1.5',
    bodyLength: '250 mm',
    hiddenSearchTags: ['925.492.102.0', 'VOSS 22x1.5 Brake Chamber', 'European Truck Spring Brake'],
    galleryUrls: ['/productsImage/brc-t2424-wabco-standard-port-16-v3.jpg', '/productsImage/brc-t2424-wabco-standard-port-16-drawing-v3.jpg'],
    oemPartNumbers: [
      { brand: 'Wabco', partNumber: '925.492.102.0', notes: 'Direct Match' }
    ]
  }),
  createChamber('t1616-short-pd', 'Type 16/16 Short-Stroke Piston-Diaphragm Brake Chamber (15mm Pushrod)', 'Type 16/16', 'Spring Brake', 'Standard', 45.00, {
    modelDesignation: 'T16/16',
    mountType: 'Short-Stroke',
    brakingMethod: 'Piston + Diaphragm',
    weight: '16 lbs',
    strokeMetric: '57 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '2-M16×1.5',
    mountingStudLength: '37 mm',
    sphericalRadius: 'SR8',
    inletPortThreadSize: '2-M16×1.5',
    pushrodLengthMetric: '15 mm',
    hiddenSearchTags: ['925.464.459.0', 'Short Stroke Piston Diaphragm Chamber', '15mm Stub Rod Actuator'],
    galleryUrls: ['/productsImage/brc-t2416-short-stroke-spring-17-v2.jpg', '/productsImage/brc-t2416-short-stroke-spring-17-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'Generic/Unbranded', partNumber: '925.464.459.0', notes: 'Direct Match' }
    ]
  }),
  createChamber('t2416-short-pd', 'Type 24/16 Short-Stroke Piston-Diaphragm Brake Chamber (15mm Pushrod)', 'Type 24/16', 'Spring Brake', 'Standard', 48.00, {
    modelDesignation: 'T24/16',
    mountType: 'Short-Stroke',
    brakingMethod: 'Piston + Diaphragm',
    weight: '17 lbs',
    strokeMetric: '65 / 57 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '2-M16×1.5',
    mountingStudLength: '37 mm',
    sphericalRadius: 'SR8',
    inletPortThreadSize: '2-M16×1.5',
    pushrodLengthMetric: '15 mm',
    hiddenSearchTags: ['925.461.299.0', 'Short Stroke Piston Diaphragm Chamber'],
    galleryUrls: ['/productsImage/brc-t2416-short-stroke-spring-17-v2.jpg', '/productsImage/brc-t2416-short-stroke-spring-17-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'Generic/Unbranded', partNumber: '925.461.299.0', notes: 'Direct Match' }
    ]
  }),
  createChamber('t1424-short-pd-combo', 'Type 14/24 Short-Stroke Piston-Diaphragm Brake Chamber (15mm Pushrod)', 'Type 14/24', 'Spring Brake', 'Standard', 42.00, {
    modelDesignation: 'T14/24',
    mountType: 'Short-Stroke',
    brakingMethod: 'Piston + Diaphragm',
    weight: '15 lbs',
    strokeMetric: '57 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '2-M16×1.5',
    mountingStudLength: '38 mm',
    sphericalRadius: 'SR8',
    inletPortThreadSize: '2-M16×1.5',
    pushrodLengthMetric: '15 mm',
    hiddenSearchTags: ['925.468.010.0', 'Short Stroke Piston Diaphragm Chamber', '15mm Stub Rod Maxibrake'],
    galleryUrls: ['/productsImage/brc-t2424-short-stroke-combo-18.jpg', '/productsImage/brc-t2424-short-stroke-combo-18-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'Generic/Unbranded', partNumber: '925.468.010.0', notes: 'Direct Match' }
    ]
  }),
  createChamber('t1624-short-pd-combo', 'Type 16/24 Short-Stroke Piston-Diaphragm Brake Chamber (15mm Pushrod)', 'Type 16/24', 'Spring Brake', 'Standard', 44.00, {
    modelDesignation: 'T16/24',
    mountType: 'Short-Stroke',
    brakingMethod: 'Piston + Diaphragm',
    weight: '16 lbs',
    strokeMetric: '57 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '2-M16×1.5',
    mountingStudLength: '38 mm',
    sphericalRadius: 'SR8',
    inletPortThreadSize: '2-M16×1.5',
    pushrodLengthMetric: '15 mm',
    hiddenSearchTags: ['925.484.020.0', 'Short Stroke Piston Diaphragm Chamber'],
    galleryUrls: ['/productsImage/brc-t2424-short-stroke-combo-18.jpg', '/productsImage/brc-t2424-short-stroke-combo-18-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'Generic/Unbranded', partNumber: '925.484.020.0', notes: 'Direct Match' }
    ]
  }),
  createChamber('t2024-short-pd-combo', 'Type 20/24 Short-Stroke Piston-Diaphragm Brake Chamber (15mm Pushrod)', 'Type 20/24', 'Spring Brake', 'Standard', 46.00, {
    modelDesignation: 'T20/24',
    mountType: 'Short-Stroke',
    brakingMethod: 'Piston + Diaphragm',
    weight: '17 lbs',
    strokeMetric: '64 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '2-M16×1.5',
    mountingStudLength: '38 mm',
    sphericalRadius: 'SR8',
    inletPortThreadSize: '2-M16×1.5',
    pushrodLengthMetric: '15 mm',
    hiddenSearchTags: ['925.480.019.0', 'Short Stroke Piston Diaphragm Chamber'],
    galleryUrls: ['/productsImage/brc-t2424-short-stroke-combo-18.jpg', '/productsImage/brc-t2424-short-stroke-combo-18-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'Generic/Unbranded', partNumber: '925.480.019.0', notes: 'Direct Match' }
    ]
  }),
  createChamber('t2424-short-pd-combo', 'Type 24/24 Short-Stroke Piston-Diaphragm Brake Chamber (15mm Pushrod)', 'Type 24/24', 'Spring Brake', 'Standard', 48.00, {
    modelDesignation: 'T24/24',
    mountType: 'Short-Stroke',
    brakingMethod: 'Piston + Diaphragm',
    weight: '18 lbs',
    strokeMetric: '64 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '2-M16×1.5',
    mountingStudLength: '38 mm',
    sphericalRadius: 'SR8',
    inletPortThreadSize: '2-M16×1.5',
    pushrodLengthMetric: '15 mm',
    hiddenSearchTags: ['925.481.209.0', 'Short Stroke Piston Diaphragm Chamber', '925.481.209.0 Actuator'],
    galleryUrls: ['/productsImage/brc-t2424-short-stroke-combo-18.jpg', '/productsImage/brc-t2424-short-stroke-combo-18-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'Generic/Unbranded', partNumber: '925.481.209.0', notes: 'Direct Match' }
    ]
  }),
  createChamber('t2430-short-pd-combo', 'Type 24/30 Short-Stroke Piston-Diaphragm Brake Chamber (15mm Pushrod)', 'Type 24/30', 'Spring Brake', 'Standard', 50.00, {
    modelDesignation: 'T24/30',
    mountType: 'Short-Stroke',
    brakingMethod: 'Piston + Diaphragm',
    weight: '19 lbs',
    strokeMetric: '64 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '2-M16×1.5',
    mountingStudLength: '38 mm',
    sphericalRadius: 'SR8',
    inletPortThreadSize: '2-M16×1.5',
    pushrodLengthMetric: '15 mm',
    hiddenSearchTags: ['925.481.069.0', 'Short Stroke Piston Diaphragm Chamber', 'SR8 Spherical Brake Cylinder'],
    galleryUrls: ['/productsImage/brc-t2424-short-stroke-combo-18.jpg', '/productsImage/brc-t2424-short-stroke-combo-18-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'Generic/Unbranded', partNumber: '925.481.069.0', notes: 'Direct Match' }
    ]
  }),
  createChamber('t2424-fuso193', 'Type 24/24 FUSO-193 4-Bolt Flange Piston-Diaphragm Brake Chamber', 'Type 24/24', 'Spring Brake', 'Standard', 65.00, {
    modelDesignation: 'T24/24',
    mountType: '4-Bolt Flange',
    brakingMethod: 'Piston + Diaphragm',
    weight: '19 lbs',
    strokeMetric: '64 mm',
    pilotDiameter: 'φ55',
    flangeHoleConfiguration: '4-φ10.5',
    flangeDimension: '80 mm',
    clevisPinDiameter: '36 mm',
    boltCircleDiameter: 'φ87.5',
    inletPortThreadSize: '2-3/8" NPT',
    bodyLength: '355 mm',
    application: 'Mitsubishi Fuso & Hino',
    hiddenSearchTags: ['MK448840A', 'FUSO-193 Brake Chamber', 'Japanese Air Pot'],
    galleryUrls: ['/productsImage/brc-t3024-hino-420-flange-19.jpg', '/productsImage/brc-t3024-hino-420-flange-19-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'Mitsubishi Fuso', partNumber: 'MK448840A', notes: 'Direct Match' }
    ]
  }),
  createChamber('t3024-hino420', 'Type 30/24 HINO-420 4-Bolt Flange Piston-Diaphragm Brake Chamber', 'Type 30/24', 'Spring Brake', 'Standard', 68.00, {
    modelDesignation: 'T30/24',
    mountType: '4-Bolt Flange',
    brakingMethod: 'Piston + Diaphragm',
    weight: '20 lbs',
    strokeMetric: '64 mm',
    pilotDiameter: 'φ55',
    flangeHoleConfiguration: '4-φ10.5',
    flangeDimension: '80 mm',
    clevisPinDiameter: '36 mm',
    boltCircleDiameter: 'φ87.5',
    inletPortThreadSize: '2-3/8" NPT',
    bodyLength: '355 mm',
    application: 'Mitsubishi Fuso & Hino',
    hiddenSearchTags: ['47850-3921', 'HINO-420 Spring Brake', 'Japanese Air Pot'],
    galleryUrls: ['/productsImage/brc-t3024-hino-420-flange-19.jpg', '/productsImage/brc-t3024-hino-420-flange-19-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'Hino', partNumber: '47850-3921', notes: 'Direct Match' }
    ]
  }),
  createChamber('isuzu-10pc1-330', 'Isuzu 10PC1 330 Rear Piston-Diaphragm Brake Chamber (RH/LH Universal)', '10PC1 330 Rear', 'Service Brake', 'Standard', 70.00, {
    modelDesignation: 'ISUZU-10PC1 330 Rear',
    mountType: '4-Stud Heavy Duty',
    brakingMethod: 'Piston + Diaphragm',
    weight: '21 lbs',
    strokeMetric: '60 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '4-M16×1.5',
    mountingStudLength: '38 mm',
    clevisPinDiameter: 'φ16',
    yokeClevisGapWidth: '14.5 mm',
    inletPortThreadSize: '2-3/8" NPT',
    bodyLength: '130 mm',
    application: 'Universal (RH/LH)',
    hiddenSearchTags: ['1-48250-174', 'Isuzu Truck Brake Chamber', 'Isuzu 330 Rear Spring Brake'],
    galleryUrls: ['/productsImage/brc-isuzu-10pc1-330-rear-20.jpg', '/productsImage/brc-isuzu-10pc1-330-rear-20-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'Isuzu', partNumber: '1-48250-174', notes: 'Direct Match' }
    ]
  }),
  createChamber('isuzu-10pd1-340', 'Isuzu 10PD1 340 Rear Piston-Diaphragm Brake Chamber (RH/LH Universal)', '10PD1 340 Rear', 'Service Brake', 'Standard', 75.00, {
    modelDesignation: 'ISUZU-10PD1 340 Rear',
    mountType: '4-Stud Heavy Duty',
    brakingMethod: 'Piston + Diaphragm',
    weight: '24 lbs',
    strokeMetric: '60 mm',
    mountingBoltSpacing: '120.7 mm',
    mountingStudThread: '4-M16×1.5',
    mountingStudLength: '38 mm',
    clevisPinDiameter: 'φ16',
    yokeClevisGapWidth: '14.5 mm',
    inletPortThreadSize: '2-3/8" NPT',
    bodyLength: '300 mm',
    application: 'Universal (RH/LH)',
    hiddenSearchTags: ['1-48250-248', 'Isuzu Truck Brake Chamber', '10PD1 340 Air Pot'],
    galleryUrls: ['/productsImage/brc-isuzu-10pc1-330-rear-20.jpg', '/productsImage/brc-isuzu-10pc1-330-rear-20-drawing.jpg'],
    oemPartNumbers: [
      { brand: 'Isuzu', partNumber: '1-48250-248', notes: 'Direct Match' }
    ]
  }),
];

const seenAccessorySlugs = new Set<string>();

const createAccessory = (id: string, name: string, category: AccessoryCategory, priceUSD: number, features: string[]): BrakeAccessory => {
  const newSlug = `${category}-${name}`.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  if (seenAccessorySlugs.has(newSlug)) {
    throw new Error('SLUG COLLISION DETECTED for accessory: ' + newSlug);
  }
  seenAccessorySlugs.add(newSlug);

  return {
    slug: newSlug,
    name: name,
    brandSlug: 'generic',
    category: category,
    priceUSD: priceUSD,
    description: `<p>High quality ${category.toLowerCase()} perfect for wholesale bulk orders.</p>`,
    features: features,
    galleryUrls: ['/productsImage/chamber-parts-kit.png'],
    stock: Math.floor(Math.random() * 1000) + 200,
    publishedAt: '2024-03-05T00:00:00Z',
  };
};

export const BRAKE_ACCESSORIES: BrakeAccessory[] = [];
