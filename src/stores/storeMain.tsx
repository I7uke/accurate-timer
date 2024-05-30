import { action, computed, makeObservable, observable } from "mobx";
import {v4 as uuidv4} from 'uuid';
import { TimerInfo } from "../models/timerInfo";
import StoreTimer from "./storeTimer";

export default class StoreMain {

    private _timersList_observable: StoreTimer[];

    private _setTimersList(timersList: StoreTimer[]) {
        this._timersList_observable = timersList;
    }

    get timersList() {
        return this._timersList_observable;
    }

    public eventAddTimer() {
        const timersList = this._timersList_observable.slice();
        const newTimer: StoreTimer = new StoreTimer();
        newTimer.init();
        timersList.push(newTimer);
        this._setTimersList(timersList);
    }

    public eventRemoveLastTimer() {
        if(!this._timersList_observable.length) {
            return;
        }

        const timersList = this._timersList_observable.slice();
        const timerRemoved = timersList.pop();

        if(timerRemoved) {
            timerRemoved.beforeDelete();
        }

        this._setTimersList(timersList);
    }

    constructor() {
        this.eventAddTimer = this.eventAddTimer.bind(this);
        this.eventRemoveLastTimer = this.eventRemoveLastTimer.bind(this);
        this._timersList_observable = [];

        makeObservable<this,
            | '_timersList_observable'
            | '_setTimersList'
        >(this, {
            _timersList_observable: observable.ref,
            _setTimersList: action,
            timersList: computed
        });
    }

}