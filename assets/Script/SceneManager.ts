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

    @property(cc.Node)
    player:cc.Node = null;

    @property(cc.Integer)
    citysRemaining:number = 0;

    cityTotal:number = 0;

    changeScene:boolean = false;

    timeChange:number = 2;

    @property(cc.SceneAsset)
    ProximaScena:cc.Scene = null;

    @property(cc.Boolean)
    lessPoint:boolean = false;
    
    @property(cc.Node)
    city_1:cc.Node = null;
    
    @property(cc.Node)
    city_2:cc.Node = null;
   
    @property(cc.Node)
    city_3:cc.Node = null;
    
    @property(cc.Node)
    city_4:cc.Node = null;
    
    @property(cc.Node)
    city_5:cc.Node = null;
   
    @property(cc.Node)
    city_6:cc.Node = null;

    private CityArrays: cc.Node[] = [];


    // LIFE-CYCLE CALLBACKS:

     onLoad () {
         
        this.player = cc.find("Player");
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        cc.director.preloadScene(this.ProximaScena.name);

        this.Score = cc.find("Score");
     }

    start () {
        cc.debug.setDisplayStats(false);
       this.CityArrays[0] = this.city_1;
       this.CityArrays[1] = this.city_2;
       this.CityArrays[2] = this.city_3;
       this.CityArrays[3] = this.city_4;
      this.CityArrays[4] = this.city_5;
       this.CityArrays[5] = this.city_6;
       this.cityTotal = this.citysRemaining;
    }

    update (dt) {
        if(this.player.getComponent('Player').ObjectiveDestroyed){
            this.citysRemaining -= 1;
            this.Score.getComponent('Score').scoreNumber += 50;
            this.player.getComponent('Player').ObjectiveDestroyed = false;
            console.log("destroy");
            console.log(this.citysRemaining);
            if(this.citysRemaining <= 0){
                this.changeScene = true;
            }
        }

        if(this.player.getComponent('Player').lessPoints){
            this.player.getComponent('Player').lessPoints = false;
            this.Score.getComponent('Score').scoreNumber -= 10;
            if(this.Score.getComponent('Score').scoreNumber <= 0){
                this.Score.getComponent('Score').scoreNumber = 0;
            }
        }

        if(this.changeScene){
            this.timeChange -=dt;
            if(this.timeChange<=0){
                cc.director.loadScene(this.ProximaScena.name);
            }
        }
        

        this.ViewScore(dt);
       
        let auxCity = 0;
        for(let i =0; i< this.cityTotal; i++){
            if(!this.CityArrays[i].getComponent('CityScript').city_Safe && this.CityArrays[i] != null){
                auxCity += auxCity;
            }
        }
        if(auxCity >= this.cityTotal){
            this.changeScene = true;
        }
        
    }

    ViewScore(dt:number){
        this.Score.getComponent(cc.Label).string = ""+ this.Score.getComponent('Score').scoreNumber;
       // this.Score.setPosition(this.node.position.x - 550, this.node.position.y + 300);
    }
}
