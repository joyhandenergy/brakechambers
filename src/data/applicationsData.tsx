import React from 'react';
import { ShieldAlert, Cpu, PenTool, Wrench, PackagePlus, HardHat, Cog, AlertTriangle, Factory, Activity, Flame, Droplets, ThermometerSnowflake, Zap, CheckCircle2, Lock, Settings, ShieldCheck } from 'lucide-react';

export const APPLICATION_DATA: Record<string, any> = {
  'long-haul-semi-trucks': {
    metaTitle: 'Brake Chambers for Long-Haul Semi Trucks - Class 8 OEM Replacement | BRC',
    metaDesc: 'Heavy-duty brake chambers for Class 8 semi trucks. Tested for thermal cycling and highway vibration. Direct replacement for Freightliner, Kenworth, Peterbilt & more.',
    title: 'Brake Chambers for Long-Haul Semi Trucks',
    desc: 'BRC manufactures heavy-duty brake chambers engineered for Class 8 semi trucks operating at sustained highway speeds. Every chamber is tested for thermal cycling, vibration endurance, and direct fitment to all major Class 8 platforms, including Freightliner, Kenworth, Peterbilt, Volvo, and International.',
    keywords: ['commercial linehaul air brakes', 'linehaul truck brake chambers', 'class 8 truck brakes', 'highway truck air brakes', 'long haul fleet brakes'],
    faqs: [
      { q: 'Will these brake chambers fit a mixed fleet of Freightliner and Peterbilt trucks?', a: 'Yes. BRC brake chambers use standard Class 8 stud spacing and push-rod lengths that fit Freightliner, Kenworth, Peterbilt, Volvo, Mack, and International trucks. Check our OEM cross-reference tool for a direct part-number match.' },
      { q: 'How do you ensure these won\'t fail on long mountain descents?', a: 'Every BRC power spring is epoxy-coated to prevent pitting, and every diaphragm is molded from high-temperature neoprene rated for continuous highway braking. All chambers are up to 1M cycle lab-tested before shipment.' },
      { q: 'What is the typical service life of a BRC brake chamber in linehaul duty?', a: 'Under normal linehaul conditions, BRC brake chambers are engineered to deliver 500,000 to 800,000 miles of service before requiring rebuild. Actual lifespan depends on terrain, load weight, and maintenance intervals.' },
      { q: 'Can I order evaluation samples before committing to a fleet order?', a: 'Yes. We ship evaluation samples directly from our factory. Most sample orders are dispatched within 5–7 business days, with express shipping available for urgent fleet evaluations.' },
      { q: 'Do these chambers meet US DOT requirements?', a: 'Yes. BRC brake chambers are tested to FMVSS-121 standards, which is the US federal safety standard for air brake systems on commercial vehicles.' },
      { q: 'Can you supply mixed-fleet quantities?', a: 'Yes. We supply mixed orders combining different Type 30/30, Type 24/30, and ADB actuator models in a single container. Just specify your part-number mix when requesting a quote.' }
    ],
    specs: [
      { label: 'Primary Stressor', value: 'Thermal Soak & Sustained Vibration' },
      { label: 'Operating Environment', value: 'Open Highway / Interstate' },
      { label: 'Braking Cycles', value: 'High Speed / High Heat' },
      { label: 'Compatibility', value: 'Direct replacement for major Class 8 OEMs' }
    ],
    bgStyle: 'from-navy-900 to-navy-950',
    accent: 'text-amber-500',
    heroImage: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=2000&q=80',
    challenge: {
      title: 'Why Brake Chambers Fail on Long-Haul Trucks',
      desc: 'Long-haul Class 8 trucks operate at sustained highway speeds across millions of miles. This exposes brake chambers to continuous high-frequency vibration and severe thermal cycling from mountain descents. Over time, power springs can fatigue from micro-vibrations, and center seals can degrade from drum heat, leading to air leaks, DOT violations, and costly roadside repairs.'
    },
    technologies: [
      { name: 'Thermal-Resistant Elastomers', desc: 'Our factory formulates rubber compounds specifically rated for high-temperature service, maintaining elasticity and preventing cracking through sustained highway braking cycles.', icon: <Flame className="w-8 h-8" /> },
      { name: 'Epoxy-Coated Power Springs', desc: 'Advanced epoxy coating prevents the microscopic pitting that leads to power spring snapping under sustained highway vibration.', icon: <ShieldAlert className="w-8 h-8" /> },
      { name: 'Direct OEM Fitment', desc: 'Standard stud spacing, exact push-rod lengths, and universal air port threads guarantee drop-in fitment across Freightliner, Kenworth, Peterbilt, Volvo, Mack, and International trucks.', icon: <Wrench className="w-8 h-8" /> }
    ],
    recommendedTitle: 'Recommended Brake Chambers for Long-Haul Semi Trucks',
    recommendedDesc: 'The ideal brake chamber combination for Class 8 linehaul duty, validated to IATF 16949 standards and up to 1M cycle lab tested.',
    recommendedPackage: [
      { name: 'Type 30/30 Standard Spring Brakes', desc: 'The trusted backbone of Class 8 linehaul parking and emergency braking. Double-diaphragm design delivers reliable mechanical lockup and consistent highway service braking.', link: '/products' },
      { name: 'Air Disc Brake Actuators', desc: 'Optimized for modern Class 8 fleets transitioning to air disc brake systems. HOT Technology delivers consistent clamping force for shorter, fade-resistant stopping distances.', link: '/products' }
    ],
    cta: {
      heading: 'Outfit Your Linehaul Fleet Factory-Direct',
      subheading: 'Skip the middleman markups. Connect directly with our engineering team to spec highway-rated brake chambers for your entire Class 8 linehaul fleet. Volume pricing and mixed-fleet quantities available.',
      buttonText: 'Request a Quote',
      link: '/quote',
      secondaryButton: { text: 'View OEM Cross-Reference', link: '/oem-cross-reference' }
    }
  },
  'heavy-duty-trailer': {
    metaTitle: 'Brake Chambers for Heavy-Duty Trailer Axles - OEM Replacement | BRC',
    metaDesc: 'Heavy-duty trailer brake chambers built for 80K lb payloads and road salt corrosion resistance. Drop-in replacement for Great Dane, Utility, and Hyundai Translead.',
    title: 'Brake Chambers for Heavy-Duty Trailer Axles',
    desc: 'BRC manufactures trailer brake chambers engineered to withstand the payload stress and road-salt corrosion of over-the-road freight duty. Every chamber is a direct fit for Great Dane, Utility, Wabash, and Hyundai Translead trailer axles.',
    keywords: ['heavy duty freight brakes', 'commercial freight air brakes', 'class 8 freight brake chambers', 'heavy duty truck air brakes'],
    faqs: [
      { q: 'Are these compatible with my existing Great Dane and Utility trailers?', a: 'Yes. BRC brake chambers use the standard trailer axle stud spacing and push-rod lengths compatible with Great Dane, Utility, Wabash, and Hyundai Translead trailers. Use our OEM cross-reference tool for exact part-number matches.' },
      { q: 'How do you prevent the housing from cracking under heavy payload braking?', a: 'Our trailer chambers use 8-gauge steel housings, thicker than the standard 9-gauge and 11-gauge housings used by many aftermarket suppliers. This eliminates the housing flex that cracks mounting studs under full payload braking.' },
      { q: 'Are these chambers suitable for cold-weather operations?', a: 'Yes. Neoprene diaphragms remain flexible at -40°F (-40°C), and internal return springs are epoxy-coated to prevent rust pitting from road salt exposure.' },
      { q: 'What is the expected service life for trailer brake chambers?', a: 'Under normal over-the-road duty, BRC trailer brake chambers deliver 400,000 to 600,000 miles before requiring rebuild. Actual lifespan depends on load weight, road conditions, and maintenance intervals.' },
      { q: 'Do you supply mixed-axle quantities for trailer fleets?', a: 'Yes. We supply mixed orders combining long-stroke spring brakes and service chambers for multi-axle trailers in a single container.' },
      { q: 'What certifications do BRC trailer brake chambers carry?', a: 'BRC brake chambers are manufactured to IATF 16949 standards and tested to FMVSS-121 (North America) and ECE R13 (Europe) requirements.' }
    ],
    specs: [
      { label: 'Primary Stressor', value: 'Housing Flex & Road Salt Corrosion' },
      { label: 'Annual Mileage', value: '100,000+ miles' },
      { label: 'Compatibility', value: 'Direct replacement for major trailer OEMs' }
    ],
    bgStyle: 'from-navy-900 to-navy-950',
    accent: 'text-amber-500',
    heroImage: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c80a71?auto=format&fit=crop&w=2000&q=80',
    challenge: {
      title: 'Why Brake Chambers Fail on Trailer Axles',
      desc: 'Commercial freight trailers carry the heaviest sustained loads in the transportation industry. At maximum payload, up to 80,000 lbs or 36,000 kg in a multi-axle configuration, trailer brake chambers face constant exposure to road salt, freezing temperatures, and debris. The two common failure points: housing fatigue from mounting stud flex, and internal return spring corrosion.'
    },
    technologies: [
      { name: '8-Gauge Steel Housings', desc: 'We stamp our trailer housings from heavy 8-gauge steel, thicker than standard aftermarket chambers. This eliminates the housing flex that cracks mounting studs under full payload braking.', icon: <ShieldAlert className="w-8 h-8" /> },
      { name: 'Epoxy-Coated Return Springs', desc: 'Every internal return spring is epoxy-coated to prevent rust pitting. This is the leading cause of trailer brake chamber failure in cold-weather and coastal environments.', icon: <Droplets className="w-8 h-8" /> },
      { name: 'Sealed Push-Rod Bearing', desc: 'Contamination-sealed push-rod bearings prevent road salt, mud, and debris from entering the chamber, extending service life in over-the-road conditions.', icon: <CheckCircle2 className="w-8 h-8" /> }
    ],
    recommendedTitle: 'Recommended Brake Chambers for Trailer Axles',
    recommendedDesc: 'The ideal brake chamber combination for over-the-road trailer duty, validated to IATF 16949 standards and up to 1M cycle lab tested.',
    recommendedPackage: [
      { name: 'Type 30/30 Long Stroke Spring Brakes', desc: 'Delivers the extended push-rod travel required to maintain braking efficiency as brake shoes wear down over long hauls. Ideal for trailer parking and emergency brake circuits.', link: '/products' },
      { name: 'Type 30 Service Chambers', desc: 'High-volume single-diaphragm service chambers engineered for immediate brake response on multi-axle trailer configurations. Direct fit for standard S-cam setups.', link: '/products' }
    ],
    cta: {
      heading: 'Outfit Your Trailer Fleet Factory-Direct',
      subheading: 'Eliminate downtime and distributor markups. Connect directly with our engineering team to spec corrosion-resistant brake chambers for your entire trailer fleet. Volume pricing and mixed-axle quantities available.',
      buttonText: 'Request a Quote',
      link: '/quote',
      secondaryButton: { text: 'View OEM Cross-Reference', link: '/oem-cross-reference' }
    }
  },
  'medium-duty-trucks': {
    metaTitle: 'Brake Chambers for Medium-Duty Box Trucks - Stop & Go Duty | BRC',
    metaDesc: 'High-cycle brake chambers designed for urban delivery routes. Drop-in replacement for Isuzu NPR, Hino 195, and Freightliner M2 medium-duty trucks.',
    title: 'Brake Chambers for Medium-Duty Box Trucks',
    desc: 'BRC manufactures high-cycle brake chambers engineered for the stop-and-go demands of urban delivery fleets. Every chamber is a direct fit for Isuzu NPR, Hino 195, Freightliner M2, and other medium-duty box truck platforms.',
    keywords: ['regional delivery truck brakes', 'box truck air brakes', 'delivery fleet brake chambers', 'medium duty truck brakes', 'stop and go brakes'],
    faqs: [
      { q: 'Will these brake chambers fit my Isuzu and Hino delivery trucks?', a: 'Yes. BRC brake chambers use standard medium-duty stud spacing and push-rod lengths compatible with Isuzu NPR, Hino 195, Freightliner M2, and other major medium-duty platforms. Use our OEM cross-reference tool for exact matches.' },
      { q: 'Why do our delivery trucks blow center seals so frequently?', a: 'Urban delivery routes cause 300–500 brake applications per day. That high-cycle actuation places constant friction on the center seal, which eventually develops air leaks. BRC chambers use proprietary high-friction center seal compounds specifically designed for high-cycle duty.' },
      { q: 'What is the service life of a BRC brake chamber in delivery duty?', a: 'Under normal urban delivery conditions, BRC brake chambers deliver 2 to 3 years of service before requiring rebuild. Actual lifespan depends on route density, load weight, and maintenance intervals.' },
      { q: 'Can I order a mixed-fleet quantity with different chamber sizes?', a: 'Yes. We supply mixed orders combining Type 24/30 spring brakes, service chambers, and piggyback kits in a single container. Just specify your part-number mix when requesting a quote.' },
      { q: 'Do these chambers meet FMVSS-121 standards?', a: 'Yes. BRC brake chambers are manufactured to IATF 16949 standards and tested to FMVSS-121 requirements for commercial air brake systems.' },
      { q: 'Are piggyback kits available separately from complete chambers?', a: 'Yes. We supply complete pre-caged piggyback kits as standalone components, so your service team can replace only the power spring section without dismounting the entire chamber.' }
    ],
    specs: [
      { label: 'Primary Stressor', value: 'High-Frequency Actuation' },
      { label: 'Braking Cycles', value: '300+ stops per day' },
      { label: 'Compatibility', value: 'Direct replacement for major medium-duty OEMs' }
    ],
    bgStyle: 'from-navy-900 to-navy-950',
    accent: 'text-amber-500',
    heroImage: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=2000&q=80',
    challenge: {
      title: 'Why Brake Chambers Fail on Delivery Trucks',
      desc: 'Medium-duty box trucks on urban delivery routes can execute 300 to 500 brake applications per day. This high-cycle actuation places constant friction on the push-rod and center seal, accelerating wear far faster than highway duty. Under this kind of abuse, standard center seals can develop air leaks between sections, resulting in weak braking and vehicle downtime.'
    },
    technologies: [
      { name: 'High-Friction Center Seals', desc: 'Our factory utilizes proprietary heavy-duty center seal rings formulated to survive the intense, repetitive friction of urban stop-and-go driving without losing pressure integrity.', icon: <Wrench className="w-8 h-8" /> },
      { name: 'Reinforced Push-Rod Bearing', desc: 'Reinforced bearing surface prevents the friction binding that leads to premature push-rod failure in high-cycle delivery duty.', icon: <Activity className="w-8 h-8" /> },
      { name: 'Compact Housing Design', desc: 'Compact housing geometry fits tight medium-duty chassis clearances without compromising internal diaphragm travel or stroke response.', icon: <ShieldCheck className="w-8 h-8" /> }
    ],
    recommendedTitle: 'Recommended Brake Chambers for Medium-Duty Trucks',
    recommendedDesc: 'The ideal brake chamber combination for medium-duty box truck and delivery fleet duty, validated to IATF 16949 standards.',
    recommendedPackage: [
      { name: 'Type 24/30 Spring Brakes', desc: 'The ideal size configuration for medium-duty chassis, balancing compact installation with reliable stopping power for fully loaded delivery trucks.', link: '/products' },
      { name: 'Pre-Caged Piggyback Kits', desc: 'Enables fleet mechanics to rapidly swap the power spring section without dismounting the entire housing. Reduces service time and keeps delivery trucks on the road.', link: '/products' }
    ],
    cta: {
      heading: 'Outfit Your Delivery Fleet Factory-Direct',
      subheading: 'Skip the middleman markups on high-cycle brake chambers. Connect directly with our engineering team to spec the correct chamber sizes for your delivery fleet. Volume pricing and mixed-fleet quantities available.',
      buttonText: 'Request a Quote',
      link: '/quote',
      secondaryButton: { text: 'View OEM Cross-Reference', link: '/oem-cross-reference' }
    }
  },
  'garbage-refuse': {
    metaTitle: 'Brake Chambers for Garbage & Refuse Trucks - Severe-Duty OEM Replacement | BRC',
    metaDesc: 'Landfill-rated sealed brake chambers for refuse fleets. Direct fit for Mack, Autocar, Peterbilt & Freightliner refuse trucks. Factory-direct pricing.',
    title: 'Brake Chambers for Garbage & Refuse Trucks',
    desc: 'BRC manufactures severe-duty brake chambers engineered for the corrosive, high-heat environment of waste collection. Every chamber is a direct fit for Mack, Autocar, Peterbilt, Freightliner, and other refuse fleet platforms, including Heil, McNeilus, and Labrie body installations.',
    keywords: ['refuse truck air brakes', 'garbage truck brake chambers', 'severe duty air brakes', 'waste management truck brakes', 'high temp brake chambers', 'drop-in replacement brake chambers'],
    faqs: [
      { q: 'Can these brake chambers withstand landfill debris and liquid leachate?', a: 'Yes. BRC refuse-duty brake chambers use sealed housing construction that prevents acidic leachate from entering the chamber. Combined with high-temperature elastomer diaphragms and epoxy-coated internal springs, they are built specifically for landfill exposure.' },
      { q: 'Will these fit our mixed fleet of Mack and Autocar refuse trucks?', a: 'Yes. BRC brake chambers use standard refuse fleet stud spacing and push-rod lengths compatible with Mack, Autocar, Peterbilt, Freightliner, and other major refuse platforms. Use our OEM cross-reference tool for exact part-number matches.' },
      { q: 'What makes refuse brake chambers different from standard truck chambers?', a: 'Refuse trucks execute 1,000+ stops per day, far more than linehaul trucks. BRC refuse chambers use thicker 8-gauge steel housings, high-temperature elastomer diaphragms, and sealed construction to handle the heat, corrosion, and cycle count.' },
      { q: 'What is the service life of a BRC refuse brake chamber?', a: 'Under normal waste collection conditions, BRC refuse chambers deliver 18 to 36 months of service before requiring rebuild. Actual lifespan depends on route density, landfill exposure, and maintenance intervals.' },
      { q: 'Do you supply mixed-fleet quantities for refuse fleets?', a: 'Yes. We supply mixed orders combining Type 30/30 sealed spring brakes and piggyback kits in a single container, matching the specific chamber sizes used across your fleet.' },
      { q: 'What certifications do BRC refuse brake chambers carry?', a: 'BRC brake chambers are manufactured to IATF 16949 standards and tested to FMVSS-121 requirements for commercial air brake systems.' }
    ],
    specs: [
      { label: 'Primary Stressor', value: 'Extreme Radiant Heat & Corrosive Debris' },
      { label: 'Operating Environment', value: 'Urban Routes & Landfill Sites' },
      { label: 'Braking Cycles', value: '1,000+ stops per day' },
      { label: 'Compatibility', value: 'Direct replacement for major refuse OEMs' }
    ],
    bgStyle: 'from-navy-900 to-navy-950',
    accent: 'text-amber-500',
    heroImage: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&w=2000&q=80',
    challenge: {
      title: 'Why Brake Chambers Fail on Refuse Trucks',
      desc: 'Refuse collection is one of the most punishing environments for commercial air brakes. Garbage trucks execute over 1,000 violent stop-and-go cycles per day, generating sustained radiant heat from the brake drums. Then they enter landfills, where chambers are exposed to solid debris and highly acidic liquid leachate. Under this combination, thin housings dent, standard rubber diaphragms crack, and internal springs corrode.'
    },
    technologies: [
      { name: 'High-Temp Elastomer Diaphragms', desc: 'Our factory formulates proprietary high-temperature rubber compounds engineered to maintain perfect elasticity even under extreme, sustained thermal soak from continuous urban braking.', icon: <Flame className="w-8 h-8" /> },
      { name: 'Sealed Housing Construction', desc: 'Sealed housing design prevents acidic landfill leachate from infiltrating the chamber, protecting the internal power spring from the corrosion that fails standard chambers.', icon: <ShieldAlert className="w-8 h-8" /> },
      { name: 'Direct Refuse OEM Fitment', desc: 'Standard stud spacing and push-rod lengths fit Mack, Autocar, Peterbilt, Freightliner, and other refuse fleet platforms directly, providing drop-in replacement across your entire mixed fleet.', icon: <Wrench className="w-8 h-8" /> }
    ],
    recommendedTitle: 'Recommended Brake Chambers for Refuse Trucks',
    recommendedDesc: 'The ideal brake chamber combination for waste collection duty, validated to IATF 16949 standards and up to 1M cycle lab tested.',
    recommendedPackage: [
      { name: 'Type 30/30 Severe-Duty Sealed Brakes', desc: 'The ultimate defense against landfill environments. Sealed housing and high-temperature diaphragms protect internal components from leachate and radiant heat.', link: '/products' },
      { name: 'Heavy-Duty Piggyback Kits', desc: 'Factory-direct replacement spring sections that allow mechanics to swap the power spring without dismounting the entire housing, reducing service downtime and getting trucks back on route.', link: '/products' }
    ],
    cta: {
      heading: 'Outfit Your Refuse Fleet Factory-Direct',
      subheading: 'Skip the middleman markups on severe-duty brake chambers. Connect directly with our engineering team to spec landfill-rated, sealed brake chambers for your waste management fleet. Volume pricing and mixed-fleet quantities available.',
      buttonText: 'Request a Quote',
      link: '/quote',
      secondaryButton: { text: 'View OEM Cross-Reference', link: '/oem-cross-reference' }
    }
  },
  'mining-construction': {
    metaTitle: 'Brake Chambers for Mining & Construction Equipment - Off-Highway OEM Replacement | BRC',
    metaDesc: 'Heavy-duty brake chambers for mining trucks and construction equipment. Direct fit for Caterpillar, Komatsu, Volvo CE & Hitachi. Factory-direct pricing.',
    title: 'Brake Chambers for Mining & Construction Equipment',
    desc: 'BRC manufactures heavy-duty brake chambers engineered for the abrasive dust, mud, and impact stress of off-highway mining and construction sites. Every chamber is a direct fit for Caterpillar, Komatsu, Volvo CE, Hitachi, and other major heavy equipment platforms.',
    keywords: ['off highway brake chambers', 'mining truck air brakes', 'construction equipment brakes', 'severe duty brake chambers', 'heavy duty off road brakes'],
    faqs: [
      { q: 'Will fine mining dust destroy the internal center seals?', a: 'BRC mining-duty chambers use push-rod seals with aggressive wiper ridges that actively scrape away caked mud and silica dust as the push-rod travels. This preserves internal pressure integrity far longer than standard seals in abrasive environments.' },
      { q: 'Are these compatible with specialized vocational chassis like Kenworth C500 or Western Star?', a: 'Yes. BRC brake chambers use standard vocational chassis stud spacing and push-rod lengths compatible with Kenworth C500, Western Star, Peterbilt 567, Mack Granite, and other heavy vocational platforms.' },
      { q: 'What makes mining brake chambers different from standard truck chambers?', a: 'Mining and construction brake chambers use thicker 8-gauge steel housings, abrasion-resistant push-rod seals, and larger diaphragm sizes (Type 36) to handle the payloads, grades, and impact stress of off-highway duty.' },
      { q: 'What is the service life of a BRC mining brake chamber?', a: 'Under normal off-highway duty, BRC mining chambers deliver 12 to 24 months of service before requiring rebuild. Actual lifespan depends on site conditions, payload weight, and maintenance intervals.' },
      { q: 'Do you supply Type 36 chambers separately from other sizes?', a: 'Yes. We supply mixed orders combining Type 36/36 spring brakes, Type 36 service chambers, and piggyback kits in a single container, matching the chamber sizes used across your fleet.' },
      { q: 'What certifications do BRC mining brake chambers carry?', a: 'BRC brake chambers are manufactured to IATF 16949 standards and tested to FMVSS-121 requirements for commercial air brake systems.' }
    ],
    specs: [
      { label: 'Primary Stressor', value: 'Abrasive Dust & Impact Shocks' },
      { label: 'Operating Environment', value: 'Off-Highway / Quarries' },
      { label: 'Braking Cycles', value: 'Steep Grades / Heavy Load' },
      { label: 'Compatibility', value: 'Direct replacement for major vocational OEMs' }
    ],
    bgStyle: 'from-navy-900 to-navy-950',
    accent: 'text-amber-500',
    heroImage: 'https://images.unsplash.com/photo-1579435471441-157989504c55?auto=format&fit=crop&w=2000&q=80',
    challenge: {
      title: 'Why Brake Chambers Fail on Mining & Construction Equipment',
      desc: 'Mining and construction sites expose brake chambers to some of the harshest conditions in commercial trucking. Off-highway dump trucks navigate deep mud, sharp rocks, and clouds of abrasive silica dust while hauling heavy payloads down steep grades. Under this combination, abrasive dust acts like sandpaper on internal seals, while flying rocks can dent standard-gauge steel housings. When air pressure is lost on a quarry grade, braking control is compromised.'
    },
    technologies: [
      { name: 'Impact-Resistant 8-Gauge Steel', desc: 'Our factory stamps mining housings from heavy 8-gauge steel, thicker than the standard housings used by most aftermarket suppliers. This creates a virtual armor shell capable of deflecting high-velocity rock strikes.', icon: <ShieldAlert className="w-8 h-8" /> },
      { name: 'Particulate Defense Push-Rod Seals', desc: 'We engineer our push-rod seals with aggressive wiper ridges designed to actively scrape away caked mud and silica dust, preserving pressure integrity of the chamber in dirty environments.', icon: <Cog className="w-8 h-8" /> },
      { name: 'Direct Heavy Equipment Fitment', desc: 'BRC chambers match standard OEM mounting dimensions for Caterpillar, Komatsu, Volvo CE, Hitachi, and other heavy equipment platforms, enabling fast field replacement without modification.', icon: <Wrench className="w-8 h-8" /> }
    ],
    recommendedTitle: 'Recommended Brake Chambers for Mining & Construction Equipment',
    recommendedDesc: 'The ideal brake chamber combination for off-highway duty, validated to IATF 16949 standards and up to 1M cycle lab tested.',
    recommendedPackage: [
      { name: 'Type 36/36 Heavy-Duty Spring Brakes', desc: 'Massive clamping force designed for ultra-heavy payloads on steep quarry grades. Double-diaphragm design delivers reliable parking and emergency braking under sustained off-highway load.', link: '/products' },
      { name: 'Type 36 Service Chambers', desc: 'Oversized service chambers delivering maximum pneumatic response for extreme off-highway applications. Direct fit for standard mining and construction S-cam setups.', link: '/products' }
    ],
    cta: {
      heading: 'Outfit Your Mining & Construction Fleet Factory-Direct',
      subheading: 'Skip the middleman markups on armored brake chambers. Connect directly with our engineering team to spec heavy-duty, off-highway-rated chambers for your mining and construction fleet. Volume pricing and mixed-fleet quantities available.',
      buttonText: 'Request a Quote',
      link: '/quote',
      secondaryButton: { text: 'View OEM Cross-Reference', link: '/oem-cross-reference' }
    }
  },
  'ag-trailers': {
    metaTitle: 'Brake Chambers for Agricultural Trailers - Corrosion-Resistant OEM Replacement | BRC',
    metaDesc: 'Corrosion-resistant brake chambers for grain hoppers, livestock trailers & farm equipment. Direct fit for Kinze, Brent, J&M & Unverferth. Factory-direct pricing.',
    title: 'Brake Chambers for Agricultural Trailers',
    desc: 'BRC manufactures corrosion-resistant brake chambers engineered for the mud, fertilizer, and seasonal load extremes of agricultural duty. Every chamber is a direct fit for grain hoppers, livestock trailers, and heavy-duty field equipment from Kinze, Brent, J&M, and Unverferth.',
    keywords: ['agricultural trailer brakes', 'farm equipment air brakes', 'grain hopper brake chambers', 'livestock trailer brakes', 'corrosion resistant brake chambers'],
    faqs: [
      { q: 'Will these brake chambers resist corrosion from harsh chemical fertilizers and livestock waste?', a: 'Yes. BRC AG-duty brake chambers use heavy-duty epoxy-coated internal springs and sealed housings that resist chemical fertilizer and livestock waste exposure, critical for off-season idle protection.' },
      { q: 'Do these fit standard hopper bottoms and livestock trailers?', a: 'Yes. BRC brake chambers use standard agricultural trailer stud spacing and push-rod lengths compatible with Kinze, Brent, J&M, Unverferth, and other major farm trailer brands.' },
      { q: 'What makes AG trailer brake chambers different from standard trailer chambers?', a: 'Agricultural trailer chambers face seasonal idle time (allowing rust), chemical exposure (fertilizers, livestock waste), and off-road conditions (mud, ruts). BRC AG chambers use epoxy-coated springs and sealed housings specifically for these conditions.' },
      { q: 'What is the service life of a BRC AG brake chamber?', a: 'Under normal agricultural duty, BRC chambers deliver 5 to 7 harvest seasons before requiring rebuild. Actual lifespan depends on storage conditions, load weight, and maintenance intervals.' },
      { q: 'Do you supply mixed orders for grain and livestock trailer fleets?', a: 'Yes. We supply mixed orders combining Type 30/30 spring brakes and Type 30 service chambers in a single container, matching the chamber sizes used across your farm equipment.' },
      { q: 'What certifications do BRC AG brake chambers carry?', a: 'BRC brake chambers are manufactured to IATF 16949 standards and tested to FMVSS-121 requirements for commercial air brake systems.' }
    ],
    specs: [
      { label: 'Primary Stressor', value: 'Chemical Corrosion & Seasonal Overload' },
      { label: 'Operating Environment', value: 'Dirt Roads / Farms / Feedlots' },
      { label: 'Braking Cycles', value: 'Sporadic Extreme Load' },
      { label: 'Compatibility', value: 'Direct replacement for major ag trailer OEMs' }
    ],
    bgStyle: 'from-navy-900 to-navy-950',
    accent: 'text-amber-500',
    heroImage: 'https://images.unsplash.com/photo-1595844730298-b960fad9744a?auto=format&fit=crop&w=2000&q=80',
    challenge: {
      title: 'Why Brake Chambers Fail on Agricultural Trailers',
      desc: 'Agricultural hauling, grain hoppers, livestock trailers, and heavy machinery transport, exposes brake chambers to a unique combination of chemical and seasonal hazards. These trailers navigate deeply rutted dirt roads and are constantly exposed to acidic livestock waste, corrosive fertilizers, and deep mud. They also sit idle for months during the off-season, allowing untreated internal springs to rust and seize. When harvest season arrives, weakened chambers can fail under the first heavy payloads.'
    },
    technologies: [
      { name: 'Anti-Corrosion Epoxy Shielding', desc: 'Our factory applies a heavy-duty epoxy spring coating that prevents the chemical rust and seizing that occurs when standard ag trailers sit idle during the off-season.', icon: <Droplets className="w-8 h-8" /> },
      { name: 'Mud and Debris Guard', desc: 'Sealed housing protects internal components from the heavy loads of frozen mud and field debris kicked up by tractor tires on unpaved roads.', icon: <ShieldAlert className="w-8 h-8" /> },
      { name: 'Direct Agricultural OEM Fitment', desc: 'Standard agricultural trailer stud spacing and push-rod lengths fit Kinze, Brent, J&M, Unverferth, and other farm equipment trailers as direct drop-in replacements.', icon: <Settings className="w-8 h-8" /> }
    ],
    recommendedTitle: 'Recommended Brake Chambers for Agricultural Trailers',
    recommendedDesc: 'The ideal brake chamber combination for agricultural trailer duty, validated to IATF 16949 standards.',
    recommendedPackage: [
      { name: 'Type 30/30 Standard Spring Brakes', desc: 'Corrosion-resistant spring brakes for grain hoppers and heavy livestock transport. Double-diaphragm design delivers reliable parking and emergency braking across seasonal load cycles.', link: '/products' },
      { name: 'Type 30 Service Chambers', desc: 'Reliable service braking for multi-axle agricultural equipment that sees heavy seasonal use. Direct fit for standard farm trailer S-cam setups.', link: '/products' }
    ],
    cta: {
      heading: 'Outfit Your Agricultural Fleet Factory-Direct',
      subheading: 'Skip the middleman markups on corrosion-resistant brake chambers. Connect directly with our engineering team to spec the correct chamber sizes for your agricultural trailers. Volume pricing and mixed-fleet quantities available.',
      buttonText: 'Request a Quote',
      link: '/quote',
      secondaryButton: { text: 'View OEM Cross-Reference', link: '/oem-cross-reference' }
    }
  },
  'transit-buses': {
    metaTitle: 'Brake Chambers for City Bus & Transit Coach - OEM Replacement | BRC',
    metaDesc: 'Smooth, high-cycle brake chambers for city transit buses. Direct fit for New Flyer, Gillig, Nova Bus & BYD. Factory-direct pricing.',
    title: 'Brake Chambers for City Bus & Transit Coach',
    desc: 'BRC manufactures high-cycle brake chambers engineered for the smooth, quiet braking demands of urban transit. Every chamber is a direct fit for New Flyer, Gillig, Nova Bus, BYD, and other major transit bus platforms.',
    keywords: ['transit bus air brakes', 'city bus brake chambers', 'passenger coach brakes', 'smooth air brakes', 'high cycle brake chambers'],
    faqs: [
      { q: 'How does your factory ensure braking is smooth enough for standing passengers?', a: 'BRC transit bus chambers use custom-molded linear response diaphragms that eliminate the sudden "grabbing" effect common in standard chambers. Combined with vibration-dampened return springs, the result is smooth, predictable pressure application.' },
      { q: 'Are these compatible with New Flyer and Gillig transit buses?', a: 'Yes. BRC brake chambers use standard transit bus stud spacing and push-rod lengths compatible with New Flyer, Gillig, Nova Bus, BYD, and other major municipal platforms. Use our OEM cross-reference tool for exact part-number matches.' },
      { q: 'What makes transit bus brake chambers different from truck chambers?', a: 'Transit buses execute continuous stop-and-go cycles that fatigue standard chambers faster than linehaul duty. BRC transit chambers use linear response diaphragms and vibration-dampened springs specifically for the cycle count and noise profile of urban transit.' },
      { q: 'What is the service life of a BRC transit bus brake chamber?', a: 'Under normal urban transit conditions, BRC transit chambers deliver 3 to 5 years of service before requiring rebuild. Actual lifespan depends on route density, passenger load, and maintenance intervals.' },
      { q: 'Do you supply mixed orders for transit fleets?', a: 'Yes. We supply mixed orders combining ADB actuators and Type 24 service chambers in a single container, matching the specific chamber sizes used across your transit fleet.' },
      { q: 'What certifications do BRC transit brake chambers carry?', a: 'BRC brake chambers are manufactured to IATF 16949 standards and tested to FMVSS-121 requirements for commercial air brake systems.' }
    ],
    specs: [
      { label: 'Primary Stressor', value: 'Cycle Fatigue & Jerky Actuation' },
      { label: 'Operating Environment', value: 'Urban Routes / Transit Networks' },
      { label: 'Braking Cycles', value: 'Continuous Stop-and-Go' },
      { label: 'Compatibility', value: 'Direct replacement for major transit OEMs' }
    ],
    bgStyle: 'from-navy-900 to-navy-950',
    accent: 'text-amber-500',
    heroImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=2000&q=80',
    challenge: {
      title: 'Why Brake Chambers Fail on City Transit Buses',
      desc: 'City transit buses run continuous stop-and-go duty cycles that put far more actuation cycles on brake chambers than freight trucks. For passenger vehicles, harsh or jerky braking is not acceptable - it affects passenger comfort and safety. The constant cycling fatigues return springs, while lower-quality internal components can cause brake rattle. Under this duty, standard chambers may bind or stick, resulting in abrupt stops and passenger complaints.'
    },
    technologies: [
      { name: 'Linear Response Diaphragms', desc: 'Our factory utilizes custom-molded diaphragms designed to provide perfectly linear resistance, eliminating the sudden "grabbing" effect and ensuring incredibly smooth, predictable pressure application.', icon: <Activity className="w-8 h-8" /> },
      { name: 'Vibration-Dampened Springs', desc: 'We manufacture our high-cycle return springs to exact tolerances to eliminate internal housing rattle, ensuring a quiet, premium ride experience for city transit passengers.', icon: <Cog className="w-8 h-8" /> },
      { name: 'Direct Transit OEM Fitment', desc: 'Standard transit bus stud spacing and push-rod lengths fit New Flyer, Gillig, Nova Bus, BYD, and other major municipal platforms - direct drop-in fitment for your maintenance bays.', icon: <CheckCircle2 className="w-8 h-8" /> }
    ],
    recommendedTitle: 'Recommended Brake Chambers for Transit Buses',
    recommendedDesc: 'The ideal brake chamber combination for urban transit duty - validated to IATF 16949 standards and up to 1M cycle lab tested.',
    recommendedPackage: [
      { name: 'Air Disc Brake Actuators', desc: 'The preferred choice for modern transit buses. HOT Technology delivers smooth modulation and shorter stopping distances in stop-and-go city traffic.', link: '/products' },
      { name: 'Type 24 Service Chambers', desc: 'Compact, high-response service chambers perfect for the rapid actuation demands of urban transit. Direct fit for standard transit S-cam setups.', link: '/products' }
    ],
    cta: {
      heading: 'Outfit Your Transit Fleet Factory-Direct',
      subheading: 'Skip the middleman markups on smooth-response brake chambers. Connect directly with our engineering team to spec low-noise, high-cycle chambers for your municipal transit fleet. Volume pricing and mixed-fleet quantities available.',
      buttonText: 'Request a Quote',
      link: '/quote',
      secondaryButton: { text: 'View OEM Cross-Reference', link: '/oem-cross-reference' }
    }
  },
  'school-buses': {
    metaTitle: 'Brake Chambers for School Bus Fleets - OEM Replacement | BRC',
    metaDesc: 'Rapid-response brake chambers for school buses. Direct fit for Blue Bird, Thomas Built, IC Bus & Collins. Factory-direct pricing.',
    title: 'Brake Chambers for School Bus Fleets',
    desc: 'BRC manufactures rapid-response brake chambers engineered for the safety-critical demands of student transport. Every chamber is a direct fit for Blue Bird, Thomas Built, IC Bus, Collins, and other major school bus chassis.',
    keywords: ['school bus air brakes', 'student transport brake chambers', 'blue bird bus brakes', 'thomas built bus brakes', 'reliable air brake chambers'],
    faqs: [
      { q: 'Will these brake chambers fit our Blue Bird and Thomas Built buses?', a: 'Yes. BRC brake chambers use standard school bus stud spacing and push-rod lengths compatible with Blue Bird, Thomas Built, IC Bus, Collins, and other major school bus chassis. Use our OEM cross-reference tool for exact part-number matches.' },
      { q: 'How does your manufacturing process prioritize student safety?', a: 'Every BRC school bus chamber is 100% pneumatic leak-tested and cycle-tested before shipment. Our chambers use zero-leak double-lip center seals that isolate the emergency brake circuit from the service brake circuit - critical for fail-safe operation.' },
      { q: 'What makes school bus brake chambers different from truck chambers?', a: 'School buses idle extensively during pickup and drop-off, which puts unique wear on return springs and center seals. BRC school bus chambers use return springs and center seals specifically validated for the stop-idle-stop duty cycle of school transport.' },
      { q: 'What is the service life of a BRC school bus brake chamber?', a: 'Under normal school bus duty, BRC chambers deliver 4 to 6 years of service before requiring rebuild. Actual lifespan depends on route density, idling hours, and maintenance intervals.' },
      { q: 'Do you supply mixed orders for school bus fleets?', a: 'Yes. We supply mixed orders combining Type 30/30 spring brakes and Type 20 service chambers in a single container, matching the specific chamber sizes used across your bus fleet.' },
      { q: 'What certifications do BRC school bus brake chambers carry?', a: 'BRC brake chambers are manufactured to IATF 16949 standards and tested to FMVSS-121 requirements for commercial air brake systems.' }
    ],
    specs: [
      { label: 'Primary Stressor', value: 'Frequent Stops & Extended Idling' },
      { label: 'Operating Environment', value: 'Fixed Routes / School Zones' },
      { label: 'Braking Cycles', value: 'Moderate Frequency' },
      { label: 'Compatibility', value: 'Direct replacement for major school bus OEMs' }
    ],
    bgStyle: 'from-navy-900 to-navy-950',
    accent: 'text-amber-500',
    heroImage: 'https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?auto=format&fit=crop&w=2000&q=80',
    challenge: {
      title: 'Why Brake Chambers Fail on School Buses',
      desc: 'School buses operate on fixed routes with frequent, predictable stops, and they idle extensively during pickup and drop-off. This duty cycle accelerates wear on return springs and center seals compared to linehaul duty. Because school bus fleets operate on strict municipal budgets, maintenance directors need chambers that deliver long service life at a fair price - without compromising student safety.'
    },
    technologies: [
      { name: 'Rapid-Exhaust Valving', desc: 'Our factory machines internal air ports to maximize airflow, ensuring immediate brake release and application. This provides drivers with critical split-second control in school zones.', icon: <Zap className="w-8 h-8" /> },
      { name: 'Zero-Leak Center Seals', desc: 'We utilize a proprietary double-lip center seal design that eliminates air crossover, ensuring the emergency parking brake remains completely isolated from the service brake system.', icon: <Lock className="w-8 h-8" /> },
      { name: 'Direct School Bus OEM Fitment', desc: 'Standard school bus stud spacing and push-rod lengths fit Blue Bird, Thomas Built, IC Bus, Collins, and other major school bus chassis as direct drop-in replacements.', icon: <ShieldCheck className="w-8 h-8" /> }
    ],
    recommendedTitle: 'Recommended Brake Chambers for School Buses',
    recommendedDesc: 'The ideal brake chamber combination for school bus fleet duty - validated to IATF 16949 standards and up to 1M cycle lab tested.',
    recommendedPackage: [
      { name: 'Type 30/30 Standard Spring Brakes', desc: 'The dependable standard for full-size school bus rear axles. Double-diaphragm design provides fail-safe mechanical parking capability for daily route duty.', link: '/products' },
      { name: 'Type 20 Service Chambers', desc: 'Precision steer-axle chambers designed for fast, controllable stopping power in suburban environments and school zones.', link: '/products' }
    ],
    cta: {
      heading: 'Outfit Your School Bus Fleet Factory-Direct',
      subheading: 'Stretch your district\'s safety budget with factory-direct pricing. Connect directly with our engineering team to spec reliable, long-life brake chambers for your entire school bus fleet. Volume pricing and mixed-fleet quantities available.',
      buttonText: 'Request a Quote',
      link: '/quote',
      secondaryButton: { text: 'View OEM Cross-Reference', link: '/oem-cross-reference' }
    }
  },
  'shuttle-vans': {
    metaTitle: 'Brake Chambers for Commercial Cutaway Vans - OEM Replacement | BRC',
    metaDesc: 'Compact brake chambers for Ford E-450, Chevy Express 4500 & commercial cutaway vans. Engineered for tight chassis clearances. Factory-direct pricing.',
    title: 'Brake Chambers for Commercial Cutaway Vans',
    desc: 'BRC manufactures compact, high-response brake chambers engineered for the tight chassis clearances of commercial cutaway vans and shuttle buses. Every chamber is a direct fit for Ford E-450, Chevrolet Express 4500, and similar commercial van chassis.',
    keywords: ['commercial van air brakes', 'shuttle bus brake chambers', 'heavy duty van brakes', 'compact air brake chambers', 'delivery van air brakes'],
    faqs: [
      { q: 'Are these compact enough for the tight axles on commercial cutaway vans?', a: 'Yes. BRC cutaway van chambers are engineered in smaller sizes (Types 9, 12, and 16) with optimized housing profiles that fit the tighter axle and suspension clearances of Ford E-450 and Chevrolet Express 4500 chassis without rubbing.' },
      { q: 'Will these fit Ford and Chevy commercial cutaway chassis?', a: 'Yes. BRC brake chambers use standard commercial cutaway mounting bolt patterns compatible with Ford E-450, Chevrolet Express 4500, and similar air-brake cutaway platforms. Use our OEM cross-reference tool for exact part-number matches.' },
      { q: 'What makes cutaway van brake chambers different from truck chambers?', a: 'Cutaway vans have much tighter chassis clearances than full trucks, but still need the stopping power of a full pneumatic air brake system. BRC cutaway chambers use compact housing profiles with high-tensile diaphragms specifically for this balance.' },
      { q: 'What is the service life of a BRC cutaway van brake chamber?', a: 'Under normal shuttle and delivery duty, BRC cutaway chambers deliver 3 to 5 years of service before requiring rebuild. Actual lifespan depends on route density, load weight, and maintenance intervals.' },
      { q: 'Do you supply mixed orders for cutaway van fleets?', a: 'Yes. We supply mixed orders combining Type 12 and Type 16 service chambers in a single container, matching the specific chamber sizes used across your fleet.' },
      { q: 'What certifications do BRC cutaway van brake chambers carry?', a: 'BRC brake chambers are manufactured to IATF 16949 standards and tested to FMVSS-121 requirements for commercial air brake systems.' }
    ],
    specs: [
      { label: 'Primary Stressor', value: 'Tight Clearances & Urban Traffic' },
      { label: 'Operating Environment', value: 'Urban Routes / Airport Transport' },
      { label: 'Braking Cycles', value: 'High Frequency' },
      { label: 'Compatibility', value: 'Direct replacement for major commercial van OEMs' }
    ],
    bgStyle: 'from-navy-900 to-navy-950',
    accent: 'text-amber-500',
    heroImage: 'https://images.unsplash.com/photo-1580659359145-6677464177eb?auto=format&fit=crop&w=2000&q=80',
    challenge: {
      title: 'Why Brake Chambers Fail on Commercial Cutaway Vans',
      desc: 'Heavy-duty shuttle buses, airport transports, and large delivery vans built on commercial cutaway chassis face a unique spatial challenge. They require the stopping power of a full pneumatic air brake system but must fit those components into the tighter axle and suspension clearances of a van chassis. Standard bulky chambers can rub against suspension components, causing housing fatigue and premature failure.'
    },
    technologies: [
      { name: 'Compact Profile Housings', desc: 'Our factory engineers smaller-size service chambers (Types 9, 12, and 16) with optimized housing profiles to ensure zero interference with tight commercial van suspension components.', icon: <PackagePlus className="w-8 h-8" /> },
      { name: 'High-Tensile Diaphragms', desc: 'Despite their compact footprint, we manufacture these chambers using high-strength nylon-reinforced diaphragms to deliver maximum pneumatic force output for heavy passenger loads.', icon: <Activity className="w-8 h-8" /> },
      { name: 'Direct Cutaway OEM Fitment', desc: 'Engineered to match the exact mounting bolt patterns of major commercial cutaway air brake conversions, allowing for fast, drop-in replacements by your mechanics.', icon: <Wrench className="w-8 h-8" /> }
    ],
    recommendedTitle: 'Recommended Brake Chambers for Commercial Cutaway Vans',
    recommendedDesc: 'The ideal brake chamber combination for cutaway van and shuttle bus duty - validated to IATF 16949 standards.',
    recommendedPackage: [
      { name: 'Type 16 Service Chambers', desc: 'The perfect balance of compact size and powerful service braking force for heavy-duty shuttle vans operating at full passenger load.', link: '/products' },
      { name: 'Type 12 Service Chambers', desc: 'Ultra-compact service chambers engineered specifically for the tightest steer-axle clearances in cutaway van and small shuttle applications.', link: '/products' }
    ],
    cta: {
      heading: 'Outfit Your Cutaway Van Fleet Factory-Direct',
      subheading: 'Skip the middleman markups on compact, high-response brake chambers. Connect directly with our engineering team to spec the correct chamber sizes for your commercial cutaway van or shuttle fleet. Volume pricing and mixed-fleet quantities available.',
      buttonText: 'Request a Quote',
      link: '/quote',
      secondaryButton: { text: 'View OEM Cross-Reference', link: '/oem-cross-reference' }
    }
  }
};
