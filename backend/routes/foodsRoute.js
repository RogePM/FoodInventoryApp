import express from 'express';
import { FoodItem } from '../models/FoodItemModel.js';
import { ChangeLog } from '../models/ChangeLogModel.js';

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

// fetch recent changes 
router.get('/changes/recent', async (request, response) => {
    try {
        const changes = await ChangeLog.find()
            .sort({ timestamp: -1 })
            .limit(50);
        return response.status(200).json(changes);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: 'Error fetching changes' });
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

        // Fetch old item for comparison
        const oldItem = await FoodItem.findById(id);
        if (!oldItem) {
            return response.status(404).json({ message: 'Food item not found' });
        }

        const result = await FoodItem.findByIdAndUpdate(id, request.body, { new: true });

        // Compare fields and record changes
        const changes = {};
        for (const key of Object.keys(request.body)) {
            if (
                key !== 'lastModified' &&
                oldItem[key]?.toString() !== request.body[key]?.toString()
            ) {
                changes[key] = {
                    old: oldItem[key],
                    new: request.body[key]
                };
            }
        }

        if (Object.keys(changes).length > 0) {
            await logChange('updated', result, changes);
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

        // Log deletion
        await logChange('deleted', result);

        return response.status(200).send({ message: 'Food item deleted successfully' });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: 'Error deleting food item' });
    }
});

router.post('/', async (request, response) => {
    try {
        const data = request.body;

        // Helper function to validate a food item
        const isValidItem = (item) =>
            item &&
            item.name &&
            item.category &&
            item.quantity &&
            item.expirationDate &&
            item.donor &&
            item.storageLocation;

        // If data is an array, handle bulk insert
        if (Array.isArray(data)) {
            // Validate all items
            for (const item of data) {
                if (!isValidItem(item)) {
                    return response.status(400).send({ message: 'Please provide all required fields for each item' });
                }
            }
            // Add lastModified to each item
            const itemsWithDate = data.map(item => ({
                ...item,
                lastModified: new Date()
            }));
            const createdItems = await FoodItem.create(itemsWithDate);
            // Log each addition
            for (const item of createdItems) {
                await logChange('added', item);
            }
            return response.status(201).send(createdItems);
        }

        // Handle single item
        if (!isValidItem(data)) {
            return response.status(400).send({ message: 'Please provide all required fields' });
        }
        const newFoodItem = {
            ...data,
            lastModified: new Date()
        };
        const foodItem = await FoodItem.create(newFoodItem);
        await logChange('added', foodItem);
        return response.status(201).send(foodItem);

    } catch (error) {
        console.log(error);
        return response.status(500).send('Error creating food item(s)');
    }
});

const logChange = async (actionType, item, changes = null) => {
    const logEntry = new ChangeLog({
        actionType,
        itemId: item._id,
        itemName: item.name,
        category: item.category,
        changes,
        previousQuantity: actionType === 'deleted' ? item.quantity : undefined
    });
    await logEntry.save();
};


export default router;