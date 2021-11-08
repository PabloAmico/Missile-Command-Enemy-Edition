// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    tempo:number = 0;

    @property(cc.Boolean)
    infinityMode = false;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {}

    start () {

    }

    update (dt) {
        
        let size = this.node.getContentSize();
        if(!this.infinityMode){
            if(size.height <= 100){
                this.node.setContentSize(cc.size(size.width += 20*dt, size.height += 20 *dt));
                size = this.node.getContentSize();
                this.node.getComponent(cc.CircleCollider).radius = size.width /2;
            }else{
                this.tempo +=dt;
                if(this.tempo >= 1){
                    this.node.destroy();
                }
            }
        }else{
            //console.log("Infinity mode");
            if(size.height <= 100){
                this.node.setContentSize(cc.size(size.width += 40*dt, size.height += 40 *dt));
                size = this.node.getContentSize();
                this.node.getComponent(cc.CircleCollider).radius = size.width /2;
            }else{
                this.tempo +=dt;
                
                    if(this.tempo >= 0.5){
                        this.node.destroy();
                    }
                console.log("tiempo en infinity = " + this.tempo);
            }
        }
        /*if(this.infinityMode){
            if(this.tempo >= 0.5){
                this.node.destroy();
            }else{
                if(this.tempo >= 1){
                    this.node.destroy();
                }
            }
        }*/
    }

    
}
