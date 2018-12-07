import { IGraphic, Graphic } from "../../gamelib/Elements/Graphic";
import { IAudioObject, AudioObject } from "../../gamelib/Elements/AudioObject";

export class Assets {


    // graphics
    public terrain: IGraphic = new Graphic("res/img/terrain.png");
    public grass: IGraphic = new Graphic("res/img/grass25.png");
    public airBalloon: IGraphic = new Graphic("res/img/airBalloon.png");
    public fallingMan: IGraphic = new Graphic("res/img/fallingman.png");

    // sounds
    // music
    public flyInspire: IAudioObject = new AudioObject("res/sound/flyInspire.mp3", true);
    public cinematic: IAudioObject = new AudioObject("res/sound/cinematic.mp3", true);
    public emotional: IAudioObject = new AudioObject("res/sound/emotional.mp3", true);
    // sound fx
    public glassPing: IAudioObject = new AudioObject("res/sound/glassPing.mp3");
    public thrust: IAudioObject = new AudioObject("res/sound/thrust.mp3");
    public explosion: IAudioObject = new AudioObject("res/sound/explosion.mp3");
    public scream: IAudioObject = new AudioObject("res/sound/scream.mp3");
    public splat: IAudioObject = new AudioObject("res/sound/splat.mp3");


    public gMap:Map<string, IGraphic> = new Map<string,IGraphic>();

    public readonly width:number = 480;
    public readonly height:number = 512;
}