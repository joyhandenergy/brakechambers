import React from 'react';
import Link from 'next/link';
import { 
  Settings, Wrench, Disc, Package, 
  Truck, ShieldAlert, Bus, Factory,
  ShieldCheck, Search, CheckCircle,
  Users, BookOpen, FileText, Headphones, ShoppingBag, PackagePlus
} from 'lucide-react';

export interface NavLink {
  label: string;
  href: string;
}

export interface NavColumn {
  title: string;
  icon: React.ReactNode;
  links: NavLink[];
  viewAllLink?: { label: string; href: string };
  ctaLink?: { label: string; href: string; icon: React.ReactNode };
  extraContent?: React.ReactNode;
}

export interface MegaMenuConfig {
  title: string;
  href: string;
  columns: NavColumn[];
}

export const PRODUCTS_MENU: MegaMenuConfig = {
  title: 'Products',
  href: '/products',
  columns: [
    {
      title: 'Spring Brakes',
      icon: <Settings className="w-5 h-5 text-amber-500" />,
      links: [
        { label: 'Type 30/30 Spring Brake', href: '/spring-brake-chambers/30-30-air-brake-chambers' },
        { label: 'Type 24/30 & 24/24 Chambers', href: '/spring-brake-chambers/24-30-24-24-spring-brakes' },
        { label: 'Type 20/24 Spring Brake', href: '/spring-brake-chambers/20-24-spring-brake-chambers' },
        { label: 'Type 30/30 Piggyback Kits', href: '/spring-brake-chambers/type-30-30-piggyback-kits' },
      ],
      viewAllLink: { label: 'View All Spring Brakes \u2192', href: '/spring-brake-chambers' }
    },
    {
      title: 'Service Chambers',
      icon: <Wrench className="w-5 h-5 text-amber-500" />,
      links: [
        { label: 'Type 20 Steer Axle Chamber', href: '/service-brake-chambers/type-20-steer-axle-brake-chambers' },
        { label: 'Type 30 Service Chamber', href: '/service-brake-chambers/type-30-service-chambers' },
        { label: 'Type 12, 16 & 24 Chambers', href: '/service-brake-chambers/type-12-16-24-service-chambers' },
        { label: 'Welded Clevis Chambers', href: '/service-brake-chambers/welded-clevis-brake-chambers' },
      ],
      viewAllLink: { label: 'View All Service Chambers \u2192', href: '/service-brake-chambers' }
    },
    {
      title: 'Air Disc Actuators',
      icon: <Disc className="w-5 h-5 text-amber-500" />,
      links: [
        { label: 'Type 16 & 18 ADB', href: '/air-disc-brake-actuators/type-16-18-adb-actuators' },
        { label: 'Type 20/24 ADB', href: '/air-disc-brake-actuators/type-20-24-air-disc-brake-actuator' },
        { label: 'Type 24/24 ADB', href: '/air-disc-brake-actuators/type-24-24-adb-chambers' },
        { label: 'Type 24/30 ADB', href: '/air-disc-brake-actuators/type-24-30-air-disc-brake-actuators' },
      ],
      viewAllLink: { label: 'View All ADB Actuators \u2192', href: '/air-disc-brake-actuators' }
    },
    {
      title: 'Parts & Kits',
      icon: <Package className="w-5 h-5 text-amber-500" />,
      links: [
        { label: 'Chamber Rebuild Kits', href: '/parts-and-kits/air-brake-chamber-rebuild-kits' },
        { label: 'Rubber Diaphragms', href: '/parts-and-kits/brake-chamber-diaphragms' },
        { label: 'Clevis Pins & Hardware', href: '/parts-and-kits/clevis-pins-slack-adjuster-hardware' },
        { label: 'Caging Bolts & Tools', href: '/parts-and-kits/brake-chamber-caging-bolts-tools' },
      ],
      viewAllLink: { label: 'View All Parts & Tools \u2192', href: '/parts-and-kits' }
    }
  ]
};

export const MANUFACTURING_MENU: MegaMenuConfig = {
  title: 'Manufacturing',
  href: '/manufacturing',
  columns: [
    {
      title: 'Factory & Process',
      icon: <Factory className="w-5 h-5 text-amber-500" />,
      links: [
        { label: 'Manufacturing Process', href: '/manufacturing/process' },
        { label: 'Material Sourcing', href: '/manufacturing/material-sourcing' },
        { label: 'Global Logistics', href: '/shipping' },
      ]
    },
    {
      title: 'Quality & R&D',
      icon: <ShieldCheck className="w-5 h-5 text-amber-500" />,
      links: [
        { label: 'Brake R&D', href: '/manufacturing/research-development' },
        { label: 'Quality Assurance & Lab', href: '/manufacturing/quality-assurance' },

      ]
    },
    {
      title: 'OEM & Custom Services',
      icon: <Settings className="w-5 h-5 text-amber-500" />,
      links: [
        { label: 'Custom OEM Manufacturing', href: '/manufacturing/custom-oem' },
        { label: 'Private Label & White Label', href: '/manufacturing/private-label' },
        { label: 'High Volume Orders', href: '/manufacturing/high-volume-orders' },
      ]
    },
    {
      title: 'CTA',
      icon: <></>,
      links: [],
      extraContent: (
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 flex flex-col justify-center h-full">
          <div className="font-bold text-navy-900 mb-2 text-sm">Build With Us</div>
          <p className="text-slate-600 text-xs mb-4">Partner with a manufacturer that controls the entire supply chain. Request custom engineering or volume pricing.</p>
          <Link href="/quote" className="inline-block bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold px-4 py-2 rounded-lg text-xs transition-colors text-center">
            Request Factory Direct Pricing
          </Link>
        </div>
      )
    }
  ]
};

