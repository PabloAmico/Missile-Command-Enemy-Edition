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

    timeChanges:number = 0;

    @property(cc.Node)
    turret_1:cc.Node = null;

    @property(cc.Node)
    turret_2:cc.Node = null;

    @property(cc.Node)
    turret_3:cc.Node = null;

    turretMax:boolean = false;

    turns:number = 0;

    @property(cc.Node)
    player:cc.Node = null;

    @property(cc.Node)
    Scorelabel:cc.Node = null;

    timeScore:number = 0;

    @property(cc.Label)
    instrucciones:cc.Label = null;


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.OnMove, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.OffMove, this);

        cc.director.preloadScene("Game Over InfinityMode");
    }

    start () {
        this.turret_1.getComponent('Turret').infinityMode = true;
        this.turret_2.getComponent('Turret').infinityMode = true;
        this.turret_3.getComponent('Turret').infinityMode = true;
    }

    update (dt) {
        if(!this.instrucciones.node.active){
            this.timeScore += dt;

            if(this.timeScore >= 1){
                this.Scorelabel.getComponent('Score').scoreNumber += 1;
                this.timeScore = 0;
            }
            this.timeChanges += dt;

            if(!this.turretMax){
                if(this.turret_1.active && this.timeChanges >=10 && !this.turret_2.active){
                    this.turret_2.active = true;
                    this.timeChanges =0;
                }else{
                    if(this.turret_2.active && this.timeChanges >= 10 && !this.turret_3.active){
                        this.turret_3.active = true;
                        this.turretMax = true;
                        this.timeChanges = 0;
                    
                    }
                }
            }else{
                if(this.timeChanges >= 10 && this.turns == 0 && !this.player.getComponent('Player').infinityMode){
                    this.player.getComponent('Player').infinityMode = true;
                    this.turns = 1;
                    this.timeChanges = 0;
                    console.log("aumente velocidad");
                }else{
                    if(this.player.getComponent('Player').infinityMode){
                        this.player.getComponent('Player').infinityMode = false;
                    }
                    if(this.timeChanges >= 10 && this.turns == 1){
                        if(this.turret_1.getComponent('Turret').timeInstantiate >= 1.2){
                            this.turret_1.getComponent('Turret').timeInstantiate -= 0.2;
                            this.turret_2.getComponent('Turret').timeInstantiate -= 0.2;
                            this.turret_3.getComponent('Turret').timeInstantiate -= 0.2;
                            this.timeChanges = 0;
                            this.turns = 0;
                            console.log("aumente torreta");
                        }
                    
                    }
                }
            }


            this.Scorelabel.getComponent(cc.Label).string = ""+ this.Scorelabel.getComponent('Score').scoreNumber;
            this.Scorelabel.setPosition(this.node.position.x - 550, this.node.position.y + 300);
        }else{
            if(this.instrucciones.node.active && this.onclick == 1){
                this.instrucciones.node.active = false;
            }

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
