require('dotenv').config();



const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);

//Created a schema to mark to the mongo DB
const Schema = mongoose.Schema;

const personSchema = new Schema({ 
name: {type:String},
age: Number,
favoriteFoods: [String]


})

//created a model named person for the schema
const Person = mongoose.model('Person', personSchema )




//Create and Save a Record of a Model
const createAndSavePerson = (done) => {
  let beautifulDenise = new Person({ 
    name: "Denise", age: 24, favoriteFoods:["pizza", "burger", "fufu", "rice"]
    });
    
    beautifulDenise.save((err, data) =>{  
    
      if (err){ console.log("error")};
      done(null, data);
    })
};


//Create Many Records with model.create()
var arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];

const createManyPeople = (arrayOfPeople, done) => {
Person.create(arrayOfPeople, (err, data)=> { 
if (err){console.log("error")};
  done(null, data);
})
};


//Use model.find() to Search Your Database
const findPeopleByName = (personName, done) => {
  
  Person.find({name: personName}, function(err, data){ 
  
    if(err){console.log("error")};
    done(null, data);
  })
  
  
};


//Use model.findOne() to Return a Single Matching Document from Your DatabasePassed
const findOneByFood = (food, done) => {
  
  Person.findOne({favoriteFoods:[food]}, function(err, personFound){ 
  if(err){console.log("error")};
    done(null, personFound);
  })
  
  
};


//Use model.findById() to Search Your Database By _id
const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data){ 
  if(err)return console.log("error");
    done(null,data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';

  // .findById() method to find a person by _id with the parameter personId as search key. 
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
  
    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};

//Performing New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  
  
  Person.findOneAndUpdate({name:personName }, {age:ageToSet}, {new:true},(err, updatedDoc)=> { 
  if(err)console.log(err)
  done(null, updatedDoc);
  })
  

  
};


// Deleted some documents using model.findeOneAndRemove()
const removeById = (personId, done) => {
  
  Person.findByIdAndRemove(personId, (err, removedDoc)=>{ 
  if(err) return console.log(err);
  done(null, removedDoc);
  })
  
  
};


//remove all items with a certian criteria with model.remove()
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  
Person.remove({name:nameToRemove}, (err,removedAll)=> { 
if(err)return console.log(err);
done(null, removedAll);
})
  
};

//Chaining Search Query Helpers to Narrow Search Results: find(),sort(),limit(), select(),exe()
const queryChain = (done) => {
  const foodToSearch = "burrito";
  
  Person.find({favoriteFoods:foodToSearch}).sort({name:1}).limit(2).select({age:0}).exec(function(error, people){ 
  if(error) return console.log(error);
  done(null, people);
  })

  
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
