const fs = require('fs')
const csv = require('csvtojson')


const createData = async () => {
    let newData = await csv().fromFile('./data.csv')
    newData = new Set(newData.map((e)=> e))
    newData = Array.from(newData)
    newData = newData.map((e, index)=> {
        
      return{
        make: e.make,
        model: e.model,
        release_date: parseInt(e.year),
        transmission_type: e.transmission_type,
        size: e.size,
        style: e.vehicle_style,
        price: parseInt(e.price)
      }
    })
    let data = JSON.parse(fs.readFileSync('db.json'))
    data.data = newData.filter(e=> e)
    fs.writeFileSync('db.json', JSON.stringify(data))
    console.log(data)
}
createData()