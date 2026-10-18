import React from 'react';
import { BrakeChamber, BrakeAccessory } from '@/types';

interface ProductSeoBlockProps {
  product: BrakeChamber | BrakeAccessory;
}

export default function ProductSeoBlock({ product }: ProductSeoBlockProps) {
  const isChamber = 'type' in product;
  const isSpringBrake = product.category === 'Spring Brake';
  const isServiceChamber = product.category === 'Service Brake';
  const isADB = product.category === 'Air Disc Actuator';
  
  const functionText = isSpringBrake 
    ? 'parking and emergency braking' 
    : isServiceChamber 
      ? 'primary braking systems' 
      : isADB 
        ? 'high-performance disc braking' 
        : 'maintaining optimal brake performance';

  const componentText = isChamber ? product.type : 'component';
  
  // Extract specific details to make text 100% unique per product
  const material = isChamber ? product.material : 'heavy-duty materials';
  const strokeDesc = isChamber && product.strokeInch ? `with a precise ${product.strokeInch} stroke` : '';
  const pushRodDesc = isChamber && product.pushRodLengthInch ? ` and an easily configurable ${product.pushRodLengthInch} pushrod` : '';
  const weight = isChamber && product.specifications?.weight ? `Weighing strictly ${product.specifications.weight}, ` : '';
  const maxTemp = isChamber && product.specifications?.operatingTemperature ? product.specifications.operatingTemperature : 'up to 80°C';

  // Dynamic OEM cross-reference text
  const crossRefBrands = isChamber && product.crossReferenceBrands && product.crossReferenceBrands.length > 0
    ? product.crossReferenceBrands.join(', ')
    : 'Bendix, Knorr-Bremse, ZF/WABCO, Meritor, and Haldex';
    
  const oemParts = isChamber && product.oemPartNumbers && product.oemPartNumbers.length > 0
    ? ` Specifically replacing part numbers like ${product.oemPartNumbers.map((p: any) => p.partNumber).slice(0, 3).join(', ')},`
    : '';

  return (
    <section className="mt-12 sm:mt-16 relative -mx-4 sm:mx-0 w-[calc(100%+2rem)] sm:w-auto">
      <div className="bg-[#F0F7FE] border border-[#E0EEFD] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm relative overflow-hidden">
        {/* Heading matching screenshot */}
        <h2 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight leading-tight mb-6 max-w-4xl">
          Why Choose the BRC <span className="text-amber-500">{product.name}</span>?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 text-slate-700 leading-relaxed text-[13.5px] md:text-[14.5px]">
          <div className="space-y-4">
            <p>
              Commercial fleets require absolute reliability when it comes to {functionText}. Our highly engineered <strong>{product.name}</strong> is manufactured to exceed OEM standards, providing maximum performance and safety for Class 8 trucks, trailers, and heavy-duty vehicles {strokeDesc}{pushRodDesc}.
            </p>
            <p>
              {weight}this {componentText} utilizes premium {material.toLowerCase()} construction. Manufactured in our facility operating to IATF 16949 standards, the housing and internal mechanisms are designed to prevent premature wear and resist severe corrosion from road salts, magnesium chloride, and extreme temperatures {maxTemp}.
            </p>
          </div>
          <div className="space-y-4">
            <p>
              <strong>Direct Aftermarket Replacement:</strong> The {product.name} is designed as an exact drop-in replacement for major OEM systems including {crossRefBrands}.{oemParts} ensuring seamless installation without modifying your existing brackets or air lines.
            </p>
            
            {/* Consistent Branded Feature Bullets */}
            <ul className="space-y-2 mt-3 text-slate-700">
              {isChamber && product.strokeSize && (
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold text-base leading-none select-none flex-shrink-0 mt-0.5">•</span>
                  <span>
                    Engineered to strict {product.strokeSize} specifications for predictable braking force.
                  </span>
                </li>
              )}
              {isADB && (
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold text-base leading-none select-none flex-shrink-0 mt-0.5">•</span>
                  <span>
                    Fully sealed breather tube design to prevent caliper moisture ingress.
                  </span>
                </li>
              )}
              {isSpringBrake && (
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold text-base leading-none select-none flex-shrink-0 mt-0.5">•</span>
                  <span>
                    High-strength power spring specifically coiled for maximum parking hold on steep grades.
                  </span>
                </li>
              )}
              {isChamber && (
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold text-base leading-none select-none flex-shrink-0 mt-0.5">•</span>
                  <span>
                    Includes all necessary {product.includedItems?.join(', ') || 'mounting hardware'} for rapid mechanic turnarounds.
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
