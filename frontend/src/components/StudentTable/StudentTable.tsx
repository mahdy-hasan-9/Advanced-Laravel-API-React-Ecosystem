import { useEffect, useState, useCallback, useContext } from 'react'
import TableTitle from './TableTitle'
import TableHeader from './TableHeader'
import { Pagination, Table, Spin, Input } from 'antd';
import {
  DoubleRightOutlined,
  DoubleLeftOutlined,
  SearchOutlined
} from '@ant-design/icons';
import AddDrawer from '../Drawer/AddDrawer';
import { getStudentList } from '../../services/studentService';
import { useQuery } from '@tanstack/react-query';
import { getColumns } from './studentTableColumn';
import EditDrawer from '../Drawer/EditDrawer';
import { useDebounceCallback } from '../../hooks/useDebounce';
import { AuthContext } from '../../context/AuthContext';

const itemRender = (_, type, originalElement) => {
  return type === "prev" ? (
    <DoubleLeftOutlined />
  ) : type === 'next' ? (
    <DoubleRightOutlined />
  ) : (originalElement)
}

const StudentTable = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [debouncedSetSearch, cancelDebounce] = useDebounceCallback(
    (value: string) => {
      setDebouncedSearch(value);
      setCurrentPage(1);
    },
    1000
  );
  const isSearching = searchInput !== debouncedSearch;

  const { profile } = useContext(AuthContext);


  const userRoles = Array.isArray(profile?.role)
    ? profile.role
    : profile?.role
      ? [profile.role]
      : [];

  const [filters, setFilters] = useState({
    class_id: '',
    activities: [],
    books: [],
  });

  const dynamicColumns = getColumns(userRoles);

  const handleResetFilters = () => {
    setFilters({
      class_id: '',
      activities: [],
      books: [],
    });
    setSearchInput('');
    setCurrentPage(1);
  };

  const buildParams = useCallback(() => {
    type Params = {
      page: number;
      per_page: number;
      class_id?: string;
      activities?: string;
      books?: string;
      search?: string;
    };

    const params: Params = {
      page: currentPage,
      per_page: pageSize,
    };

    if (filters.class_id) {
      params.class_id = filters.class_id;
    }
    if (filters.activities.length > 0) {
      params.activities = filters.activities.join(',');
    }
    if (filters.books.length > 0) {
      params.books = filters.books.join(',');
    }
    if (debouncedSearch.trim()) {
      params.search = debouncedSearch.trim();
    }

    return params;
  }, [currentPage, pageSize, filters, debouncedSearch]);

  const { isPending, isFetching, isError, data, error } = useQuery({
    queryKey: ['students', currentPage, pageSize, filters, debouncedSearch],
    queryFn: () => getStudentList(buildParams()),
    placeholderData: (previousData) => previousData,
    staleTime: 30000,
  });

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    if (value.trim() === '') {
      cancelDebounce();
      setDebouncedSearch('');
      setCurrentPage(1);
    } else {
      debouncedSetSearch(value);
    }
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setDebouncedSearch('');
    cancelDebounce();
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  if (isPending) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh'
      }}>
        <Spin size="large" />
      </div>
    )
  }

  if (isError) {
    return <div>Error: {error instanceof Error ? error.message : 'An error occurred'}</div>
  }

  const handlePaginationChange = (page, size) => {
    const newPage = size !== pageSize ? 1 : page;
    setCurrentPage(newPage);
    setPageSize(size);
  };

  return (
    <div style={{ width: '100%' }}>
      <div>
        <TableTitle />

        <div className="mb-4">
          <Input
            placeholder="Search students..."
            prefix={<SearchOutlined />}
            value={searchInput}
            onChange={handleSearchChange}
            allowClear
            onClear={handleClearSearch}
            style={{
              width: '100%',
              maxWidth: 400,
              opacity: isSearching ? 0.7 : 1,
              transition: 'opacity 0.2s'
            }}
            suffix={isSearching ? <Spin size="small" /> : null}
          />
        </div>

        <div>
          <TableHeader
            columnInfo={dynamicColumns}
            handleChangeColumns={() => { }}
            filters={filters}
            setFilters={setFilters}
            handleResetFilters={handleResetFilters}
          />
        </div>

        <div className="hide-scrollbar" style={{ overflowX: 'auto', width: '100%' }}>
          <Table
            rowKey="id"
            rowSelection={{ type: "checkbox" }}
            dataSource={data?.data || []}
            columns={dynamicColumns}
            pagination={false}
            scroll={{ x: 'max-content' }}
            size="small"
            loading={isFetching || isSearching}
          />
        </div>

        <div style={{
          marginTop: 16,
          display: 'flex',
          justifyContent: 'flex-end',
          flexWrap: 'wrap',
          gap: 8
        }}>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={data?.total || 0}
            showSizeChanger
            pageSizeOptions={['5', '10', '20']}
            onChange={handlePaginationChange}
            onShowSizeChange={handlePaginationChange}
            itemRender={itemRender}
            responsive={true}
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total}`}
          />
        </div>
      </div>
      <AddDrawer />
      <EditDrawer />
    </div>
  );
};

export default StudentTable;