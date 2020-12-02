class Food {
    constructor (){
        this.image= loadImage ("Milk.png");
        this.foodstock=0;
        this.lastfed;
    }

    updateFoodStock(foodStock){
        this.foodStock=foodStock;
       }
    
       getFedTime(lastFed){
         this.lastFed=lastFed;
       }
    
       deductFood(){
         if(this.foodStock>0){
          this.foodStock=this.foodStock-1;
         }
        }
    
        getFoodStock(){
          return this.foodStock;
        }
    
    display(){
        var x=80,y=100;
        
        imageMode(CENTER);
        image(this.image,720,220,70,70);
        
        if(this.foodStock!=0){
          for(var i=0;i<this.foodStock;i++){
            if(i%10==0){
              x=80;
              y=y+50;
            }
            image(this.image,x,y,50,50);
            x=x+30;
          }
        }
        if (lastFed>=12){
          text("last feed: "+lastFed%12 + " PM",350,30)
        }
        else if (lastFed==0){
          text ("last fed: 12 AM",350,30)
        }
        else {
          text ("last feed : "+lastFed + "AM", 350,30)
        }
       
      }

      Washroom (){

        background (washroom,550,500);

      }

      Bedroom(){
        background(bedroom,550,500);
      }
      Garden (){
        background(garden,550,500);
      }
}