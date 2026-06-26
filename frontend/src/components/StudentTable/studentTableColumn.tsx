import ActionDropdown from "../ActionDropdown/ActionDropdown";
import DefaultImage from "../FormComponents/DefaultImage";

export const getColumns = (userRoles: any) => {

  const hasAccess = userRoles.some(role => ['admin', 'manager', 'staff'].includes(role));

  const baseColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'left' as const,
      render: (text: string) => <p className='capitalize color-slate-700'>{text}</p>
    },
    {
      title: 'Image',
      dataIndex: 'image_url',
      key: 'image',
      align: 'center' as const,
      render: (image_url: string) => {
        if (!image_url) {
          return <span style={{ height: '50px', width: '50px', display: 'flex', alignItems: 'center' }}><DefaultImage /></span>;
        }

        const fullUrl = image_url.startsWith('http')
          ? image_url
          : `${import.meta.env.VITE_API_URL}/storage/${image_url}`;

        return (
          <img
            src={fullUrl}
            alt="Student"
            style={{
              margin: '0 auto',
              width: '50px',
              height: '50px',
              objectFit: 'cover',
              borderRadius: '4px'
            }}
          />
        );
      }
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      align: 'center' as const,
      width: 100,
    },
    {
      title: 'Class',
      dataIndex: 'student_class',
      key: 'class',
      align: 'center' as const,
      render: (studentClass: any) => studentClass?.name || '-'
    },
    {
      title: 'Activity',
      dataIndex: 'activities',
      key: 'activity',
      align: 'center' as const,
      render: (activities: any[]) => {
        if (!activities || activities.length === 0) return '-';
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'center' }}>
            {activities.map((activity) => (
              <span key={activity.id} style={{
                textAlign: 'center',
                background: '#f0f0f0',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '12px'
              }}>
                {activity.name}
              </span>
            ))}
          </div>
        );
      }
    },
    {
      title: 'Books',
      dataIndex: 'books',
      key: 'books',
      align: 'center' as const,
      render: (books: any[]) => {
        if (!books || books.length === 0) return '-';
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'center' }}>
            {books.map((book) => (
              <span key={book.id} style={{
                background: '#e6f7ff',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                color: '#1890ff'
              }}>
                {book.name}
              </span>
            ))}
          </div>
        );
      }
    },
    {
      title: 'Action',
      key: 'action',
      align: 'right' as const,
      render: (_: any, record: any) => (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <ActionDropdown data={record} />
        </div>
      )
    }
  ];

  // পারমিশন থাকলে পুরো অ্যারে রিটার্ন করবে, না থাকলে Action কলাম ফিল্টার করে বাদ দিয়ে দেবে
  return hasAccess ? baseColumns : baseColumns.filter(col => col.key !== 'action');
};