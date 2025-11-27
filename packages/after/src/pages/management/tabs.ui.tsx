import { cn } from '@/shared/lib/utils';

interface TabsProps {
  entityType: 'post' | 'user';
  setEntityType: (entityType: 'post' | 'user') => void;
}

export const ManagementTabs = ({ entityType, setEntityType }: TabsProps) => {
  return (
    <div className="border-border-light mb-[15px] border-b pb-[5px]">
      <button
        onClick={() => setEntityType('post')}
        className={cn(
          'px-md py-sm bg-secondary text-foreground mr-[5px] cursor-pointer rounded-sm border border-border-interactive text-base font-normal',
          entityType === 'post' && 'bg-primary font-bold text-white'
        )}
      >
        게시글
      </button>
      <button
        onClick={() => setEntityType('user')}
        className={cn(
          'px-md py-sm bg-secondary text-foreground mr-[5px] cursor-pointer rounded-sm border border-border-interactive text-base font-normal',
          entityType === 'user' && 'bg-primary font-bold text-white'
        )}
      >
        사용자
      </button>
    </div>
  );
};
