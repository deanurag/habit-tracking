database = []

const handleCreateHabit = async (name, description,target_days_per_week) => {
    try{
        const getId = () =>{
            return Object.keys(database).length + 1;
        }
        const habitId = getId();
        database[habitId] = {
            id: habitId,
            name: name,
            description: description,
            target_days_per_week: target_days_per_week,
            message: "Habit created successfully",
            completedDates: []
        }
        // console.log(database);
        return {
            id: database[habitId].id, 
            name: database[habitId].name, 
            description: database[habitId].description, 
            target_days_per_week: database[habitId].target_days_per_week, 
            message: database[habitId].message
        };
    }
    catch (error){
        throw new Error(error.message);
    }
    
}

const handlevalidateDate = (dateString)=> {
    try{
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  
        if (!dateRegex.test(dateString)) {
            return false; // Invalid format
        }
    
        const dateObj = new Date(dateString);
    
        if (isNaN(dateObj.getTime())) {
            return false; // Invalid date
        }
    
        const currentDate = new Date();
        if (dateObj > currentDate) {
            return false; 
        }
        return true; 
    }
    catch(error){
        console.log("Error in Date Format");
    }
  }

  const handleGetHabitById = (id) => {
    try{
        if(!database[id]) return null;
        return database[id];
    }
    catch(error){
        throw new Error("Error in HandleGetHabitById");
    }
  }

  const handleLogCompletion = (habitId, date) => {
    try{
        database[habitId].completedDates.push(date)
        // console.log(database[habitId]);
        return database[habitId]
    }
    catch(error){
        throw new Error("Error in HandleLogCompletion");
    }
  }

  const handleCompletionDateCheck = (habitId, date) => {
    try{
        if(database[habitId].completedDates.includes(date)) return true;
        else return false;
    }
    catch(error){
        throw new Error("Error in HandleCompletionDateCheck");
    }
  }
  const handleCheckComplete = (habit) => {
    try{
        if(habit.completedDates.length >= habit.target_days_per_week) return true;
        else return false;
    }
    catch(error){
        throw new Error("Error in HandleCheckComplete");
    }
  }

  const handleGetHabits = (page=1, limit=10, status, name) => {

    const result = [];
    try{
        // for(const habit in database) console.log(habit);
        console.log(database);

        if(status === undefined && name === undefined){
            for (const habit in database){
                result.push({
                    "habit": {
                        id: database[habit].id,
                        name: database[habit].name,
                        description: database[habit].description,
                        target_days_per_week: database[habit].target_days_per_week,
                        completed_dates: database[habit].completedDates
                    }, 
                    "total": Object.keys(database).length, 
                    "page": page, 
                    "limit": limit
                });
            }
            return { habits: result.slice((page - 1) * limit, page * limit)};
        }
        //when name ans status both are provided
        else if(name && status){
            for( const habit in database){
                if(database[habit].name === name && handleCheckComplete(database[habit]) && status==='complete'){
                    result.push({
                        "habit": {
                            id: database[habit].id,
                            name: database[habit].name,
                            description: database[habit].description,
                            target_days_per_week: database[habit].target_days_per_week,
                            completed_dates: database[habit].completedDates
                        }, 
                        "total": Object.keys(database).length, 
                        "page": page, 
                        "limit": limit
                    });
                }
                else if(database[habit].name === name && !handleCheckComplete(database[habit]) && status==='not complete'){
                    result.push({
                        "habit": {
                            id: database[habit].id,
                            name: database[habit].name,
                            description: database[habit].description,
                            target_days_per_week: database[habit].target_days_per_week,
                            completed_dates: database[habit].completedDates
                        }, 
                        "total": Object.keys(database).length, 
                        "page": page, 
                        "limit": limit
                    });
                }
            }
            return { habits: result.slice((page - 1) * limit, page * limit)};
        }

        else if(name){
            for(const habit in database){
                if(database[habit].name === name) {
                    result.push({
                        "habit": {
                            id: database[habit].id,
                            name: database[habit].name,
                            description: database[habit].description,
                            target_days_per_week: database[habit].target_days_per_week,
                            completed_dates: database[habit].completedDates
                        }, 
                        "total": Object.keys(database).length, 
                        "page": page, 
                        "limit": limit
                    })
                }
            }
            return { habits: result.slice((page - 1) * limit, page * limit) };
        }
        else {
            for(const habit in database){
                if(handleCheckComplete(database[habit]) && status==='complete'){
                    result.push({
                        "habit": {
                            id: database[habit].id,
                            name: database[habit].name,
                            description: database[habit].description,
                            target_days_per_week: database[habit].target_days_per_week,
                            completed_dates: database[habit].completedDates
                        }, 
                        "total": Object.keys(database).length, 
                        "page": page, 
                        "limit": limit
                    });
                }
                else if(!handleCheckComplete(database[habit]) && status==='not complete'){
                    result.push({
                        "habit": {
                            id: database[habit].id,
                            name: database[habit].name,
                            description: database[habit].description,
                            target_days_per_week: database[habit].target_days_per_week,
                            completed_dates: database[habit].completedDates
                        }, 
                        "total": Object.keys(database).length, 
                        "page": page, 
                        "limit": limit
                    });
                }
            }
            return { habits: result.slice((page - 1) * limit, page * limit)};
        }
    } 
    catch(error)
    {
        console.log(error);
        throw new Error("Error in HandleGetHabits");
    }
  }

  const handleDeleteById = (id) => {
    try{
        if(!database[id]) return false;
        delete database[id];
        // console.log(database);
        return true;
    }
    catch(error){
        throw new Error("Error in HandleDeleteById");
  }
}

module.exports = {handleCreateHabit, handlevalidateDate, handleGetHabitById, 
    handleLogCompletion, handleCompletionDateCheck, handleGetHabits, handleGetHabits, handleDeleteById};