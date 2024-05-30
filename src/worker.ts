class Timer {
    // id таймера
    private _timerId: NodeJS.Timeout | undefined;
    // Шаг таймера
    private _timerStepMilliseconds: number;
    // Текущее значение таймера
    private _timerValue: number;
    // Время последнего тика таймера
    private _lastTickMilliseconds: number;

    /**
     * Запустить таймер
     * @param startValue 
     */
    public start(startValue: number) {
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
        // Считаем разницу между текущим временем и последним тиком
        const delta = currentDate - this._lastTickMilliseconds;
        // Получаем новое значение таймера
        this._timerValue = this._timerValue + delta;
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
    private _createTimer() {
        this._timerId = setTimeout(this._timerTick, this._timerStepMilliseconds);
    }

    constructor() {
        this._timerTick = this._timerTick.bind(this);
        this._timerId = undefined;
        this._timerStepMilliseconds = 60;
        this._timerValue = 0;
        this._lastTickMilliseconds = 0;
    }
}

onmessage = function (e) {
    // Получаем начальное значение таймера
    let value: number = 0;

    if (typeof e.data === 'number') {
        value = e.data;
    }
    // Создаем таймер
    const timer = new Timer();
    // Запускаем таймер
    timer.start(value);
}