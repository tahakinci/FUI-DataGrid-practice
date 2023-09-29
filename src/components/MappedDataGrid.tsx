//In this component DataGrid is creating by mapped data

import { useData } from "../useData";

import {
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
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

export const MappedDataGrid = () => {
  const items: Items[] = useData();

  const transformedData = {};

  // Iterate through the API data objects
  items.forEach((obj) => {
    // Iterate through the keys in each object
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        // Check if the key exists in the transformedData object, if not, create an array for it
        if (!transformedData[key]) {
          transformedData[key] = [];
        }
        // Push the value into the corresponding key's array
        transformedData[key].push(obj[key]);
      }
    }
  });

  // Convert the transformedData object into an array of objects
  const dataArray = Object.keys(transformedData).map((key) => ({
    [key]: transformedData[key],
  }));

  console.log(dataArray);

  const columns = dataArray.map((item) => {
    return createTableColumn<Items>({
      columnId: item.id,
      renderHeaderCell: () => {
        const deneme = Object.keys(item)[0];
        return deneme;
      },
      renderCell: (item) => {
        return <TableCellLayout>{(item.id, item.name)}</TableCellLayout>;
      },
    });
  });

  // TODO : RenderCell kısmı yapılacak !

  //   const columns = [
  //     createTableColumn<Items>({
  //       columnId: "name",
  //       renderHeaderCell: () => {
  //         return "Name";
  //       },
  //       renderCell: (item) => {
  //         return <TableCellLayout>{item.name}</TableCellLayout>;
  //       },
  //     }),
  //     createTableColumn<Items>({
  //       columnId: "username",
  //       renderHeaderCell: () => {
  //         return "Username";
  //       },
  //       renderCell: (item) => {
  //         return <TableCellLayout>{item.username}</TableCellLayout>;
  //       },
  //     }),
  //     createTableColumn<Items>({
  //       columnId: "email",
  //       renderHeaderCell: () => {
  //         return "Email";
  //       },
  //       renderCell: (item) => {
  //         return <TableCellLayout>{item.email}</TableCellLayout>;
  //       },
  //     }),
  //     createTableColumn<Items>({
  //       columnId: "phone",
  //       renderHeaderCell: () => {
  //         return "Phone";
  //       },
  //       renderCell: (item) => {
  //         return <TableCellLayout>{item.phone}</TableCellLayout>;
  //       },
  //     }),
  //     createTableColumn<Items>({
  //       columnId: "company",
  //       renderHeaderCell: () => {
  //         return "Company";
  //       },
  //       renderCell: (item) => {
  //         return <TableCellLayout>{item.company.name}</TableCellLayout>;
  //       },
  // //     }),
  //     createTableColumn<Items>({
  //       columnId: "website",
  //       renderHeaderCell: () => {
  //         return "Website";
  //       },
  //       renderCell: (item) => {
  //         return <TableCellLayout>{item.website}</TableCellLayout>;
  //       },
  //     }),
  //   ];

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
