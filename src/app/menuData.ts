// src/menuData.ts

export interface MenuItem {
  id: string;
  name: string;
  price: string;
  img: string;
  category: string;
}

export const menuItems: MenuItem[] = [
  // Fried & Crispy
  { id: 'f1', name: 'French Fries', price: 'AED 5', img: 'https://images.unsplash.com/photo-1606755456206-b25206cde27e?w=600&h=400&fit=crop&auto=format', category: 'Fried & Crispy' },
  { id: 'f2', name: 'Chicken Nuggets', price: 'AED 8', img: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=600&h=400&fit=crop&auto=format', category: 'Fried & Crispy' },
  { id: 'f3', name: 'Samosa', price: 'AED 2', img: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=600&h=400&fit=crop&auto=format', category: 'Fried & Crispy' },
  { id: 'f4', name: 'Spring Rolls', price: 'AED 4', img: 'https://plus.unsplash.com/premium_photo-1695756121533-3f60bee7ba7b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'Fried & Crispy' },

  // Sandwiches & Quick Bites
  { id: 's1', name: 'Egg Sandwich', price: 'AED 8', img: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=600&h=400&fit=crop&auto=format', category: 'Sandwiches & Quick Bites' },
  { id: 's2', name: 'Chicken Sandwich', price: 'AED 8', img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&h=400&fit=crop&auto=format', category: 'Sandwiches & Quick Bites' },
  { id: 's3', name: 'Crispy Chicken Roll', price: 'AED 8', img: 'https://images.unsplash.com/photo-1521305916504-4a1121188589?w=600&h=400&fit=crop&auto=format', category: 'Sandwiches & Quick Bites' },
  { id: 's4', name: 'Akl Albait Wrap', price: 'AED 12', img: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&h=400&fit=crop&auto=format', category: 'Sandwiches & Quick Bites' },
  { id: 's5', name: 'Falafel Plate', price: 'AED 12', img: 'https://plus.unsplash.com/premium_photo-1663853051503-57130cb26bc6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'Sandwiches & Quick Bites' },
  { id: 's6', name: 'Falafel Wrap', price: 'AED 8', img: 'https://plus.unsplash.com/premium_photo-1663853051660-91bd9b822799?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'Sandwiches & Quick Bites' },
  { id: 's7', name: 'Chicken Shawarma Plate', price: 'AED 15', img: 'https://plus.unsplash.com/premium_photo-1671394138398-fe1ce5e5b03b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'Sandwiches & Quick Bites' },
  { id: 's8', name: 'Chicken Shawarma', price: 'AED 8', img: 'https://plus.unsplash.com/premium_photo-1671394138398-fe1ce5e5b03b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'Sandwiches & Quick Bites' },
  { id: 's9', name: 'Chicken Chilli Roll', price: 'AED 10', img: 'https://images.unsplash.com/photo-1626242108323-cc46c98acdea?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'Sandwiches & Quick Bites' },
  { id: 's10', name: 'Chicken Burger with Fries', price: 'AED 12', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop&auto=format', category: 'Sandwiches & Quick Bites' },
  { id: 's11', name: 'Beef Burger with Fries', price: 'AED 14', img: 'https://images.unsplash.com/photo-1550317138-10000687a72b?w=600&h=400&fit=crop&auto=format', category: 'Sandwiches & Quick Bites' },
  { id: 's12', name: 'Kathi Roll', price: 'AED 10', img: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&h=400&fit=crop&auto=format', category: 'Sandwiches & Quick Bites' },

  // Grilled & Baked
  { id: 'g1', name: 'Grilled Chicken', price: 'AED 20', img: 'https://plus.unsplash.com/premium_photo-1661419883163-bb4df1c10109?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'Grilled & Baked' },
  { id: 'g2', name: 'BBQ Chicken Wings', price: 'AED 10', img: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=600&h=400&fit=crop&auto=format', category: 'Grilled & Baked' },
  { id: 'g3', name: 'Chicken Strips', price: 'AED 10', img: 'https://images.unsplash.com/photo-1605291581926-df4bf7ee3e89?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'Grilled & Baked' },
  { id: 'g4', name: 'Chicken Lollipop', price: 'AED 12', img: 'https://plus.unsplash.com/premium_photo-1701109142323-a1dcb64316e4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'Grilled & Baked' },

  // Rice & Biryani
  { id: 'r1', name: 'Chicken Egg Fried Rice', price: 'AED 10', img: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&h=400&fit=crop&auto=format', category: 'Rice & Biryani' },
  { id: 'r2', name: 'Vegetable Fried Rice', price: 'AED 10', img: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&h=400&fit=crop&auto=format', category: 'Rice & Biryani' },
  { id: 'r3', name: 'Vegetable Pilau', price: 'AED 8', img: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&h=400&fit=crop&auto=format', category: 'Rice & Biryani' },
  { id: 'r4', name: 'Jeera Pilau', price: 'AED 8', img: 'https://plus.unsplash.com/premium_photo-1694141252026-3df1de888a21?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'Rice & Biryani' },
  { id: 'r5', name: 'Chicken Biryani', price: 'AED 15', img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&h=400&fit=crop&auto=format', category: 'Rice & Biryani' },
  { id: 'r6', name: 'Mutton Biryani', price: 'AED 18', img: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&h=400&fit=crop&auto=format', category: 'Rice & Biryani' },
  { id: 'r7', name: 'Beef Biryani', price: 'AED 16', img: 'https://images.unsplash.com/photo-1716550781939-beb7d7247aae?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'Rice & Biryani' },
  { id: 'r8', name: 'Chicken Mandi', price: 'AED 18', img: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=600&h=400&fit=crop&auto=format', category: 'Rice & Biryani' },
  { id: 'r9', name: 'Flavor Rice Meal Box', price: 'AED 15', img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=400&fit=crop&auto=format', category: 'Rice & Biryani' },

  // Indian & Pakistani Curries
  { id: 'c1', name: 'Chicken Karahi', price: 'AED 16', img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop&auto=format', category: 'Indian & Pakistani Curries' },
  { id: 'c2', name: 'Butter Chicken', price: 'AED 16', img: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&h=400&fit=crop&auto=format', category: 'Indian & Pakistani Curries' },
  { id: 'c3', name: 'Chicken Curry', price: 'AED 16', img: 'https://plus.unsplash.com/premium_photo-1661419883163-bb4df1c10109?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'Indian & Pakistani Curries' },
  { id: 'c4', name: 'Chicken Korma', price: 'AED 15', img: 'https://images.unsplash.com/photo-1603496987351-f84a3ba5ec85?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'Indian & Pakistani Curries' },
  { id: 'c5', name: 'Chicken Rara', price: 'AED 18', img: 'https://images.unsplash.com/photo-1708782344490-9026aaa5eec7?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'Indian & Pakistani Curries' },
  { id: 'c6', name: 'Mutton Karahi', price: 'AED 22', img: 'https://images.unsplash.com/photo-1652545296893-ff9227b3512e?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'Indian & Pakistani Curries' },
  { id: 'c7', name: 'Mutton Rogan Josh', price: 'AED 22', img: 'https://images.unsplash.com/photo-1606843046080-45bf7a23c39f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'Indian & Pakistani Curries' },
  { id: 'c8', name: 'Mutton Korma', price: 'AED 20', img: 'https://images.unsplash.com/photo-1694004599545-9f25feaf665a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'Indian & Pakistani Curries' },
  { id: 'c9', name: 'Beef Curry', price: 'AED 18', img: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'Indian & Pakistani Curries' },
  { id: 'c10', name: 'Beef Nihari', price: 'AED 18', img: 'https://images.unsplash.com/photo-1769681375998-1b231dcbe363?q=80&w=695&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'Indian & Pakistani Curries' },
  { id: 'c11', name: 'Beef Korma', price: 'AED 18', img: 'https://images.unsplash.com/photo-1708782344137-21c48d98dfcc?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'Indian & Pakistani Curries' },
  { id: 'c12', name: 'Egg Curry', price: 'AED 12', img: 'https://images.unsplash.com/photo-1661588669110-81142a5b9e57?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'Indian & Pakistani Curries' },
  { id: 'c13', name: 'Egg Bhurji', price: 'AED 12', img: 'https://images.unsplash.com/photo-1582169505937-b9992bd01ed9?q=80&w=1110&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'Indian & Pakistani Curries' },

  // Vegetable Dishes
  { id: 'v1', name: 'Mix Vegetable Curry', price: 'AED 10', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop&auto=format', category: 'Vegetable Dishes' },
  { id: 'v2', name: 'Aloo Gobi', price: 'AED 10', img: 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=600&h=400&fit=crop&auto=format', category: 'Vegetable Dishes' },
  { id: 'v3', name: 'Aloo Matar', price: 'AED 10', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop&auto=format', category: 'Vegetable Dishes' },
  { id: 'v4', name: 'Dal Tadka', price: 'AED 8', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop&auto=format', category: 'Vegetable Dishes' },
  { id: 'v5', name: 'Dal Makhani', price: 'AED 10', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop&auto=format', category: 'Vegetable Dishes' },
  { id: 'v6', name: 'Paneer Butter Masala', price: 'AED 15', img: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&h=400&fit=crop&auto=format', category: 'Vegetable Dishes' },
  { id: 'v7', name: 'Malai Kofta', price: 'AED 15', img: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&h=400&fit=crop&auto=format', category: 'Vegetable Dishes' },
  { id: 'v8', name: 'Paneer Tikka Masala', price: 'AED 15', img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'Vegetable Dishes' },
  { id: 'v9', name: 'Vegetable Kolhapuri', price: 'AED 12', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop&auto=format', category: 'Vegetable Dishes' },

  // Soft Drinks
  { id: 'dr1', name: 'Coca-Cola Can (320ml)', price: 'AED 4', img: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=600&h=400&fit=crop&auto=format', category: 'Soft Drinks' },
  { id: 'dr2', name: 'Pepsi Can (330ml)', price: 'AED 4', img: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?q=80&w=1229&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'Soft Drinks' },
  { id: 'dr3', name: 'Water Bottle (500ml)', price: 'AED 1', img: 'https://plus.unsplash.com/premium_photo-1737362946604-5b0d174dab40?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2F0ZXIlMjA1MDBtbHxlbnwwfHwwfHx8MA%3D%3D', category: 'Soft Drinks' },
  { id: 'dr4', name: 'Coca-Cola 1.5L', price: 'AED 2', img: 'https://images.unsplash.com/photo-1673252900398-d97d9b1deed9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNvY2Fjb2xhJTIwMS41bHxlbnwwfHwwfHx8MA%3D%3D', category: 'Soft Drinks' },
  { id: 'dr5', name: 'Pepsi 1.5L', price: 'AED 5', img: 'https://images.unsplash.com/photo-1741519425149-e353fce02897?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVwc2klMjAxLjVsfGVufDB8fDB8fHww', category: 'Soft Drinks' },
  { id: 'dr6', name: 'Family Pack Soft Drink', price: 'AED 10', img: 'https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29mdCUyMGRyaW5rc3xlbnwwfHwwfHx8MA%3D%3D', category: 'Soft Drinks' },

  // Meals & Deals (Monthly Mass Menu Schedule)
  { 
    id: 'deal_monthly_one', 
    name: 'Monthly Meal — One Meal Option', 
    price: 'AED 180', 
    img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=400&fit=crop&auto=format', 
    category: 'Meals & Deals' 
  },
  { 
    id: 'deal_monthly_two', 
    name: 'Monthly Meal — Two Meal Option', 
    price: 'AED 320', 
    img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop&auto=format', 
    category: 'Meals & Deals' 
  },

  // --- LUNCH MENU ---
  { 
    id: 'lunch_mon', 
    name: 'Monday Lunch: Chicken Masala + Chef Choice Veg + Steamed Rice 500gm', 
    price: 'Mass Menu', 
    img: 'https://images.unsplash.com/photo-1708782344490-9026aaa5eec7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hpY2tlbiUyMG1hc2FsYXxlbnwwfHwwfHx8MA%3D%3D', 
    category: 'Meals & Deals' 
  },
  { 
    id: 'lunch_tue', 
    name: 'Tuesday Lunch: Egg Korma + Chef Choice Veg + Steamed Rice 500gm', 
    price: 'Mass Menu', 
    img: 'https://images.unsplash.com/photo-1710445458303-857b8cdab3d0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZWdnJTIwa29ybWF8ZW58MHx8MHx8fDA%3D', 
    category: 'Meals & Deals' 
  },
  { 
    id: 'lunch_wed', 
    name: 'Wednesday Lunch: Fried Fish + Chef Choice Veg + Dal Tadka + Steamed Rice 500gm', 
    price: 'Mass Menu', 
    img: 'https://images.unsplash.com/photo-1661939252817-ebb73304f4c7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZyaWVkJTIwZmlzaHxlbnwwfHwwfHx8MA%3D%3D', 
    category: 'Meals & Deals' 
  },
  { 
    id: 'lunch_thu', 
    name: 'Thursday Lunch: Mutton Keema Chole + Chef Choice Veg + Chana Dal Fry + Jeera Rice 500gm', 
    price: 'Mass Menu', 
    img: 'https://plus.unsplash.com/premium_photo-1675798917805-bbf2679cc875?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TXV0dG9uJTIwa2VlbWElMjBjaG9sZXxlbnwwfHwwfHx8MA%3D%3D', 
    category: 'Meals & Deals' 
  },
  { 
    id: 'lunch_fri', 
    name: 'Friday Lunch: Chicken Biryani + Raitha + Chicken Shorba + Dessert', 
    price: 'Mass Menu', 
    img: 'https://plus.unsplash.com/premium_photo-1694141252774-c937d97641da?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpY2tlbiUyMGJpcnlhbml8ZW58MHx8MHx8fDA%3D', 
    category: 'Meals & Deals' 
  },
  { 
    id: 'lunch_sat', 
    name: 'Saturday Lunch: Fried Chicken + Chef Choice Veg + Dal Fry + Steamed Rice 500gm', 
    price: 'Mass Menu', 
    img: 'https://plus.unsplash.com/premium_photo-1683139916670-38113db90cb9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZnJpZWQlMjBjaGlja2VufGVufDB8fDB8fHww', 
    category: 'Meals & Deals' 
  },
  { 
    id: 'lunch_sun', 
    name: 'Sunday Lunch: Egg Aloo + Chef Choice Veg + Steamed Rice 500gm', 
    price: 'Mass Menu', 
    img: 'https://images.unsplash.com/photo-1764315197254-94385571df22?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWdnJTIwbWFzYWxhfGVufDB8fDB8fHww', 
    category: 'Meals & Deals' 
  },

  // --- DINNER MENU ---
  { 
    id: 'dinner_mon', 
    name: 'Monday Dinner: Egg Curry + Chef Choice Veg + Steamed Rice 300gm & Phulka Chapati 2 PCs', 
    price: 'Mass Menu', 
    img: 'https://images.unsplash.com/photo-1661588669110-81142a5b9e57?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWdnJTIwY3Vycnl8ZW58MHx8MHx8fDA%3D', 
    category: 'Meals & Deals' 
  },
  { 
    id: 'dinner_tue', 
    name: 'Tuesday Dinner: Chicken Tandoori + Chef Choice Veg + Dal Tadka + Steamed Rice 300gm & Phulka Chapati 2 PCs', 
    price: 'Mass Menu', 
    img: 'https://images.unsplash.com/photo-1641873933980-fcff60026f50?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hpY2tlbiUyMHRhbmRvb3JpfGVufDB8fDB8fHww', 
    category: 'Meals & Deals' 
  },
  { 
    id: 'dinner_wed', 
    name: 'Wednesday Dinner: Aloo Beef Keema + Chef Choice Veg + Steamed Rice 300gm & Phulka Chapati 2 PCs', 
    price: 'Mass Menu', 
    img: 'https://images.unsplash.com/photo-1680529669043-9a7777b798bc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWxvbyUyMGJlZWYlMjBrZWVtYXxlbnwwfHwwfHx8MA%3D%3D', 
    category: 'Meals & Deals' 
  },
  { 
    id: 'dinner_thu', 
    name: 'Thursday Dinner: Egg Do Pyaza + Chef Choice Veg + Steamed Rice 300gm & Phulka Chapati 2 PCs', 
    price: 'Mass Menu', 
    img: 'https://media.istockphoto.com/id/1218567719/photo/indian-style-egg-curry-in-a-bowl-on-a-wooden-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=iw5KBWI3Phc_37tRzn5GYo71gEHFmb5yNDdfQujbCiw=', 
    category: 'Meals & Deals' 
  },
  { 
    id: 'dinner_fri', 
    name: 'Friday Dinner: Akl Albait Chef Choice Vegetable + Dal Fry + Steamed Rice 300gm & Phulka Chapati 2 PCs', 
    price: 'Mass Menu', 
    img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmVnZXRhYmxlJTIwc2FsYWR8ZW58MHx8MHx8fDA%3D', 
    category: 'Meals & Deals' 
  },
  { 
    id: 'dinner_sat', 
    name: 'Saturday Dinner: Chicken Kadai + Chef Choice Veg + Steamed Rice 300gm & Phulka Chapati 2 PCs', 
    price: 'Mass Menu', 
    img: 'https://images.unsplash.com/photo-1694579740719-0e601c5d2437?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpY2tlbiUyMGthZGFpfGVufDB8fDB8fHww', 
    category: 'Meals & Deals' 
  },
  { 
    id: 'dinner_sun', 
    name: 'Sunday Dinner: Chicken Kabab + Chef Choice Veg + Chana Dal Fry + Steamed Rice 300gm & Phulka Chapati 2 PCs', 
    price: 'Mass Menu', 
    img: 'https://images.unsplash.com/photo-1605908580297-f3e1c02e64ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpY2tlbiUyMGthYmFifGVufDB8fDB8fHww', 
    category: 'Meals & Deals' 
  }
];