create table restaurants (id serial primary key, name text not null, img text, rating numeric(2,1) default 4.5, delivery_time text, delivery_fee text, tags text[], badge text);

create table menu_sections (id serial primary key, restaurant_id int references restaurants(id) on delete cascade, name text not null, sort_order int default 0);

create table menu_items (id serial primary key, section_id int references menu_sections(id) on delete cascade, restaurant_id int references restaurants(id) on delete cascade, name text not null, description text, price numeric(8,2) not null, img text, emoji text);

create table orders (id serial primary key, clerk_user_id text not null, customer_name text not null, phone text, address text not null, payment_method text, subtotal numeric(8,2), delivery_fee numeric(8,2) default 49, total numeric(8,2), status text default 'received', created_at timestamptz default now());

create table order_items (id serial primary key, order_id int references orders(id) on delete cascade, item_name text not null, emoji text, price numeric(8,2), qty int default 1);

alter table restaurants enable row level security;
alter table menu_sections enable row level security;
alter table menu_items enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

create policy "Public read restaurants" on restaurants for select using (true);
create policy "Public read menu_sections" on menu_sections for select using (true);
create policy "Public read menu_items" on menu_items for select using (true);
create policy "Public insert orders" on orders for insert with check (true);
create policy "Public insert order_items" on order_items for insert with check (true);
