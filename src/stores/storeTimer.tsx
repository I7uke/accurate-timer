import { action, computed, makeObservable, observable } from "mobx";
import {v4 as uuidv4} from 'uuid';

export default class StoreTimer {
    /**
     * Флаг таймер запущен/пауза
     */
    private _isTimerRun: boolean;
    /**
     * Отдельный Worker для таймера
     */
    private _webWorker?: Worker;
    /**
     * id таймера
     */
    public readonly timerId: string;

    /**
     * Создать Worker
     */
    private _createWorker() {
        // Создаем Worker
        this._webWorker = new Worker(new URL('../worker', import.meta.url));
        //Добавляем слушатель
        this._webWorker.onmessage = ((e) => {
            let newValue: number = 0;
            if(typeof e.data === 'number' ) {
                newValue = e.data;
            }

            this._setValue(new Date(newValue));
        });

        const initValue: number = +this._value_observable;
        // Отправляем начальное значение таймеру
        this._webWorker.postMessage(initValue);
    }

    /**
     * Уничтожить Worker
     */
    private _destroyWorker() {
        if(this._webWorker) {
            // Прекращение работы worker-а
            this._webWorker.terminate();
            // Забываем ссылку на worker
            this._webWorker = undefined;
        }
    }

    /**
     * Получить дату без времени
     * @returns 
     */
    private _getEmptyDate(): Date {
        const date: Date = new Date();
        date.setHours(0, 0, 0, 0);
        return date;
    }

    //#region Текущее значение таймера
    private _value_observable: Date;

    private _setValue(date: Date) {
        this._value_observable = date;
    }

    /**
     * Текущее значение таймера
     */
    get value() {
        return this._value_observable;
    }
    //#endregion

    //#region 
    /**
     * Событие  переключить состояние таймера Start/Pause
     */
    public eventToggleStartPause() {
        if (this._isTimerRun) {
            // Таймер запущен, уничтодаем worker
            this._destroyWorker();
            // Меняем флаг, таймер выключен
            this._isTimerRun = false;
        } else {
            //Таймер выключен, создаем worker
            this._createWorker();
            // Меняем флаг, таймер включен
            this._isTimerRun = true;
        }
    }

    /**
     * Событие сбросить таймер
     */
    public eventReset() {
        // Сбрасываем значение таймера
        this._setValue(this._getEmptyDate());

        if (this._isTimerRun) {
            // Если таймер включен, удаляем worker
            this._destroyWorker();
            // Создаем новый worker
            this._createWorker();
        }
    }
    //#endregion

    /**
     * Инициализация таймера
     */
    public init() {
        // Создаем worker
        this._createWorker();
    }

    /**
     * Вызывать перед удалением таймера
     */
    public beforeDelete() {
        // Удаляем worker
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