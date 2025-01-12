import React from "react"
import { Flex, Table } from "antd"

const CustomTable = ({ data, columns, scroll, loading }) => {

    return <Table
        pagination={false}
        columns={columns}
        dataSource={Array.isArray(data) ? data : []}
        scroll={scroll}
        loading={loading}
    />
}

export default CustomTable