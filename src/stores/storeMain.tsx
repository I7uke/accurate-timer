import { action, computed, makeObservable, observable } from "mobx";
import StoreTimer from "./storeTimer";

export default class StoreMain {

    //#region timersList
    private _timersList_observable: StoreTimer[];

    /**
     * Установить список таймеров
     * @param timersList 
     */
    private _setTimersList(timersList: StoreTimer[]) {
        this._timersList_observable = timersList;
    }

    /**
     * Список таймров
     */
    get timersList() {
        return this._timersList_observable;
    }
    //#endregion

    //#region События
    /**
     * Событие добавить новый таймер
     */
    public eventAddTimer() {
        const timersList = this._timersList_observable.slice();
        const newTimer: StoreTimer = new StoreTimer();
        newTimer.init();
        timersList.push(newTimer);
        this._setTimersList(timersList);
    }

    /**
     * Событие удалить последний таймер
     * @returns 
     */
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
    //#endregion

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