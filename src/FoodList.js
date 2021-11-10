import FoodBox from "./FoodBox";
import {useState} from "react"




function FoodList(props) {
    const [foods, setFoods] = useState(props.foods)
    const [filter, setFilter] = useState("")
    const [form, setForm] = useState(false)
    const [newFood, setNewFood] = useState({name:"", calories:"", image:"", quantity:0})
    const [today, setToday] = useState([])

    function openForm() {
        setForm(true)
    }

    function closeForm() {
        setForm(false)
    }

    function onChange(event) {

        setNewFood({...newFood, [event.target.name]: event.target.value })
       
        
    }

    function noRefresh(event) {
        event.preventDefault()
    }

    function onSubmit(event) {
        event.preventDefault();
        setForm(false);
        let newFoods = [...foods]
        newFoods.push(newFood)
        setFoods(newFoods)
    }

    function childOnChange(event) {
        let updatedFood = [...foods]
        updatedFood = updatedFood.map(food => {
            if (food.name === event.target.name) {
                food.quantity = event.target.value
                return food
            }
            else return food
        })

        setFoods(updatedFood);
        console.log(today)
    }

    function onSearch(event) {
        setFilter(event.target.value.toLowerCase())
    }

    function onAdd(event) {

        let foodToday = today.map(value => {return {...value}})     
        let newFoodToday = foods.map(value => {return {...value}})
        let alreadyIncluded = 0   

        newFoodToday = newFoodToday.filter(food => {
            return (food.name === event.target.id)
        })
        newFoodToday = newFoodToday.filter(food => {
            return (food.quantity > 0)
        })
        
        if (newFoodToday.length > 0) {
            alreadyIncluded = foodToday.filter(food => {return food.name === newFoodToday[0].name}).length
            console.log(alreadyIncluded)
            if (alreadyIncluded > 0) {
                foodToday.map(food => {
                    if (food.name === newFoodToday[0].name) {
                        console.log("called")
                        food.quantity = parseInt(food.quantity)+parseInt(newFoodToday[0].quantity)
                        return food
                    }
                    else return food
                })
            }  
            else {foodToday.push(newFoodToday[0])}
        }

        setToday(foodToday)

    }


    const currentCalories = () => {
        return today.reduce((previous, current) => {return previous + parseInt(current.calories)*parseInt(current.quantity)},0 )
    }

    function onDeleteClick(event) {
        let todayArray = [...today]
        todayArray = todayArray.filter(value => {return value.name !== event.target.id})
        setToday(todayArray)
    }

    return(
        <div className="m-2">
            <p className="is-size-3"> IronNutrition </p>
            <input className="column is-full" type="text" onChange={onSearch}/> 
            <div className = "mt-2 columns">
                <div className="column">
                    
                    
                    {foods.map((food, index) => {
                        return ( 
                            food.name.toLowerCase().includes(filter) &&
                            <FoodBox name={food.name} src={food.image} calories={food.calories} quantity={food.quantity} key={index} onChange={childOnChange} onClick={onAdd}/>
                        
                        )
                    })}
                </div>
                <div className="column">
                    <p className="is-size-4">Today's foods</p>
                        {today.length>0 ? today.map(todayFood=> {
                            return (
                                <div>
                                    <p>{todayFood.name} = {todayFood.quantity}</p>
                                    <button id={todayFood.name} onClick={onDeleteClick}>delete</button>
                                </div>
                            )
                        }): (<p></p>)}
                    <p className="is-size-6">{`Total: ${currentCalories()} cal`}</p>
                </div>                   
            </div>
            <div className="columns is-centered">
                <button className="column button is-link is-half" onClick={openForm}>Add Food</button>
            </div>
            <div id = "modal" className={`modal ${form&&"is-active"}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Add Food</p>
                        <button className="delete" aria-label="close" onClick={closeForm}></button>
                    </header>
                    <section className="modal-card-body">
                        <form id="addFood" onSubmit={noRefresh}>
                            <div className="columns m-2 is-full">
                                <div className = "column is-half">
                                    <label className = "mr-2" htmlFor="name">Name</label>
                                    <input type="text" name="name" id="name" placeholder="New Food" onChange={onChange} required/>
                                </div>
                                <div className="column is-half">
                                    <label className = "mr-2" htmlFor="cal">Calories</label>
                                    <input type="number" name="calories" id="calories" placeholder="Calories" onChange={onChange} required/>
                                </div>
                            </div>
                            <div className = "columns m-2">
                                <div className = "column is-full">
                                    <label className = "mr-2"  htmlFor="image">Image</label>
                                    <input className = "is-four-fiths" type="link" name="image" id="image" onChange={onChange} placeholder="Image Link"/>                        
                                </div>
                            </div>
                            <div className = "columns is-centered">
                                <button className="button is-link column is-half m-2" form="addFood" type="submit" onClick={onSubmit}>Add Food</button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default FoodList