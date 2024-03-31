'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';

export default function BreadCrumb() {
  const pathname = usePathname();

  // Don't display breadcrumb for /dashboard
  if (pathname === '/dashboard') {
    return null;
  }

  // Split the pathname into segments and filter out any empty segments
  const segments = pathname.split('/').filter((segment) => segment);

  return (
    <Breadcrumb className="flex ">
      <BreadcrumbList>
        {segments.map((segment, index) => (
          <React.Fragment key={segment}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href={`/${segments.slice(0, index + 1).join('/')}`}
                  className="text-sm capitalize"
                >
                  {segment}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < segments.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
