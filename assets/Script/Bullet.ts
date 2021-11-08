// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    @property(cc.Integer)
    velocity:number = 200;

    @property(cc.Integer)
    rotation:number = null;

    create:boolean = false;

    angleRadian:number = 0;

    @property(cc.Vec2)
    positionDestiny:cc.Vec2 = null;

    @property(cc.Prefab)
    explosion:cc.Prefab = null;

    explisionInstantiate:cc.Node = null;

    is_Destroy:boolean = false;

    @property(Boolean)
    left:boolean = false;

    @property(cc.Boolean)
    focusMissile=false;

    @property(cc.Boolean)
    inifinityMode=false;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    update (dt) {
        if(!this.create && this.rotation != null){
            this.create = true;
            this.angleRadian = cc.misc.degreesToRadians(this.rotation);
            
        }

        if(this.rotation != null){
            this.node.setPosition(this.node.position.x -= ((Math.cos(this.angleRadian) * this.velocity)), this.node.position.y -= ((Math.sin(this.angleRadian) * this.velocity)));
        }

        if(this.is_Destroy){
            this.node.destroy();
        }
        this.checkPostionExplosion();
    }

    checkPostionExplosion(){
            if(!this.focusMissile){
                 if(this.node.position.y >= 500 && !this.inifinityMode){
                     this.explisionInstantiate = cc.instantiate(this.explosion);
                     this.node.getParent().addChild(this.explisionInstantiate);
                     this.explisionInstantiate.setPosition(this.node.position);
                     this.is_Destroy = true;
                 }else{
                    if(this.left && this.node.position.x <= this.positionDestiny.x){
                    this.explisionInstantiate = cc.instantiate(this.explosion);
                    this.node.getParent().addChild(this.explisionInstantiate);
                    this.explisionInstantiate.setPosition(this.node.position);
                    this.explisionInstantiate.getComponent('Circle_Explosion').infinityMode = this.inifinityMode;
                    this.is_Destroy = true;
                    }else{
                        if(!this.left && this.node.position.x >= this.positionDestiny.x){
                            this.explisionInstantiate = cc.instantiate(this.explosion);
                            this.node.getParent().addChild(this.explisionInstantiate);
                            this.explisionInstantiate.setPosition(this.node.position);
                            this.explisionInstantiate.getComponent('Circle_Explosion').infinityMode = this.inifinityMode;
                            this.is_Destroy = true;
                        }
                    }
                }
            }
        }
   
   onCollisionEnter(other, self){
       if(other.node.group == "Misil"){
        this.explisionInstantiate = cc.instantiate(this.explosion);
        this.node.getParent().addChild(this.explisionInstantiate);
        this.explisionInstantiate.setPosition(this.node.position);
        this.is_Destroy = true;
       }

       if(other.node.group == "Marco"){
        this.explisionInstantiate = cc.instantiate(this.explosion);
        this.node.getParent().addChild(this.explisionInstantiate);
        this.explisionInstantiate.setPosition(this.node.position);
        this.is_Destroy = true;
       }
   }
}
