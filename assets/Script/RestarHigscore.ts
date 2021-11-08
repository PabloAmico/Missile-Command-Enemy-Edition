// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    onLoad () {
        this.node.on("touchstart", function(event){
            cc.sys.localStorage.setItem('Time', 0);
            let aux = cc.sys.localStorage.getItem('Time');
            console.log(aux);
        }, this)
        
    }

    start () {

    }

    // update (dt) {}
}
