"use client";

import React from "react";
import { usePathname } from "next/navigation";
import type { Blog } from "contentlayer/generated";
import { Link, locales } from "@/navigation";
import { useTranslations } from "next-intl";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}
interface NotFoundDataProps {
  notFoundTitle: string;
  notFoundDescription: string;
  notFoundButtonText: string;
}
interface ListLayoutProps {
  notFoundData: NotFoundDataProps;
  initialDisplayPosts?: Blog[];
  pagination?: PaginationProps;
}
export default function ListLayout({
  notFoundData,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  return (
    <div className="prose dark:prose-invert  mx-auto px-5">
      {initialDisplayPosts && initialDisplayPosts.length > 0 ? (
        initialDisplayPosts.map((post) => (
          <article key={post._id}>
            <Link href={post.slug.split(".")[0]}>
              <h2>{post.title}</h2>
            </Link>
            {post.description && <p>{post.description}</p>}
          </article>
        ))
      ) : (
        <PostNotFound notFoundData={notFoundData} />
      )}
      {pagination && pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
        />
      )}
    </div>
  );
}

function PostNotFound({ notFoundData }: { notFoundData: NotFoundDataProps }) {
  return (
    <div className="flex flex-col items-start justify-start md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6">
      <div className="space-x-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-6xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:border-r-2 md:px-6 md:text-8xl md:leading-14">
          404
        </h1>
      </div>
      <div className="max-w-md">
        <p className="mb-4 text-xl font-bold leading-normal md:text-2xl">
          {notFoundData.notFoundTitle}
        </p>
        <p className="mb-8">{notFoundData.notFoundDescription}</p>
        <a
          href="/"
          className="focus:shadow-outline-blue inline rounded-lg border border-transparent bg-cyan-700 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-cyan-600 focus:outline-none dark:hover:bg-blue-500"
        >
          {notFoundData.notFoundButtonText}
        </a>
      </div>
    </div>
  );
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname();
  const basePath = locales.includes(pathname.split("/")[1])
    ? pathname.split("/")[2]
    : pathname.split("/")[1];
  const prevPage = currentPage - 1 > 0;
  const nextPage = currentPage + 1 <= totalPages;

  const t = useTranslations("navigation");

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button
            className="cursor-auto disabled:opacity-50"
            disabled={!prevPage}
          >
            {t("previous")}
          </button>
        )}
        {prevPage && (
          <Link
            href={
              currentPage - 1 === 1
                ? `/${basePath}/`
                : `/${basePath}/page/${currentPage - 1}`
            }
            rel="prev"
          >
            {t("previous")}
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button
            className="cursor-auto disabled:opacity-50"
            disabled={!nextPage}
          >
            {t("next")}
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            {t("next")}
          </Link>
        )}
      </nav>
    </div>
  );
}
