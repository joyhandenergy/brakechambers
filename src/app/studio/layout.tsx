import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Sanity Studio | BRC',
  description: 'Content management system for BRC',
  robots: { index: false, follow: false },
}

// The root layout already renders <html> and <body>, so this layout must not.
// The fixed full-screen wrapper sits on top of the site Navbar, Footer and widgets
// so the Studio gets the whole browser window.
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      id="sanity-studio-root"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2147483000,
        background: '#ffffff',
        overflow: 'auto',
      }}
    >
      {children}
    </div>
  )
}
