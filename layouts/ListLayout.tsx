'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname
    .replace(/^\//, '')
    .replace(/\/page\/\d+\/?$/, '')
    .replace(/\/$/, '')
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex justify-between">
        <button disabled={!prevPage}>
          <a
            href={prevPage ? `${basePath}/page/${currentPage - 1}` : '#'}
            className={
              prevPage
                ? 'text-primary-500 hover:text-primary-600'
                : 'cursor-not-allowed text-gray-400'
            }
          >
            <span>上一页</span>
          </a>
        </button>
        <span className="text-gray-400">
          第 {currentPage} 页，共 {totalPages} 页
        </span>
        <button disabled={!nextPage}>
          <a
            href={nextPage ? `${basePath}/page/${currentPage + 1}` : '#'}
            className={
              nextPage
                ? 'text-primary-500 hover:text-primary-600'
                : 'cursor-not-allowed text-gray-400'
            }
          >
            <span>下一页</span>
          </a>
        </button>
      </nav>
    </div>
  )
}

export default function ListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((post) => {
    const searchContent = post.title + post.summary + post.tags?.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            {title}
          </h1>
          <div className="relative max-w-lg">
            <label>
              <span className="sr-only">搜索文章</span>
              <input
                aria-label="搜索文章"
                type="text"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="搜索文章"
                className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
              />
            </label>
            <svg
              className="absolute top-3 right-3 h-5 w-5 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!filteredBlogPosts.length && '暂无文章。'}
          {displayPosts.map((post) => {
            const { path, date, title, summary, tags, images, password } = post
            const coverImage =
              images && images.length > 0 ? images[0] : 'https://picsum.photos/seed/picsum/400/300'
            return (
              <li key={path} className="py-6">
                <article className="grid grid-cols-1 gap-4 sm:grid-cols-[200px_1fr] sm:items-start">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <Link href={`/${path}`}>
                      <Image
                        src={coverImage}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes="200px"
                      />
                    </Link>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl leading-tight font-bold">
                      <Link href={`/${path}`} className="text-gray-900 dark:text-gray-100">
                        {title}
                      </Link>
                      {password && (
                        <svg
                          className="ml-1 inline h-4 w-4 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      )}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
                      <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      <span>·</span>
                      {tags?.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                    {summary && (
                      <p className="line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                        {summary}
                      </p>
                    )}
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {pagination && pagination.totalPages > 1 && (
        <Pagination totalPages={pagination.totalPages} currentPage={pagination.currentPage} />
      )}
    </>
  )
}
