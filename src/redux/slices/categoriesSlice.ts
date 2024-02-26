import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { auth } from "../../firebase/firebase";
const uid = auth.currentUser?.uid

type StringObject = {
    [key: string]: string | number | boolean | any;
};

type StringObjectArray = StringObject[];

interface Category {
    name: string;
    products: Product[];
}

interface Product {
    id: number;
    name: string;
    price: number;
}
type allProducts = StringObject[]

interface CategoriesState {
    allCategories: StringObjectArray | any;
    selectedCategory: Category | string;
    allproducts: allProducts | any;
    selectedProducts: any
    currentUser: any
}
let statecData = null;
const initialState: CategoriesState = {
    allCategories: null,
    selectedCategory: 'computer',
    selectedProducts: [],
    allproducts: statecData,
    currentUser: ''
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload
        },
        setCategories: (state, action: PayloadAction<Category[]>) => {
            state.allCategories = action.payload as unknown as StringObjectArray;
        },
        setSelectedCategory: (state, action: PayloadAction<Category | string>) => {
            state.selectedCategory = action.payload;
        },
        setAllProducts: (state, action: PayloadAction<Category[]>) => {
            state.allproducts = action.payload as unknown as StringObjectArray;
        },
        setSelectedProducts: (state = initialState, action) => {
            state.allproducts = state.allproducts.flat().filter((p: any) => state.selectedCategory === p.categoryId)

        }
    },
});

export const { setCategories, setSelectedCategory, setAllProducts, setSelectedProducts, setCurrentUser } = categoriesSlice.actions;

export default categoriesSlice.reducer;