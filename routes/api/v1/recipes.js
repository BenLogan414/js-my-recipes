const router = require('express').Router()
const recipes = require('../../../data/recipes.json')

// GET /api/v1/ - return the id, title, image, prepTime, and difficulty for all recipes
router.get('/', async (request, response) => {
    //const found = recipes.map(data => data)
    const found = recipes.map(data => {
        return {
            id: data.id,
            title: data.title,
            image: data.image,
            prepTime: data.prepTime,
            difficulty: data.difficulty
        }
    })
    response.send(found)
})


// POST /api/v1/recipe/add - should add a new recipe to the array of recipes
router.post('/recipe/add', async (request, response) => {
    const { title, image, description, ingredients, instructions, prepTime, difficulty } = request.body
    let id = recipes.length + 1
    const found = recipes.find(data => data.id === id)
    if(found) return response.send({ error: `Already exists `, found})
    
    recipes.push({ id, title, image, description, ingredients, instructions, prepTime, difficulty })
    response.send({ message: 'Recipe added.' })
})


// GET /api/v1/recipe/:id - return the full recipe object for the recipe with the specified id
router.get('/recipe/:id', async (request, response) => {
    const { id } = request.params
    const found = recipes.find(data => data.id.toString() === id)
    if(!found) response.send({ error: `Cannot find recipe with id: ${id}`})
    else response.send(found)
})

module.exports = router