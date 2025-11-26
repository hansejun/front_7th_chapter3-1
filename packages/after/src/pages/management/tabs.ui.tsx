export const Tabs = () => {
  return (
    <div
      style={{
        marginBottom: '15px',
        borderBottom: '2px solid #ccc',
        paddingBottom: '5px',
      }}
    >
      <button
        onClick={() => setEntityType('post')}
        style={{
          padding: '8px 16px',
          marginRight: '5px',
          fontSize: '14px',
          fontWeight: entityType === 'post' ? 'bold' : 'normal',
          border: '1px solid #999',
          background: entityType === 'post' ? '#1976d2' : '#f5f5f5',
          color: entityType === 'post' ? 'white' : '#333',
          cursor: 'pointer',
          borderRadius: '3px',
        }}
      >
        게시글
      </button>
      <button
        onClick={() => setEntityType('user')}
        style={{
          padding: '8px 16px',
          fontSize: '14px',
          fontWeight: entityType === 'user' ? 'bold' : 'normal',
          border: '1px solid #999',
          background: entityType === 'user' ? '#1976d2' : '#f5f5f5',
          color: entityType === 'user' ? 'white' : '#333',
          cursor: 'pointer',
          borderRadius: '3px',
        }}
      >
        사용자
      </button>
    </div>
  );
};
