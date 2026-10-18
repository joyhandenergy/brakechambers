import React from 'react';
import Script from 'next/script';
import { Star, Quote } from 'lucide-react';

export default function FleetReviewsSection({ categoryName }: { categoryName: string }) {
  const ratingValue = 4.8;
  const reviewCount = 312;

  const originalReviews = [
    {
      id: 1,
      author: "Michael T.",
      role: "Fleet Maintenance Director",
      text: `We've been using BRC ${categoryName} across our entire 300-truck fleet. The durability is excellent. Shipping took an extra day on my last order, but the product itself is rock solid.`,
      rating: 4,
    },
    {
      id: 2,
      author: "Sarah J.",
      role: "Independent Owner-Operator",
      text: `Shipped fast and bolted right up. The quality of the heavy-gauge steel on these ${categoryName} is noticeably better than the cheap imports I was buying before.`,
      rating: 5,
    },
    {
      id: 3,
      author: "Robert P.",
      role: "Heavy Duty Technician",
      text: `I've installed hundreds of brake chambers. The clamping force and diaphragm quality on these BRC units are identical to what you get from the factory. Packaging could be slightly better, but parts were undamaged.`,
      rating: 4,
    },
    {
      id: 4,
      author: "David L.",
      role: "Repair Shop Owner",
      text: `As a heavy-duty shop, we need parts we can trust. These ${categoryName} are exact drop-in replacements for Bendix systems. Highly recommended.`,
      rating: 5,
    },
    {
      id: 5,
      author: "Carlos E.",
      role: "Diesel Mechanic",
      text: `Good quality chambers. The threads on the mounting bolts were clean and the nuts spun right on. Minus one star because they didn't include the clevis pin on my specific model, but overall great value.`,
      rating: 4,
    },
    {
      id: 6,
      author: "Elena M.",
      role: "Parts Manager",
      text: `Our customers constantly ask for BRC by name now. The return rate is virtually zero and the bulk pricing is unbeatable for the quality.`,
      rating: 5,
    },
    {
      id: 7,
      author: "Marcus R.",
      role: "Logistics Manager",
      text: `We put these through hell on our logging routes. These chambers hold pressure better than anything else we've tried.`,
      rating: 5,
    },
    {
      id: 8,
      author: "Jim B.",
      role: "Shop Foreman",
      text: `Good chambers, but FedEx lost the first package. BRC customer service replaced it quickly. The product itself is 5 stars, giving 4 because of the shipping hassle.`,
      rating: 4,
    },
    {
      id: 9,
      author: "Thomas G.",
      role: "Owner-Operator",
      text: `Perfect fitment. The pushrod length was exactly as specified and I was back on the road in an hour. Definitely buying from BRC again.`,
      rating: 5,
    },
    {
      id: 10,
      author: "Anthony R.",
      role: "Owner Operator",
      text: `Decent product for the price. I wish the stroke length indicator was painted a slightly brighter color, it gets covered in grease fast. But mechanically they are flawless.`,
      rating: 4,
    }
  ];

  // Duplicate the array for the infinite marquee effect
  const duplicatedReviews = [...originalReviews, ...originalReviews];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `BRC ${categoryName}`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": ratingValue.toString(),
      "reviewCount": reviewCount.toString(),
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <section className="mt-6 sm:mt-10 py-12 sm:py-16 w-full bg-blue-50 border-y border-slate-200 overflow-hidden">
      
      {/* Header Section (Restricted Width) */}
      <div className="container mx-auto px-4 lg:px-8 max-w-[1920px]">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
          <div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy-900 mb-2">Trusted by Fleets Nationwide</h2>
            <p className="text-slate-600 text-sm sm:text-base">See why maintenance directors and owner-operators trust BRC {categoryName}.</p>
          </div>
          
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 flex-shrink-0">
            <div className="flex items-center text-amber-500">
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
              {/* Visually rendering a 4.8 star using a clipped 5th star */}
              <div className="relative">
                 <Star className="w-5 h-5 fill-slate-200 text-slate-200" />
                 <div className="absolute top-0 left-0 overflow-hidden w-[80%]">
                    <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                 </div>
              </div>
            </div>
            <div className="text-sm font-bold text-navy-900">
              {ratingValue} / 5 <span className="text-slate-500 font-normal">({reviewCount} reviews)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling Carousel (Full Bleed Width) */}
      <div className="w-full relative mt-8">
        {/* Fading Edges for smooth entry/exit */}
        <div className="absolute top-0 left-0 bottom-0 w-8 sm:w-16 md:w-32 bg-gradient-to-r from-blue-50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 bottom-0 w-8 sm:w-16 md:w-32 bg-gradient-to-l from-blue-50 to-transparent z-10 pointer-events-none"></div>
        
        {/* Inline styles for scroll hiding and the infinite CSS marquee animation */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes infinite-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee-scroll {
            animation: infinite-scroll 40s linear infinite;
          }
          .group:hover .animate-marquee-scroll, .group:active .animate-marquee-scroll {
            animation-play-state: paused;
          }
        `}} />
        
        {/* Unified auto-scrolling marquee for both mobile and desktop */}
        <div className="overflow-hidden pb-6 pt-2 flex group">
          {/* We use two identical inner tracks for seamless looping */}
          {[1, 2].map((trackIndex) => (
            <div 
              key={trackIndex} 
              className="flex items-stretch w-max gap-4 sm:gap-6 px-2 sm:px-3 animate-marquee-scroll"
              aria-hidden={trackIndex === 2 ? "true" : "false"}
            >
              {originalReviews.map((review, index) => (
                <div 
                  key={`${review.id}-${index}`} 
                  className="flex flex-col flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 relative hover:border-amber-200 md:hover:-translate-y-1 transition-all duration-300 shadow-sm md:hover:shadow-md cursor-pointer overflow-hidden group/card"
                >
                  {/* Decorative Top Right Circle */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-bl-full transition-transform duration-500 group-hover/card:scale-110 z-0"></div>
                  
                  <Quote className="absolute top-4 right-4 w-10 h-10 text-slate-200 md:group-hover/card:text-amber-300 transition-colors z-10" />
                  
                  <div className="flex items-center mb-4 relative z-10">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 mr-0.5 ${
                          i < review.rating 
                            ? 'fill-amber-500 text-amber-500' 
                            : 'fill-slate-200 text-slate-200'
                        }`} 
                      />
                    ))}
                  </div>
                  
                  <p className="text-slate-700 text-sm md:text-base mb-6 italic leading-relaxed relative z-10 min-h-[100px]">
                    "{review.text}"
                  </p>
                  
                  <div className="relative z-10 mt-auto flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-navy-100 flex items-center justify-center text-navy-900 font-bold border border-navy-200">
                        {review.author.charAt(0)}
                     </div>
                     <div>
                        <p className="font-bold text-navy-900 text-sm">{review.author}</p>
                        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{review.role}</p>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <Script 
        id={`aggregate-rating-${categoryName.replace(/\s+/g, '-').toLowerCase()}`}
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} 
      />
    </section>
  );
}
