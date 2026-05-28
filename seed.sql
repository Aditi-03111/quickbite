-- Seed data for QuickBite
-- Run this AFTER schema.sql in Supabase SQL Editor

insert into restaurants (name, img, rating, delivery_time, delivery_fee, tags, badge) values
('Mario''s Pizzeria',  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80&auto=format&fit=crop', 4.8, '20-30 min', '₹49', array['pizza','italian'], 'Popular'),
('Burger Barn',        'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80&auto=format&fit=crop', 4.6, '15-25 min', '₹39', array['burgers','american'], 'Fast delivery'),
('Tokyo Sushi Bar',    'https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=600&q=80&auto=format&fit=crop', 4.9, '25-40 min', '₹69', array['sushi','japanese'], 'Top rated'),
('Spice Garden',       'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80&auto=format&fit=crop', 4.7, '30-45 min', '₹59', array['indian','curry'], null),
('Taco Fiesta',        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80&auto=format&fit=crop', 4.5, '15-25 min', '₹49', array['mexican','tacos'], 'New'),
('Noodle House',       'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&q=80&auto=format&fit=crop', 4.6, '20-35 min', '₹49', array['noodles','asian'], null);

-- Mario's Pizzeria sections
insert into menu_sections (restaurant_id, name, sort_order) values (1,'Pizzas',1),(1,'Sides',2);
-- Burger Barn sections
insert into menu_sections (restaurant_id, name, sort_order) values (2,'Burgers',1),(2,'Sides & Drinks',2);
-- Tokyo Sushi Bar sections
insert into menu_sections (restaurant_id, name, sort_order) values (3,'Rolls',1),(3,'Extras',2);
-- Spice Garden sections
insert into menu_sections (restaurant_id, name, sort_order) values (4,'Mains',1),(4,'Rice & Sides',2);
-- Taco Fiesta sections
insert into menu_sections (restaurant_id, name, sort_order) values (5,'Tacos',1),(5,'Extras',2);
-- Noodle House sections
insert into menu_sections (restaurant_id, name, sort_order) values (6,'Noodles',1),(6,'Starters',2);

-- Mario's Pizzeria items (section 1=Pizzas, 2=Sides)
insert into menu_items (section_id, restaurant_id, name, description, price, img, emoji) values
(1,1,'Margherita','Tomato, mozzarella, fresh basil',12.99,'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=90&auto=format&fit=crop','🍕'),
(1,1,'Pepperoni','Tomato, mozzarella, pepperoni',14.99,'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&q=90&auto=format&fit=crop','🍕'),
(1,1,'BBQ Chicken','BBQ sauce, chicken, red onion',15.99,'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=90&auto=format&fit=crop','🍕'),
(1,1,'Veggie Supreme','Bell peppers, mushrooms, olives',13.99,'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=600&q=90&auto=format&fit=crop','🍕'),
(2,1,'Garlic Bread','Toasted with herb butter',4.99,'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=600&q=90&auto=format&fit=crop','🥖'),
(2,1,'Caesar Salad','Romaine, croutons, parmesan',7.99,'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600&q=90&auto=format&fit=crop','🥗');

-- Burger Barn items (section 3=Burgers, 4=Sides)
insert into menu_items (section_id, restaurant_id, name, description, price, img, emoji) values
(3,2,'Classic Smash','Double patty, American cheese, pickles',11.99,'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=90&auto=format&fit=crop','🍔'),
(3,2,'Bacon Deluxe','Crispy bacon, cheddar, caramelized onion',13.99,'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=90&auto=format&fit=crop','🍔'),
(3,2,'Mushroom Swiss','Sauteed mushrooms, Swiss cheese',12.99,'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&q=90&auto=format&fit=crop','🍔'),
(3,2,'Veggie Burger','Black bean patty, avocado, sprouts',11.49,'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=90&auto=format&fit=crop','🌱'),
(4,2,'Crispy Fries','Seasoned with sea salt',3.99,'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=90&auto=format&fit=crop','🍟'),
(4,2,'Milkshake','Vanilla, chocolate, or strawberry',5.99,'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=600&q=90&auto=format&fit=crop','🥤');

-- Tokyo Sushi Bar items (section 5=Rolls, 6=Extras)
insert into menu_items (section_id, restaurant_id, name, description, price, img, emoji) values
(5,3,'California Roll','Crab, avocado, cucumber',9.99,'https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=600&q=90&auto=format&fit=crop','🍣'),
(5,3,'Spicy Tuna Roll','Tuna, spicy mayo, cucumber',11.99,'https://images.unsplash.com/photo-1562802378-063ec186a863?w=600&q=90&auto=format&fit=crop','🍣'),
(5,3,'Dragon Roll','Shrimp tempura, avocado on top',14.99,'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=600&q=90&auto=format&fit=crop','🍣'),
(5,3,'Rainbow Roll','Assorted fish, avocado',15.99,'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&q=90&auto=format&fit=crop','🍣'),
(6,3,'Miso Soup','Tofu, seaweed, green onion',3.49,'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=90&auto=format&fit=crop','🍜'),
(6,3,'Gyoza (6 pcs)','Pan-fried pork dumplings',7.99,'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600&q=90&auto=format&fit=crop','🥟');

-- Spice Garden items (section 7=Mains, 8=Rice & Sides)
insert into menu_items (section_id, restaurant_id, name, description, price, img, emoji) values
(7,4,'Butter Chicken','Creamy tomato sauce, tender chicken',14.99,'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=90&auto=format&fit=crop','🍛'),
(7,4,'Palak Paneer','Spinach curry with cottage cheese',13.49,'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=90&auto=format&fit=crop','🍛'),
(7,4,'Lamb Rogan Josh','Slow-cooked lamb in aromatic spices',16.99,'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=90&auto=format&fit=crop','🍛'),
(7,4,'Garlic Naan','Freshly baked with garlic butter',3.49,'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=90&auto=format&fit=crop','🫓'),
(8,4,'Basmati Rice','Fragrant long-grain rice',2.99,'https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=600&q=90&auto=format&fit=crop','🍚'),
(8,4,'Raita','Yogurt with cucumber and mint',2.49,'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600&q=90&auto=format&fit=crop','🥣');

-- Taco Fiesta items (section 9=Tacos, 10=Extras)
insert into menu_items (section_id, restaurant_id, name, description, price, img, emoji) values
(9,5,'Carne Asada','Grilled beef, salsa, cilantro',3.99,'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=90&auto=format&fit=crop','🌮'),
(9,5,'Al Pastor','Marinated pork, pineapple, onion',3.99,'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=600&q=90&auto=format&fit=crop','🌮'),
(9,5,'Fish Taco','Battered fish, slaw, chipotle mayo',4.49,'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&q=90&auto=format&fit=crop','🌮'),
(9,5,'Veggie Taco','Roasted veggies, black beans, guac',3.49,'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=600&q=90&auto=format&fit=crop','🌮'),
(10,5,'Guacamole & Chips','Fresh avocado, lime, jalapeno',5.99,'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=90&auto=format&fit=crop','🥑'),
(10,5,'Queso Dip','Warm cheese dip with tortilla chips',4.99,'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&q=90&auto=format&fit=crop','🫙');

-- Noodle House items (section 11=Noodles, 12=Starters)
insert into menu_items (section_id, restaurant_id, name, description, price, img, emoji) values
(11,6,'Tonkotsu Ramen','Rich pork broth, chashu, soft egg',13.99,'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=90&auto=format&fit=crop','🍜'),
(11,6,'Pad Thai','Rice noodles, shrimp, peanuts, lime',12.99,'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600&q=90&auto=format&fit=crop','🍜'),
(11,6,'Beef Pho','Aromatic broth, rice noodles, herbs',13.49,'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=90&auto=format&fit=crop','🍜'),
(11,6,'Dan Dan Noodles','Spicy sesame sauce, minced pork',11.99,'https://images.unsplash.com/photo-1552611052-33e04de081de?w=600&q=90&auto=format&fit=crop','🍜'),
(12,6,'Spring Rolls (4 pcs)','Crispy vegetable spring rolls',5.99,'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600&q=90&auto=format&fit=crop','🥟'),
(12,6,'Wonton Soup','Pork wontons in clear broth',6.49,'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=90&auto=format&fit=crop','🥣');
