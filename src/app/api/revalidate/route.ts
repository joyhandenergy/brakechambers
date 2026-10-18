import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;
    const authHeader = req.headers.get('authorization');
    const urlSecret = req.nextUrl.searchParams.get('secret');

    if (secret && authHeader !== `Bearer ${secret}` && urlSecret !== secret) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    let body: any = {};
    try {
      body = await req.json();
    } catch {
      // Body may be empty on simple pings
    }

    const { _type, slug, path } = body || {};

    // Revalidate based on updated document type
    if (_type === 'product') {
      revalidatePath('/', 'layout');
      revalidatePath('/products');
      revalidatePath('/spring-brake-chambers');
      revalidatePath('/service-brake-chambers');
      revalidatePath('/air-disc-brake-actuators');
      revalidatePath('/parts-and-kits');
      if (slug) {
        revalidatePath(`/${slug}`);
        revalidatePath(`/spring-brake-chambers/${slug}`);
        revalidatePath(`/service-brake-chambers/${slug}`);
        revalidatePath(`/air-disc-brake-actuators/${slug}`);
        revalidatePath(`/parts-and-kits/${slug}`);
      }
    } else if (_type === 'post') {
      revalidatePath('/blog');
      revalidatePath('/technical-resources');
      if (slug) {
        revalidatePath(`/blog/${slug}`);
        revalidatePath(`/technical-resources/${slug}`);
      }
    } else if (_type === 'page') {
      revalidatePath('/', 'layout');
      if (path) {
        revalidatePath(path);
      }
    } else {
      // Default / full refresh
      revalidatePath('/', 'layout');
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      target: _type ? `${_type}:${slug || path || 'all'}` : 'all',
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Error revalidating' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;
    const urlSecret = req.nextUrl.searchParams.get('secret');

    if (secret && urlSecret !== secret) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    const path = req.nextUrl.searchParams.get('path');

    if (path) {
      revalidatePath(path);
      return NextResponse.json({ revalidated: true, path, now: Date.now() });
    }

    // Revalidate everything across the site
    revalidatePath('/', 'layout');
    return NextResponse.json({ revalidated: true, scope: 'entire-site', now: Date.now() });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Error revalidating' }, { status: 500 });
  }
}
