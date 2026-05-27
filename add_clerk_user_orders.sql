alter table orders add column if not exists clerk_user_id text;

create index if not exists orders_clerk_user_id_idx on orders (clerk_user_id);

-- Existing demo orders will have null clerk_user_id and will no longer appear in My Orders.
-- New checkout flow requires Clerk sign-in and writes this field.
