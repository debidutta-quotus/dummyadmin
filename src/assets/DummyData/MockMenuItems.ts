// import { FoodItem } from "../../Types/Menu/Index";

// export const initialFoodItems: FoodItem[] = [
//   // Appetizer
//   {
//     _id: "3",
//     storeId: "store1",
//     name: "Chicken Wings",
//     description: "Spicy and crispy chicken wings served with ranch sauce",
//     price: 9.99,
//     available: true,
//     minPrepTime: 10,
//     maxPrepTime: 15,
//     maxPossibleOrders: 10,
//     images: [
//       "https://cookingwithcoit.com/wp-content/uploads/2022/02/CARD_Air-Fryer-Chicken-Wings.jpg",
//     ],
//     tags: ["Spicy", "Crispy"],
//     category: "Appetizer",
//     // isVeg: true,
//   },
//   {
//     _id: "4",
//     storeId: "store1",
//     name: "Paneer Tikka",
//     description: "Grilled paneer cubes marinated with spices",
//     price: 7.99,
//     available: true,
//     minPrepTime: 10,
//     maxPrepTime: 20,
//     maxPossibleOrders: 12,
//     images: [
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjU3AT9r8228is-t5JHuLCk2InG0PID_mpRw&s",
//     ],
//     tags: ["Vegetarian", "Grilled"],
//     category: "Appetizer",
//     // isVeg: true,
//   },

//   // Main Course
//   {
//     _id: "5",
//     storeId: "store1",
//     name: "Butter Chicken",
//     description: "Creamy tomato-based curry with tender chicken pieces",
//     price: 14.99,
//     available: true,
//     minPrepTime: 20,
//     maxPrepTime: 30,
//     maxPossibleOrders: 8,
//     images: [
//       "https://images.immediate.co.uk/production/volatile/sites/2/2017/04/Butter-chicken-5e0e51c.jpg",
//     ],
//     tags: ["Chicken", "Curry"],
//     category: "Main Course",
//     // isVeg: true,
//   },
//   {
//     _id: "6",
//     storeId: "store1",
//     name: "Paneer Butter Masala",
//     description: "Rich and creamy paneer curry",
//     price: 12.99,
//     available: true,
//     minPrepTime: 20,
//     maxPrepTime: 30,
//     maxPossibleOrders: 10,
//     images: [
//       "https://myfoodstory.com/wp-content/uploads/2021/07/restaurant-style-paneer-butter-masala-2-500x500.jpg",
//     ],
//     tags: ["Paneer", "Curry"],
//     category: "Main Course",
//     // isVeg: true,
//   },

