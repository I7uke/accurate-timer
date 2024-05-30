import { action, computed, makeObservable, observable } from "mobx";
import {v4 as uuidv4} from 'uuid';

export default class StoreTimer {
    private _isTimerRun: boolean;
    private _webWorker?: Worker;
    public readonly timerId: string;

    private _createWorker() {
        this._webWorker = new Worker(new URL('../worker', import.meta.url));
        this._webWorker.onmessage = ((e) => {
            const newValue: Date = e.data as Date;
            this._setValue(newValue);
        });

        this._webWorker.postMessage(this._value_observable);
    }

    private _destroyWorker() {
        if(this._webWorker) {
            this._webWorker.terminate();
            this._webWorker = undefined;
        }
    }

    private _getEmptyDate(): Date {
        const date: Date = new Date();
        date.setHours(0, 0, 0, 0);
        return date;
    }

    private _value_observable: Date;

    private _setValue(date: Date) {
        this._value_observable = date;
    }

    get value() {
        return this._value_observable;
    }

    public eventToggleStartPause() {
        if(this._isTimerRun){
            this._destroyWorker();
            this._isTimerRun = false;
        } else {
            this._createWorker();
            this._isTimerRun = true;
        }
    }

    public eventReset() {
        this._setValue(this._getEmptyDate());

        if (this._isTimerRun) {
            this._destroyWorker();
            this._createWorker();
        }
    }

    public init() {
        this._createWorker();
    }

    public beforeDelete() {
        this._destroyWorker();
    }

    constructor(){
        this.eventToggleStartPause = this.eventToggleStartPause.bind(this);
        this.eventReset = this.eventReset.bind(this);

        this._isTimerRun = true;
        this._webWorker = undefined;
        this._value_observable = this._getEmptyDate();
        this.timerId = uuidv4();

        makeObservable<this,
            | '_value_observable'
            | '_setValue'
        >(this, {
            _value_observable: observable.ref,
            _setValue: action,
            value: computed
        });
    }
}