import React, {useEffect} from 'react';
import '../scss/app.scss';
import {Categories} from "../components/Categories";
import {SortPopup} from "../components/SortPopup";
import {PizzaBlock} from "../components/PizzaBlock";
import {useDispatch, useSelector} from "react-redux";
import {MyLoader} from "../components/Loading";
import {fetchPizzas} from "../redux/reduser/pizza";

const categoriesName = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
const listSort = ['популярности', 'цене', 'алфавиту']
let sort = {
    ['популярности']: 'rating',
    ['цене']: 'price',
    ['алфавиту']: 'name',
}

const Hom = () => {

    const dispatch = useDispatch()

    const {pizza, categories, sortBy, isLoading} = useSelector(state => ({
        pizza: state.pizzas.pizzas,
        categories: state.filters.categories,
        sortBy: state.filters.sortBy,
        isLoading: state.filters.isLoading
    }))

    useEffect(() => {
        let sortPizza = sort[sortBy]
        dispatch(fetchPizzas(categories, sortPizza))
    }, [categories, sortBy])


    const itemsPizzas = pizza.map(item => <PizzaBlock key={item.id} {...item} dispatch={dispatch}/>)


    return (
        <div className="container">
            <div className="content__top">
                <Categories items={categoriesName}
                            categories={categories}
                            dispatch={dispatch}/>
                <SortPopup listSort={listSort}
                           dispatch={dispatch}
                           sortBy={sortBy}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? Array(10).fill(0).map((item, index) => <MyLoader key={index}/>)
                    : itemsPizzas}
            </div>
        </div>
    );
};

export default Hom;