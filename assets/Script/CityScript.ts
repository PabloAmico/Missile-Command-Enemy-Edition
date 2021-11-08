// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Boolean)
    city_Safe:boolean = true;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}

    onCollisionEnter(other, self){
        if(other.node.group == "Misil"){
            this.CityDestroyed();
        }
    }

    CityDestroyed(){
        if(this.city_Safe){
            this.city_Safe = false;
            this.node.getComponent(cc.Animation).play("City");
        }
    }
}
