import AppProvider from "./providers/AppProvider";
import AppRouter from "./routes/AppRoutes";

function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

export default App;
