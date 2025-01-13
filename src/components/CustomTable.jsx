import { Table } from "antd";

const CustomTable = ({ data, columns, loading }) => {
  return (
    <Table
      pagination={false}
      columns={columns}
      dataSource={Array.isArray(data) ? data : []}
      loading={loading}
    />
  );
};

export default CustomTable;
