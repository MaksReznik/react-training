import { Table } from 'antd';
import Column from 'antd/es/table/Column';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../shared/hooks/Redux.hooks';
import { RootState } from '../../../../state';
import { tableProductsViewColumns } from '../../constants/TableProductsViewColumns.constant';

const TableProductsView = () => {
  const products = useAppSelector(
    (state: RootState) => state.products.products
  );
  const { t } = useTranslation();
  return (
    <div>
      <Table dataSource={products}>
        {tableProductsViewColumns.map((column) => (
          <Column
            title={t(column.title)}
            dataIndex={column.dataIndex}
            key={column.key}
          />
        ))}
      </Table>
    </div>
  );
};

export default TableProductsView;
