import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import {
  DataTable,
  DataTableColumn,
} from '@salesforce/design-system-react';

const columns = [
  <DataTableColumn key="name" label="Category" property="name" />,
  <DataTableColumn key="num_tokens" label="Tokens" property="num_tokens" />,
  <DataTableColumn key="tokenAverageMarketCap" label="Avg. Token MC" property="tokenAverageMarketCap" />,
  <DataTableColumn key="marketCap" label="Portfolio MC" property="marketCap" />,
  <DataTableColumn key="marketCapChange" label="% Change" property="marketCapChange" />,
];

function TokenCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/token/categories`).then((res) => {
      setCategories(res.data.categories);
    });
  }, []);

  return (
    <DataTable
      items={categories}
      id="DataTableExample-headless"
      className="slds-truncate token-category-datatable"
      fixedLayout
      fixedHeader
    >
      {columns}
    </DataTable>
  );
}

export default TokenCategories;
