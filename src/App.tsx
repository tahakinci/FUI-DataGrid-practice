import { DefaultDataGrid } from "./components/DefaultDataGrid";
import { EditableDataGrid } from "./components/EditableDataGrid";
function App() {
  return (
    <div>
      <h2>Default DataGrid</h2>
      <DefaultDataGrid />
      <br />
      <h2>Mapped DataGrid</h2>
      <EditableDataGrid />
    </div>
  );
}

export default App;
