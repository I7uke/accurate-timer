import { observer } from 'mobx-react';
import StoreMain from '../../stores/storeMain';
import Timer from '../timer/timer';
import './styles.css';

interface Props {
    readonly store: StoreMain;
}

/**
 * Список таймеров
 * @param props 
 * @returns 
 */
function TimersList(props: Props) {
    const timersList = props.store.timersList;

    if (!timersList.length) {
        return (
            <div className='emptyTimersContainer'>
                <div className='emptyTimersMessage'>
                    {'Нет активных таймеров'}
                </div>
                <div className='emptyTimersButtonContainer'>
                    <button onClick={props.store.eventAddTimer}>Add timer</button>
                </div>
            </div>
        );
    }

    return (
        <div className='timersListContainer'>
            {timersList.map(store =>
                <Timer
                    key={store.timerId}
                    store={store}
                />)}
        </div>
    );
}

export default observer(TimersList);