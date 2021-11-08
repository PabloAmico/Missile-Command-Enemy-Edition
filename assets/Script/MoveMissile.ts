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

    rotationLeft:number = 0;

    rotationRight:number = 0;

    @property(cc.Integer)
    velocityRotation:number = 0;

    @property(cc.Integer)
    rotation:number = 0;

    @property(cc.Integer)
    angleRadian:number =0;

    @property(cc.Integer)
    velocity:number = 0;

    @property(cc.Node)
    forward:cc.Node = null;

    @property(cc.Boolean)
    destroyMe:boolean = false;

    @property(cc.Boolean)
    on_Destroy:boolean = false;

    @property(cc.Boolean)
    ObjectiveDestroyed:boolean = false;

    @property(cc.Boolean)
    bulletHit:boolean = false;


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.OnMove, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.OffMove, this);
        
            this.node.angle = (this.rotation);
    }

    start () {

    }

    update (dt) {
        if(this.rotationLeft == 1){
            //let vel = this.velocityRotation * dt;
           this.rotation += this.velocityRotation * dt;
            this.node.angle = (this.rotation);
            if(this.rotation >= 360){
                this.rotation = 0;
            }
        }

        if(this.rotationRight == 1){
            //let vel = this.velocityRotation * dt;
            //this.velocityRotation += vel;
            this.rotation -= this.velocityRotation * dt;
            this.node.angle = (this.rotation);
            if(this.rotation <= -360){
                this.rotation = 0;
            }
        }

        this.angleRadian = cc.misc.degreesToRadians(this.rotation);

        if(!this.destroyMe){
        this.node.setPosition((this.node.position.x -= ((Math.cos(this.angleRadian) * this.velocity))), (this.node.position.y -= ((Math.sin(this.angleRadian) * this.velocity))));
    
        this.forward.getComponent('ForwardCollider').position = this.node.convertToWorldSpaceAR(this.forward.position);
        }

        if(this.on_Destroy){
            
            let anim = this.node.getComponent(cc.Animation).getAnimationState("missile");
            if(!anim.isPlaying){
                this.node.destroy();
            }
        }
    }

    OnMove(event){
        switch(event.keyCode){
            case cc.macro.KEY.d:
                this.rotationRight = 1;
                break; 
            
            case cc.macro.KEY.a:
                this.rotationLeft = 1;
                break; 
        }
    }

    OffMove(event){
        switch(event.keyCode){
            case cc.macro.KEY.d:
                this.rotationRight = 0;
                break; 
            
            case cc.macro.KEY.a:
                this.rotationLeft = 0;
                break; 
        }
    }

    onCollisionEnter(other,self){
        if(other.node.group == "City"){
           // console.log("colision");
            if(other.node.getComponent('CityScript').city_Safe){
                this.ObjectiveDestroyed = true;
                
            }
            this.node.getComponent(cc.Animation).play("missile");
            this.destroyMe = true;
        }

        if(other.node.group == "Expansiva"){
            this.destroyMe = true;
            this.bulletHit = true;
            this.node.getComponent(cc.Animation).play("missile");
        }

        if(other.node.group == "Bullet"){
            this.destroyMe = true;
            this.bulletHit = true;
            this.node.getComponent(cc.Animation).play("missile");
        }

        if(other.node.group == "Marco"){
            this.destroyMe = true;
            this.bulletHit = true;
            this.node.getComponent(cc.Animation).play("missile");
        }

        if(other.node.group == "Mountain"){
            this.destroyMe = true;
            this.bulletHit = true;
            this.node.getComponent(cc.Animation).play("missile");
        }
    }
}
