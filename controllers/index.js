const { handleCreateHabit, handlevalidateDate, handleGetHabitById, handleLogCompletion, handleCompletionDateCheck, handleGetHabits, handleDeleteById } = require("../services");

//create a new habit
const createHabit = async (req, res) => {
    try{
        const {name, description,target_days_per_week} = req.body;
        // console.log(body);
        if(name === undefined || description === undefined || target_days_per_week === undefined){
            throw new Error("Missing required fields");
        }
        else if(typeof name !== 'string' || typeof description !== 'string' || typeof target_days_per_week !== 'number'){
            throw new Error("Invalid input data");
        }
        else if(target_days_per_week < 1 || target_days_per_week > 7){
            throw new Error("Invalid input data");
        }
        const habit = await handleCreateHabit(name, description, target_days_per_week);
        console.log(habit);
        res.status(201).send(habit);
    }
    catch (error){
        res.status(400).send(error.message);
    }
    
}

const logHabit = async (req, res) => {
    try{
        const {id} = req.params;
        const {date} = req.body;
        
        if(!handlevalidateDate(date)) 
            return res.status(400).send("Invalid date format");

        if(handleGetHabitById(id) == null) 
            return res.status(404).send("Habit not found");

        if(handleCompletionDateCheck(id, date)) 
            return res.status(409).send("Completion already logged for this date");

        handleLogCompletion(id, date);

        res.status(200).json({
            "id": id,
            "date": date,
            "message": "Completion logged successfully"
        })
        
    }
    catch(error){
        // console.log(error);
        res.status(400).send(error.message);
    }
}


const getHabit = async (req, res) => {
    try{
       const {page, limit, status, name} = req.body;

        if(typeof page != 'number' || page < 1) 
            throw new Error("Invalid input number");

        else if( typeof limit != 'number' || limit < 1)
            throw new Error("Invalid input limit");

        else if(typeof status === undefined && (typeof status != 'string' || (status != 'completed' && status != 'not completed')))
            throw new Error("Invalid input status");

        else if(typeof name === undefined && (typeof name != 'string'))
            throw new Error("Invalid input name");


       const result = handleGetHabits(page, limit, status, name);

       res.status(200).json({result});
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const deleteHabit = async (req, res) => {

    try{
        const {id} = req.params;
        if(handleGetHabitById(id) == null) 
            return res.status(404).send("Habit not found");

        const result = handleDeleteById(id);
        // delete database[id];
        if(result) {
            res.json({message: "Habit deleted successfully"});
            return res.status(204)
        }
        else
            return res.status(404).json({message: "Habit not found"});
    }
    catch(error){
        res.status(404).send(error.message);
    }
}


module.exports = {createHabit, logHabit, getHabit, deleteHabit};