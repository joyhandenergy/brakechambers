import React from 'react';
import { ShieldCheck, Ruler, FileText, Wrench, ShieldAlert } from 'lucide-react';

export const SEO_DATA: Record<string, { metaTitle: string; metaDescription: string; keywords: string }> = {
  'size-charts': {
    metaTitle: "Brake Chamber Size Chart - Type 12 Through Type 36 Dimensions | BRC",
    metaDescription: "Complete brake chamber size and dimension charts. OD, mounting stud centers, push-rod thread, and weight for Type 12 through Type 36. SAE J1469 compliant.",
    keywords: "brake chamber size chart, brake chamber dimensions, Type 30 brake chamber size, Type 24 brake chamber dimensions, mounting stud centers, pushrod thread size, SAE J1469, spring brake dimensions, service chamber dimensions",
  },
  'stroke-length': {
    metaTitle: "Brake Chamber Stroke Length Guide - CVSA Limits & Measurement | BRC",
    metaDescription: "Brake chamber stroke length guide. Covers standard vs. long-stroke, how to measure stroke, CVSA out-of-service limits, and common stroke failure causes.",
    keywords: "stroke length guide, CVSA readjustment limits, long stroke brake chamber, standard stroke limit, out of service criteria, DOT brake inspection, brake chamber stroke measurement, Type 30 stroke limit",
  },
  'installation': {
    metaTitle: "Brake Chamber Installation Guide - Step-by-Step Procedures | BRC",
    metaDescription: "Complete brake chamber installation guide. Pre-installation diagnostics, push-rod cutting formulas, torque specs, and safe uncaging procedures. Free PDF download.",
    keywords: "brake chamber installation, how to install brake chamber, pushrod cutting, clevis installation, air brake installation guide, mounting torque specs, brake chamber replacement, commercial truck brakes",
  },
  'identification': {
    metaTitle: "Brake Chamber Visual Identification Guide - Size & Stroke | BRC",
    metaDescription: "Identify brake chamber size and stroke type without a part number. Field-tested methods for clamp band measurement, long-stroke tags, and port casting patterns.",
    keywords: "identify brake chamber size, brake chamber identification, long stroke identification, clamp band measurement, brake chamber part number, square port brake chamber, trapezoidal tag",
  },
  'selection-guides': {
    metaTitle: "Brake Chamber Selection Guide - Choose by Vocation | BRC",
    metaDescription: "Match the right brake chamber to your fleet's vocation. Linehaul, severe-duty, transit, and heavy haul selection guidance with piggyback vs. assembly comparison.",
    keywords: "brake chamber selection guide, which brake chamber, piggyback vs complete assembly, severe duty brake chamber, transit brake chamber, heavy haul brakes, Type 30/30 selection, commercial brake selection",
  },
  'caging': {
    metaTitle: "Brake Chamber Caging Procedure - Safe Spring Brake Caging | BRC",
    metaDescription: "Step-by-step brake chamber caging procedures for spring brakes. When to cage, how to cage, and how to avoid the most common caging injuries. Free PDF.",
    keywords: "caging spring brake, how to cage brake chamber, spring brake caging procedure, caging bolt procedure, Type 30 spring brake caging, mechanical caging, brake chamber safety",
  },
};

