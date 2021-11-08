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

    @property(cc.Node)
    player:cc.Node = null;

    missileObjective:cc.Node = null;

    @property(cc.Node)
    canyon:cc.Node = null;

    @property(cc.Prefab)
    bullet:cc.Prefab = null;

    bulletInstantiate:cc.Node = null;

    @property(cc.Integer)
    timeInstantiate:number = 1;

    timeRemainingShoot:number =0;

    positionMissile:cc.Vec3 = null;

    @property(cc.Boolean)
    infinityMode:boolean = false;

   
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.player = cc.find("Player");
        
    }

    start () {

    }

    update (dt) {

        this.AssignObjective();
        this.Shoot(dt);
       
    }

    AssignObjective(){
        if(this.missileObjective == null && this.player.getComponent('Player').missileInstantiate != null){
            this.missileObjective = this.player.getComponent('Player').missileInstantiate;
           
        }else{
            if(this.missileObjective != null && this.player.getComponent('Player').missileInstantiate == null)
            this.missileObjective = null;
            
        }
    }

    Shoot(dt:number){
        this.timeRemainingShoot -= dt;
        if(this.timeRemainingShoot <=0){
            this.timeRemainingShoot = this.timeInstantiate;
            if(this.missileObjective != null){
                this.bulletInstantiate = cc.instantiate(this.bullet);
                this.node.getParent().addChild(this.bulletInstantiate);
                this.bulletInstantiate.setPosition(this.node.position);
                this.bulletInstantiate.getComponent('Bullet').inifinityMode = this.infinityMode;
                this.Distance(dt);
                
            }
        }
    }

   

     Distance(dt:number){
         if(this.missileObjective !=null){
            this.positionMissile = this.missileObjective.getComponentInChildren('ForwardCollider').position;

            if(this.positionMissile.x < this.node.position.x){
                this.bulletInstantiate.getComponent('Bullet').left = true;
            }else{
                this.bulletInstantiate.getComponent('Bullet').left = false;
            }

            if(this.missileObjective.y <= this.node.position.y + 250){
                this.positionMissile = this.missileObjective.position;
                this.bulletInstantiate.getComponent('Bullet').focusMissile = true;
            }else{
                if(this.missileObjective.y <= this.node.position.y){
                    this.positionMissile = this.missileObjective.position;
                    this.bulletInstantiate.getComponent('Bullet').focusMissile = true;
                }
            }

            
            this.bulletInstantiate.getComponent('Bullet').positionDestiny = new cc.Vec2(this.positionMissile.x,this.positionMissile.y);

            let accuracy = 100;

            accuracy = (Math.random() * accuracy)

            let angle = Math.atan2(this.bulletInstantiate.position.y - this.positionMissile.y + accuracy , this.bulletInstantiate.position.x - this.positionMissile.x + accuracy) * 180 / Math.PI;
            this.bulletInstantiate.angle = angle +90;   //establezco el angulo del proyectil.

            this.node.getComponentInChildren('ShootTurret').angle = angle + 90; //establezco el angulo de la torreta.
            this.canyon.getComponent('ShootTurret').positionCurrent = this.node.convertToWorldSpaceAR(this.canyon.position);
            let turret = this.node.getComponentInChildren('ShootTurret').positionCurrent;
           
            this.bulletInstantiate.setPosition(turret.x, turret.y);
            this.bulletInstantiate.getComponent('Bullet').rotation = angle;
        }
     }
}