//   {
//     _id: "1",
//     storeId: "store1",
//     name: "Lemonade",
//     description: "Refreshing lemon juice with a hint of mint",
//     price: 3.99,
//     available: true,
//     minPrepTime: 5,
//     maxPrepTime: 10,
//     maxPossibleOrders: 20,
//     images: [
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKxq65pqZ_qz8gBih_vkQlejokG_XqDuODEw&s",
//     ],
//     tags: ["Cold", "Refreshing"],
//     category: "Beverage",
//     // isVeg: true,
//   },
//   {
//     _id: "2",
//     storeId: "store1",
//     name: "Cold Coffee",
//     description: "Chilled coffee blended with milk and sugar",
//     price: 4.99,
//     available: true,
//     minPrepTime: 5,
//     maxPrepTime: 10,
//     maxPossibleOrders: 15,
//     images: [
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIEmUmcMDRgoUIsE24O9ge9ys0owBHRsi5zw&s",
//     ],
//     tags: ["Cold", "Coffee"],
//     category: "Beverage",
//     // isVeg: true,
//   },
//   {
//     _id: "10",
//     storeId: "store1",
//     name: "Margherita Pizza",
//     description: "Classic pizza with tomato sauce, mozzarella, and basil",
//     price: 9.99,
//     available: true,
//     minPrepTime: 15,
//     maxPrepTime: 25,
//     maxPossibleOrders: 20,
//     images: [
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSauRcTuclnQCVy9XtvzdmRwpB4ppEpCs9WGw&s"
//     ],
//     tags: ["Pizza", "Vegetarian", "Italian"],
//     category: "Main Course",
//     // isVeg: true
//   },
//   {
//     "_id": "12",
//     "storeId": "store1",
//     "name": "Chicken Burger",
//     "description": "Crispy chicken patty with lettuce, tomato, and mayo",
//     "price": 7.99,
//     "available": true,
//     "minPrepTime": 10,
//     "maxPrepTime": 18,
//     "maxPossibleOrders": 18,
//     "images": [
//       "https://thescranline.com/wp-content/uploads/2022/02/crispy-chicken-burger-WEB-01.jpg"
//     ],
//     "tags": ["Burger", "Chicken", "Fast Food"],
//     "category": "Main Course",
//     // "isVeg": false
//   },
//   {
//     "_id": "13",
//     "storeId": "store1",
//     "name": "Chocolate Brownie",
//     "description": "Rich and fudgy chocolate brownie",
//     "price": 3.99,
//     "available": true,
//     "minPrepTime": 8,
//     "maxPrepTime": 12,
//     "maxPossibleOrders": 25,
//     "images": [
//       "https://example.com/chocolate-brownie.jpg"
//     ],
//     "tags": ["Dessert", "Chocolate", "Sweet"],
//     "category": "Dessert",
//     // "isVeg": true
//   },
//   {
//     "_id": "14",
//     "storeId": "store1",
//     "name": "Veggie Wrap",
//     "description": "Assorted fresh vegetables wrapped in a whole wheat tortilla.",
//     "price": 6.50,
//     "available": true,
//     "minPrepTime": 7,
//     "maxPrepTime": 15,
//     "maxPossibleOrders": 20,
//     "images": [
//       "https://www.plantperks.com/wp-content/uploads/2020/02/IMG_0198-Edit.jpg"
//     ],
//     "tags": ["Healthy", "Vegetarian", "Wrap"],
//     "category": "Appetizer",
//     // "isVeg": true
//   },
//   {
//     "_id": "15",
//     "storeId": "store1",
//     "name": "Iced Tea",
//     "description": "Refreshing iced tea with lemon and mint.",
//     "price": 2.99,
//     "available": true,
//     "minPrepTime": 3,
//     "maxPrepTime": 8,
//     "maxPossibleOrders": 30,
//     "images": [
//       "https://example.com/iced-tea.jpg"
//     ],
//     "tags": ["Cold", "Tea", "Beverage"],
//     "category": "Beverage",
//     // "isVeg": true
//   },
//   {
//     "_id": "16",
//     "storeId": "store1",
//     "name": "Spaghetti Bolognese",
//     "description": "Classic spaghetti with a rich meat sauce.",
//     "price": 11.50,
//     "available": true,
//     "minPrepTime": 20,
//     "maxPrepTime": 30,
//     "maxPossibleOrders": 15,
//     "images": [
//       "https://www.slimmingeats.com/blog/wp-content/uploads/2010/04/spaghetti-bolognese-36.jpg"
//     ],
//     "tags": ["Pasta", "Italian", "Meat"],
//     "category": "Main Course",
//     // "isVeg": false
//   },
//   {
//     "_id": "17",
//     "storeId": "store1",
//     "name": "Fruit Salad",
//     "description": "A mix of seasonal fresh fruits.",
//     "price": 5.50,
//     "available": true,
//     "minPrepTime": 5,
//     "maxPrepTime": 10,
//     "maxPossibleOrders": 22,
//     "images": [
//       "https://example.com/fruit-salad.jpg"
//     ],
//     "tags": ["Healthy", "Fruit", "Dessert"],
//     "category": "Dessert",
//     // "isVeg": true
//   },
//   {
//     "_id": "18",
//     "storeId": "store1",
//     "name": "French Fries",
//     "description": "Crispy golden-brown french fries",
//     "price": 3.99,
//     "available": true,
//     "minPrepTime": 8,
//     "maxPrepTime": 12,
//     "maxPossibleOrders": 30,
//     "images": [
//       "https://example.com/french-fries.jpg"
//     ],
//     "tags": ["Fries", "Potato", "Fast Food"],
//     "category": "Side Dish",
//     // "isVeg": true
//   },
//   {
//     "_id": "19",
//     "storeId": "store1",
//     "name": "Garlic Bread",
//     "description": "Toasted bread with garlic butter and herbs",
//     "price": 4.50,
//     "available": true,
//     "minPrepTime": 7,
//     "maxPrepTime": 12,
//     "maxPossibleOrders": 25,
//     "images": [
//       "https://example.com/garlic-bread.jpg"
//     ],
//     "tags": ["Bread", "Garlic", "Italian"],
//     "category": "Side Dish",
//     // "isVeg": true
//   }
// ];
