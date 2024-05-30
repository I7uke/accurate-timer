import ActionButtons from "./components/actionButtons/actionButtons";
import TimersList from "./components/timersList/timersList";
import StoreMain from "./stores/storeMain";

interface Props {
    readonly storeMain: StoreMain;
}

export default function App(props: Props) {
    return(
        <div>
            <ActionButtons 
                eventAddTimer={props.storeMain.eventAddTimer}
                eventRemoveTimer={props.storeMain.eventRemoveLastTimer}
            />
            
            <TimersList store={props.storeMain}/>
        </div>
    );
}