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
    modeCheck = null;

    auxCheck:boolean = false;

    @property(cc.Button)
    button = null;

    onLoad(){
        this.modeCheck = cc.find("InfinityModeCheck");
        this.auxCheck = this.modeCheck.getComponent('InfinityModeCheck').activateInfinity;
    }


    start () {

    }

    update (dt) {
        if(this.button.node.active == false && this.modeCheck.getComponent('InfinityModeCheck').activateInfinity){
            this.button.node.active = true;
        }
    }
}
