// This component is only for getting data from an api and using it in FUI DataGrid
import { useData } from "../useData";

import {
  DataGridBody,
  DataGridRow,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableCellLayout,
  createTableColumn,
} from "@fluentui/react-components";

interface Company {
  name: string;
  catchPhrase?: string;
  bs?: string;
}

export interface Items {
  name: string;
  id: number;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: Company;
}

export const DefaultDataGrid = () => {
  const items: Items[] = useData();
  const columns = [
    createTableColumn<Items>({
      columnId: "name",
      renderHeaderCell: () => {
        return "Name";
      },
      renderCell: (item) => {
        return <TableCellLayout>{item.name}</TableCellLayout>;
      },
    }),
    createTableColumn<Items>({
      columnId: "username",
      renderHeaderCell: () => {
        return "Username";
      },
      renderCell: (item) => {
        return <TableCellLayout>{item.username}</TableCellLayout>;
      },
    }),
    createTableColumn<Items>({
      columnId: "email",
      renderHeaderCell: () => {
        return "Email";
      },
      renderCell: (item) => {
        return <TableCellLayout>{item.email}</TableCellLayout>;
      },
    }),
    createTableColumn<Items>({
      columnId: "phone",
      renderHeaderCell: () => {
        return "Phone";
      },
      renderCell: (item) => {
        return <TableCellLayout>{item.phone}</TableCellLayout>;
      },
    }),
    createTableColumn<Items>({
      columnId: "company",
      renderHeaderCell: () => {
        return "Company";
      },
      renderCell: (item) => {
        return <TableCellLayout>{item.company.name}</TableCellLayout>;
      },
    }),

    createTableColumn<Items>({
      columnId: "website",
      renderHeaderCell: () => {
        return "Website";
      },
      renderCell: (item) => {
        return <TableCellLayout>{item.website}</TableCellLayout>;
      },
    }),
  ];

  return (
    <DataGrid
      items={items}
      columns={columns}
      sortable
      selectionMode="multiselect"
      getRowId={(item) => item.name}
      onSelectionChange={(e, data) => console.log(data)}
      focusMode="composite"
    >
      <DataGridHeader>
        <DataGridRow selectionCell={{ "aria-label": "Select all rows" }}>
          {({ renderHeaderCell }) => (
            <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
          )}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody<Items>>
        {({ item, rowId }) => (
          <DataGridRow<Items>
            key={rowId}
            selectionCell={{ "aria-label": "Select row" }}
          >
            {({ renderCell }) => (
              <DataGridCell>{renderCell(item)}</DataGridCell>
            )}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  );
};
