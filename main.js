//logIn(Chain of Responsibility)
class InputValidator {
  constructor() {
    this.nextValidator = null;
  }
  setNextValidator(validator) {
    this.nextValidator = validator;
  }
  validate(input) {
    if (this.nextValidator) {
      return this.nextValidator.validate(input);
    }
    return true;
  }
}
class UsernameValidator extends InputValidator {
  validate(input) {
    const { username } = input;

    if (username != '11' && username != '17') {
      console.log(111);
      return false;
    }

    return super.validate(input);
  }
}
class PasswordValidator extends InputValidator {
  validate(input) {
    const { password } = input;

    if (password != '220103192' && password != '220103024') {
      console.log(222);
      return false;
    } 

    return super.validate(input);
  }
}
//for counting + and -
class Counter {
  constructor(initialCount, elementId, inId) {
    this.count = initialCount;
    this.elementId = elementId;
    this.inId = inId;
    this.attachEventListeners();
    this.updateCounter();
  }

  increment() {
    this.count++;
    this.updateCounter();
  }

  decrement() {
    if (this.count > 0) {
      this.count--;
    }
    this.updateCounter();
  }

  updateCounter() {
    const element = document.getElementById(this.elementId);
    if (element) {
      element.innerText = this.count;
    } else {
      console.error(`Element with ID ${this.elementId} not found.`);
    }
  }

  attachEventListeners() {
    const incrementButton = document.getElementById(`incrementButton${this.inId}`);
    const decrementButton = document.getElementById(`decrementButton${this.inId}`);

    if (incrementButton && decrementButton) {
      incrementButton.addEventListener('click', () => this.increment());
      decrementButton.addEventListener('click', () => this.decrement());
    } else {
      console.error(`Buttons for counter ${this.inId} not found.`);
    }
  }
}
//product(protatype)
class Product {
  constructor(name, cost) {
    this.name = name;
    this.cost = cost;
    this.quantity=0;
  }
  getName() {
    return this.name;
  }
  getCost() {
    return this.cost;
  }
  setName(name1){
    this.name=name1;
  }
  setCost(cost1){
    this.cost=cost1;
  }
  setQuantity(quantity){
    this.quantity=quantity;
  }
  getQuantity(){
    return this.quantity;
  }
  clone() {
    return new Product(this.name, this.cost);
  }
}
//change quantity(observer)
class Subject {
  constructor() {
    this.products = [];
    this.state = null;
  }
  addObserver(product) {
    this.products.push(product);
  }
  removeObserver(product) {
    this.products = this.products.filter(obs => obs !== product);
  }
  notifyObservers(data) {
    Object.keys(data).forEach((key, i) => {
      if (i < this.products.length) {
        this.products[i].setQuantity(data[key]);
      }
    });
  }
  setState(newState) {
    this.state = newState;
    this.notifyObservers();
  }
  getArray(){
    return this.products;
  }
}
//for changing value(facade)
class receiveFacade {
  constructor(a, a1, a2, a3, a4, a5, a6, data) {
    this.a = a;
    this.a1 = a1;
    this.a2 = a2;
    this.a3 = a3;
    this.a4 = a4;
    this.a5 = a5;
    this.a6 = a6;
    this.data = data;
  }

  showValues() {
    const b = new Subject();
    b.addObserver(this.a);
    b.addObserver(this.a1);
    b.addObserver(this.a2);
    b.addObserver(this.a3);
    b.addObserver(this.a4);
    b.addObserver(this.a5);
    b.addObserver(this.a6);

    const arr22 = this.notifyingObj(this.data, b);


    var jsonString111 = JSON.stringify(arr22);
    localStorage.setItem('adminObj', jsonString111);

    window.location.href=('index.html');
  }

