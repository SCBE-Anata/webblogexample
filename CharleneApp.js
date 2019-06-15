function Car(make, model, year){
	this.make=make;
	this.model=model;
	this.year=year;
// 	We can set properties on keyword this which are preset values
	this.numWheels=4;
};

function Motorcycle(make, model, year) {
// 	Using call
// 	use keyword this inside of motorcycle function to get access to motorcycle object
	Car.call(this, make, model, year);
	this.numWheels=2;
}

function Motorcycle(make, model, year) {
// 	arguments: a list of all the arguments that are passed into a function
	Car.apply(this, arguments);
	this.numWheels=2;
}

function Dog(name, age){
	this.name=name;
	this.age=age;
}

Dog.prototype.bark= function() {
    console.log( `${this.name} just barked.`);	
};

