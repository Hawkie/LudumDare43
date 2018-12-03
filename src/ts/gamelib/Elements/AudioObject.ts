export interface IAudioObject {
    playOnce(): void;
    play(): void;
    replay(): void;
    pause(): void;
    reset(): void;
}

export class AudioObject implements IAudioObject {
    private audioElement: HTMLAudioElement;
    private _ready: boolean = false;
    private _playing: boolean = false;
    private get ready(): boolean { return this._ready; }
    private get playing(): boolean { return this._playing; }

    constructor(private source: string,
        private loop: boolean = false) {
        this.audioElement = new Audio(this.source);
        this.audioElement.oncanplay = this.canplay.bind(this);
        this.audioElement.onloadeddata = this.loaded.bind(this);
        this.audioElement.loop = this.loop;
    }

    private canplay(ev: Event): void {
        console.log("canplay: " + this.source);
        this._ready = true;
    }

    private loaded(ev:Event): void {
        console.log("loaded: " + this.source);
    }

    // call this multiple times and it will only play audio once when ready. (may repeat if loop is true)
    playOnce(): void {
        if (this.ready) {
            if (!this.playing) {
                this._play();
            }
        }
    }

    reset(): void {
        this._playing = false;
        this.audioElement.currentTime = 0;
    }

    play(): void {
        if (this.ready) {
            this._play();
        }
    }

    // each time this is called it will play audio from beginning
    replay(): void {
        if (this.ready) {
            this.audioElement.pause();
            this.audioElement.currentTime = 0;
            this._play();
        }
    }

    pause(): void {
        if (this.ready) {
            this.audioElement.pause();
        }
    }

    private _play(): void {
        let p: Promise<void> = this.audioElement.play();
        if (p !== undefined) {
            p.then(r => {
                this._playing = true;
                console.log("played: " + this.source);
            });
            p.catch(e => {
                console.log("play failed: " + this.source);
            });
       }
    }
}