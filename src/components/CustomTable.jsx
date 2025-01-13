import { Table } from "antd";
import { useNavigate } from "react-router-dom";

const CustomTable = ({
  data,
  columns,
  loading,
  page,
  onPageChange,
  pageSize,
  onPageSizeChange,
  routePath,
}) => {
  const navigate = useNavigate();

  const handleRowClick = (record) => {
    navigate(`/${record.type}/${record.id}`);
  };
  return (
    <Table
      pagination={{
        current: page,
        total: Array.isArray(data) ? data.length : 0,
        pageSize: pageSize,
        onChange: onPageChange,
        onShowSizeChange: onPageSizeChange,
        showSizeChanger: true,
        pageSizeOptions: ["1", "2", "10", "20"],
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} items`,
      }}
      columns={columns}
      dataSource={Array.isArray(data) ? data : []}
      loading={loading}
      onRow={(record) => ({
        onClick: () => handleRowClick(record),
        style: { cursor: routePath ? "pointer" : "default" },
      })}
    />
  );
};

export default CustomTable;
