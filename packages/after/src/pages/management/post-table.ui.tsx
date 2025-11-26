import React, { useState } from 'react';

import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import type { Post } from '@/entities/post';
import { cn } from '@/shared/lib/utils';

interface TableProps {
  posts: Post[];
  variant?: 'default' | 'bordered' | 'striped' | 'hover';
  pageSize?: number;
  searchable?: boolean;
  sortable?: boolean;
  onEdit: (item: any) => void;
  onDelete: (id: number) => void;
  onPublish?: (id: number) => void;
  onArchive?: (id: number) => void;
  onRestore?: (id: number) => void;
}

const POST_TABLE_COLUMNS = [
  { key: 'id', header: 'ID', width: '60px' },
  { key: 'title', header: '제목', width: '200px' },
  { key: 'author', header: '작성자', width: '120px' },
  { key: 'category', header: '카테고리', width: '120px' },
  { key: 'status', header: '상태', width: '120px' },
  { key: 'views', header: '조회수', width: '100px' },
  { key: 'createdAt', header: '생성일', width: '120px' },
  { key: 'actions', header: '관리', width: '240px' },
];

export const PostManagementTable: React.FC<TableProps> = ({
  posts = [],
  variant = 'default',
  pageSize = 10,
  searchable = false,
  sortable = false,
  onEdit,
  onDelete,
  onPublish,
  onArchive,
  onRestore,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (columnKey: string) => {
    if (!sortable) return;

    const newDirection = sortColumn === columnKey && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(columnKey);
    setSortDirection(newDirection);
  };

  const sortedPosts = [...posts].sort((a, b) => {
    const aVal = a[sortColumn as keyof Post];
    const bVal = b[sortColumn as keyof Post];

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    }

    return sortDirection === 'asc'
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  const filteredData =
    searchable && searchTerm
      ? sortedPosts.filter((row) =>
          Object.values(row).some((val) =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      : sortedPosts;

  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const renderActionButtons = (row: Post) => {
    switch (row.status) {
      case 'draft':
        return (
          <>
            <Button size="sm" variant="primary" onClick={() => onPublish?.(row.id)}>
              게시
            </Button>
            <Button size="sm" variant="primary" onClick={() => onEdit?.(row)}>
              수정
            </Button>
            <Button size="sm" variant="danger" onClick={() => onDelete?.(row.id)}>
              삭제
            </Button>
          </>
        );
      case 'published':
        return (
          <>
            <Button size="sm" variant="secondary" onClick={() => onArchive?.(row.id)}>
              보관
            </Button>
            <Button size="sm" variant="primary" onClick={() => onEdit?.(row)}>
              수정
            </Button>
            <Button size="sm" variant="danger" onClick={() => onDelete?.(row.id)}>
              삭제
            </Button>
          </>
        );
      case 'archived':
        return (
          <>
            <Button size="sm" variant="success" onClick={() => onRestore?.(row.id)}>
              복원
            </Button>
            <Button size="sm" variant="danger" onClick={() => onDelete?.(row.id)}>
              삭제
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Table variant={variant}>
      {searchable && (
        <div className="mb-[16px]">
          <input
            type="text"
            placeholder="검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px] rounded-sm border border-[#ddd] px-[12px] py-[8px]"
          />
        </div>
      )}
      <TableHeader>
        <TableRow>
          {POST_TABLE_COLUMNS.map((column) => (
            <TableHead key={column.key} onClick={() => sortable && handleSort(column.key)}>
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {paginatedData.map((row, rowIndex) => {
          const postStatus = POST_STATUS[row.status as keyof typeof POST_STATUS];
          const postCategory = POST_CATEGORIES[row.category as keyof typeof POST_CATEGORIES];
          return (
            <TableRow key={rowIndex}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.author}</TableCell>
              <TableCell>
                <Badge variant={postCategory.variant}>{postCategory.content}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={postStatus.variant}>{postStatus.content}</Badge>
              </TableCell>
              <TableCell>{row.views}</TableCell>
              <TableCell>{row.createdAt}</TableCell>
              <TableCell>
                <div className="gap-xs flex">{renderActionButtons(row)}</div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      {totalPages > 1 && (
        <div className="mt-[16px] flex justify-center gap-[8px]">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={cn(
              'cursor-pointer rounded-sm border bg-white px-[12px] py-[6px] disabled:cursor-not-allowed disabled:opacity-60',
              currentPage === 1 && 'cursor-not-allowed opacity-60'
            )}
          >
            이전
          </button>
          <span className="px-[12px] py-[6px]">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={cn(
              'cursor-pointer rounded-sm border bg-white px-[12px] py-[6px] disabled:cursor-not-allowed disabled:opacity-60',
              currentPage === totalPages && 'cursor-not-allowed opacity-60'
            )}
          >
            다음
          </button>
        </div>
      )}
    </Table>
  );
};

const POST_CATEGORIES = {
  development: {
    variant: 'primary',
    content: '개발',
  },
  design: {
    variant: 'warning',
    content: '디자인',
  },
  accessibility: {
    variant: 'success',
    content: '접근성',
  },
} as const;

const POST_STATUS = {
  draft: {
    variant: 'warning',
    content: '임시저장',
  },
  published: {
    variant: 'success',
    content: '게시됨',
  },
  archived: {
    variant: 'secondary',
    content: '보관됨',
  },
} as const;
