import { observer } from 'mobx-react';
import StoreTimer from '../../stores/storeTimer';
import './styles.css';

interface Props {
    readonly store: StoreTimer;
}

function convertTimeValueToString(value: number, length: number): string {
    const valueStr = String(value);
    if (valueStr.length < length) {

        let result = valueStr;
        for (let i = 0; i < length - valueStr.length; ++i) {
            result = `0${result}`;
        }

        return result;
    } else {
        return valueStr;
    }
}

/**
 * Время таймера
 */
const Time = observer((props: Props)=> {
    const date = props.store.value;
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();

    let result: string = `${convertTimeValueToString(minutes, 2)}:${convertTimeValueToString(seconds, 2)}.${convertTimeValueToString(milliseconds, 3)}`;

    if(hours > 0) {
        result = `${convertTimeValueToString(hours, 2)}:${result}`; 
    }

    return(<div className='time'>{result}</div>);
});

/**
 * Таймер
 * @param props 
 * @returns 
 */
export default function Timer (props: Props){
    return(
        <div className='timer'>
            <Time store={props.store}/>
            <div className='timerButtonsContainer'>
                <button onClick={props.store.eventToggleStartPause}>{'Start / Pause'}</button>
                <button onClick={props.store.eventReset}>{'Reset'}</button>
            </div>
        </div>
    );
}