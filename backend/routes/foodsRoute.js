import express from 'express';
import { FoodItem } from '../models/FoodItemModel.js';

const router = express.Router();

router.get('/', async (request, response) => {
    try {
        const foods = await FoodItem.find();

        return response.status(200).json({
            count: foods.length,
            data: foods,
        });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: 'Error fetching food items' });
    }
});

//Route for get food item by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const food = await FoodItem.findById(id);

        return response.status(200).json(food);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: 'Error fetching food item' });
    }
});
//Route for update food item 
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.category ||
            !request.body.quantity ||
            !request.body.expirationDate ||
            !request.body.donor ||
            !request.body.storageLocation ||
            !request.body.lastModified
        ) {
            return response.status(400).send({
                message: 'Please provide all required fields'
            });
        }
        const { id } = request.params;

        const result = await FoodItem.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'Food item not found' });
        }

        return response.status(200).send({ message: 'Food item updated successfully' });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: 'Error updating food item' });
    }
});
//Route for delete food item
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await FoodItem.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Food item not found' });
        }

        return response.status(200).send({ message: 'Food item deleted successfully' });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: 'Error deleting food item' });
    }
}
);

router.post('/', async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.category ||
            !request.body.quantity ||
            !request.body.expirationDate ||
            !request.body.donor ||
            !request.body.storageLocation ||
            !request.body.lastModified
        ) {
            return response.status(400).send({ message: ' Please provide all required fields' });
        }
        const newFoodItem = {
            name: request.body.name,
            category: request.body.category,
            quantity: request.body.quantity,
            expirationDate: request.body.expirationDate,
            donor: request.body.donor,
            storageLocation: request.body.storageLocation,
            lastModified: request.body.lastModified
        }

        const foodItem = await FoodItem.create(newFoodItem);
        return response.status(201).send(foodItem);

    } catch (error) {
        console.log(error);
        return response.status(500).send('Error creating food item');
    }
}
);

export default router;