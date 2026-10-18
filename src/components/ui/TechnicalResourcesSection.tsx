import React from 'react';
import Link from 'next/link';
import { BookOpen, Wrench, ShieldCheck, ArrowRight } from 'lucide-react';

export default function TechnicalResourcesSection({ categoryName }: { categoryName: string }) {
  const resources = [
    {
      title: "How to Measure Pushrod Stroke Length",
      description: "A step-by-step guide to accurately measuring stroke length to ensure DOT compliance and safe braking.",
      icon: <Wrench className="w-6 h-6 text-amber-600" />,
      link: "/technical-resources/measure-pushrod-stroke"
    },
    {
      title: "Safety Guidelines for " + categoryName,
      description: "Critical safety procedures for caging, removing, and installing heavy-duty brake chambers safely.",
      icon: <ShieldCheck className="w-6 h-6 text-amber-600" />,
      link: "/technical-resources/safety-guidelines"
    },
    {
      title: "Understanding Automotive Standards Manufacturing",
      description: "Learn how our rigorous quality control processes guarantee a longer lifecycle for your fleet.",
      icon: <BookOpen className="w-6 h-6 text-amber-600" />,
      link: "/technical-resources/iso-9001-quality"
    }
  ];

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-heading text-2xl font-bold text-navy-900">Technical Resources & Guides</h2>
        <Link href="/technical-resources" className="hidden md:flex items-center gap-2 text-amber-600 font-bold hover:text-amber-700 transition-colors">
          View All Resources
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {resources.map((resource, idx) => (
          <Link 
            key={idx} 
            href={resource.link}
            className="group bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-100 hover:border-amber-200 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col h-full"
          >
            <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-100 transition-colors">
              {resource.icon}
            </div>
            <h3 className="font-bold text-navy-900 mb-2 group-hover:text-amber-600 transition-colors">
              {resource.title}
            </h3>
            <p className="text-slate-600 text-sm mb-4 flex-grow">
              {resource.description}
            </p>
            <div className="text-amber-600 font-bold text-sm flex items-center gap-1">
              Read Article
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-6 text-center md:hidden">
        <Link href="/technical-resources" className="inline-flex items-center gap-2 text-amber-600 font-bold hover:text-amber-700 transition-colors">
          View All Resources
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
