// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    @property(cc.Node)
    Score:cc.Node = null;

    highScore:number = null;

    @property(cc.Label)
    labelHighScore:cc.Label;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.debug.setDisplayStats(false);
        this.Score = cc.find("Score");
        this.Score.setPosition(640,375);
        this.Score.getComponent(cc.Label).string = this.Score.getComponent('Score').scoreNumber;
        this.loadHighScore();
}

    start () {

    }

    loadHighScore(){
        this.highScore = cc.sys.localStorage.getItem('Time');
        let aux = this.Score.getComponent('Score').scoreNumber;
        if(this.highScore == null){
            cc.sys.localStorage.setItem('Time', aux);
            this.highScore = cc.sys.localStorage.getItem('Time');
            console.log("entre en if");
        }else{
            if(this.highScore < this.Score.getComponent('Score').scoreNumber){
                console.log("Entre en else");
                cc.sys.localStorage.setItem('Time', aux);
                this.highScore = cc.sys.localStorage.getItem('Time');
            }
        }
    }

    update (dt) {
        this.labelHighScore.getComponent(cc.Label).string = "HighScore " + this.highScore;
    }
}
