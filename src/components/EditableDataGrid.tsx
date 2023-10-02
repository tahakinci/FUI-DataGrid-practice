// Single selected DataGrid ile seçtiğim row'un id sini alıyorum
// daha sonra bu idyi methodlarda kullanıyorum
// Methodları sadece butonlarda
// bazen de dialogların içindeki butonlarda kullanıyorum.

import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
  DeleteRegular,
} from "@fluentui/react-icons";
import {
  PresenceBadgeStatus,
  Avatar,
  DataGridBody,
  DataGridRow,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
  Button,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
} from "@fluentui/react-components";
import { useState } from "react";

type FileCell = {
  label: string;
  icon: JSX.Element;
};

type LastUpdatedCell = {
  label: string;
  timestamp: number;
};

type LastUpdateCell = {
  label: string;
  icon: JSX.Element;
};

type AuthorCell = {
  label: string;
  status: PresenceBadgeStatus;
};

type Item = {
  id: number;
  file: FileCell;
  author: AuthorCell;
  lastUpdated: LastUpdatedCell;
  lastUpdate: LastUpdateCell;
};

export const EditableDataGrid = () => {
  const [dataId, setDataId] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [items, setItems] = useState([
    {
      id: 1,
      file: { label: "Meeting notes", icon: <DocumentRegular /> },
      author: { label: "Max Mustermann", status: "available" },
      lastUpdated: { label: "7h ago", timestamp: 1 },
      lastUpdate: {
        label: "You edited this",
        icon: <EditRegular />,
      },
    },
    {
      id: 2,
      file: { label: "Thursday presentation", icon: <FolderRegular /> },
      author: { label: "Erika Mustermann", status: "busy" },
      lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
      lastUpdate: {
        label: "You recently opened this",
        icon: <OpenRegular />,
      },
    },
    {
      id: 3,
      file: { label: "Training recording", icon: <VideoRegular /> },
      author: { label: "John Doe", status: "away" },
      lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
      lastUpdate: {
        label: "You recently opened this",
        icon: <OpenRegular />,
      },
    },
    {
      id: 4,
      file: { label: "Purchase order", icon: <DocumentPdfRegular /> },
      author: { label: "Jane Doe", status: "offline" },
      lastUpdated: { label: "Tue at 9:30 AM", timestamp: 3 },
      lastUpdate: {
        label: "You shared this in a Teams chat",
        icon: <PeopleRegular />,
      },
    },
  ]);

  const iterator = dataId.values();
  let id: number | undefined;
  for (const value of iterator) {
    id = value;
  }

  const columns: TableColumnDefinition<Item>[] = [
    createTableColumn<Item>({
      columnId: "file",
      compare: (a, b) => {
        return a.file.label.localeCompare(b.file.label);
      },
      renderHeaderCell: () => {
        return "File";
      },
      renderCell: (item) => {
        return (
          <TableCellLayout media={item.file.icon}>
            {item.file.label}
          </TableCellLayout>
        );
      },
    }),
    createTableColumn<Item>({
      columnId: "author",
      compare: (a, b) => {
        return a.author.label.localeCompare(b.author.label);
      },
      renderHeaderCell: () => {
        return "Author";
      },
      renderCell: (item) => {
        return (
          <TableCellLayout
            media={
              <Avatar
                aria-label={item.author.label}
                name={item.author.label}
                badge={{ status: item.author.status }}
              />
            }
          >
            {item.author.label}
          </TableCellLayout>
        );
      },
    }),
    createTableColumn<Item>({
      columnId: "lastUpdated",
      compare: (a, b) => {
        return a.lastUpdated.timestamp - b.lastUpdated.timestamp;
      },
      renderHeaderCell: () => {
        return "Last updated";
      },

      renderCell: (item) => {
        return item.lastUpdated.label;
      },
    }),
    createTableColumn<Item>({
      columnId: "lastUpdate",
      compare: (a, b) => {
        return a.lastUpdate.label.localeCompare(b.lastUpdate.label);
      },
      renderHeaderCell: () => {
        return "Last update";
      },
      renderCell: (item) => {
        return (
          <TableCellLayout media={item.lastUpdate.icon}>
            {item.lastUpdate.label}
          </TableCellLayout>
        );
      },
    }),
    createTableColumn<Item>({
      columnId: "actions",
      renderHeaderCell: () => {
        return "Actions";
      },
      renderCell: () => {
        return (
          <>
            <Button
              aria-label="Edit"
              icon={<EditRegular />}
              onClick={() => setIsEditable(true)}
            />
            <Dialog>
              <DialogTrigger disableButtonEnhancement>
                <Button aria-label="Delete" icon={<DeleteRegular />}></Button>
              </DialogTrigger>
              <DialogSurface>
                <DialogBody>
                  <DialogTitle>Dialog title</DialogTitle>
                  <DialogContent>
                    Sütunu silmek istediğine emin misin?
                  </DialogContent>
                  <DialogActions>
                    <DialogTrigger disableButtonEnhancement>
                      <Button appearance="secondary">Vazgeç</Button>
                    </DialogTrigger>
                    <Button
                      appearance="primary"
                      onClick={() => handleDelete(id)}
                    >
                      Sil
                    </Button>
                  </DialogActions>
                </DialogBody>
              </DialogSurface>
            </Dialog>
          </>
        );
      },
    }),
  ];

  const getCellFocusMode = (columnId: string): string => {
    switch (columnId) {
      case "singleAction":
        return "none";
      case "actions":
        return "group";
      default:
        return "cell";
    }
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <>
      <DataGrid
        items={items}
        columns={columns}
        selectionMode="single"
        getRowId={(item) => item.id}
        onSelectionChange={(_, data) => setDataId(data.selectedItems)}
      >
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody<Item>>
          {({ item, rowId }) => (
            <DataGridRow<Item>
              key={rowId}
              selectionCell={{ "aria-label": "Select row" }}
            >
              {({ renderCell, columnId }) => (
                <DataGridCell focusMode={getCellFocusMode(columnId)}>
                  {renderCell(item)}
                </DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </>
  );
};
