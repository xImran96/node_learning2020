const user = {
	name: "Imran",
	age: 24,
	city: "Peshawar",
	country: "Pakistan"
}


// const name = user.name;
// const age = user.age;

const{name, age} = user;

console.log(name, age);


const myArray = [5, 11, 17, 24];



// const first = myArray[0];
// const two = myArray[1];
// const three = myArray[2];
// const four = myArray[3];


const [first, two, three, four] = myArray;

console.log(first, two, three, four);