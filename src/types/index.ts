export interface Brand {
  slug: string;
  name: string;
  country: string;
  logoUrl?: string;
}

export interface Market {
  countryName: string;
  code: string; // e.g. 'ng'
  isActive: boolean;
  flag?: string;
}

export type ChamberCategory = 'Spring Brake' | 'Service Brake' | 'Air Disc Actuator' | 'Parts & Kits';

export interface BrakeChamber {
  slug: string;
  name: string;
  brandSlug: string;
  category: ChamberCategory;
  priceUSD: number;
  type: string; // e.g. "Type 30/30", "Type 16"
  modelDesignation?: string; // e.g. "T16"
  brakingMethod?: string; // e.g. "Single Diaphragm", "Double Diaphragm"
  strokeSize: string; // e.g. "Standard", "Long Stroke"
  strokeInch?: string; // e.g. "2-1/2 in", "3 in"
  pushRodLengthInch?: string; // e.g. "8 in", "18 in"
  dutySpec?: string; // e.g. "severe-duty"
  mountType?: string; // e.g. "clevis"

  application?: string; // e.g. "S-Cam Brake", "Disc"
  crossReferenceBrands?: string[]; // e.g. ["Bendix", "Haldex"]
  oemPartNumbers?: { brand: string; partNumber: string; notes?: string }[];
  hiddenSearchTags?: string[]; // e.g. ["423.104.900.0", "4231049000", "T16 brake chamber"]
  
  material: string; // e.g. "Steel", "Aluminum"
  includedItems: string[];
  description: string;
  
  specifications: {
    maxOperatingPressure: string;
    operatingTemperature: string;
    pushRodLength: string;
    portSize: string;
    weight: string;
    
    // Detailed Metric Specifications
    strokeMetric?: string; // e.g. "75 mm"
    pushrodLengthMetric?: string; // (L) e.g. "190 mm"
    mountingBoltSpacing?: string; // (A) e.g. "76.2 mm"
    mountingStudThread?: string; // (B) e.g. "2 x M12 × 1.5"
    mountingStudLength?: string; // (C) e.g. "31 mm"
    clevisPinDiameter?: string; // (D) e.g. "14 mm"
    yokeClevisGapWidth?: string; // (E) e.g. "14.5 mm"
    inletPortThreadSize?: string; // (M) e.g. "2 x M16 × 1.5"
    sphericalRadius?: string; // (R) e.g. "SR8"
    boltCircleDiameter?: string; // Japanese Flange e.g. "φ87.5"
    flangeHoleConfiguration?: string; // Japanese Flange e.g. "4-φ10.5"
    pilotDiameter?: string; // Japanese Flange e.g. "φ55"
    flangeDimension?: string; // (C) e.g. "80 mm"
    bodyLength?: string; // (L) e.g. "340 mm"
    bodyOffset?: string; // (L) e.g. "50 mm"
    hydraulicPortSize?: string; // (N) e.g. "G3/8""
    centerBossThread?: string; // e.g. "1 3/4"-12UN-2A"
  };
  
  galleryUrls: string[];
  imageUrl?: string;
  factoryVideoUrl?: string;
  promoVideoUrl?: string;
  stock: number;
  publishedAt: string;
  moq?: number; // Minimum Order Quantity for wholesale
  palletQuantity?: number; // Units per pallet
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

export type AccessoryCategory = 'Diaphragm' | 'Caging Bolt' | 'Clamp Band' | 'Slack Adjuster' | 'Other';

export interface BrakeAccessory {
  slug: string;
  name: string;
  brandSlug: string; // "generic" if unbranded
  category: AccessoryCategory;
  priceUSD: number;
  description: string;
  features: string[];
  galleryUrls: string[];
  stock: number;
  publishedAt: string;
}

export interface BlogPost {
  id?: string;
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  excerpt: string;
  content: string;
  body?: any[];
  featuredImageUrl: string;
  imageUrl?: string;
  publishDate: string;
  date?: string;
  category: string;
  readTime: string;
  tags?: string[];
}
