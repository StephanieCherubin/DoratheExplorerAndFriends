// Caravan.js

// eslint-disable-next-line no-var
var OregonH = OregonH || {};

// constants
OregonH.WEIGHT_PER_OX = 20;
OregonH.WEIGHT_PER_PERSON = 2;
OregonH.FOOD_WEIGHT = 0.6;
OregonH.ENERGY_WEIGHT = 5;
OregonH.GAME_SPEED = 800;
OregonH.HOUR_PER_STEP = 0.2;
OregonH.FOOD_PER_PERSON = 0.02;
OregonH.FULL_SPEED = 5;
OregonH.SLOW_SPEED = 3;
OregonH.FINAL_DISTANCE = 1000;
OregonH.EVENT_PROBABILITY = 0.15;
OregonH.ENEMY_ENERGY_AVG = 5;
OregonH.ENEMY_GOLD_AVG = 50;

//-----------------Caravan Class----------------

class Caravan {
  constructor() {
    this.stats = {
      hour: 0,
      distance: 0,
      friends: 15,
      food: 80,
      supplies: 2,
      money: 275,
      energy: 12,
    }
    
    this.init(this.stats)
  }
  
  init({hour, distance, friends, food, supplies, money, energy}){
    this.hour = hour;
    this.distance = distance;
    this.friends = friends;
    this.food = food;
    this.supplies = supplies;
    this.money = money;
    this.energy = energy;
  }
  
  // update weight and capacity
  updateWeight () {
    let droppedFood = 0;
    let droppedGuns = 0;
    
    // how much can the caravan carry
    this.capacity = this.supplies * OregonH.WEIGHT_PER_OX + this.friends * OregonH.WEIGHT_PER_PERSON;

    // how much weight do we currently have
    this.weight = this.food * OregonH.FOOD_WEIGHT + this.energy * OregonH.ENERGY_WEIGHT;

    // drop things behind if it's too much weight
    // assume guns get dropped before food
    while (this.energy && this.capacity <= this.weight) {
      this.energy -= 1;
      this.weight -= OregonH.ENERGY_WEIGHT;
      droppedGuns += 1;
    }

    if (droppedGuns) {
      this.ui.notify(`Left ${droppedGuns} supplies behind`, 'negative');
    }

    while (this.food && this.capacity <= this.weight) {
      this.food -= 1;
      this.weight -= OregonH.FOOD_WEIGHT;
      droppedFood += 1;
    }

    if (droppedFood) {
      this.ui.notify(`Left ${droppedFood} food provisions behind`, 'negative');
    }
};

  // update covered distance
  updateDistance() {
    // the closer to capacity, the slower
    const diff = this.capacity - this.weight;
    const speed = OregonH.SLOW_SPEED + diff / this.capacity * OregonH.FULL_SPEED;
    this.distance += speed;
    }
  
  // food consumption

  consumeFood() {
    this.food -= this.friends * OregonH.FOOD_PER_PERSON;

    if (this.food < 0) {
      this.food = 0;
    }
  }
}

OregonH.Caravan = new Caravan()