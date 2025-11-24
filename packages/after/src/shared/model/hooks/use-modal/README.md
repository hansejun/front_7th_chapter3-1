# useModal Hook 사용 가이드

`useSyncExternalStore`를 사용한 전역 모달 관리 시스템입니다.

## 아키텍처

### FSD 계층 구조
```
app (ModalRoot, registry) - features 레이어의 모달 컴포넌트들을 import
  ↓
pages (ManagementPage) - useModal 훅 사용
  ↓
features (모달 컴포넌트들) - BaseModalProps 확장
  ↓
shared/model/hooks (useModal, types) - 순수한 모달 상태 관리
```

## 설치 및 설정

### 1. ModalRoot를 앱에 추가

`src/main.tsx` 또는 `src/App.tsx`에 추가:

```tsx
import { ModalRoot } from '@/app/providers';

function App() {
  return (
    <>
      <YourAppContent />
      <ModalRoot />
    </>
  );
}
```

### 2. index.html에 modalRoot div 추가

```html
<body>
  <div id="root"></div>
  <div id="modalRoot"></div>
</body>
```

## 기본 사용법

### 1. 모달 열기

```tsx
import { useModal } from '@/shared/model/hooks';
import { MODAL_TYPES } from '@/app/providers';

function YourComponent() {
  const { onOpenModal } = useModal();

  const handleCreateUser = () => {
    onOpenModal(MODAL_TYPES.CREATE_USER);
  };

  const handleUpdateUser = (user: User) => {
    onOpenModal(MODAL_TYPES.UPDATE_USER, { user });
  };

  return (
    <>
      <button onClick={handleCreateUser}>사용자 생성</button>
      <button onClick={() => handleUpdateUser(selectedUser)}>
        사용자 수정
      </button>
    </>
  );
}
```

### 2. 모달 닫기

모달 내부에서는 `onCloseModal` prop이 자동으로 주입됩니다:

```tsx
export const CreateUserModal = ({ onCloseModal }: CreateUserModalProps) => {
  const handleSubmit = () => {
    // 작업 완료 후 모달 닫기
    onCloseModal();
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 폼 내용 */}
    </form>
  );
};
```

## 새로운 모달 추가하기

### 1. 모달 컴포넌트 생성

```tsx
// src/features/user/invite-user/invite-user-modal.ui.tsx
import type { BaseModalProps } from '@/shared/model/hooks';
import type { User } from '@/entities/user';

interface InviteUserModalProps extends BaseModalProps {
  user: User;
  role: string;
}

export const InviteUserModal = ({
  user,
  role,
  onCloseModal
}: InviteUserModalProps) => {
  return (
    <div>
      <h2>{user.username}을 {role}로 초대</h2>
      <button onClick={onCloseModal}>취소</button>
    </div>
  );
};
```

### 2. 모달 레지스트리에 등록

```tsx
// src/app/providers/modal-registry.tsx
import { InviteUserModal } from '@/features/user/invite-user';

export const MODAL_TYPES = {
  // ... 기존 모달들
  INVITE_USER: 'INVITE_USER',
} as const;

export const modalComponentMap = {
  // ... 기존 모달들
  [MODAL_TYPES.INVITE_USER]: InviteUserModal,
};
```

### 3. 사용하기

```tsx
const { onOpenModal } = useModal();

onOpenModal(MODAL_TYPES.INVITE_USER, {
  user: selectedUser,
  role: 'admin'
});
```

## API Reference

### useModal()

모달 상태를 관리하는 훅입니다.

**반환값:**
```typescript
{
  openModals: ModalState[];  // 현재 열린 모달 배열
  onOpenModal: (type: string, props?: Record<string, any>) => void;
  onCloseModal: (type: string) => void;
}
```

### BaseModalProps

모든 모달 컴포넌트가 확장해야 하는 기본 Props 타입입니다.

```typescript
interface BaseModalProps {
  onCloseModal: () => void;
}
```

### MODAL_TYPES

등록된 모든 모달 타입의 상수입니다.

```typescript
const MODAL_TYPES = {
  CREATE_USER: 'CREATE_USER',
  UPDATE_USER: 'UPDATE_USER',
  CREATE_POST: 'CREATE_POST',
  UPDATE_POST: 'UPDATE_POST',
} as const;
```

## 특징

### 1. 중복 방지
같은 타입의 모달이 이미 열려있으면 새로 열리지 않습니다.

### 2. 타입 안정성
- BaseModalProps를 확장하여 타입 안정성 보장
- MODAL_TYPES 상수로 오타 방지

### 3. FSD 준수
- shared/model/hooks: 순수한 상태 관리 로직
- app 레이어: 모달 레지스트리 및 렌더링
- features 레이어 참조 없음

### 4. useSyncExternalStore
- React 18의 공식 external store 패턴 사용
- 동시성 렌더링 안전

## 주의사항

1. **ModalRoot는 한 번만 렌더링**: 앱 최상위에서 한 번만 렌더링해야 합니다.

2. **모달 타입은 고유해야 함**: MODAL_TYPES의 각 값은 고유해야 합니다.

3. **Props 전달**: onOpenModal의 두 번째 인자로 전달한 props는 모달 컴포넌트에 그대로 전달됩니다.

4. **onCloseModal은 자동 주입**: 모달 컴포넌트는 onCloseModal을 props로 받지만, 호출 시에는 전달하지 않아도 됩니다.
