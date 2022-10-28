class Player{
constructor({position,velocity},name,room){
    this.name=name,
    this.room_id=room,
    this.world_Width=900;
    this.world_Height=500;
    this.width=50;
    this.height=100;
    this.position=position
    this.velocity=velocity
    this.direction=null
    this.nojump = true
}
move(type){
    this.direction=type
    //往右移動
    if(this.direction==='ArrowLeft'){
        if(this.position.x===0){
            this.position.x=0
        }else{
            this.position.x = this.position.x + this.velocity.x
        }
        
    
    }
    //往左移動
    if(this.direction==='ArrowRight'){   
        if(this.position.x===(this.world_Width-this.width)){
            this.position.x=850
        }else{
            this.position.x = this.position.x + this.velocity.x
        }
    }
    //往上移動(keyup觸發，若在上升須修正到頂點在回原點，若在下降，則須修正到原點，修正此問題的function為revise_move)
    if(this.direction==='ArrowUp'){
        if(this.nojump===true){
            if( this.position.y===0){
                this.nojump=false
                return
            }
            this.velocity.y=-5
            this.position.y = this.position.y + this.velocity.y
        }
        if(this.nojump===false){
            if( this.position.y>=200){
                this.nojump=true
                return
            }
            this.velocity.y=5
            this.position.y = this.position.y + this.velocity.y
        }
    }
    // console.log(this.nojump,this.position.y,player1.velocity.y)
}

revise_move(type){
    this.direction=type
    if(this.direction===''){
        //下墜修正回原地
        if(this.velocity.y===-5){
            if(this.position.y===0){
                this.velocity.y=0
                this.nojump = true
            }
            this.position.y = this.position.y + this.velocity.y
        }

        //上升修正到頂點 再下墜回原地
        if(this.velocity.y===5){
            this.position.y = this.position.y + this.velocity.y
            if(this.position.y>=200){
                this.velocity.y=-5
                this.nojump = true
            }  
        }
    }

}
}

module.exports = Player;
