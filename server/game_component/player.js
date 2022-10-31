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
        this.hp=100;
        this.timeControl
        this.lock=false
        this.attack=false
        this.weapon={
            status:false,
            position:{
                x:position.x,
                y:400
            },
            width:150,
            height:100,
        }
    }
    move_Left(type){
        this.direction=type
        if(this.position.y!=0||this.direction===''){
            this.velocity.x=0
            return
        }
        
        this.velocity.x=-5
        if(this.position.x===0){
            this.position.x=0
        }else{
            this.position.x = this.position.x + this.velocity.x
        }
    }
    move_Right(type){
        this.direction=type
        if(this.position.y!=0||this.direction===''){
            this.velocity.x=0
            return
        }
        
        this.velocity.x=5
        if(this.position.x===(this.world_Width-this.width)){
            this.position.x=850
        }else{
            this.position.x = this.position.x + this.velocity.x
        }
    }
    move_Up(type){
        this.direction=type
        this.velocity.y=5

        if(this.direction==='ArrowUp'&&this.nojump!=false){
            let upTime;
            let downTime
            this.nojump=false;
            upTime=setInterval(()=>{
                if(this.position.y>=195){
                    clearInterval(upTime)
                    downTime = setInterval(()=>{
                        if(this.position.y<=5){
                            clearInterval(downTime)
                            this.nojump=true
                            this.direction=''
                            this.velocity.y=0
                        }
                        this.velocity.y=-5
                        this.position.y = this.position.y + this.velocity.y
                    },10)
                }
                this.velocity.y=5
                this.position.y = this.position.y + this.velocity.y
            },10)
            
        }
    }
    move_Down(type){  
        if(this.position.y!=0){
            return
        }
        this.direction=type
    }
    attackControl(){
        if(this.position.y>0){
            return
        }
        this.attack =true
        setTimeout(()=>{
            this.attack=false
            console.log('test')
        },1)
    }

}

module.exports = Player;
