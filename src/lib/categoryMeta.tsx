import React from 'react';
import SectionHeader from '@/components/ui/SectionHeader';

export type CategoryMetaItem = {
  title: string;
  desc: string;
  name: string;
  seoText: React.ReactNode;
};

export const SPRING_BRAKES_META: Record<string, CategoryMetaItem> = {
  '30-30-air-brake-chambers': {
    title: '30/30 Air Brake Chambers | Wholesale | BRC',
    desc: 'Factory-direct 30/30 air brake chambers. OEM replacements for heavy-duty semi trucks.',
    name: '30/30 Air Brake Chambers',
    seoText: (
      <>
        <SectionHeader title="Understanding 30/30 Air Brake Chambers" badge="Overview" align="left" accentColor="amber" className="!mb-6" />
        <p className="mb-4">The 30/30 air brake chamber is the most widely utilized heavy-duty air brake component in the commercial semi truck industry. Designed to provide both service braking and emergency/parking brake functionality, the "30/30" designation refers to the effective square inches of the diaphragm area in both the service and parking chambers.</p>
        <p>BRC's aftermarket 30/30 chambers are engineered with 8-gauge steel housings and nylon-reinforced EPDM diaphragms, serving as direct drop-in replacements for major OEM brands like Bendix, Meritor, and Haldex. Ideal for Class 8 linehaul, regional delivery, and severe-duty vocational applications.</p>
      </>
    )
  },
  '24-30-24-24-spring-brakes': {
    title: '24/30 & 24/24 Spring Brakes | Wholesale | BRC',
    desc: 'Factory-direct 24/30 & 24/24 spring brakes. OEM replacements for heavy-duty commercial trucks.',
    name: '24/30 & 24/24 Spring Brakes',
    seoText: (
      <>
        <SectionHeader title="24/30 & 24/24 Spring Brakes Overview" badge="Overview" align="left" accentColor="amber" className="!mb-6" />
        <p className="mb-4">These specialized spring brakes feature a smaller 24-square-inch service diaphragm combined with either a standard 30-square-inch or 24-square-inch parking/emergency spring chamber. This configuration is frequently specified for steer axles or specialized trailer applications where clearance is limited but substantial parking force is still mandated by FMVSS 121 standards.</p>
        <p>Our 24/30 and 24/24 actuators undergo strict 1-million cycle endurance testing, ensuring reliable linear force delivery and eliminating the risk of premature center seal failure.</p>
      </>
    )
  },
  '20-24-spring-brake-chambers': {
    title: '20/24 Spring Brake Chambers | Wholesale | BRC',
    desc: 'Wholesale 20/24 spring brake chambers. OEM direct replacements.',
    name: '20/24 Spring Brake Chambers',
    seoText: (
      <>
        <SectionHeader title="20/24 Spring Brake Chambers" badge="Overview" align="left" accentColor="amber" className="!mb-6" />
        <p className="mb-4">The 20/24 spring brake chamber is commonly found on smaller commercial vehicles, specialized trailers, and certain steer axle configurations. Providing 20 square inches of service brake force and 24 square inches of parking force, these units provide perfect balance for medium-duty applications.</p>
        <p>Manufactured to absolute OEM standards, BRC 20/24 chambers ensure that your fleet maintains optimal stopping distance while providing a significant cost savings over dealership replacement parts.</p>
      </>
    )
  },
  'type-30-30-piggyback-kits': {
    title: 'Type 30/30 Piggyback Kits | Wholesale | BRC',
    desc: 'Type 30/30 Piggyback Kits for spring brake chamber repair.',
    name: 'Type 30/30 Piggyback Kits',
    seoText: (
      <>
        <SectionHeader title="Type 30/30 Piggyback Kits" badge="Overview" align="left" accentColor="amber" className="!mb-6" />
        <p className="mb-4">A Type 30/30 Piggyback Kit contains the pre-assembled parking spring portion of a dual-chamber spring brake. For fleets looking to reduce maintenance costs, installing a piggyback kit allows mechanics to replace only the failed parking section while retaining the original, functioning service housing and pushrod assembly.</p>
        <p>Our piggyback kits come completely sealed with a new center section, heavy-duty power spring, and all necessary mounting hardware to ensure a rapid, safe installation process.</p>
      </>
    )
  },
  '36-36-spring-brakes': {
    title: 'Type 36/36 Spring Brakes | Wholesale | BRC',
    desc: 'Heavy-duty 36/36 spring brakes for severe-duty and off-highway commercial vehicles.',
    name: 'Type 36/36 Spring Brakes',
    seoText: (
      <>
        <SectionHeader title="Maximum Stopping Power: Type 36/36 Spring Brakes" badge="Overview" align="left" accentColor="amber" className="!mb-6" />
        <p className="mb-4">The 36/36 spring brake is the absolute titan of the commercial brake chamber lineup. Featuring massive 36-square-inch diaphragms for both service and emergency braking, these units are specifically engineered for maximum braking force. They are predominantly utilized on severe-duty vehicles, refuse trucks, off-highway mining equipment, and heavy-haul trailers.</p>
        <p>Due to the immense mechanical force generated by the parking spring in a Type 36/36, BRC manufactures these units with reinforced, heavy-gauge steel housings and ultra-durable pushrods to prevent structural fatigue under extreme operational stress.</p>
      </>
    )
  },
  '30-28-spring-brakes': {
    title: 'Type 30/28 Spring Brakes | Wholesale | BRC',
    desc: 'Type 30/28 spring brake chambers. Specialized OEM replacements for transit and vocational fleets.',
    name: 'Type 30/28 Spring Brakes',
    seoText: (
      <>
        <SectionHeader title="Type 30/28 Spring Brakes" badge="Overview" align="left" accentColor="amber" className="!mb-6" />
        <p className="mb-4">Type 30/28 spring brake chambers feature a standard 30-square-inch service diaphragm paired with a slightly smaller 28-square-inch parking spring section. This hybrid configuration is often mandated by specific OEM axle setups where slightly reduced parking brake hold is required without sacrificing service braking power.</p>
        <p>Commonly found on specific transit buses and vocational trucks, BRC ensures our 30/28 aftermarket replacements perfectly match the required OEM force-output curves and spatial dimensions for safe, compliant braking.</p>
      </>
    )
  }
};

