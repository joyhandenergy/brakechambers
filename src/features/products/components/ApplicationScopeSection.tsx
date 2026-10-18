import React from 'react';
import { Truck, Bus, HardHat, Warehouse } from 'lucide-react';
import Link from 'next/link';

interface ApplicationScopeSectionProps {
  category?: 'all' | 'spring-brake-chambers' | 'service-brake-chambers' | 'air-disc-brake-actuators' | 'parts-and-kits' | string;
}

export default function ApplicationScopeSection({ category = 'all' }: ApplicationScopeSectionProps) {
  const getApplications = () => {
    switch (category) {
      case 'spring-brake-chambers':
        return [
          {
            icon: Truck,
            title: "Heavy-Duty Trucks",
            description: "Class 7–8 trucks using S-cam drum brake systems. Steer, drive, and tag axle configurations."
          },
          {
            icon: Warehouse,
            title: "Commercial Trailers",
            description: "Dry van, flatbed, reefer, and tanker trailer axles. Provides fail-safe parking brakes for unattended trailers."
          },
          {
            icon: Bus,
            title: "Transit Buses",
            description: "City and school bus applications requiring reliable emergency braking on urban routes."
          },
          {
            icon: HardHat,
            title: "Severe-Duty Vehicles",
            description: "Refuse trucks, dump trucks, and off-highway equipment operating in high-cycle environments."
          }
        ];
      case 'service-brake-chambers':
        return [
          {
            icon: Truck,
            title: "Heavy-Duty Trucks",
            description: "Steer axle and lift axle applications. Class 6–8 trucks and vocational vehicles."
          },
          {
            icon: Warehouse,
            title: "Commercial Trailers",
            description: "Multi-axle trailer configurations where a parking spring is not required on every axle."
          },
          {
            icon: Bus,
            title: "Transit & School Buses",
            description: "Steer axle applications on city and school bus chassis. Precision response for frequent stops."
          },
          {
            icon: Truck,
            title: "Medium-Duty Trucks",
            description: "Steer axle applications on box trucks and delivery vehicles. Compact housing for tight clearances."
          }
        ];
      case 'air-disc-brake-actuators':
        return [
          {
            icon: Truck,
            title: "Heavy-Duty Trucks",
            description: "Modern Class 7–8 trucks with factory air disc brake systems. Front and rear axle configurations."
          },
          {
            icon: Warehouse,
            title: "Commercial Trailers",
            description: "Air disc brake trailer axles. Provides consistent braking force even under heavy loads."
          },
          {
            icon: Bus,
            title: "Transit & School Buses",
            description: "City, school, and intercity buses. Low-noise, high-cycle operation for frequent stop-and-go routes."
          },
          {
            icon: HardHat,
            title: "Severe-Duty Vehicles",
            description: "Refuse trucks, mining equipment, and off-highway vehicles where heat and cycle counts demand disc performance."
          }
        ];
      case 'parts-and-kits':
        return [
          {
            icon: Truck,
            title: "Fleet Maintenance Shops",
            description: "Standard replacement inventory for commercial fleets. Diaphragms, caging bolts, and hardware kept in stock for routine maintenance."
          },
          {
            icon: Truck,
            title: "Heavy-Duty Trucks",
            description: "Class 6–8 truck service and repair. Direct OEM replacement parts for Bendix, Haldex, Meritor, and WABCO chambers."
          },
          {
            icon: Warehouse,
            title: "Commercial Trailers",
            description: "Trailer axle brake chamber replacement. Diaphragms, return springs, and caging hardware."
          },
          {
            icon: Bus,
            title: "Transit & School Buses",
            description: "High-cycle bus applications. Pre-caged piggyback kits for rapid replacement during scheduled maintenance."
          }
        ];
      default:
        return [
          {
            icon: Truck,
            title: "Heavy-Duty Trucks",
            description: "Class 8 tractors and vocational trucks."
          },
          {
            icon: Warehouse,
            title: "Commercial Trailers",
            description: "Dry vans, flatbeds, and refrigerated units."
          },
          {
            icon: Bus,
            title: "Transit & School Buses",
            description: "High-frequency stopping applications."
          },
          {
            icon: HardHat,
            title: "Severe Duty",
            description: "Logging, mining, and off-highway."
          }
        ];
    }
  };

  const applications = getApplications();

  const title = category === 'spring-brake-chambers' ? "Where Spring Brake Chambers Are Used" :
                category === 'service-brake-chambers' ? "Where Service Brake Chambers Are Used" : 
                category === 'air-disc-brake-actuators' ? "Where Air Disc Brake Actuators Are Used" : 
                category === 'parts-and-kits' ? "Where Brake Chamber Parts Are Used" : 
                "Global Fleet Applications";

  const isSpecificCategory = category === 'spring-brake-chambers' || category === 'service-brake-chambers' || category === 'air-disc-brake-actuators' || category === 'parts-and-kits';

  return (
    <div className="mt-12 sm:mt-16 mb-8 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6 sm:p-8 md:p-10 lg:p-12">
      {isSpecificCategory && (
         <div className="flex justify-center mb-4">
           <span className="bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
             Applications
           </span>
         </div>
      )}
      <h2 className="text-2xl font-extrabold text-navy-900 mb-2 text-center">{title}</h2>
      {category === 'spring-brake-chambers' && (
        <p className="text-slate-600 text-center mb-8 max-w-2xl mx-auto">
          Spring brake chambers are used on heavy commercial vehicles wherever both service braking and emergency/parking braking are required.
        </p>
      )}
      {category === 'service-brake-chambers' && (
        <p className="text-slate-600 text-center mb-8 max-w-2xl mx-auto">
          Service brake chambers are used wherever primary braking is required without a parking function. Common applications include steer axles, lift axles, and tag axles.
        </p>
      )}
      {category === 'air-disc-brake-actuators' && (
        <p className="text-slate-600 text-center mb-8 max-w-2xl mx-auto">
          Air disc brake actuators are used on commercial vehicles with factory-installed air disc brake systems, most commonly on newer trucks, transit buses, and high-duty vocational vehicles.
        </p>
      )}
      {category === 'parts-and-kits' && (
        <p className="text-slate-600 text-center mb-8 max-w-2xl mx-auto">
          BRC brake chamber parts and kits are used in fleet maintenance shops, dealerships, and roadside service across all commercial vehicle types.
        </p>
      )}
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center ${!isSpecificCategory ? 'mt-8' : ''}`}>
        {applications.map((app, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mb-4 hover:scale-105 transition-transform duration-300 border border-amber-100">
              <app.icon className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <h3 className="font-bold text-navy-900 mb-1 sm:mb-2 text-sm sm:text-base">{app.title}</h3>
            <p className="text-xs sm:text-sm text-slate-600">{app.description}</p>
          </div>
        ))}
      </div>
      {isSpecificCategory && (
        <div className="mt-8 text-center">
          <Link href="/applications" className="text-amber-600 font-bold hover:underline inline-flex items-center">
            View applications by vehicle type <span className="ml-1">→</span>
          </Link>
        </div>
      )}
    </div>
  );
}
