import React, { useState } from 'react';

import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import type { User } from '@/entities/user';
import { cn } from '@/shared/lib/utils';

interface TableProps {
  users: User[];
  variant?: 'default' | 'bordered' | 'striped' | 'hover';
  pageSize?: number;
  searchable?: boolean;
  sortable?: boolean;
  onEdit: (item: any) => void;
  onDelete: (id: number) => void;
}

const USER_TABLE_COLUMNS = [
  { key: 'id', header: 'ID', width: '60px' },
  { key: 'username', header: '사용자명', width: '150px' },
  { key: 'email', header: '이메일' },
  { key: 'role', header: '역할', width: '120px' },
  { key: 'status', header: '상태', width: '120px' },
  { key: 'createdAt', header: '생성일', width: '120px' },
  { key: 'lastLogin', header: '마지막 로그인', width: '140px' },
  { key: 'actions', header: '관리', width: '200px' },
];

export const UserManagementTable: React.FC<TableProps> = ({
  users = [],
  variant = 'default',
  pageSize = 10,
  searchable = false,
  sortable = false,
  onEdit,
  onDelete,
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

  const sortedUsers = [...users].sort((a, b) => {
    const aVal = a[sortColumn as keyof User];
    const bVal = b[sortColumn as keyof User];

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    }

    return sortDirection === 'asc'
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  const filteredData =
    searchable && searchTerm
      ? sortedUsers.filter((row) =>
          Object.values(row).some((val) =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      : sortedUsers;

  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const totalPages = Math.ceil(filteredData.length / pageSize);

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
          {USER_TABLE_COLUMNS.map((column) => (
            <TableHead key={column.key} onClick={() => sortable && handleSort(column.key)}>
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {paginatedData.map((row, rowIndex) => {
          const userStatus = USER_STATUS[row.status as keyof typeof USER_STATUS];
          const userRole = USER_ROLES[row.role as keyof typeof USER_ROLES];
          return (
            <TableRow key={rowIndex}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.username}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>
                <Badge variant={userRole.variant}>{userRole.content}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={userStatus.variant}>{userStatus.content}</Badge>
              </TableCell>
              <TableCell>{row.createdAt}</TableCell>
              <TableCell>{row.lastLogin || '-'}</TableCell>
              <TableCell>
                <div className="gap-xs flex">
                  <Button size="sm" variant="primary" onClick={() => onEdit?.(row)}>
                    수정
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => onDelete?.(row.id)}>
                    삭제
                  </Button>
                </div>
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

const USER_ROLES = {
  admin: {
    variant: 'danger',
    content: '관리자',
  },
  moderator: {
    variant: 'warning',
    content: '운영자',
  },
  user: {
    variant: 'primary',
    content: '사용자',
  },
  guest: {
    variant: 'secondary',
    content: '게스트',
  },
} as const;

const USER_STATUS = {
  active: {
    variant: 'success',
    content: '게시됨',
  },
  inactive: {
    variant: 'warning',
    content: '임시저장',
  },
  suspended: {
    variant: 'danger',
    content: '거부됨',
  },
} as const;