  notifying(data, b) {
    b.notifyObservers(data);
    const arr1=[];

    const productsArray = b.getArray();
    for (let i = 0; i < 7; i++) {
      arr1[i] = parseInt(productsArray[i].getQuantity());
    }

    return arr1;
  }
  notifyingObj(data, b) {
    b.notifyObservers(data);
    return b.getArray();
  }
}
//starategy(0)
class operation {
  execute() {
    throw new Error("execute method must be implemented");
  }
}
//transmit information about orders(1)
class changeQ extends operation{
  constructor(subButtonId, countIds, adminDataIndices, zakaz, state) {
    super();
    this.subButton = document.getElementById(subButtonId);
    this.countIds = countIds;
    this.adminDataIndices = adminDataIndices;
    this.zakaz = zakaz;
    this.state=state;

    if (!this.subButton) {
      return;
    }
  }
  execute() {
  this.subButton.addEventListener('click', () => {
    const el1 = document.getElementById(this.countIds[0]).innerText;
    const el2 = document.getElementById(this.countIds[1]).innerText;
    const el3 = document.getElementById(this.countIds[2]).innerText;
    const a = [el1, el2, el3];
    const b=[false,false,false];
    let d = false;

    const adminData = JSON.parse(localStorage.getItem('adminObj'));
    if (!this.state) {
      console.log(adminData[0].quantity);
      if(adminData[0].quantity >= parseFloat(a[0])){
        adminData[0].quantity -= parseFloat(el1);  
        d=true;
      }
    }else {
      for (let i = this.adminDataIndices[0], j = 0; i <= this.adminDataIndices[this.adminDataIndices.length - 1] && j < 3; i++, j++) {
        if(adminData[i].quantity >= parseFloat(a[j])){
          adminData[i].quantity -= a[j];
          b[j]=true;          
        }
      }
    }
    const adminDataString = JSON.stringify(adminData);
    localStorage.setItem('adminObj', adminDataString);

    var existingData = localStorage.getItem('zakaz');
    var existingArr = existingData ? JSON.parse(existingData) : {};
    if (this.zakaz[0] == 1) {
      if (el1 !== existingArr[1] && d===true) {existingArr[1] = (parseFloat(existingArr[1]) || 0) + parseFloat(el1);}
      else alert('There are not so many Coke planned for today');
      if (el2 !== existingArr[2]) {existingArr[2] = (parseFloat(existingArr[2]) || 0) + parseFloat(el2);}
      if (el3 !== existingArr[3]) {existingArr[3] = (parseFloat(existingArr[3]) || 0) + parseFloat(el3);}
    } else if (this.zakaz[0] == 4) {
      if (el1 !== existingArr[4] && b[0]===true) {existingArr[4] = (parseFloat(existingArr[4]) || 0) + parseFloat(el1);}
      else alert('There are not so many Napoleon planned for today');
      if (el2 !== existingArr[5] && b[1]===true) {existingArr[5] = (parseFloat(existingArr[5]) || 0) + parseFloat(el2);}
      else alert('There are not so many Chocolate Cake planned for today');
      if (el3 !== existingArr[6] && b[2]===true) {existingArr[6] = (parseFloat(existingArr[6]) || 0) + parseFloat(el3);}
      else alert('There are not so many Vupi Pie planned for today');
    } else {
      if (el1 !== existingArr[7] && b[0]===true) {existingArr[7] = (parseFloat(existingArr[7]) || 0) + parseFloat(el1);}
      else alert('There are not so many Burger planned for today');
      if (el2 !== existingArr[8] && b[1]===true) {existingArr[8] = (parseFloat(existingArr[8]) || 0) + parseFloat(el2);}
      else alert('There are not so many Sandwich planned for today');
      if (el3 !== existingArr[9] && b[2]===true) {existingArr[9] = (parseFloat(existingArr[9]) || 0) + parseFloat(el3);}
      else alert('There are not so many Doner planned for today');
    }
    var updatedJsonString = JSON.stringify(existingArr);
    localStorage.setItem('zakaz', updatedJsonString);

    alert('You have successfully placed your order!');
  });
  }
}
//calculating cost(2)
class calcCost extends operation{
  constructor(subButtonId){
    super();
    this.subButton = document.getElementById(subButtonId);
  }
  execute(){
    this.subButton.addEventListener('click', () => {
    var existingData = localStorage.getItem('zakaz');
    const yourObject = JSON.parse(existingData);

    var existingData1 = localStorage.getItem('adminObj');
    const yourObject1 = JSON.parse(existingData1);

    const cost = {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0};
    cost[1]+=(parseFloat(yourObject[1]))*(parseFloat(yourObject1[0].cost));
    cost[2]+=(parseFloat(yourObject[2]))*170;
    cost[3]+=(parseFloat(yourObject[3]))*200;
    cost[4]+=(parseFloat(yourObject[4]))*(parseFloat(yourObject1[4].cost));
    cost[5]+=(parseFloat(yourObject[5]))*(parseFloat(yourObject1[5].cost));
    cost[6]+=(parseFloat(yourObject[6]))*(parseFloat(yourObject1[6].cost));
    cost[7]+=(parseFloat(yourObject[7]))*(parseFloat(yourObject1[1].cost));
    cost[8]+=(parseFloat(yourObject[8]))*(parseFloat(yourObject1[2].cost));
    cost[9]+=(parseFloat(yourObject[9]))*(parseFloat(yourObject1[3].cost));

    const adminDataString1 = JSON.stringify(cost);
    localStorage.setItem('zakazAkwa', adminDataString1);
    location.reload();
  });
  }
}
//strategy
class strategy {
  constructor() {
    this.operation = null;
  }
  setStrategy(operation) {
    this.operation = operation;
  }
  executeStrategy() {
    return this.operation.execute();
  }
}
//for korzina
class ShoppingCart {
  constructor() {
    this.korzinaDiv = document.getElementById('korzina');
    this.dataContainer = document.createElement('div');
    this.dataContainer.className = 'div0';

    this.initializeCart();
    this.renderCart();

    var submit = document.getElementById('i225');
    submit.addEventListener('click', this.handleCheckout.bind(this));
  }

