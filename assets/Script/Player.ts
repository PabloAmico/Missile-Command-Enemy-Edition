// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Canvas)
    canvas:cc.Canvas = null;

    moveLeft:number = 0;

    moveRight:number = 0;

    shoot:number = 0;

    @property(cc.Integer)
    velocity:number = 0;

    @property(cc.Prefab)
    MissilePrefab:cc.Prefab = null;

    @property(cc.Prefab)
    forwardPrefab:cc.Prefab = null;

    @property(cc.Node)
    forwardInstantiate:cc.Node = null;

    @property(cc.Node)
    missileInstantiate:cc.Node = null;

    @property(cc.Boolean)
    desMissile:boolean = false

    temporizador:number = 0;

    ahora:boolean = false;

    @property(cc.Node)
    destroyMissile:cc.Node = null;

    @property(cc.Boolean)
    ObjectiveDestroyed:boolean = false;

    @property(cc.Boolean)
    lessPoints:boolean = false;

    bandera:boolean = false;

    timerespawn:number = 1;

    @property(cc.Boolean)
    infinityMode:boolean = false;

    velocityCurrent:number = 4;
    rotationCurrent:number = 200;

    //1185 - 95
    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.OnKey, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.OffKey, this);
     }

    start () {

    }

    update (dt) {

        

        //console.log(this.ObjectiveDestroyed);
        //console.log(this.missileInstantiate);

        if(!this.ObjectiveDestroyed && !this.bandera && this.missileInstantiate != null){
           // console.log("entre 1");
            if(this.missileInstantiate.getComponent('MoveMissile').ObjectiveDestroyed){
                console.log("entre 2");
                this.ObjectiveDestroyed = this.missileInstantiate.getComponent('MoveMissile').ObjectiveDestroyed;
                this.bandera = true;
            }
        }else{
                if(!this.ObjectiveDestroyed && this.bandera){
                    this.bandera = false;
                 //   console.log("bandera");
                }
            }
        

        this.DestroyMissile();

        if(this.moveLeft == 1 && this.missileInstantiate == null){
            this.node.setPosition(this.node.position.x -= this.velocity * dt, this. node.position.y);
        }

        if(this.moveRight == 1 && this.missileInstantiate == null){
            this.node.setPosition(this.node.position.x += this.velocity * dt, this. node.position.y);
        }

        if(this.shoot == 1 && this.missileInstantiate == null && this.timerespawn <= 0){
            this.timerespawn = 1.5;
            this.InstantiateMissile();
            
        }

        if(this.node.position.x >= 1185){
            this.node.setPosition(1185, this.node.position.y);
        }else{
            if(this.node.position.x <= 95){
                this.node.setPosition(95, this.node.position.y);
            }
        }

        this.timerespawn -=dt;
       
    }

    InstantiateMissile(){
        this.missileInstantiate = cc.instantiate(this.MissilePrefab);
        this.node.getParent().addChild(this.missileInstantiate);
        console.log(this.missileInstantiate.getParent().name);
        if(this.infinityMode){
            this.velocityCurrent +=1;
            this.rotationCurrent +=100;
            this.infinityMode = false;
            this.missileInstantiate.getComponent('MoveMissile').velocityRotation = this.rotationCurrent;
            this.missileInstantiate.getComponent('MoveMissile').velocity = this.velocityCurrent;
        }
        //this.missileInstantiate.setPosition(this.node.position.x - this.canvas.node.width/2, this.node.position.y / this.canvas.node.height/2);
        this.missileInstantiate.setPosition(this.node.position);

    }

    DestroyMissile(){
        if(this.missileInstantiate != null){
            this.desMissile = this.missileInstantiate.getComponent('MoveMissile').destroyMe;

            //console.log(this.desMissile);
        }
        if(this.desMissile && this.missileInstantiate != null){
            this.timerespawn = 1;
            if(this.missileInstantiate.getComponent('MoveMissile').bulletHit){
                this.lessPoints = true;
                console.log("entre");
            }
            this.missileInstantiate.getComponent('MoveMissile').on_Destroy = true;
            this.missileInstantiate = null;
        }
    }

    OnKey(event){
        switch(event.keyCode){
            case cc.macro.KEY.d:
                this.moveRight = 1;
                break;
            
            case cc.macro.KEY.a:
                this.moveLeft = 1;
                break;


            case cc.macro.KEY.space:
                this.shoot = 1;
                break;
        }
    }


    OffKey(event){
        switch(event.keyCode){
            case cc.macro.KEY.d:
                this.moveRight = 0;
                break;
            
            case cc.macro.KEY.a:
                this.moveLeft = 0;
                break;


            case cc.macro.KEY.space:
                this.shoot = 0;
                break;
        }
    }

    
}
