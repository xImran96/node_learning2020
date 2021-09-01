const arrayOne = [1, 2, 3];
const arrayTwo = [4, 5, 6];

// console.log(arrayOne, arrayTwo);

// console.log(...arrayOne, ...arrayTwo);

// const arrayThree = [...arrayOne, ...arrayTwo];

// console.log(arrayThree);
// console.log(...arrayThree);


// const arrayFour = arrayOne;


// const arrayFour = arrayOne.slice();
const arrayFour = [...arrayOne];

arrayFour.push(6);

console.log("arr1", arrayOne);
console.log("arr4", arrayFour);


const userOne = {
	name: "Imran",
	age: 24,
	city: "Peshawar",
	country: "Pakistan"
}




const userTwo = {...userOne};

userTwo.name = 'khan';


console.log(userOne)
console.log(userTwo)