  initializeCart() {
    const storedObjectString3 = localStorage.getItem('zakaz');
    this.yourObject3 = JSON.parse(storedObjectString3);
    const storedObjectString4 = localStorage.getItem('zakazAkwa');
    this.yourObject4 = JSON.parse(storedObjectString4);
    const storedObjectString5 = localStorage.getItem('adminObj');
    this.yourObject5 = JSON.parse(storedObjectString5);
    const storedObjectString6 = localStorage.getItem('foto');
    this.yourObject6 = JSON.parse(storedObjectString6);
    this.storedObjectString5 = ['Cola', 'Tea', 'Coffee', 'Baha', 'Choco Cake', 'Vupi Pie', 'Burger', 'Sandwich', 'Doner'];
  }

  renderCart() {
    for (let i = 0; i < 9; i++) {
      const imageUrl = this.yourObject6[i];
      if (this.yourObject3[i + 1] > 0) {
        const productDiv = document.createElement('div');
        productDiv.className = 'div1';
        productDiv.innerHTML = `
          <img class="product-image" src="img/${imageUrl}" alt="Product ${i + 1} Image">
          <h2>${this.storedObjectString5[i]}</h2>
          <p>Quantity: ${this.yourObject3[i + 1]}</p>
          <p>Total Price: ${this.yourObject4[i + 1]}₸</p>
          <input type="button" class="delete-button" value="Delete">
        `;

        var deleteButtons = productDiv.getElementsByClassName('delete-button');
        deleteButtons[0].addEventListener('click', this.handleDelete.bind(this, i));
        this.dataContainer.appendChild(productDiv);
      }
    }
    this.korzinaDiv.appendChild(this.dataContainer);
  }

  handleDelete(index) {
    this.yourObject5[0].quantity = parseFloat(this.yourObject5[0].quantity) + parseFloat(this.yourObject3[index + 1]);
    if (index == 3 || index == 4 || index == 5 || index == 6 || index == 7 || index == 8) {
      this.yourObject5[index-2].quantity = parseFloat(this.yourObject5[index-2].quantity) + parseFloat(this.yourObject3[index + 1]);
    }
    this.yourObject3[index + 1] = 0;
    this.yourObject4[index + 1] = 0;
    const adminDataString111 = JSON.stringify(this.yourObject3);
    localStorage.setItem('zakaz', adminDataString111);
    const adminDataString000 = JSON.stringify(this.yourObject5);
    localStorage.setItem('adminObj', adminDataString000);
    const adminDataString222 = JSON.stringify(this.yourObject4);
    localStorage.setItem('zakazAkwa', adminDataString222);
    this.reloadPage();
  }
  
  handleCheckout() {
    const stores = localStorage.getItem('zakaz');
    const ob = JSON.parse(stores);
    localStorage.setItem('obrabotka', JSON.stringify(ob));
    for (let i = 0; i < 9; i++) {
      ob[i + 1] = 0;
    }
    localStorage.setItem('zakaz', JSON.stringify(ob));
    const stored4 = localStorage.getItem('zakazAkwa');
    const Object4 = JSON.parse(stored4);
    for (let i = 0; i < 9; i++) {
      Object4[i + 1] = 0;
    }
    localStorage.setItem('zakazAkwa', JSON.stringify(Object4));
    this.korzinaDiv.innerHTML = '';
  }

  reloadPage() {
    location.reload();
  }
}
//korzina u admina
class OrderProcessing {
  constructor() {
    this.korzinaDiv = document.getElementById('gotovo');
    this.dataContainer = document.createElement('div');
    this.dataContainer.className = 'div0';

    this.initializeOrder();
    this.renderProcessedOrder();
  }

