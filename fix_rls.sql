drop policy if exists "Public insert orders" on orders;
drop policy if exists "Public insert order_items" on order_items;
drop policy if exists "anon_insert_orders" on orders;
drop policy if exists "anon_select_orders" on orders;
drop policy if exists "anon_insert_order_items" on order_items;
drop policy if exists "anon_select_order_items" on order_items;

create policy "anon_insert_orders" on orders for insert to anon with check (true);
create policy "anon_select_orders" on orders for select to anon using (true);
create policy "anon_insert_order_items" on order_items for insert to anon with check (true);
create policy "anon_select_order_items" on order_items for select to anon using (true);