export const TECHNICAL_RESOURCES_DATA: Record<string, any> = {
  'size-charts': {
    imageSrc: '/images/brc_brakechamber_aftermarket.jpg',
    title: "Brake Chamber Size & Dimension Charts - Type 12 through Type 36",
    category: 'Specifications & Sizing',
    description: "Complete dimension tables for BRC spring brake and service brake chambers. Includes outside diameter, mounting stud centers, push-rod thread, and approximate weight - verified to SAE J1469 compliance standards.",
    icon: <Ruler className="w-6 h-6 text-emerald-500" aria-hidden="true" />,
    alert: {
      type: 'info',
      title: "SAE J1469 COMPLIANCE",
      message: "All BRC brake chamber dimensions adhere to SAE J1469 interchangeability standards - the same protocol used by Bendix, Haldex, Meritor, and Knorr-Bremse. Chambers that don't meet this standard can cause bracket fatigue, push-rod binding, and premature failure."
    },
    sections: [
      {
        title: "Spring Brake Chamber Dimensions (Type 20/24 to Type 30/30)",
        content: "Accurate dimensions prevent installation failures on tandem axle setups. This chart covers double-diaphragm spring brake chambers (combination service + parking). Compare outside diameter (OD), mounting stud centers, push-rod thread, and approximate weight before ordering. All dimensions verified to SAE J1469.",
        table: {
          headers: ["Type Size", "Outside Diameter (OD)", "Mounting Stud Centers", "Pushrod Thread", "Approx. Weight"],
          rows: [
            ["Type 20/24", "6.8\" (173mm)", "4.75\" (120.7mm)", "5/8-11 UNC", "16.5 lbs"],
            ["Type 24/24", "7.1\" (180mm)", "4.75\" (120.7mm)", "5/8-11 UNC", "17.2 lbs"],
            ["Type 24/30", "8.2\" (208mm)", "4.75\" (120.7mm)", "5/8-11 UNC", "19.8 lbs"],
            ["Type 30/30 (Std)", "8.2\" (208mm)", "4.75\" (120.7mm)", "5/8-11 UNC", "20.5 lbs"],
            ["Type 30/30 (LS)", "8.2\" (208mm)", "4.75\" (120.7mm)", "5/8-11 UNC", "21.1 lbs"],
          ]
        }
      },
      {
        title: "Important Note on Stroke Type",
        content: "NOTE: Type 30/30 LS refers to Long Stroke. Confirm your existing chamber's stroke length before ordering - long-stroke chambers are not interchangeable with standard-stroke chambers on the same slack adjuster."
      },
      {
        title: "Service Brake Chamber Dimensions (Type 12 to Type 30)",
        content: "Service brake chambers are single-diaphragm chambers used on steer axles, drive axles, trailer axles, and lift axle applications where a parking spring is not required. Compare outside diameter (OD), mounting stud centers, and push-rod thread before ordering.",
        table: {
          headers: ["Type Size", "Outside Diameter (OD)", "Mounting Stud Centers", "Pushrod Thread", "Approx. Weight"],
          rows: [
            ["Type 12", "5.7\" (145mm)", "4.75\" (120.7mm)", "5/8-11 UNC", "8.8 lbs"],
            ["Type 16", "6.4\" (162mm)", "4.75\" (120.7mm)", "5/8-11 UNC", "10.6 lbs"],
            ["Type 20", "6.8\" (173mm)", "4.75\" (120.7mm)", "5/8-11 UNC", "12.4 lbs"],
            ["Type 24", "7.1\" (180mm)", "4.75\" (120.7mm)", "5/8-11 UNC", "14.1 lbs"],
            ["Type 30", "8.2\" (208mm)", "4.75\" (120.7mm)", "5/8-11 UNC", "16.8 lbs"],
          ]
        }
      },
      {
        title: "Brake Chamber Size & Dimension FAQs",
        content: "Common questions from technicians and fleet managers about brake chamber dimensions.",
        faqs: [
          { question: "Why are push-rod threads usually 5/8-11 UNC?", answer: "5/8-11 UNC is the standard push-rod thread size across most North American commercial vehicle brake chambers. It provides adequate clamping force for clevis attachment while remaining compatible with standard clevis yokes. Some European and Japanese applications use metric threads - verify your specific application." },
          { question: "Does a larger OD mean more braking power?", answer: "Not directly. Braking force is determined by the effective diaphragm area (the type number, e.g., Type 30), not the housing outside diameter. Two chambers with the same type number but different ODs deliver the same braking force. OD affects clearance and mounting, not power output." },
          { question: "Can I use a Type 30 service chamber in place of a Type 24?", answer: "No, and you should not try. Type numbers correspond to specific effective diaphragm areas. Substituting a different type changes the force delivered to the slack adjuster, which affects braking balance across the axle. Always match the OEM type number." },
          { question: "Are Type 30/30 and Type 30/30 LS interchangeable?", answer: "No. Standard-stroke and long-stroke chambers have different push-rod travel. Installing the wrong stroke will prevent correct slack adjuster operation. Verify your existing chamber's stroke before ordering." },
          { question: "Do BRC chamber dimensions match Bendix, Haldex, and Meritor?", answer: "Yes. All BRC chambers are dimensioned to SAE J1469 interchangeability standards, so outside diameter, stud centers, and push-rod thread match the OEM part numbers you're replacing. Use our OEM cross-reference tool for a direct part-number match." },
          { question: "Where can I find the weight of a specific brake chamber?", answer: "Both dimension tables on this page include an approximate weight column. For exact shipping weights, contact our team." }
        ]
      }
    ],
    download: { name: "Full Dimension Catalog PDF", size: "~1.5 MB" }
  },

  'stroke-length': {
    imageSrc: '/images/brc_brakechamber_aftermarket.jpg',
    title: "Brake Chamber Stroke Length Guide - Limits, Measurement & CVSA Criteria",
    category: 'Specifications & Sizing',
    description: "Complete guide to brake chamber stroke length. Covers standard vs. long-stroke, how to measure stroke correctly, CVSA out-of-service limits, and how to fix failing brakes before they cause a violation.",
    icon: <Ruler className="w-6 h-6 text-emerald-500" aria-hidden="true" />,
    alert: {
      type: 'warning',
      title: "DO NOT MIX STROKE TYPES",
      message: "Never mix a standard-stroke and a long-stroke brake chamber on the same axle. Doing so causes unequal braking force, which pulls the vehicle severely to one side during emergency stops and immediately fails DOT, CVSA, or equivalent regional inspections."
    },
    sections: [
      {
        title: "Understanding Brake Chamber Stroke Limits and Safety",
        content: "Stroke length determines the operating limit of your brakes. It is the maximum distance the push-rod can travel before the diaphragm bottoms out against the housing. As brake linings wear and drums heat up and expand (brake fade), the required stroke increases. If stroke reaches its maximum limit, the vehicle has zero braking power on that wheel.",
        bullets: [
          "Standard Stroke Brake Chambers: The traditional chamber design. Suitable for most vocations but requires more frequent manual adjustment checks.",
          "Long Stroke (LS) Brake Chambers: Provides an additional 0.5 inches (or more) of reserve stroke margin. Mandated on many modern air-ride suspensions and highly recommended for transit and heavy haul duty."
        ]
      },
      {
        title: "CVSA Brake Chamber Stroke Readjustment Limits",
        content: "Commercial Vehicle Safety Alliance (CVSA) inspectors measure the brake chamber stroke while the brakes are fully applied at 90-100 psi. If the applied stroke measurement is equal to or greater than the readjustment limit below, the brake is considered defective and the vehicle will be placed Out-of-Service (OOS).",
        table: {
          headers: ["Chamber Type", "Standard Stroke Limit", "Long Stroke (LS) Limit"],
          rows: [
            ["Type 16", "1 3/4\" (44.5mm)", "2.0\" (51mm)"],
            ["Type 20", "1 3/4\" (44.5mm)", "2.0\" (51mm)"],
            ["Type 24", "1 3/4\" (44.5mm)", "2.0\" (51mm)"],
            ["Type 30", "2.0\" (51mm)", "2.5\" (63.5mm)"],
            ["Type 36", "2 1/4\" (57mm)", "N/A"],
          ]
        }
      },
      {
        title: "Measurement Note",
        content: "Use a tape measure or a stroke indicator tool. Mark the push-rod at the chamber face, apply full brake pressure (90-100 psi), and measure the distance the push-rod moved. Compare to the table above."
      },
      {
        title: "Troubleshooting Brake Chamber Stroke Issues",
        content: "If your stroke measurement is approaching the legal limit rapidly, check these common causes before replacing parts.",
        bullets: [
          "Worn Brake Linings: Ensure your brake shoes have sufficient pad life remaining. Worn linings require more push-rod travel, which drives up stroke length.",
          "Faulty Automatic Slack Adjuster (ASA): The ASA may be failing to take up slack dynamically. Do not manually adjust an ASA to fix a stroke issue - diagnose and replace the root cause.",
          "Heat Expansion From Dragging Brakes: Severe drum expansion from dragging brakes can simulate a stroke-out condition. Inspect for stuck S-cam bushings, seized rollers, or a failed return spring."
        ]
      },
      {
        title: "Brake Chamber Stroke FAQs",
        content: "Common questions from fleet managers and technicians about brake chamber stroke measurement.",
        faqs: [
          { question: "How do I know if I have a Long Stroke brake chamber?", answer: "Check three indicators: (1) the ID tag under the clamp band bolt - long-stroke tags are trapezoidal, standard tags are round or rectangular; (2) the air ports - long-stroke ports are cast into a raised square or rectangular boss; (3) the rear housing - long-stroke chambers often have \"LONG STROKE\" or \"LS\" stamped on the rear housing." },
          { question: "Can I replace a standard-stroke chamber with a long-stroke chamber?", answer: "Not on the same axle. Both sides of an axle must use the same stroke type. If you want to upgrade to long-stroke chambers, you must replace all chambers on both sides of the axle and verify your slack adjusters are compatible with long-stroke operation." },
          { question: "How do I measure brake chamber stroke correctly?", answer: "With the brakes fully applied at 90-100 psi, measure the distance from the chamber face to the centerline of the clevis pin. Compare to the CVSA readjustment limit table above. Use a tape measure or a dedicated stroke indicator tool." },
          { question: "Why does my stroke keep increasing even after I adjust the slack adjuster?", answer: "If stroke keeps increasing after manual adjustment, the automatic slack adjuster is likely faulty. ASAs are designed to self-adjust - if it isn't working, manual adjustment only masks the problem. Replace the ASA." },
          { question: "What happens if I drive with stroke out of adjustment?", answer: "If the push-rod cannot travel far enough, the brake will not fully apply. You lose braking power on that wheel, the vehicle pulls to one side, and stopping distance increases dramatically. This is a serious safety issue and an immediate DOT violation." },
          { question: "Do long-stroke brake chambers require different air pressure?", answer: "No. Long-stroke and standard-stroke chambers operate on the same air system pressure (typically 100-120 psi). The difference is stroke travel range, not operating pressure." }
        ]
      }
    ]
  },

  'installation': {
    imageSrc: '/images/brc_brakechamber_aftermarket.jpg',
    title: "Brake Chamber Installation Guide - Step-by-Step Procedures",
    category: 'Installation & Maint.',
    description: "Complete installation instructions for standard and long-stroke air brake chambers. Includes pre-installation diagnostics, push-rod cutting formulas, torque specifications, and safe uncaging procedures.",
    icon: <Wrench className="w-6 h-6 text-blue-500" aria-hidden="true" />,
    alert: {
      type: 'danger',
      title: "CRITICAL SAFETY WARNING",
      message: "Always chock the vehicle wheels and release the parking brake before beginning any work on the brake system. If replacing a spring brake chamber, you must manually cage the power spring before removing the chamber from the mounting bracket. Failure to cage the spring can result in serious injury."
    },
    sections: [
      {
        title: "Pre-Installation Diagnostics & Preparation",
        content: "Before swapping a brake chamber, confirm the diagnosis. A leaking air line or faulty dash valve can mimic a ruptured diaphragm. Once confirmed, complete these preparation steps:",
        bullets: [
          "Exhaust the air system completely to 0 psi before beginning work.",
          "Inspect the mounting bracket on the axle for cracks, bending, or severe rust. A bent bracket will cause push-rod binding.",
          "Verify the replacement brake chamber matches the size and stroke type of the old chamber.",
          "Ensure the slack adjuster operates freely, is properly lubricated, and the clevis pin holes are not wallowed out."
        ]
      },
      {
        title: "Step-by-Step Brake Chamber Installation Procedure",
        steps: [
          {
            title: "Mount the Chamber",
            desc: "Insert the mounting studs through the bracket holes. Install lock washers and nuts. Torque mounting nuts to 100-115 ft-lbs (135-155 Nm) for standard 5/8-11 threads. Do not over-torque - excessive torque can pull the studs out of the non-pressure housing."
          },
          {
            title: "Calculate & Cut the Push-Rod",
            desc: "With the slack adjuster manually adjusted to its fully released position, measure the required push-rod length. Critical rule: the angle between the push-rod and the slack adjuster arm must be exactly 90 degrees when the brake is applied at half stroke. Cut the push-rod to this exact length using a square cut. Do not use a torch - heat will weaken the metal."
          },
          {
            title: "Install the Clevis",
            desc: "Thread the jam nut onto the push-rod, followed by the clevis. Ensure at least 1/2 inch of thread engagement inside the clevis body to prevent thread pull-out. Install the clevis pin and secure it with a new cotter pin. Tighten the jam nut against the clevis to 40-50 ft-lbs."
          },
          {
            title: "Connect Air Lines",
            desc: "Apply liquid thread sealant to the air fittings (do not apply to the first two threads - this prevents sealant from entering the air system). Connect the service air line (Port 11) and the emergency/parking air line (Port 12). Torque fittings to 20-25 ft-lbs."
          },
          {
            title: "Uncage and Test",
            desc: "Apply system air pressure (100+ psi) to the parking brake port to compress the power spring pneumatically. Remove the caging bolt from the rear housing. Apply anti-seize and store it in the side pocket. Perform a leak-down test with soapy water and verify proper stroke length."
          }
        ]
      },
      {
        title: "Brake Chamber Installation FAQs",
        content: "Common questions from technicians installing BRC brake chambers.",
        faqs: [
          { question: "What happens if I cut the push-rod too short?", answer: "A push-rod that is too short cannot achieve the 90-degree angle at half stroke, which means the slack adjuster cannot properly actuate the brake. The brake will either not apply fully or will over-stroke, causing poor braking performance and premature chamber wear. The push-rod must be replaced if cut too short." },
          { question: "Why shouldn't I use a torch to cut the push-rod?", answer: "A torch introduces heat into the metal, which can alter the steel's hardness and create a weak point. Under braking loads, this weakened section can bend or fail. Always use a hacksaw, cutoff wheel, or band saw for a square, cool cut." },
          { question: "What torque should I use on the mounting nuts?", answer: "For standard 5/8-11 mounting studs, torque to 100-115 ft-lbs (135-155 Nm). Do not over-torque - excessive torque can pull the studs out of the non-pressure housing. Use a calibrated torque wrench." },
          { question: "How much push-rod should be inside the clevis?", answer: "At least 1/2 inch of thread engagement inside the clevis body. Less than this risks thread pull-out under braking load. If the push-rod cannot reach 1/2 inch engagement, the rod is too short." },
          { question: "Do I need to install a new clevis pin?", answer: "Always install a new clevis pin and cotter pin. Reusing old pins can cause fitment issues from wallowed-out holes or fatigue cracks. New pins are inexpensive - always replace them." },
          { question: "What pressure should I use to uncage the spring?", answer: "Apply 100+ psi to the parking brake port to fully compress the power spring pneumatically before removing the caging bolt. Never attempt to remove the caging bolt without air pressure applied." }
        ]
      }
    ],
    download: { name: "Complete Installation Manual PDF", size: "~2.4 MB" }
  },

  'identification': {
    imageSrc: '/images/brc_brakechamber_aftermarket.jpg',
    title: "Brake Chamber Visual Identification Guide - Size, Stroke & Type",
    category: 'Specifications & Sizing',
    description: "Identify brake chamber size, stroke type, and manufacturer without a part number. Field-tested methods for technicians working on rusted, corroded, or unmarked chambers in severe-duty environments.",
    icon: <FileText className="w-6 h-6 text-emerald-500" aria-hidden="true" />,
    sections: [
      {
        title: "Why Brake Chamber Visual Identification Matters",
        content: "In severe-duty environments - winter road salts, high moisture, and constant debris exposure - part number tags and embossed markings can rust away or become illegible within months. Technicians must rely on visual and dimensional characteristics to identify the size and stroke type of a chamber for a safe, identical replacement. Guessing the size is a serious liability and a DOT, CVSA, or equivalent regional violation.",
      },
      {
        title: "Identifying Brake Chamber Size by Clamp Band Diameter",
        content: "The most reliable way to identify a service brake chamber size without a tag is to measure the outside diameter (OD) directly across the center of the clamp band. All BRC chambers conform to these standard dimensions.",
        bullets: [
          "Type 20 - OD: 6.8 in (173 mm)",
          "Type 24 - OD: 7.1 in (180 mm)",
          "Type 30 - OD: 8.2 in (208 mm)",
          "Type 36 - OD: 9.0 in (229 mm)"
        ]
      },
      {
        title: "Identifying Long-Stroke (LS) Brake Chambers",
        content: "Long-stroke chambers provide critical extra braking margin. Mixing standard-stroke and long-stroke chambers on the same axle is a serious safety violation and illegal in most commercial vehicle jurisdictions. Because of this, manufacturers include specific visual indicators so inspectors and technicians can identify chamber type from underneath the vehicle in poor lighting.",
        bullets: [
          "Square Ports: The pneumatic air ports on the center section are cast into a raised, square or rectangular boss. Standard-stroke ports are flush or round.",
          "Trapezoidal ID Tag: The metal identification tag secured under the clamp band bolt is trapezoidal. Standard-stroke tags are round or rectangular.",
          "Deep Stamping on Rear Housing: The rear housing typically features a deep, permanent stamped marking stating \"LONG STROKE\" or \"LS\"."
        ]
      },
      {
        title: "Measure the Pushrod Length",
        content: "The pushrod length is measured from the base of the chamber body (where it mounts to the bracket) to the very center of the clevis pin hole.",
        bullets: [
          "Ensure the chamber is fully released (caged or no air pressure).",
          "Do not measure just the exposed rod; measure from the mounting face."
        ]
      },
      {
        title: "Determine Port Angles",
        content: "Air ports are clocked relative to the mounting studs. Looking directly at the rear of the chamber with the mounting studs at 3 o'clock and 9 o'clock, determine the degree angle of the ports.",
        bullets: [
          "Standard port configurations are typically 0°, 45°, 90°, or 180°.",
          "Match this angle to ensure your air hoses can reach without kinking."
        ]
      },
      {
        title: "Brake Chamber Identification FAQs",
        content: "Common questions from technicians identifying unmarked brake chambers in the field.",
        faqs: [
          { question: "Does a yellow dust plug indicate a specific type?", answer: "No. The color of the dust plug is not a reliable indicator of chamber type. Some manufacturers use yellow plugs, others use black or red - and the color has no standardized meaning. Always verify by measuring the clamp band OD and checking for stroke indicators." },
          { question: "Can I identify a piggyback without the clamp band?", answer: "Yes, but with less accuracy. If the clamp band is missing, you can measure the OD of the rear housing (the piggyback section) and compare it to the type chart. You can also check the caging bolt style - Type 30 piggybacks typically use a T-bar caging bolt that locks into a slotted pressure plate." },
          { question: "What if the part number tag is completely missing?", answer: "Measure the OD of the clamp band, check for a long-stroke ID tag (trapezoidal vs. round), and inspect the air port casting (square vs. round). These three indicators will identify 95% of unmarked service and spring brake chambers in the field." },
          { question: "How accurate is measuring OD with calipers?", answer: "Very accurate. Using a caliper or a large-diameter measurement tool, you can identify chamber type within ±1/8 inch. This is precise enough to distinguish between Type 20, 24, 30, and 36 chambers." },
          { question: "Can I use the push-rod thread to identify a chamber type?", answer: "No. Push-rod thread (typically 5/8-11 UNC) is the same across most chamber types. It cannot be used to identify size." },
          { question: "How do I identify a brake chamber on a Japanese or European truck?", answer: "Japanese and European chambers follow different dimension standards. Match by OD and stroke type, then confirm fitment using our OEM cross-reference tool for the specific vehicle make and model." }
        ]
      }
    ]
  },

  'selection-guides': {
    imageSrc: '/images/brc_brakechamber_aftermarket.jpg',
    title: "Brake Chamber Selection Guide - Choose by Vocation",
    category: 'Specifications & Sizing',
    description: "A step-by-step guide to choosing the correct brake chamber series for your specific vocation - linehaul, severe-duty, transit, or heavy haul. Match the chamber to the operating environment to extend service life and reduce maintenance cost.",
    icon: <ShieldCheck className="w-6 h-6 text-emerald-500" aria-hidden="true" />,
    sections: [
      {
        title: "Brake Chamber Selection by Vocation",
        content: "Different operating environments require different brake chamber specifications. This table helps you match the chamber to your fleet's vocation.",
        table: {
          headers: ["Application / Vocation", "Recommended Chamber Type", "Key Features"],
          rows: [
            ["Standard Linehaul (Dry Van, Reefer)", "Spring Brake, Standard Stroke", "Cost-effective, reliable, standard 3-year service life, lightweight design."],
            ["Severe Duty (Dump, Logging, Refuse)", "Spring Brake, Sealed Housing", "Prevents internal contamination, heavy-duty housing, epoxy-coated springs for corrosion resistance."],
            ["Transit & Coach", "Service Chamber or ADB Actuator, Long Stroke", "Increased reserve stroke for frequent stop-and-go, heavy load capacity, quiet operation."],
            ["Heavy Haul (Lowboy, Multi-Axle)", "Type 30/30 HD or Type 36 Spring Brake", "Maximum braking force, reinforced mounting studs, thick-gauge steel housing."]
          ]
        }
      },
      {
        title: "Piggyback vs. Complete Spring Brake Assembly",
        content: "When a spring brake chamber fails, you have two replacement options: replace the entire assembly (service housing + piggyback) or replace only the piggyback (the rear spring section). Choosing correctly saves labor hours and prevents return visits to the shop.",
        bullets: [
          "Use a Piggyback When: The mounting bracket, push-rod, clevis, and center section (service housing) are all in good, rust-free condition. Piggyback replacement saves installation time because you don't have to re-cut a push-rod or remove the clevis pin.",
          "Use a Complete Assembly When: The chamber has been in service for several years, the push-rod is heavily corroded, the service diaphragm has ruptured, or the mounting studs show signs of fatigue. Replacing the entire assembly is safer and more reliable in these conditions."
        ]
      },
      {
        title: "Brake Chamber Selection FAQs",
        content: "Common questions from fleet managers and technicians choosing the right brake chamber.",
        faqs: [
          { question: "Is a sealed chamber worth the extra cost?", answer: "Yes, for severe-duty applications. Sealed chambers use a sealed housing that prevents dust, mud, and moisture from entering the internal chamber. In dump, logging, refuse, and construction environments, this can double or triple service life compared to standard chambers. For linehaul duty, standard chambers are typically sufficient." },
          { question: "What is a welded clevis assembly?", answer: "A welded clevis assembly is a spring brake chamber where the clevis is factory-welded to the push-rod rather than threaded and jam-nutted. Welded clevis chambers are common on original equipment and eliminate the risk of clevis thread pull-out. They are not field-adjustable - the push-rod length is fixed." },
          { question: "Should I use standard or long-stroke chambers?", answer: "Use long-stroke chambers for transit, coach, and severe stop-and-go applications where brake shoe wear is rapid. Long-stroke chambers provide additional reserve push-rod travel, which keeps the slack adjuster in the proper operating range as shoes wear. Standard-stroke is sufficient for linehaul duty." },
          { question: "When should I upgrade from Type 30/30 to Type 36?", answer: "Upgrade to Type 36 for lowboy, multi-axle, and heavy haul applications where the loaded weight exceeds typical linehaul duty. Type 36 chambers deliver higher clamping force, but also require higher air pressure and larger slack adjusters." },
          { question: "Can I mix different chamber types on the same axle?", answer: "No. Both sides of an axle should have the same chamber type, stroke, and manufacturer. Mixing chamber types on the same axle causes imbalanced braking, uneven shoe wear, and potential brake pull." },
          { question: "How do I choose a chamber for a mixed-fleet operation?", answer: "For mixed fleets, standardize on one or two chamber types used across most vehicles in the fleet. This reduces parts inventory, simplifies training, and allows mechanics to work faster. If your fleet spans both linehaul and severe-duty vocations, use sealed chambers as your universal choice." }
        ]
      }
    ]
  },

  'caging': {
    imageSrc: '/images/brc_brakechamber_aftermarket.jpg',
    title: "Brake Chamber Caging Procedure - Safe Manual Caging for Spring Brakes",
    category: 'Installation & Maint.',
    description: "Step-by-step safety procedures for manually caging spring brake chambers during roadside maintenance and shop repairs. Covers when to cage, how to cage, and how to avoid the most common caging injuries.",
    icon: <ShieldAlert className="w-6 h-6 text-red-500" aria-hidden="true" />,
    alert: {
      type: 'danger',
      title: "DANGER: EXTREME SPRING TENSION",
      message: "A Type 30 spring brake chamber contains a power spring compressed with over 2,000 lbs of force. If the housing is compromised, heavily rusted, or improperly opened, the spring can release violently, causing severe injury or death. Never attempt to pry open the tamper-resistant rear housing."
    },
    sections: [
      {
        title: "When to Cage a Spring Brake Chamber",
        content: "Caging refers to manually compressing the heavy parking spring inside the chamber using a mechanical bolt, rather than air pressure. Caging is a mandatory safety step in three scenarios:",
        bullets: [
          "Before attempting to remove a spring brake chamber from the axle.",
          "When towing a vehicle that has lost system air pressure (to release the parking brakes).",
          "When performing maintenance on the slack adjuster, S-cam, or brake shoes where the push-rod must be retracted without air pressure."
        ]
      },
      {
        title: "Step-by-Step Brake Chamber Caging Procedure",
        steps: [
          {
            title: "Secure the Vehicle (Critical)",
            desc: "Chock the wheels securely. The vehicle will roll once the spring brakes are caged if it is not on perfectly level ground. Lives are lost every year because this step is skipped."
          },
          {
            title: "Retrieve the Caging Tool",
            desc: "Remove the caging bolt, nut, and washer from the carrying pocket on the side of the chamber housing. If the bolt is missing, use an OEM-grade replacement - never use a standard hardware store bolt."
          },
          {
            title: "Remove the Dust Plug",
            desc: "Pry off the rubber dust plug from the center hole of the rear spring housing."
          },
          {
            title: "Insert and Engage the T-Bar",
            desc: "Insert the caging bolt through the hole. Push it in fully, then turn it 1/4 turn clockwise. Pull back on the bolt - you should feel the T-bar securely lock into the slotted pressure plate inside the housing."
          },
          {
            title: "Compress the Spring",
            desc: "Install the washer and nut onto the threaded bolt. Using a hand wrench (do not use an impact wrench), tighten the nut. Continue tightening until the spring is fully compressed and the push-rod retracts fully. Do not over-torque (maximum 35 ft-lbs), or you will strip the pressure plate."
          }
        ]
      },
      {
        title: "Troubleshooting Brake Chamber Caging Issues",
        content: "Sometimes caging does not go smoothly. These are the most common issues and their solutions.",
        bullets: [
          "Bolt Will Not Turn: If the bolt binds while tightening, the internal spring may be broken and wedged. Stop immediately. Do not force it.",
          "Impact Wrench Damage: Using an impact gun to tighten the caging nut frequently strips the internal aluminum pressure plate, rendering the chamber dangerous and useless. Always use hand tools.",
          "Missing Caging Bolt: If the side-pocket bolt is missing, do not improvise with hardware store substitutes. Borrow an OEM-spec caging bolt from an adjacent chamber."
        ]
      },
      {
        title: "Brake Chamber Caging FAQs",
        content: "Common questions from technicians and fleet managers about safe caging procedures.",
        faqs: [
          { question: "Why is there a tamper-proof band on the rear housing?", answer: "The tamper-resistant band prevents the rear housing from being opened in the field. Under the rear housing, the power spring is compressed with over 2,000 lbs of force. Opening the housing without proper tooling and training can cause the spring to release violently, resulting in serious injury or death. The band is not a suggestion - it is a safety device." },
          { question: "Can I leave a chamber caged permanently?", answer: "No. Caging is a temporary safety procedure for maintenance or towing. Caging permanently disables the emergency/parking brake function of that chamber. Driving a commercial vehicle with a caged spring brake is a serious safety violation and can trigger DOT out-of-service citations." },
          { question: "Can I cage a spring brake without air pressure?", answer: "Yes. That's exactly what mechanical caging is for. Caging works without any air pressure applied. This is why it's used when towing a vehicle that has lost system air - you cage the spring brake to release the parking brakes without needing the air system operational." },
          { question: "How much torque should I apply to the caging nut?", answer: "Do not exceed 35 ft-lbs on the caging nut. Over-tightening can strip the internal aluminum pressure plate, which renders the chamber dangerous and requires full replacement. Use a hand wrench, not an impact wrench." },
          { question: "What should I do if the caging bolt binds?", answer: "Stop immediately. If the caging bolt binds while tightening, the internal spring may be broken, wedged, or misaligned. Forcing the bolt can cause the spring to release violently. Do not attempt to fix this in the field - replace the chamber." },
          { question: "Do I need to cage a spring brake for routine brake shoe inspection?", answer: "Yes, if the vehicle is not connected to an air supply. Caging retracts the push-rod so you can inspect the slack adjuster, S-cam, and shoes without air pressure. Never manually adjust the slack adjuster with the spring brake fully applied." }
        ]
      }
    ],
    download: { name: "Safety Caging Poster PDF", size: "~1.1 MB" }
  }
};
