class Timer {
    // id таймера
    private _timerId:NodeJS.Timeout | undefined;
    // Шаг таймера
    private _timerStepMilliseconds: number;
    // Текущее значение таймера
    private _timerValue: Date | undefined;
    // Время последнего тика таймера
    private _lastTickMilliseconds: number;

    /**
     * Запустить таймер
     * @param startValue 
     */
    public start(startValue: Date) {
        this._timerValue = startValue;
        this._lastTickMilliseconds = +new Date();
        this._createTimer();
    }

    /**
     * Остановить таймер
     */
    public stop() {
        if (this._timerId) {
            clearTimeout(this._timerId);
        }
    }

    /**
     * Тик таймера
     * @returns 
     */
    private _timerTick() {
        if (!this._timerValue) {
            return;
        }

        // Получаем время тика
        const currentDate: number = +new Date();
        // Получаем текущее значение таймера в timestamp 
        const timerValueTimestamp: number = +this._timerValue;
        // Считаем разницу между текущим временем и последним тиком
        const delta = currentDate - this._lastTickMilliseconds;
        // Получаем новое значение таймера
        this._timerValue = new Date(timerValueTimestamp + delta);
        // Отправляем новое значение таймера на UI
        postMessage(this._timerValue);
        // Запоминаем дату тика
        this._lastTickMilliseconds = currentDate;
        // Создаем новый таймер
        this._createTimer();
    }

    /**
     * Создать таймер
     */
    private _createTimer(){
        this._timerId = setTimeout(this._timerTick, this._timerStepMilliseconds);
    }
    
    constructor() {
        this._timerTick = this._timerTick.bind(this);
        this._timerId = undefined;
        this._timerStepMilliseconds = 50;
        this._timerValue = undefined;
        this._lastTickMilliseconds= 0;
    }
}

onmessage = function (e) {
    // Получаем начальное значение таймера
    const value = e.data as Date;
    // Создаем таймер
    const timer = new Timer();
    // Запускаем таймер
    timer.start(value); 
}