  initializeOrder() {
    const storedObject111 = localStorage.getItem('obrabotka');
    this.yourObje1 = JSON.parse(storedObject111);
    const foro = localStorage.getItem('foto');
    this.foro1 = JSON.parse(foro);
    this.storedObjectString6 = ['Cola', 'Tea', 'Coffee', 'Baha', 'Choco Cake', 'Vupi Pie', 'Burger', 'Sandwich', 'Doner'];
  }

  renderProcessedOrder() {
    for (let i = 0; i < 9; i++) {
      const imageUrl = this.foro1[i];
      if (this.yourObje1[i + 1] > 0) {
        const productDiv = document.createElement('div');
        productDiv.className = 'div1';
        productDiv.innerHTML = `
          <img class="product-image" src="img/${imageUrl}" alt="Product ${i + 1} Image">
          <h2>${this.storedObjectString6[i]}</h2>
          <p>Quantity: ${this.yourObje1[i + 1]}</p>
          <input type="button" class="delete-button1" value="Ready">
        `;

        const get2 = localStorage.getItem('prinyat');
        const get1 = JSON.parse(get2);

        var deleteButtons1 = productDiv.getElementsByClassName('delete-button1');
        deleteButtons1[0].addEventListener('click', this.handleReady.bind(this, i));
        this.dataContainer.appendChild(productDiv);
      }
    }
    this.korzinaDiv.appendChild(this.dataContainer);
  }

  handleReady(index) {
    const get2 = localStorage.getItem('prinyat');
    const get1 = JSON.parse(get2);
    get1[index + 1] = this.yourObje1[index + 1];
    this.yourObje1[index + 1] = 0;
    localStorage.setItem('prinyat', JSON.stringify(get1));
    localStorage.setItem('obrabotka', JSON.stringify(this.yourObje1));
    this.reloadPage();
  }

  reloadPage() {
    location.reload();
  }
}
//prinyat tovar u admina
class AcceptedOrders {
  constructor() {
    this.korzinaDiv = document.getElementById('gotovo111');
    this.dataContainer = document.createElement('div');
    this.dataContainer.className = 'div0';

    this.initializeAcceptedOrders();
    this.renderAcceptedOrders();
  }

  initializeAcceptedOrders() {
    const storedObject222 = localStorage.getItem('prinyat');
    this.yourObje2 = JSON.parse(storedObject222);
    const foro = localStorage.getItem('foto');
    this.foro1 = JSON.parse(foro);
    this.storedObjectString6 = ['Cola', 'Tea', 'Coffee', 'Baha', 'Choco Cake', 'Vupi Pie', 'Burger', 'Sandwich', 'Doner'];
  }

  renderAcceptedOrders() {
    for (let i = 0; i < 9; i++) {
      const imageUrl = this.foro1[i];
      if (this.yourObje2[i + 1] > 0) {
        const productDiv = document.createElement('div');
        productDiv.className = 'div1';
        productDiv.innerHTML = `
          <img class="product-image" src="img/${imageUrl}" alt="Product ${i + 1} Image">
          <h2>${this.storedObjectString6[i]}</h2>
          <p>Quantity: ${this.yourObje2[i + 1]}</p>
          <p style="color: #008000;font-size: 20px;font-weight:800">Ready</p>
        `;
        this.dataContainer.appendChild(productDiv);
      }
    }
    this.korzinaDiv.appendChild(this.dataContainer);
  }
}









