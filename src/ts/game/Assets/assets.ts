import { IGraphic, Graphic } from "../../gamelib/Elements/Graphic";
import { IAudioObject, AudioObject } from "../../gamelib/Elements/AudioObject";

export class AsteroidAssets {


    // graphics
    public terrain: IGraphic = new Graphic("res/img/terrain.png");
    public grass: IGraphic = new Graphic("res/img/grass25.png");
    public airBalloon: IGraphic = new Graphic("res/img/airBalloon.png");
    public fallingMan: IGraphic = new Graphic("res/img/fallingman.png");

    // sounds
    public flyInspire: IAudioObject = new AudioObject("res/sound/FlyInspire.mp3", true);
    public uplift: IAudioObject = new AudioObject("res/sound/uplift.mp3", true);
    public glassPing: IAudioObject = new AudioObject("res/sound/glassPing.mp3");
    public thrust: IAudioObject = new AudioObject("res/sound/thrust.wav");
    public explosion: IAudioObject = new AudioObject("res/sound/explosion.wav");
    public scream: IAudioObject = new AudioObject("res/sound/scream.mp3");
    public splat: IAudioObject = new AudioObject("res/sound/splat.mp3");


    public gMap:Map<string, IGraphic> = new Map<string,IGraphic>();

    public readonly width:number = 512;
    public readonly height:number = 480;
}