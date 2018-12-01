import { IGraphic, Graphic } from "../../gamelib/Elements/Graphic";
import { IAudioObject, AudioObject } from "../../gamelib/Elements/AudioObject";

export class AsteroidAssets {


    // graphics
    public terrain: IGraphic = new Graphic("res/img/terrain.png");
    public grass: IGraphic = new Graphic("res/img/grass25.png");
    public coinSprite: IGraphic = new Graphic("res/img/spinningCoin.png");
    public graphicShip: IGraphic = new Graphic("res/img/ship.png");
    public airBalloon: IGraphic = new Graphic("res/img/hotAirBalloon.png");
    public airBalloon2: IGraphic = new Graphic("res/img/hotAirBalloon2.png");

    // sounds
    public flyInspire: IAudioObject = new AudioObject("res/sound/FlyInspire.mp3", true);
    public uplift: IAudioObject = new AudioObject("res/sound/uplift.mp3", true);
    public blast: IAudioObject = new AudioObject("res/sound/blast.wav");
    public thrust: IAudioObject = new AudioObject("res/sound/thrust.wav");
    public gun: IAudioObject = new AudioObject("res/sound/raygun-01.mp3");
    public explosion: IAudioObject = new AudioObject("res/sound/explosion.wav");
    public scream: IAudioObject = new AudioObject("res/sound/scream.mp3");


    public gMap:Map<string, IGraphic> = new Map<string,IGraphic>();

    public readonly width:number = 512;
    public readonly height:number = 480;
}