export const SERVICE_CHAMBERS_META: Record<string, CategoryMetaItem> = {
  'type-20-steer-axle-brake-chambers': {
    title: 'Type 20 Steer Axle Brake Chambers | Wholesale | BRC',
    desc: 'Factory-direct Type 20 steer axle brake chambers. OEM replacements.',
    name: 'Type 20 Steer Axle Brake Chambers',
    seoText: (
      <>
        <SectionHeader title="Type 20 Steer Axle Brake Chambers" badge="Overview" align="left" accentColor="amber" className="!mb-6" />
        <p className="mb-4">The Type 20 service chamber is highly specialized for steer axle applications, providing the perfect balance of stopping power and clearance required for the front of the vehicle. By providing 20 square inches of effective area, these chambers ensure FMVSS 121 compliance without overwhelming the steer tires.</p>
        <p>BRC’s Type 20 steer axle brake chambers feature heavy-duty 8-gauge steel housings and OEM-grade diaphragms, making them the direct replacement of choice for Bendix, Haldex, and Meritor steer axle configurations.</p>
      </>
    )
  },
  'type-30-service-chambers': {
    title: 'Type 30 Service Chambers | Wholesale | BRC',
    desc: 'Wholesale Type 30 Service Chambers. Direct factory pricing on heavy duty air brake chambers.',
    name: 'Type 30 Service Chambers',
    seoText: (
      <>
        <SectionHeader title="Understanding Type 30 Service Chambers" badge="Overview" align="left" accentColor="amber" className="!mb-6" />
        <p className="mb-4">Type 30 service chambers are the workhorses of the commercial air brake industry, typically utilized on drive and trailer axles where maximum service braking force is required. These chambers convert compressed air into mechanical force, pushing the slack adjuster to apply the foundation brakes.</p>
        <p>Manufactured with precision-machined pushrods and zinc-plated internal components, BRC's Type 30 service chambers are engineered to outlast the competition in high-corrosion environments like winter roads and coastal regions.</p>
      </>
    )
  },
  'type-12-16-24-service-chambers': {
    title: 'Type 12, 16 & 24 Service Chambers | Wholesale | BRC',
    desc: 'Type 12, 16 & 24 service chambers for specialized commercial air brake applications.',
    name: 'Type 12, 16 & 24 Service Chambers',
    seoText: (
      <>
        <SectionHeader title="Type 12, 16, and 24 Service Chambers" badge="Overview" align="left" accentColor="amber" className="!mb-6" />
        <p className="mb-4">Not all vehicles require the massive clamping force of a Type 30. For medium-duty trucks, specialized transit buses, and lightweight trailers, Type 12, 16, and 24 service chambers provide the scaled-down braking force required to maintain safe stopping distances without wheel lockup.</p>
        <p>BRC manufactures the full spectrum of service chamber sizes, guaranteeing that fleet managers have access to exact OEM-equivalent replacements for every axle configuration in their fleet.</p>
      </>
    )
  },
  'welded-clevis-brake-chambers': {
    title: 'Welded Clevis Brake Chambers | Wholesale | BRC',
    desc: 'Welded clevis brake chambers for rapid installation. Factory direct pricing.',
    name: 'Welded Clevis Brake Chambers',
    seoText: (
      <>
        <SectionHeader title="Welded Clevis Brake Chambers" badge="Overview" align="left" accentColor="amber" className="!mb-6" />
        <p className="mb-4">Welded clevis brake chambers feature a pre-installed, factory-welded yoke assembly. By eliminating the need to manually measure, cut, and thread a pushrod during installation, these chambers drastically reduce labor costs and vehicle downtime in the maintenance bay.</p>
        <p>Our welded clevis variants are exact OEM matches for major truck manufacturers, precision-welded using automated robotic cells to guarantee absolute structural integrity and perfect alignment with the vehicle's slack adjusters.</p>
      </>
    )
  },
  'type-36-service-chambers': {
    title: 'Type 36 Service Chambers | Wholesale | BRC',
    desc: 'Heavy-duty Type 36 service chambers for maximum braking force.',
    name: 'Type 36 Service Chambers',
    seoText: (
      <>
        <SectionHeader title="Type 36 Service Chambers" badge="Overview" align="left" accentColor="amber" className="!mb-6" />
        <p className="mb-4">The Type 36 service chamber provides the maximum available service braking force in the commercial air brake lineup. With 36 square inches of effective diaphragm area, these units are specifically engineered to stop extremely heavy loads, typically found on severe-duty off-highway equipment, heavy-haul trailers, and specialized transit vehicles.</p>
        <p>BRC’s Type 36 service chambers are built with high-tensile steel housings and heavy-duty return springs to ensure reliable, fade-free braking performance even under the most extreme operational conditions.</p>
      </>
    )
  }
};

