import { createAdminClient } from '@/lib/supabase/admin'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { BlogPost } from '@/types'

export const metadata: Metadata = {
  title: 'Blog | Naz Optical',
  description: 'Eye care tips, frame guides, and optical news from Naz Optical Rawalpindi.',
}

export const dynamic = 'force-dynamic'

async function getPosts(): Promise<BlogPost[]> {
  const admin = createAdminClient()
  const { data } = await admin
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
  return (data ?? []) as BlogPost[]
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold text-[#0a1931]">Naz Optical Blog</h1>
          <p className="text-gray-500 mt-2">Eye care tips, frame guides &amp; optical news.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {posts.length === 0 ? (
          <p className="text-center text-gray-400 py-20">No posts published yet. Check back soon!</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
              >
                {post.cover_image_url ? (
                  <div className="relative aspect-[16/9] bg-gray-100 overflow-hidden">
                    <Image
                      src={post.cover_image_url}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="aspect-[16/9] bg-gradient-to-br from-[#0a1931] to-[#1e3a5f] flex items-center justify-center">
                    <span className="text-white/30 text-4xl">📝</span>
                  </div>
                )}
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-xs text-gray-400 mb-2">{formatDate(post.created_at)}</p>
                  <h2 className="font-bold text-gray-900 text-base leading-snug group-hover:text-red-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-sm text-gray-500 mt-2 line-clamp-3 flex-1">{post.excerpt}</p>
                  )}
                  <span className="mt-4 text-xs font-semibold text-red-600 group-hover:underline">
                    Read more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
