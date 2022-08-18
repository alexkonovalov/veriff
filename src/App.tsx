import styles from "./App.module.scss";
import { Verification } from "./components/Verification/Verification";

function App() {
    return (
        <div className={styles.App}>
            <div></div>
            <Verification />
        </div>
    );
}

export default App;