// Aliases for common user searches/slugs
SERVICE_CHAMBERS_META['type-20-service-brake-chambers'] = SERVICE_CHAMBERS_META['type-20-steer-axle-brake-chambers'];
SERVICE_CHAMBERS_META['type-30-service-brake-chambers'] = SERVICE_CHAMBERS_META['type-30-service-chambers'];
SERVICE_CHAMBERS_META['type-36-service-brake-chambers'] = SERVICE_CHAMBERS_META['type-36-service-chambers'];


export const CHAMBER_PARTS_KITS_META: Record<string, CategoryMetaItem> = {
  'air-brake-chamber-rebuild-kits': {
    title: 'Air Brake Chamber Rebuild Kits | Wholesale | BRC',
    desc: 'Complete air brake chamber rebuild kits and hardware for spring and service brake chambers.',
    name: 'Air Brake Chamber Rebuild Kits',
    seoText: (
      <>
        <SectionHeader title="Air Brake Chamber Rebuild Kits" badge="Overview" align="left" accentColor="amber" className="!mb-6" />
        <p className="mb-4">For fast and comprehensive repairs, BRC offers pre-packaged rebuild kits that include everything needed to properly repair or maintain a commercial brake chamber. Our kits typically include heavy-duty mounting nuts, washers, clevises, pins, and air port plugs.</p>
        <p>Purchasing complete rebuild kits eliminates the need to source individual small parts, streamlining operations for high-volume fleet maintenance bays and reducing overall procurement costs.</p>
      </>
    )
  },
  'brake-chamber-diaphragms': {
    title: 'Brake Chamber Diaphragms | Wholesale | BRC',
    desc: 'Heavy-duty rubber diaphragms for Type 30, Type 24, and Type 20 brake chambers. High temperature resistant.',
    name: 'Brake Chamber Diaphragms',
    seoText: (
      <>
        <SectionHeader title="Premium Rubber Brake Diaphragms" badge="Overview" align="left" accentColor="amber" className="!mb-6" />
        <p className="mb-4">The diaphragm is the most critical internal component of an air brake chamber, responsible for expanding under air pressure to actuate the pushrod. BRC diaphragms are manufactured using a proprietary nylon-reinforced EPDM (Ethylene Propylene Diene Monomer) rubber compound, designed to withstand extreme temperature fluctuations from -40°F to 200°F.</p>
        <p>Available in all standard sizes including Type 30, 24, 20, and 16, our diaphragms offer superior flex-fatigue resistance, ensuring hundreds of thousands of actuation cycles without cracking or leaking. Perfect for fleet rebuilding programs and wholesale distributors.</p>
      </>
    )
  },
  'clevis-pins-slack-adjuster-hardware': {
    title: 'Clevis Pins & Slack Adjuster Hardware | Wholesale | BRC',
    desc: 'Replacement clevises, pins, and cotter pins for heavy duty brake chambers.',
    name: 'Clevis Pins & Slack Adjuster Hardware',
    seoText: (
      <>
        <SectionHeader title="Clevis Assemblies and Pins" badge="Overview" align="left" accentColor="amber" className="!mb-6" />
        <p className="mb-4">The clevis assembly provides the vital mechanical linkage between the brake chamber pushrod and the slack adjuster. Excessive wear on the clevis pin can lead to lost motion and dangerous brake lag.</p>
        <p>BRC manufactures precision-machined threaded clevises, hardened steel clevis pins, and heavy-duty cotter pins. Available in various thread pitches (typically 5/8"-18) to match standard North American commercial vehicle pushrods, ensuring a tight, slop-free connection to your slack adjuster.</p>
      </>
    )
  },
  'brake-chamber-caging-bolts-tools': {
    title: 'Brake Chamber Caging Bolts & Tools | Wholesale | BRC',
    desc: 'Standard and long caging bolts for spring brake release. Corrosion-resistant hardened steel.',
    name: 'Brake Chamber Caging Bolts & Tools',
    seoText: (
      <>
        <SectionHeader title="Caging Bolts (Release Tools)" badge="Overview" align="left" accentColor="amber" className="!mb-6" />
        <p className="mb-4">Also known as release tools, caging bolts are required to manually compress the powerful emergency spring within a spring brake chamber, allowing a vehicle to be towed or serviced when air pressure is lost. BRC caging bolts are forged from hardened steel and zinc-plated for maximum rust prevention.</p>
        <p>We supply standard length bolts for Type 30/30 chambers, as well as extended length bolts for long-stroke and specialized piggyback applications. Always carry spare caging bolts in fleet maintenance vehicles for roadside emergencies.</p>
      </>
    )
  },
  'brake-chamber-clamp-bands': {
    title: 'Brake Chamber Clamp Bands | Wholesale | BRC',
    desc: 'Heavy-duty clamp bands and v-bands for commercial air brake chambers.',
    name: 'Brake Chamber Clamp Bands',
    seoText: (
      <>
        <SectionHeader title="Clamp Bands & V-Bands" badge="Overview" align="left" accentColor="amber" className="!mb-6" />
        <p className="mb-4">The clamp band is responsible for securely sealing the two halves of a brake chamber housing together, preventing air leaks and ensuring structural integrity under high pressure. Over time, these bands can suffer from rust, corrosion, or mechanical damage.</p>
        <p>BRC manufactures replacement clamp bands in both standard coated steel and premium stainless steel for extreme weather environments. Designed to exact OEM dimensional tolerances, our clamps provide a perfectly uniform seal for Type 30, Type 24, and Type 20 chambers.</p>
      </>
    )
  },
  'automatic-manual-slack-adjusters': {
    title: 'Automatic & Manual Slack Adjusters | Wholesale | BRC',
    desc: 'Automatic (ASA) and manual slack adjusters for commercial vehicle foundation brakes.',
    name: 'Automatic & Manual Slack Adjusters',
    seoText: (
      <>
        <SectionHeader title="Automatic Slack Adjusters (ASA)" badge="Overview" align="left" accentColor="amber" className="!mb-6" />
        <p className="mb-4">The slack adjuster acts as the critical lever arm between the brake chamber pushrod and the S-camshaft. Automatic Slack Adjusters (ASAs) are mandated on modern commercial vehicles to automatically compensate for brake shoe wear, ensuring consistent stroke travel and optimal braking force.</p>
        <p>BRC supplies a wide range of heavy-duty self-adjusting slack adjusters compatible with Meritor, Haldex, Bendix, and Gunite setups. Featuring precision-machined splines and grease fittings for extended service life, our ASAs keep fleets compliant with strict DOT regulations.</p>
      </>
    )
  }
};

export const AIR_DISC_ACTUATORS_META: Record<string, CategoryMetaItem> = {
  'type-16-18-adb-actuators': {
    title: 'Type 16 & 18 ADB Actuators | Wholesale | BRC',
    desc: 'Type 16 & 18 air disc brake actuators. Factory direct wholesale pricing for heavy-duty disc brakes.',
    name: 'Type 16 & 18 ADB Actuators',
    seoText: (
      <>
        <SectionHeader title="Type 16 & 18 Air Disc Brake Actuators" badge="Overview" align="left" accentColor="amber" className="!mb-6" />
        <p className="mb-4">Type 16 and Type 18/24 Air Disc Brake (ADB) actuators are highly specialized service chambers designed to provide the clamping force for pneumatic disc brakes. As the commercial transport industry shifts away from traditional drum brakes toward disc technology, these actuators are becoming the standard for modern steer and drive axles.</p>
        <p>BRC's Type 16 and 18/24 ADB actuators are engineered to integrate seamlessly with standard North American and European disc brake calipers (including Bendix, WABCO, and Knorr-Bremse), providing faster application and release times with zero brake fade.</p>
      </>
    )
  },
  'type-20-24-air-disc-brake-actuator': {
    title: 'Type 20/24 Air Disc Actuators | Wholesale | BRC',
    desc: 'Type 20/24 spring brake actuators for air disc brakes. Factory direct.',
    name: 'Type 20/24 Air Disc Actuators',
    seoText: (
      <>
        <SectionHeader title="Type 20/24 Air Disc Brake Actuators" badge="Overview" align="left" accentColor="amber" className="!mb-6" />
        <p className="mb-4">The Type 20/24 is one of the most common air disc brake spring chambers found on modern Class 8 tractors and trailers. Providing 20 square inches of service brake area and 24 square inches of parking brake area, it delivers the massive clamping force required by FMVSS 121 for heavy loads.</p>
        <p>BRC's aftermarket 20/24 ADB units are direct OEM interchanges, featuring high-temperature synthetic grease packing and zinc-plated internal components to withstand the extreme heat generated by continuous disc braking.</p>
      </>
    )
  },
  'type-24-24-adb-chambers': {
    title: 'Type 24/24 ADB Chambers | Wholesale | BRC',
    desc: 'Type 24/24 heavy duty spring brake actuators for air disc brakes.',
    name: 'Type 24/24 ADB Chambers',
    seoText: (
      <>
        <SectionHeader title="Type 24/24 Air Disc Brake Chambers" badge="Overview" align="left" accentColor="amber" className="!mb-6" />
        <p className="mb-4">Designed for severe-duty and high-capacity applications, the Type 24/24 ADB actuator provides maximum braking force for heavy haulers, logging trucks, and specialized high-weight trailers equipped with air disc brakes.</p>
        <p>These actuators undergo our most rigorous QA testing, including 1-million cycle life tests under high-pressure loads to guarantee structural integrity and fail-safe parking spring deployment.</p>
      </>
    )
  },
  'type-24-30-air-disc-brake-actuators': {
    title: 'Type 24/30 Air Disc Brake Actuators | Wholesale | BRC',
    desc: 'Type 24/30 heavy duty spring brake actuators for air disc brakes. Factory direct wholesale.',
    name: 'Type 24/30 Air Disc Brake Actuators',
    seoText: (
      <>
        <SectionHeader title="Type 24/30 Air Disc Brake Actuators" badge="Overview" align="left" accentColor="amber" className="!mb-6" />
        <p className="mb-4">The Type 24/30 Air Disc Brake (ADB) actuator is the ultimate solution for maximum rear axle clamping force. This combination provides 24 square inches of service brake area and a massive 30 square inches of parking brake area, ensuring your heaviest loads stay parked securely on steep grades.</p>
        <p>BRC's Type 24/30 ADB actuators are built for extreme durability, featuring a heavy-duty power spring and specialized high-temperature seals to handle the intense heat profiles of severe-duty disc braking applications.</p>
      </>
    )
  }
};
