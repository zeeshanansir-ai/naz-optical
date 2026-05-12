'use client'

import { useState, useEffect } from 'react'
import { Pencil, Trash2, Eye, EyeOff, CheckCircle, X, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { BlogPost } from '@/types'

interface FormState {
  title:           string
  slug:            string
  excerpt:         string
  content:         string
  cover_image_url: string
  is_published:    boolean
}

const INIT: FormState = {
  title: '', slug: '', excerpt: '', content: '', cover_image_url: '', is_published: false,
}

function toSlug(title: string) {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export function BlogManager() {
  const [posts, setPosts]     = useState<BlogPost[]>([])
  const [form, setForm]       = useState<FormState>(INIT)
  const [editPost, setEdit]   = useState<BlogPost | null>(null)
  const [saving, setSaving]   = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError]     = useState<string | null>(null)
  const [showForm, setShow]   = useState(false)

  async function loadPosts() {
    const res = await fetch('/api/blog/all')
    if (res.ok) setPosts(await res.json())
  }

  useEffect(() => { loadPosts() }, [])

  function startEdit(post: BlogPost) {
    setEdit(post)
    setForm({
      title:           post.title,
      slug:            post.slug,
      excerpt:         post.excerpt ?? '',
      content:         post.content,
      cover_image_url: post.cover_image_url ?? '',
      is_published:    post.is_published,
    })
    setShow(true)
    setError(null)
    setSuccess(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function cancelEdit() {
    setEdit(null)
    setForm(INIT)
    setShow(false)
    setError(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true); setError(null)

    const url    = editPost ? `/api/blog/${editPost.id}` : '/api/blog'
    const method = editPost ? 'PATCH' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(form),
    })

    if (!res.ok) {
      const { error: msg } = await res.json()
      setError(msg ?? 'Failed to save post')
    } else {
      setSuccess(true)
      setForm(INIT)
      setEdit(null)
      setShow(false)
      setTimeout(() => setSuccess(false), 3000)
      loadPosts()
    }
    setSaving(false)
  }

  async function deletePost(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    await fetch(`/api/blog/${id}`, { method: 'DELETE' })
    loadPosts()
  }

  return (
    <div className="space-y-6">

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-800">Blog Posts</h2>
          <p className="text-xs text-gray-400 mt-0.5">{posts.length} post{posts.length !== 1 ? 's' : ''} total</p>
        </div>
        {!showForm && (
          <Button size="sm" className="bg-optical-navy hover:bg-optical-navy/90" onClick={() => { setShow(true); setEdit(null); setForm(INIT) }}>
            <Plus className="w-4 h-4 mr-1" /> New Post
          </Button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="border border-blue-200 bg-blue-50 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-blue-700">{editPost ? `Editing: ${editPost.title}` : 'New Blog Post'}</h3>
            <button type="button" onClick={cancelEdit}><X className="w-4 h-4 text-blue-500" /></button>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="blog-title">Title *</Label>
            <Input
              id="blog-title"
              placeholder="e.g. How to Choose the Right Glasses"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value, slug: toSlug(e.target.value) }))}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="blog-slug">Slug (URL) *</Label>
            <Input
              id="blog-slug"
              placeholder="how-to-choose-right-glasses"
              value={form.slug}
              onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
              required
            />
            <p className="text-xs text-gray-400">naz-optical.vercel.app/blog/{form.slug || 'your-slug'}</p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="blog-excerpt">Short Summary <span className="text-xs font-normal text-gray-400">(shown on blog list page)</span></Label>
            <Input
              id="blog-excerpt"
              placeholder="e.g. A quick guide to finding frames that suit your face shape..."
              value={form.excerpt}
              onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="blog-cover">Cover Image URL <span className="text-xs font-normal text-gray-400">(optional)</span></Label>
            <Input
              id="blog-cover"
              placeholder="https://..."
              value={form.cover_image_url}
              onChange={e => setForm(f => ({ ...f, cover_image_url: e.target.value }))}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="blog-content">Content * <span className="text-xs font-normal text-gray-400">(plain text — use blank lines between paragraphs)</span></Label>
            <textarea
              id="blog-content"
              rows={12}
              placeholder="Write your blog post here..."
              value={form.content}
              onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-vertical"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={form.is_published}
              onChange={e => setForm(f => ({ ...f, is_published: e.target.checked }))}
              className="w-4 h-4 accent-optical-navy"
            />
            <span className="text-sm font-medium text-gray-700">Publish immediately</span>
          </label>

          {error   && <p className="text-sm text-red-500">{error}</p>}
          {success && (
            <p className="text-sm text-green-600 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" /> Post {editPost ? 'updated' : 'created'}!
            </p>
          )}

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={cancelEdit} className="flex-1">Cancel</Button>
            <Button type="submit" disabled={saving} className="flex-1 bg-optical-navy hover:bg-optical-navy/90">
              {saving ? 'Saving…' : editPost ? 'Update Post' : 'Create Post'}
            </Button>
          </div>
        </form>
      )}

      {success && !showForm && (
        <p className="text-sm text-green-600 flex items-center gap-1.5">
          <CheckCircle className="w-4 h-4" /> Saved successfully!
        </p>
      )}

      {/* Posts list */}
      {posts.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">No blog posts yet. Click "New Post" to get started.</p>
      ) : (
        <ul className="space-y-3">
          {posts.map(post => (
            <li key={post.id} className="flex items-start justify-between gap-4 p-4 rounded-xl border border-gray-100 bg-white hover:border-gray-200 transition-colors">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-sm font-semibold text-gray-800 truncate">{post.title}</h4>
                  {post.is_published
                    ? <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1"><Eye className="w-3 h-3" /> Published</span>
                    : <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium flex items-center gap-1"><EyeOff className="w-3 h-3" /> Draft</span>
                  }
                </div>
                {post.excerpt && <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{post.excerpt}</p>}
                <p className="text-xs text-gray-300 mt-0.5">/blog/{post.slug}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => startEdit(post)} className="p-1.5 hover:text-optical-navy text-gray-400 transition-colors" title="Edit">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => deletePost(post.id, post.title)} className="p-1.5 hover:text-red-600 text-gray-400 transition-colors" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
