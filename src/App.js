import "./styles.scss";
import { GridProvider } from "./GridContext";
import Sidebar from "./components/Sidebar";
import Grid from "./components/Grid";
import CodePanel from "./components/CodePanel";
import ScreenSizeAlert from "./components/ScreenSizeAlert";

export default function App() {
  return (
    <div className="App">
      <GridProvider>
        <Sidebar />
        <Grid />
        <CodePanel />
        <ScreenSizeAlert />
      </GridProvider>
    </div>
  );
}
