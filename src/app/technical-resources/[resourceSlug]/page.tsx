import React from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ShieldCheck, Ruler, FileText, Download, AlertTriangle, CheckCircle2, Settings, Wrench, ChevronRight, FileCog, ShieldAlert, AlertOctagon, Info } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import BreadcrumbSchema from '@/components/layout/BreadcrumbSchema';
import GlobalFAQAccordion from '@/components/ui/GlobalFAQAccordion';
import Card from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';

import { client } from '@/sanity/lib/client';

export async function generateMetadata(props: { params: Promise<{ resourceSlug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const { resourceSlug } = params;
  
  const data = await client.fetch(
    `*[_type == "technicalResource" && slug.current == $slug][0]`,
    { slug: resourceSlug }
  );

  if (!data) return { title: 'Resource Not Found' };

  return {
    title: data.seo?.metaTitle || `${data.title} | Technical Resources | BRC`,
    description: data.seo?.metaDescription || data.description,
    keywords: data.seo?.keywords,
    alternates: {
      canonical: `https://www.brakechambers.com/technical-resources/${resourceSlug}`,
    },
    openGraph: {
      title: data.seo?.metaTitle || `${data.title} | BRC Engineering`,
      description: data.seo?.metaDescription || data.description,
      url: `https://www.brakechambers.com/technical-resources/${resourceSlug}`,
      type: 'article',
    },
  };
}

export async function generateStaticParams() {
  const slugs = await client.fetch(`*[_type == "technicalResource"].slug.current`);
  return slugs.map((slug: string) => ({
    resourceSlug: slug,
  }));
}

export default async function TechnicalResourcePage(props: { params: Promise<{ resourceSlug: string }> }) {
  const params = await props.params;
  const { resourceSlug } = params;
  
  const data = await client.fetch(
    `*[_type == "technicalResource" && slug.current == $slug][0]`,
    { slug: resourceSlug },
    { next: { revalidate: 60 } }
  );

  if (!data) {
    notFound();
  }

  // Fetch all for sidebar
  const allResources = await client.fetch(
    `*[_type == "technicalResource"] | order(category asc, title asc) { title, category, "slug": slug.current }`,
    {},
    { next: { revalidate: 60 } }
  );

  // Group all technical resources by category for the sidebar navigation
  const groupedResources = allResources.reduce((acc: any, item: any) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, any[]>);

  const seo = data.seo;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": seo?.metaTitle || data.title,
    "description": seo?.metaDescription || data.description,
    "url": `https://www.brakechambers.com/technical-resources/${resourceSlug}`,
    "author": {
      "@type": "Organization",
      "name": "BRC Brake Chambers",
      "url": "https://www.brakechambers.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "BRC Brake Chambers",
      "url": "https://www.brakechambers.com"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.brakechambers.com/technical-resources/${resourceSlug}`
    },
    "about": {
      "@type": "Thing",
      "name": "Commercial Vehicle Brake Chambers"
    },
    "datePublished": "2024-01-15T08:00:00Z",
    "dateModified": new Date().toISOString()
  };

  return (
    <>
      <Script
        id={`tech-resource-${resourceSlug}-jsonld`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbSchema items={[
        { name: 'Technical Resources', item: '/technical-resources' },
        { name: data.title }
      ]} />
      <div className="bg-slate-50 min-h-screen pb-16">

        <PageHeader
          badge="Engineering Documentation"
          title={data.title}
          description={data.description}
          imageSrc="/images/brc_brakechamber_aftermarket.jpg"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Technical Resources', href: '/technical-resources' },
            { label: data.title }
          ]}
        />

        <div className="container mx-auto px-4 lg:px-8 max-w-[1920px] -mt-6 sm:-mt-12 lg:-mt-20 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12">

            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-10">

              {/* Main Content Card */}
              <div className="bg-white rounded-none sm:rounded-[2rem] shadow-sm sm:shadow-xl border-y sm:border border-slate-100 px-4 py-8 sm:p-8 lg:p-12 -mx-4 sm:mx-0 relative overflow-hidden">

                {/* Optional Alert Box */}
                {data.alert && (
                  <div className={`mb-8 sm:mb-10 p-4 sm:p-6 rounded-xl sm:rounded-2xl border flex flex-col sm:flex-row gap-3 sm:gap-4 
                  ${data.alert.type === 'danger' ? 'bg-red-50 border-red-200' : ''}
                  ${data.alert.type === 'warning' ? 'bg-amber-50 border-amber-200' : ''}
                  ${data.alert.type === 'info' ? 'bg-blue-50 border-blue-200' : ''}
                `}>
                    <div className={`shrink-0 mt-1
                    ${data.alert.type === 'danger' ? 'text-red-600' : ''}
                    ${data.alert.type === 'warning' ? 'text-amber-600' : ''}
                    ${data.alert.type === 'info' ? 'text-blue-600' : ''}
                  `}>
                      {data.alert.type === 'danger' && <AlertOctagon className="w-8 h-8" aria-hidden="true" />}
                      {data.alert.type === 'warning' && <AlertTriangle className="w-8 h-8" aria-hidden="true" />}
                      {data.alert.type === 'info' && <Info className="w-8 h-8" aria-hidden="true" />}
                    </div>
                    <div>
                      <div className={`text-lg md:text-xl font-black tracking-tight mb-2 uppercase
                      ${data.alert.type === 'danger' ? 'text-red-900' : ''}
                      ${data.alert.type === 'warning' ? 'text-amber-900' : ''}
                      ${data.alert.type === 'info' ? 'text-blue-900' : ''}
                    `}>{data.alert.title}</div>
                      <p className={`font-medium leading-relaxed
                      ${data.alert.type === 'danger' ? 'text-red-800' : ''}
                      ${data.alert.type === 'warning' ? 'text-amber-800' : ''}
                      ${data.alert.type === 'info' ? 'text-blue-800' : ''}
                    `}>{data.alert.message}</p>
                    </div>
                  </div>
                )}

                {/* Dynamic Sections */}
                <div className="space-y-12">
                  {data.sections?.map((section: any, sIdx: number) => (
                    <div key={sIdx}>
                      <SectionHeader
                        title={section.title}
                        align="left"
                        theme="light"
                        plainText={true}
                        asH1={false}
                        className="!mb-6"
                      />

                      {section.content && (
                        <p className="text-slate-600 text-lg leading-relaxed mb-6">{section.content}</p>
                      )}

                      {/* Render Bullets */}
                      {section.bullets && (
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          {section.bullets.map((bullet: string, bIdx: number) => (
                            <li key={bIdx} className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" aria-hidden="true" />
                              <span className="text-slate-700 leading-relaxed font-medium">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Render Numbered Steps */}
                      {section.steps && (
                        <div className="space-y-6 mt-8">
                          {section.steps.map((step: any, stepIdx: number) => (
                            <div key={stepIdx} className="flex gap-4 sm:gap-5 p-5 sm:p-6 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                              <div className="w-8 h-8 shrink-0 bg-amber-500 text-navy-900 rounded-full flex items-center justify-center font-bold shadow-sm mt-0.5">
                                {stepIdx + 1}
                              </div>
                              <div>
                                <h3 className="text-xl md:text-2xl font-bold text-navy-900 mb-1.5">{step.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Render Tables */}
                      {section.table && (
                        <div className="mt-8 overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm">
                          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
                            <table className="w-full min-w-[700px] text-left border-collapse">
                              <thead>
                                <tr className="bg-navy-900 text-white">
                                  {section.table.headers?.map((header: string, hIdx: number) => (
                                    <th key={hIdx} className="p-4 font-bold text-sm tracking-wide">{header}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {section.table.rows?.map((row: any, rIdx: number) => (
                                  <tr key={rIdx} className="hover:bg-slate-50 transition-colors">
                                    {row.cells?.map((cell: string, cIdx: number) => (
                                      <td key={cIdx} className={`p-4 text-sm ${cIdx === 0 ? 'font-bold text-navy-900' : 'text-slate-600'}`}>
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Render FAQs */}
                      {section.faqs && (
                        <div className="mt-8">
                          <GlobalFAQAccordion
                            faqs={section.faqs.map((f: any) => ({ q: f.question, a: f.answer }))}
                            theme="light"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Premium Download CTA */}
              {data.download && (
                <div className="group bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 rounded-none sm:rounded-[2rem] p-8 lg:p-10 shadow-2xl border-y sm:border border-navy-700 hover:border-amber-500/50 text-white flex flex-col sm:flex-row items-center justify-between gap-8 relative overflow-hidden transition-all duration-500 hover:shadow-amber-500/10 -mx-4 sm:mx-0">
                  {/* Background Patterns */}
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent z-0 pointer-events-none"></div>
                  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px] -mr-40 -mt-40 z-0 transition-transform duration-700 group-hover:scale-110"></div>
                  <div className="absolute inset-0 bg-[url('/patterns/grid-pattern.svg')] opacity-[0.03] z-0 pointer-events-none"></div>

                  <div className="relative z-10 text-center sm:text-left flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-amber-500/10 group-hover:border-amber-500/30 transition-all duration-500 shadow-inner">
                      <FileText className="w-8 h-8 text-amber-500" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-black mb-2 tracking-tight text-white group-hover:text-amber-400 transition-colors duration-300">Download Offline Copy</h3>
                      <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-2 text-navy-200">
                        <span className="font-medium text-base">{data.download.name}</span>
                        <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-navy-600"></span>
                        <span className="text-amber-500/90 font-bold">{data.download.size}</span>
                      </div>
                    </div>
                  </div>

                  <a href="#" className="relative z-10 shrink-0 w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-navy-950 font-black px-8 py-4 sm:py-5 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 hover:-translate-y-1 shadow-xl shadow-amber-500/20 uppercase tracking-widest text-sm group/btn overflow-hidden">
                    <span className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out"></span>
                    <Download className="w-5 h-5 relative z-10 group-hover/btn:-mt-1 transition-all duration-300" aria-hidden="true" />
                    <span className="relative z-10">Download PDF</span>
                  </a>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Table of Contents Sidebar */}
              <Card padding="md" className="border-slate-100 lg:sticky lg:top-24">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="p-2 bg-navy-50 text-navy-500 rounded-lg">
                  <FileText className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="text-base font-black text-navy-900 uppercase tracking-widest">
                  Technical Library
                </h3>
              </div>
              
              <div className="space-y-6">
                {Object.entries(groupedResources).map(([category, items]: [string, any]) => {
                  const isActiveCategory = category === data.category;
                  
                  return (
                    <div key={category} className="space-y-3">
                      <h4 className={`text-xs font-black uppercase tracking-widest px-3 ${isActiveCategory ? 'text-amber-600' : 'text-slate-400'}`}>
                        {category}
                      </h4>
                      
                      <div className="space-y-1">
                        {isActiveCategory ? (
                          items.map((item: any) => {
                            const isActive = item.slug === resourceSlug;
                            return (
                              <Link 
                                key={item.slug} 
                                href={`/technical-resources/${item.slug}`}
                                className={`group flex items-center justify-between p-3 rounded-xl border transition-all ${
                                  isActive 
                                    ? 'bg-amber-50 border-amber-200 text-amber-700' 
                                    : 'bg-transparent border-transparent hover:bg-slate-50 hover:border-slate-100 text-slate-600'
                                }`}
                              >
                                <span className={`text-[15px] font-bold ${isActive ? 'text-amber-700' : 'group-hover:text-amber-600'} transition-colors`}>
                                  {item.title}
                                </span>
                                {!isActive && <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" aria-hidden="true" />}
                              </Link>
                            )
                          })
                        ) : (
                          <Link 
                            href={`/technical-resources/${items[0].slug}`}
                            className="group flex items-center justify-between p-3 rounded-xl border border-transparent hover:bg-slate-50 hover:border-slate-100 text-slate-600 transition-all"
                          >
                            <span className="text-[15px] font-bold group-hover:text-amber-600 transition-colors">
                              View Resources
                            </span>
                            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" aria-hidden="true" />
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <Link href="/contact" className="w-full flex items-center justify-center gap-2 bg-navy-900 text-white font-bold px-4 py-3 rounded-xl hover:bg-navy-800 transition-all hover:shadow-md uppercase tracking-wider text-xs">
                  Contact Engineering <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
              </Card>
              
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
