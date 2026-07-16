import { allBlogs } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { coreContent } from 'pliny/utils/contentlayer'
import PostSimple from '@/layouts/PostSimple'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '待整改',
  description: '装修待整改项目清单',
}

export default async function PendingPage() {
  const post = allBlogs.find((p) => p.slug === 'pending-issues')
  if (!post) {
    return <div>内容不存在</div>
  }
  const mainContent = coreContent(post)

  return (
    <PostSimple content={mainContent}>
      <MDXLayoutRenderer code={post.body.code} />
    </PostSimple>
  )
}
