class Timer {
    private _timerId:NodeJS.Timeout | undefined;
    private _timerStepMilliseconds: number;
    private _timerValue: Date | undefined;
    private _lastTickMilliseconds: number;

    public start(startValue: Date) {
        this._timerValue = startValue;
        this._lastTickMilliseconds = +new Date();
        this._createTimer();
    }

    public stop() {
        if (this._timerId) {
            clearTimeout(this._timerId);
        }
    }

    private _timerTick() {
        if (!this._timerValue) {
            return;
        }
        const currentDate: number = +new Date();
        const timerValueTimestamp: number = +this._timerValue;
        const delta = currentDate - this._lastTickMilliseconds;
        this._timerValue = new Date(timerValueTimestamp + delta);
        postMessage(this._timerValue);
        this._lastTickMilliseconds = currentDate;
        this._createTimer();
    }

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
    const value = e.data as Date;
    const timer = new Timer();
    timer.start(value); 
}