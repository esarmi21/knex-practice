require('dotenv').config();
const knex = require('knex');
const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
})

const searchTerm = 'burger'

function searchByShoppingListName(searchTerm) {
    knexInstance
      .select('*')
      .where('name','ILIKE',`%${searchTerm}%`)
      .from('shopping_list')
      .then(result => {
        console.log(result)
      })
}
  
// searchByShoppingListName('burger')


function paginateShoppingListItems(page){
    const pageNumber = 6
    const offset = pageNumber * (page-1)

    knexInstance
        .select('*')
        .from('shopping_list')
        .offset(offset)
        .limit(pageNumber)
        .then(result =>{
            console.log(result)
        })
}

// paginateShoppingListItems(2)

function getItemsAddedAfterDate(days){
  
    knexInstance
        .select('name','category','date_added')
        .where('date_added',
         '<',
         knexInstance.raw(`now() - '?? day'::INTERVAL`,days) 
         )
        .from('shopping_list')
        .groupBy('name','category','date_added')
        .then(result =>{
            console.log(result)
        })
}

// getItemsAddedAfterDate(10)
function categoryTotalCost(){
  
    knexInstance
        .select('category')
        .from('shopping_list')
        .sum('price')
        .groupBy('category')
        .then(result =>{
            console.log(result)
        })
}
categoryTotalCost()