document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('but1').addEventListener('click', function() {
    const arr111 = {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0};
    const ob111 = JSON.stringify(arr111);
    localStorage.setItem('prinyat', ob111);

    const arr = {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0};
    var jsonString = JSON.stringify(arr);
    localStorage.setItem('zakaz', jsonString);
    
    const foto = ["coca.png","tea.png","coffe.png","napo.jpg","choco.jpg","vupi.png","burger.jpg","sand.jpg","doner.png"];
    var fotoString = JSON.stringify(foto);
    localStorage.setItem('foto', fotoString);

    const data = {};
    const bool=[];

    function validateAndAssign(property, inputId,i) {
      const inputValue = parseFloat(document.getElementById(inputId).value);
      const intValue = parseInt(inputValue);

      if (!isNaN(intValue) && inputValue >= 0) {
        data[property] = inputValue;
        bool[i]=true;
      } else {
        bool[i]=false;
      }
    }

    validateAndAssign('cola', 'salesInput',0);
    validateAndAssign('bur', 'salesInput1',1);
    validateAndAssign('sand', 'salesInput2',2);
    validateAndAssign('doner', 'salesInput3',3);
    validateAndAssign('nap', 'salesInput4',4);
    validateAndAssign('choco', 'salesInput5',5);
    validateAndAssign('vupi', 'salesInput6',6); 

    if(bool[0]==true && bool[1]==true && bool[2]==true && bool[3]==true && bool[4]==true && bool[5]==true && bool[6]==true){
    const a=new Product('cola',300);
    const b=a.clone();
      b.setName('tea');
      b.setCost(170);
    const c=a.clone();
      c.setName('coffee');
      c.setCost(200);
    
    const a4=a.clone();
      a4.setName('nap');
      a4.setCost(350);
    const a5=a.clone();
      a5.setName('choco');
      a5.setCost(300);
    const a6=a.clone();
      a6.setName('vupi');
      a6.setCost(500);
    const a1=a.clone();
      a1.setName('bur');
      a1.setCost(1050);
    const a2=a.clone();
      a2.setName('sand');
      a2.setCost(500);
    const a3=a.clone();
      a3.setName('doner');
      a3.setCost(1000);
    
    const aa=new receiveFacade(a,a1,a2,a3,a4,a5,a6,data);
    aa.showValues();
    }else{
      alert(`Please enter a valid positive number for input`);
    }
  });
});
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('next1').addEventListener('click', function() {
    const a = document.getElementById('11').value;
    const b = document.getElementById('220103192').value;
    const usernameValidator = new UsernameValidator();
    const passwordValidator = new PasswordValidator();

    usernameValidator.setNextValidator(passwordValidator);
    const userInput = {
      username: a,
      password: b,
    };

    const isInputValid = usernameValidator.validate(userInput);
    if (isInputValid) {
      if(userInput.username == '17' && userInput.password == '220103024'){
        window.location.href = 'admin.html';
      }
      else if(userInput.username == '11' && userInput.password == '220103192') {
        window.location.href = 'drinks.html';
      }else {
        var message1 = "Hello, such user does not exist";
        alert(message1);
    }
    } else {
        var message = "Hello, such user does not exist";
        alert(message);
    }
  });
});
document.addEventListener('DOMContentLoaded', function() {
  const counter1 = new Counter(0, 'count0', 0);
  const counter2 = new Counter(0, 'count1', 1);
  const counter3 = new Counter(0, 'count2', 2);
  const counter4 = new Counter(0, 'count3', 3);
  const counter5 = new Counter(0, 'count4', 4);
  const counter6 = new Counter(0, 'count5', 5);
  const counter7 = new Counter(0, 'count6', 6);
  const counter8 = new Counter(0, 'count7', 7);
  const counter9 = new Counter(0, 'count8', 8);
});
document.addEventListener('DOMContentLoaded', function () {
  var orderHandler = new changeQ('sub1', ['count0', 'count1', 'count2'], [0], [1, 2, 3], false);
  var strategyInstance = new strategy();
  strategyInstance.setStrategy(orderHandler);
  strategyInstance.executeStrategy();

  var calcCostInstance = new calcCost('sub1');
  strategyInstance.setStrategy(calcCostInstance);
  strategyInstance.executeStrategy();
});
document.addEventListener('DOMContentLoaded', function () {
  var orderHandler1 = new changeQ('sub2', ['count3', 'count4', 'count5'], [1, 2, 3], [4,5,6], true);
  var strategyInstance1 = new strategy(); 
  strategyInstance1.setStrategy(orderHandler1); 
  strategyInstance1.executeStrategy();

  var calcCostInstance1 = new calcCost('sub2');
  strategyInstance1.setStrategy(calcCostInstance1);
  strategyInstance1.executeStrategy();
});
document.addEventListener('DOMContentLoaded', function () {
  var orderHandler2 = new changeQ('sub3', ['count6', 'count7', 'count8'], [4, 5, 6], [7,8,9], true);
  var strategyInstance2 = new strategy(); 
  strategyInstance2.setStrategy(orderHandler2); 
  strategyInstance2.executeStrategy();

  var calcCostInstance2 = new calcCost('sub3');
  strategyInstance2.setStrategy(calcCostInstance2);
  strategyInstance2.executeStrategy();
});
document.addEventListener('DOMContentLoaded', function () {
  new ShoppingCart();
});
document.addEventListener('DOMContentLoaded', function () {
  new OrderProcessing();
});
document.addEventListener('DOMContentLoaded', function () {
  new AcceptedOrders();
});