// Event.js

// eslint-disable-next-line no-var
var OregonH = OregonH || {};

class Event {
  randomInts(n) {
    const { floor, random } = Math;
    return floor (random() * n)
  }

  generateEvent() {
    // pick random one
    const eventIndex = this.randomInts
   (this.eventTypes.length);
    const eventData = this.eventTypes[eventIndex];
  
    // events that consist in updating a stat
    if (eventData.type === 'STAT-CHANGE') {
      this.stateChangeEvent(eventData);
    } else if (eventData.type === 'SHOP') {
      // shops
      // pause game
      this.game.pauseJourney();
  
      // notify user
      this.ui.notify(eventData.text, eventData.notification);
  
      // prepare event
      this.shopEvent(eventData);
    } else if (eventData.type === 'ATTACK') {
      // attacks
      // pause game
      this.game.pauseJourney();
  
      // notify user
      this.ui.notify(eventData.text, eventData.notification);
  
      // prepare event
      this.attackEvent(eventData);
    }
  };

  stateChangeEvent(eventData) {
    // can't have negative quantities
    if (eventData.value + this.redwagon[eventData.stat] >= 0) {
      this.redwagon[eventData.stat] += eventData.value;
      this.ui.notify(eventData.text + Math.abs(eventData.value), eventData.notification);
    }
  };

  randomCeil(n) {
    const { ceil, random } = Math;
    return ceil(random() * n)
  }

  shopEvent(eventData) {
    // number of products for sale
    const numProds = this.randomCeil(4);
  
    // product list
    const products = [];
    let j;
    let priceFactor;
  
    for (let i = 0; i < numProds; i += 1) {
      // random product
      j = Math.floor(Math.random() * eventData.products.length);
  
      // multiply price by random factor +-30%
      priceFactor = 0.7 + 0.6 * Math.random();
  
      products.push({
        item: eventData.products[j].item,
        qty: eventData.products[j].qty,
        price: Math.round(eventData.products[j].price * priceFactor),
      });
    }
  
    this.ui.showShop(products);
  };

  // prepare an attack event
  attackEvent() {
    const energy = Math.round((0.7 + 0.6 * Math.random()) * OregonH.ENEMY_ENERGY_AVG);
    const gold = Math.round((0.7 + 0.6 * Math.random()) * OregonH.ENEMY_GOLD_AVG);
  
    this.ui.showAttack(energy, gold);
  };
}

OregonH.Event = new Event() 

OregonH.Event.eventTypes = [
  // Make a class for every type of event type below
  {
    type: 'STAT-CHANGE',
    notification: 'negative',
    stat: 'friends',
    value: -3,
    text: 'Mean red ants attack. Number of friends bitten: ',
  },
  {
    type: 'STAT-CHANGE',
    notification: 'negative',
    stat: 'friends',
    value: -4,
    text: 'Flu outbreak. Number of friends ill: ',
  },
  {
    type: 'STAT-CHANGE',
    notification: 'negative',
    stat: 'food',
    value: -10,
    text: 'El Mago casted a spell to make your food spoil. Food lost: ',
  },
  {
    type: 'STAT-CHANGE',
    notification: 'negative',
    stat: 'money',
    value: -50,
    text: 'The Greedy Wizard steals $',
  },
  {
    type: 'STAT-CHANGE',
    notification: 'negative',
    stat: 'friends',
    value: -1,
    text: 'Cold epidemic. Number of friends ill: ',
  },
  {
    type: 'STAT-CHANGE',
    notification: 'positive',
    stat: 'food',
    value: 20,
    text: 'Found wild blueberries. Food added: ',
  },
  {
    type: 'STAT-CHANGE',
    notification: 'positive',
    stat: 'food',
    value: 20,
    text: 'Found wild blackberries. Food added: ',
  },
  {
    type: 'STAT-CHANGE',
    notification: 'positive',
    stat: 'supplies',
    value: 1,
    text: 'Diego found supplies: ',
  },
  {
    type: 'SHOP',
    notification: 'neutral',
    text: 'Boots has found a store',
    products: [
      { item: 'food', qty: 25, price: 55 },
      { item: 'supplies', qty: 1, price: 100 },
      { item: 'energy', qty: 2, price: 50 },
      { item: 'friends', qty: 5, price: 70 },
    ],
  },
  {
    type: 'SHOP',
    notification: 'neutral',
    text: 'Benny the Bull has found a shop',
    products: [
      { item: 'food', qty: 25, price: 55 },
      { item: 'supplies', qty: 1, price: 100 },
      { item: 'energy', qty: 2, price: 20 },
      { item: 'friends', qty: 10, price: 70 },
    ],
  },
  {
    type: 'SHOP',
    notification: 'neutral',
    text: 'Shopkeepers sell various goods',
    products: [
      { item: 'food', qty: 25, price: 55 },
      { item: 'supplies', qty: 1, price: 100 },
      { item: 'energy', qty: 2, price: 80 },
      { item: 'friends', qty: 5, price: 70 },
    ],
  },
  {
    type: 'ATTACK',
    notification: 'negative',
    text: 'Grumpy Old Troll is making fun of you!',
    stat: 'energy',
    value: -1,
  },
  {
    type: 'ATTACK',
    notification: 'negative',
    text: 'Swiper is taunting you!',
    stat: 'energy',
    value: -1,
  },
  {
    type: 'ATTACK',
    notification: 'negative',
    text: 'Malambruno is casting a spell against you!',
    stat: 'energy',
    value: -2,
  },
];

