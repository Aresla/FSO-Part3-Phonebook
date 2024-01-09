const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://jatatapchik:${password}@cluster1.anc3zkd.mongodb.net/ponebookApp?retryWrites=true&w=majority`

  console.log('url: ', url);

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

// const person = new Person({
//   name: "Anne Laurel",
//   number: "044-1232456"
// })

// person.save().then(result => {
//   console.log('info saved!')
//   mongoose.connection.close()
// })

if (process.argv.length === 5) {
    const [name, number] = [process.argv[3], process.argv[4]]
  
    const person = new Person({
      name: name,
      number: number,
    })
  
    person.save().then(() => {
      console.log(`Added ${name} number ${number} to phonebook`)
      mongoose.connection.close()
    })
}
else if (process.argv.length === 3) {
    Person.find({}).then(result => {
      console.log('Phonebook:')
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
}
else {
    mongoose.connection.close()
}


