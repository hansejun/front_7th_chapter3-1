import type { Post } from '@/entities/post';
import { useUpdatePost } from './use-update-post.model';
import { UpdatePostForm } from './update-post-form.ui';
import type { BaseModalProps } from '@/shared/model/hooks';
import Modal from '@/shared/ui/modal';
import { Button } from '@/shared/ui/button';
import Alert from '@/shared/ui/alert';

interface UpdatePostModalProps extends BaseModalProps {
  post: Post;
}

export const UpdatePostModal = ({ post, onCloseModal }: UpdatePostModalProps) => {
  const { form, onUpdatePost, onChangeForm } = useUpdatePost(post);

  const handleSubmit = () => {
    onUpdatePost({
      onSuccess: () => {
        onCloseModal();
      },
    });
  };
  return (
    <Modal onClose={onCloseModal} size="lg">
      <Modal.Header>게시글 수정</Modal.Header>
      <Modal.Content>
        {/* <Alert variant="info">
          ID: {post.id} | 생성일: {post.createdAt}
          {post.views && ` | 조회수: ${post.views}`}
        </Alert> */}

        <Alert variant="info">
          <Alert.Icon />
          <Alert.Content>
            <Alert.Body>
              ID: {post.id} | 생성일: {post.createdAt}
              {post.views && ` | 조회수: ${post.views}`}
            </Alert.Body>
          </Alert.Content>
        </Alert>

        <UpdatePostForm form={form} onSubmit={handleSubmit} onChangeForm={onChangeForm} />
      </Modal.Content>
      <Modal.Footer>
        <Button onClick={onCloseModal}>취소</Button>
        <Button onClick={() => handleSubmit()}>수정 완료</Button>
      </Modal.Footer>
    </Modal>
  );
};
