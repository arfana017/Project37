class Food {

    constructor() {

        this.foodStock = 0;
        this.lastFed;
        this.image = loadImage("images/Milk.png");

    }

    /*getFoodStock() {

        var foodStockref = database.ref('Food');
        foodStockref.on("value",(data) => {

            foodCount = data.val();

        })

    }*/
    
    updateFoodStock(foodStock) {

        this.foodStock = foodStock;

    }

    getFedTime(lastFed) {

        this.lastFed = lastFed;

    }

    deductFood() {

        if(this.foodStock>0) {

         this.foodStock=this.foodStock-1;

        }

    }

    getFoodStock() {

        return this.foodStock;

      }

    updateFedTime() {

        database.ref('/').update({

            lastFed: hour()

        })

    }


    display() {
        textSize(15);
        fill("white");
        stroke(5);

        if(fedTime >= 12) {

            text("Last Fed: " + fedTime % 12 + " PM", 150, 60);
            
        } 
        
        else if(fedTime === 0){

            text("Last Fed: 12 AM", 150, 60);

        } 
        
        else {

            text("Last Fed: " + fedTime + " AM", 150, 60);

        }

        var x = 80, y = 100;
        imageMode(CENTER);
        if(foodCount != 0) { 

            for(var i = 0; i < foodCount; i++) {

                if(i % 10 === 0) {

                    x = 80;
                    y = y + 50;

                }
                image(milkImage, x, y, 50, 50);
                x = x + 30;

            }
        }
    }


    bedroom() {
        background(bedroom,400,200)
    }

    garden() {
        background(garden,400,200)
    }

    washroom() {
        background(washroom,400,200)
    }

}