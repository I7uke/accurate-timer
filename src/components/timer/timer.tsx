import { observer } from 'mobx-react';
import { TimerInfo } from '../../models/timerInfo';
import './styles.css';
import StoreMain from '../../stores/storeMain';
import StoreTimer from '../../stores/storeTimer';

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