import { DefaultDataGrid } from "./components/DefaultDataGrid";
import { MappedDataGrid } from "./components/MappedDataGrid";

function App() {
  return (
    <div>
      <h2>Default DataGrid</h2>
      <DefaultDataGrid />
      <br />
      <h2>Mapped DataGrid</h2>
      <MappedDataGrid />
    </div>
  );
}

export default App;
