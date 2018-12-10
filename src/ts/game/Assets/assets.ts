import { IImageElement, ImageElement } from "../../gamelib/Elements/ImageElement";
import { IAudioElement, AudioElement } from "../../gamelib/Elements/AudioElement";

export class Assets {


    // graphics
    public terrain: IImageElement = new ImageElement("res/img/terrain.png");
    public grass: IImageElement = new ImageElement("res/img/grass25.png");
    public airBalloon: IImageElement = new ImageElement("res/img/airBalloon.png");
    public fallingMan: IImageElement = new ImageElement("res/img/fallingman.png");

    // sounds
    // music
    public flyInspire: IAudioElement = new AudioElement("res/sound/flyInspire.mp3", true);
    public cinematic: IAudioElement = new AudioElement("res/sound/cinematic.mp3", true);
    public emotional: IAudioElement = new AudioElement("res/sound/emotional.mp3", true);
    // sound fx
    public glassPing: IAudioElement = new AudioElement("res/sound/glassPing.mp3");
    public thrust: IAudioElement = new AudioElement("res/sound/thrust.mp3");
    public explosion: IAudioElement = new AudioElement("res/sound/explosion.mp3");
    public scream: IAudioElement = new AudioElement("res/sound/scream.mp3");
    public splat: IAudioElement = new AudioElement("res/sound/splat.mp3");


    public gMap:Map<string, IImageElement> = new Map<string,IImageElement>();

    public readonly width:number = 480;
    public readonly height:number = 512;
}