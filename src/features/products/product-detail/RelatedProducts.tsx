import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/sanity/queries';
import { BrakeChamber, BrakeAccessory } from '@/types';
import { TrendingUp, ArrowUpRight } from 'lucide-react';

interface RelatedProductsProps {
  currentSlug: string;
  category: string;
  isAccessory?: boolean;
}

export default async function RelatedProducts({ currentSlug, category, isAccessory = false }: RelatedProductsProps) {
  const BRAKE_CHAMBERS = await getProducts();
  // Find related products
  let related: (BrakeChamber | BrakeAccessory)[] = [];
  
  if (isAccessory) {
    related = BRAKE_CHAMBERS.filter(a => a.category === category && a.slug !== currentSlug);
  } else {
    related = BRAKE_CHAMBERS.filter(c => c.category === category && c.slug !== currentSlug);
  }
  
  // Take up to 8 unique items to scroll
  const uniqueProducts = related.slice(0, 8);

  if (uniqueProducts.length === 0) return null;

  return (
    <section className="py-16 mt-8 border-t border-slate-200 overflow-hidden relative">
      <div className="container mx-auto px-4 max-w-[1920px] mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-amber-600" />
          </div>
          <h3 className="text-2xl font-black font-heading text-navy-900 tracking-tight">
            Related {category}s
          </h3>
        </div>
        <div className="hidden md:block">
          <span className="text-sm font-semibold text-slate-400 uppercase tracking-widest">
            More Options
          </span>
        </div>
      </div>
      
      {/* Marquee Container */}
      <div className="relative w-full flex overflow-x-hidden group">
        {/* We duplicate the content to create a seamless infinite scroll effect */}
        <div className="flex animate-[marquee_30s_linear_infinite] group-hover:[animation-play-state:paused] whitespace-nowrap min-w-max pb-8 pt-2">
          {/* Render 2 sets to guarantee loop */}
          {[1, 2].map((setNum) => (
            <div key={setNum} className="flex gap-6 px-3">
              {uniqueProducts.map((product, i) => {
                const categoryPath = product.category === 'Spring Brake' ? 'spring-brake-chambers' :
                                     product.category === 'Service Brake' ? 'service-brake-chambers' :
                                     product.category === 'Air Disc Actuator' ? 'air-disc-brake-actuators' : 'parts-and-kits';
                return (
                  <Link 
                    key={`${setNum}-${product.slug}-${i}`} 
                    href={`/${categoryPath}/${product.slug}`}
                    className="w-72 bg-white rounded-2xl border border-slate-200 flex flex-col p-6 hover:border-amber-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group/card relative h-full"
                  >
                    <div className="w-full h-40 bg-slate-50 rounded-xl relative mb-5 overflow-hidden flex items-center justify-center border border-slate-100">
                      {product.galleryUrls?.[0] ? (
                        <Image 
                          src={product.galleryUrls[0]} 
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-contain p-3 transition-transform duration-700 group-hover/card:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300 text-sm font-medium">
                          No Image Available
                        </div>
                      )}
                      {/* Subtle inner shadow overlay */}
                      <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.02)] pointer-events-none rounded-xl"></div>
                    </div>
                    
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-extrabold text-navy-900 text-lg truncate">{product.name}</h4>
                      <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover/card:text-amber-500 transition-colors flex-shrink-0" />
                    </div>
                    
                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-100">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
                        {'type' in product ? product.type : 'Accessory'}
                      </span>
                      <span className="text-amber-600 font-bold text-sm flex items-center gap-1 group-hover/card:text-amber-500 transition-colors">
                        View Specs
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
        
        {/* Gradient overlays for smooth fade on edges */}
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/80 to-transparent pointer-events-none z-10"></div>
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#F8FAFC] via-[#F8FAFC]/80 to-transparent pointer-events-none z-10"></div>
      </div>
    </section>
  );
}
