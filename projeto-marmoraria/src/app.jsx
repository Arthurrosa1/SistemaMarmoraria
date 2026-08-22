import AppRoutes from "./routes/appRoutes";
import { DataProvider } from "./data/DataContext";

function App() {
  return (
    <DataProvider>
      <AppRoutes />
    </DataProvider>
  );
}

export default App;