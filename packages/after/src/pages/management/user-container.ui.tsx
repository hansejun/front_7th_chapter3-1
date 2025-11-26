import type { User } from '@/entities/user';
import { useUsers } from '@/entities/user/use-users.model';
import { useDeleteUser } from '@/features/user/delete-user/use-delete-user.model';
import { Table } from '@/shared/components/organisms';
import { useModal } from '@/shared/model/hooks';
import { MODAL_TYPES } from '@/shared/model/hooks/use-modal';
import { AlertManager } from '@/shared/ui/alert-manager';
import { Button } from '@/shared/ui/button';

export const UserManagementContainer = () => {
  const { users } = useUsers();
  const { onDeleteUser } = useDeleteUser();

  const { onOpenModal } = useModal();

  const handleOpenCreateUserModal = () => {
    onOpenModal(MODAL_TYPES.CREATE_USER);
  };

  const handleOpenEditUserModal = (user: User) => {
    onOpenModal(MODAL_TYPES.UPDATE_USER, { user });
  };
  const handleDeleteUser = (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    onDeleteUser(id);
  };

  const stats = getUserStats(users);

  return (
    <div>
      <div className="mb-[15px] text-right">
        <Button variant="primary" size="md" onClick={handleOpenCreateUserModal}>
          새로 만들기
        </Button>
      </div>

      <AlertManager />

      <div className="mb-[15px] grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-[10px]">
        <div className="bg-primary-weak border-primary-border rounded-sm border px-[15px] py-[12px]">
          <div className="text-muted mb-[4px] text-xs">전체</div>
          <div className="text-primary text-[24px] font-bold">{stats.total}</div>
        </div>

        <div className="bg-success-weak border-success-border rounded-sm border px-[15px] py-[12px]">
          <div className="text-muted mb-[4px] text-xs">{stats.stat1.label}</div>
          <div className="text-success text-[24px] font-bold">{stats.stat1.value}</div>
        </div>

        <div className="bg-warning-weak border-warning-border rounded-sm border px-[15px] py-[12px]">
          <div className="text-muted mb-[4px] text-xs">{stats.stat2.label}</div>
          <div className="text-warning text-[24px] font-bold">{stats.stat2.value}</div>
        </div>

        <div className="bg-danger-weak border-danger-border rounded-sm border px-[15px] py-[12px]">
          <div className="text-muted mb-[4px] text-xs">{stats.stat3.label}</div>
          <div className="text-danger text-[24px] font-bold">{stats.stat3.value}</div>
        </div>

        <div className="bg-default border-default-border rounded-sm border px-[15px] py-[12px]">
          <div className="text-muted mb-[4px] text-xs">{stats.stat4.label}</div>
          <div className="text-default-foreground text-[24px] font-bold">{stats.stat4.value}</div>
        </div>
      </div>

      <div className="border-border-light overflow-auto border bg-white">
        <Table
          columns={[
            { key: 'id', header: 'ID', width: '60px' },
            { key: 'username', header: '사용자명', width: '150px' },
            { key: 'email', header: '이메일' },
            { key: 'role', header: '역할', width: '120px' },
            { key: 'status', header: '상태', width: '120px' },
            { key: 'createdAt', header: '생성일', width: '120px' },
            { key: 'lastLogin', header: '마지막 로그인', width: '140px' },
            { key: 'actions', header: '관리', width: '200px' },
          ]}
          data={users}
          striped
          hover
          entityType="user"
          onEdit={handleOpenEditUserModal}
          onDelete={handleDeleteUser}
        />
      </div>
    </div>
  );
};

const getUserStats = (users: User[]) => {
  return {
    total: users.length,
    stat1: {
      label: '활성',
      value: users.filter((u) => u.status === 'active').length,
      color: '#2e7d32',
    },
    stat2: {
      label: '비활성',
      value: users.filter((u) => u.status === 'inactive').length,
      color: '#ed6c02',
    },
    stat3: {
      label: '정지',
      value: users.filter((u) => u.status === 'suspended').length,
      color: '#d32f2f',
    },
    stat4: {
      label: '관리자',
      value: users.filter((u) => u.role === 'admin').length,
      color: '#1976d2',
    },
  };
};
