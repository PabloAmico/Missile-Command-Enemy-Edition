// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    onclick:number = 0;


    time:number = 5;

    @property(cc.RichText)
    texto_1:cc.RichText = null;

    @property(cc.RichText)
    texto_2:cc.RichText = null;

    @property(cc.RichText)
    texto_3:cc.RichText = null;

    @property(cc.SceneAsset)
    ProximaScena:cc.Scene = null;

    @property(cc.Node)
    player:cc.Node = null;

    @property(cc.Integer)
    citysRemaining:number = 0;

    changeScene:boolean = false;

    timeChange:number = 2;


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.debug.setDisplayStats(false);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.OnMove, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.OffMove, this);

        this.player = cc.find("Player");
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        cc.director.preloadScene(this.ProximaScena.name);

    }

    start () {

    }

    update (dt) {
        if(this.texto_1.enabled && this.onclick == 1){
            this.texto_1.enabled = false;
           
        }else{
            if(!this.texto_2.getComponent(cc.RichText).enabled && this.time > 0 && !this.texto_1.enabled){
                
                this.texto_2.getComponent(cc.RichText).enabled = true;
                
            }else{
                if(this.time < 0){
                    this.texto_2.enabled = false;
                    this.texto_3.getComponent(cc.RichText).enabled = true;
                }
            }
        }

        if(!this.texto_1.enabled){
            this.time -= dt;
         
        }

        if(this.player.getComponent('Player').ObjectiveDestroyed){
            this.citysRemaining -= 1;
         
            this.player.getComponent('Player').ObjectiveDestroyed = false;
            
            
            if(this.citysRemaining <= 0){
                this.changeScene = true;
            }
        }

        if(this.changeScene){
            this.timeChange -=dt;
        }
        if(this.timeChange<=0){
            cc.director.loadScene(this.ProximaScena.name);
        }
    }

    OnMove(event){
        switch(event.keyCode){
            case cc.macro.KEY.space:
            this.onclick = 1;
            break;
                
        }
    }

    OffMove(event){
        switch(event.keyCode){
            case cc.macro.KEY.space:
            this.onclick = 0;
            break;
        }
    }
}
