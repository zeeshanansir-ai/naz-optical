import { createAdminClient } from '@/lib/supabase/admin'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { BlogPost } from '@/types'

export const dynamic = 'force-dynamic'

async function getPost(slug: string): Promise<BlogPost | null> {
  const admin = createAdminClient()
  const { data } = await admin
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()
  return data as BlogPost | null
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return { title: 'Post Not Found' }
  return {
    title:       `${post.title} | Naz Optical Blog`,
    description: post.excerpt ?? `${post.title} — read on the Naz Optical blog.`,
    openGraph: {
      title:    post.title,
      description: post.excerpt ?? undefined,
      images:   post.cover_image_url ? [{ url: post.cover_image_url }] : [],
      siteName: 'Naz Optical',
    },
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-2">
        <nav className="text-xs text-gray-400 flex items-center gap-1.5">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-gray-600">Blog</Link>
          <span>/</span>
          <span className="text-gray-600 truncate max-w-[200px]">{post.title}</span>
        </nav>
      </div>

      <article className="max-w-3xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          {/* Cover image */}
          {post.cover_image_url && (
            <div className="relative aspect-[16/9] bg-gray-100">
              <Image
                src={post.cover_image_url}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="px-8 py-8">
            <p className="text-xs text-gray-400 mb-3">{formatDate(post.created_at)}</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0a1931] leading-snug mb-4">{post.title}</h1>
            {post.excerpt && (
              <p className="text-gray-500 text-base border-l-4 border-red-500 pl-4 mb-6 italic">{post.excerpt}</p>
            )}
            <div className="prose prose-sm sm:prose max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
              {post.content}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 px-8 py-5">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#0a1931] font-medium transition-colors"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}