export const APPLICATIONS_MENU: MegaMenuConfig = {
  title: 'Applications',
  href: '/applications',
  columns: [
    {
      title: 'Commercial & Freight',
      icon: <Truck className="w-5 h-5 text-amber-500" />,
      links: [
        { label: 'Long-Haul Semi Trucks', href: '/applications/long-haul-semi-trucks' },
        { label: 'Heavy-Duty Trailer Axles', href: '/applications/heavy-duty-trailer' },
        { label: 'Medium-Duty Box Trucks', href: '/applications/medium-duty-trucks' },
      ]
    },
    {
      title: 'Severe-Duty & Vocational',
      icon: <ShieldAlert className="w-5 h-5 text-amber-500" />,
      links: [
        { label: 'Garbage & Waste Trucks', href: '/applications/garbage-refuse' },
        { label: 'Mining & Construction Equipment', href: '/applications/mining-construction' },
        { label: 'Agricultural Trailers', href: '/applications/ag-trailers' },
      ]
    },
    {
      title: 'Passenger Transport',
      icon: <Bus className="w-5 h-5 text-amber-500" />,
      links: [
        { label: 'City Bus & Transit Coach', href: '/applications/transit-buses' },
        { label: 'School Bus Fleets', href: '/applications/school-buses' },
        { label: 'Shuttle & Delivery Vans', href: '/applications/shuttle-vans' },
      ]
    }
  ]
};

export const OEM_MENU: MegaMenuConfig = {
  title: 'OEM Cross-Reference',
  href: '/oem-cross-reference',
  columns: [
    {
      title: 'North American Brands',
      icon: <ShieldCheck className="w-5 h-5 text-amber-500" />,
      links: [
        { label: 'Bendix Equivalents', href: '/oem-cross-reference/bendix' },
        { label: 'Meritor Equivalents', href: '/oem-cross-reference/meritor' },
        { label: 'Haldex Equivalents', href: '/oem-cross-reference/haldex' },
        { label: 'MGM Equivalents', href: '/oem-cross-reference/mgm' },
        { label: 'TSE Equivalents', href: '/oem-cross-reference/tse' },
      ]
    },
    {
      title: 'European & Global',
      icon: <ShieldCheck className="w-5 h-5 text-amber-500" />,
      links: [
        { label: 'ZF / WABCO Equivalents', href: '/oem-cross-reference/zf-wabco' },
        { label: 'Knorr-Bremse Equivalents', href: '/oem-cross-reference/knorr-bremse' },
        { label: 'SORL Equivalents', href: '/oem-cross-reference/sorl' },
      ]
    },


    {
      title: 'Interchange Tools',
      icon: <Search className="w-5 h-5 text-amber-500" />,
      links: [
        { label: 'Full Interchange Database', href: '/oem-cross-reference/database' },
      ],
      ctaLink: { label: 'Request a Cross-Match', href: '/oem-cross-reference/request', icon: <CheckCircle className="w-4 h-4" /> }
    }
  ]
};

// Top-level standalone links
export const OTHER_LINKS = [
  { label: 'About Us', href: '/our-story' },
  { label: 'Technical Resources', href: '/technical-resources' },
  { label: 'Insights & Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
];

export const MOBILE_LINKS = {
  products: [
    { label: 'Spring Brakes', href: '/spring-brake-chambers', icon: <Settings className="w-4 h-4 text-amber-600" /> },
    { label: 'Service Chambers', href: '/service-brake-chambers', icon: <Wrench className="w-4 h-4 text-amber-600" /> },
    { label: 'Air Disc Actuators', href: '/air-disc-brake-actuators', icon: <Disc className="w-4 h-4 text-amber-600" /> },
    { label: 'Parts & Kits', href: '/parts-and-kits', icon: <Package className="w-4 h-4 text-amber-600" /> },
  ],
  applications: [
    { label: 'Commercial & Freight', href: '/applications', icon: <Truck className="w-4 h-4 text-navy-600" /> },
    { label: 'Severe-Duty & Vocational', href: '/applications', icon: <ShieldAlert className="w-4 h-4 text-navy-600" /> },
    { label: 'Passenger Transport', href: '/applications', icon: <Bus className="w-4 h-4 text-navy-600" /> },
  ],
  company: [
    { label: 'OEM Cross-Reference', href: '/oem-cross-reference', icon: <Search className="w-4 h-4 text-navy-600" /> },
    { label: 'Manufacturing', href: '/manufacturing', icon: <Factory className="w-4 h-4 text-navy-600" /> },
    { label: 'Applications Overview', href: '/applications', icon: <Truck className="w-4 h-4 text-navy-600" /> },
    { label: 'Technical Resources', href: '/technical-resources', icon: <BookOpen className="w-4 h-4 text-navy-600" /> },
    { label: 'About Us', href: '/our-story', icon: <Users className="w-4 h-4 text-navy-600" /> },
    { label: 'Insights & Blog', href: '/blog', icon: <FileText className="w-4 h-4 text-navy-600" /> },
    { label: 'Contact Us', href: '/contact', icon: <Headphones className="w-4 h-4 text-navy-600" /> },
  ]
};

