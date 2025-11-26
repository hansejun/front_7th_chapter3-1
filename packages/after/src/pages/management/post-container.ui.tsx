import { usePosts, type Post } from '@/entities/post';
import { useDeletePost } from '@/features/post/delete-post';
import { useUpdatePostStatus } from '@/features/post/update-post-status';
import { Table } from '@/shared/components/organisms';
import { useModal } from '@/shared/model/hooks';
import { MODAL_TYPES } from '@/shared/model/hooks/use-modal';
import { AlertManager } from '@/shared/ui/alert-manager';
import { Button } from '@/shared/ui/button';

export const PostManagementContainer = () => {
  const { posts } = usePosts();

  const { onOpenModal } = useModal();
  const { onDeletePost } = useDeletePost();
  const { onUpdatePostStatus } = useUpdatePostStatus();

  const handleOpenCreatePostModal = () => {
    onOpenModal(MODAL_TYPES.CREATE_POST);
  };

  const handleOpenEditPostModal = (post: Post) => {
    onOpenModal(MODAL_TYPES.UPDATE_POST, { post });
  };

  const handleDeletePost = (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    onDeletePost(id);
  };

  const stats = getPostStats(posts);

  return (
    <div>
      <div className="mb-[15px] text-right">
        <Button variant="primary" size="md" onClick={handleOpenCreatePostModal}>
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
            { key: 'title', header: '제목' },
            { key: 'author', header: '작성자', width: '120px' },
            { key: 'category', header: '카테고리', width: '140px' },
            { key: 'status', header: '상태', width: '120px' },
            { key: 'views', header: '조회수', width: '100px' },
            { key: 'createdAt', header: '작성일', width: '120px' },
            { key: 'actions', header: '관리', width: '250px' },
          ]}
          data={posts}
          striped
          hover
          entityType="post"
          onEdit={handleOpenEditPostModal}
          onDelete={handleDeletePost}
          onPublish={(id) => onUpdatePostStatus(id, 'publish', {})}
          onArchive={(id) => onUpdatePostStatus(id, 'archive', {})}
          onRestore={(id) => onUpdatePostStatus(id, 'restore', {})}
        />
      </div>
    </div>
  );
};

const getPostStats = (posts: Post[]) => {
  return {
    total: posts.length,
    stat1: {
      label: '게시됨',
      value: posts.filter((p) => p.status === 'published').length,
      color: '#2e7d32',
    },
    stat2: {
      label: '임시저장',
      value: posts.filter((p) => p.status === 'draft').length,
      color: '#ed6c02',
    },
    stat3: {
      label: '보관됨',
      value: posts.filter((p) => p.status === 'archived').length,
      color: 'rgba(0, 0, 0, 0.6)',
    },
    stat4: {
      label: '총 조회수',
      value: posts.reduce((sum, p) => sum + p.views, 0),
      color: '#1976d2',
    },
  };
};
