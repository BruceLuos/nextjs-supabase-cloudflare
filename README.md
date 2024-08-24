## Getting Started

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## 项目描述

- 项目框架 Next.js

- Ui库 Flowbite

  - 全局toast `components/ui/FlowbiteToasts`

- 后端服务 Supabase

  - supabase 相关方法 `utils/supabase`
  - 登录方法,项目目前使用邮箱otp和谷歌oauth `utils/auth-helpers`
  - 谷歌登录回调 `auth/callback`

- 支付服务 Stripe

  - stripe 相关方法 `utils/stripe`
  - stripe webhook `api/webhook`
  - stripe 产品数据获取并展示 `components/PricingSection`

- 博客 Contentlayer 和 MDX

  - 博客内容 `content/blog`
  - contentlayer 配置 `contentlayer.config.js`

- 国际化i18n Next-intl

  - 配置文件 `i18n.ts | navigation.ts`
  - en无前缀Link组件 `components/Link`

- 统计脚本

  - `<AnalyticsScript/>`

- sitemap生成

  - `sitempa.ts`

- metadata生成

  - 简易生成使用 `seo.tsx`
  - 定制生成 `generateMetadata`

- 其他
  - Header nav 文本和路径对应`NavBar 和 NavBarWithoutLocale 中的navLink`
  - 部分公共配置 `config.js`

## stripe webhook 本地调试

https://dashboard.stripe.com/webhooks/create?endpoint_location=local
https://docs.stripe.com/stripe-cli

```
stripe login
stripe listen --forward-to localhost:3000/api/webhook
```

## stripe 支付 test

- 选择随机一个付费方案，Premium或Basic
- 填入银行卡信息
  - 银行卡号：4242 4242 4242 4242
  - 年份随机 如：8/27
  - cvc随机 如：344
  - 名字和国家也随机填入
  - 支付成功
  - 账号积分增加

## supabase 数据库表sql

```sql
-- 用户表
create table users (
    --  用户id,取auth表中id
    id uuid references auth.users not null primary key,
    -- stripe顾客id
    stripe_customer_id text,
    -- 用户名
    username text,
    -- 用户头像
    avatar_url text,
    -- 用户邮箱
    email text,
    -- 当前总积分,默认10
    plan_limit decimal(10,2) default 10.00,
    -- 用户使用积分
    plan_used decimal(10,2) default 0.00,
    -- 用户今天使用积分数
    today_used decimal(10,2) default 0.00,
    -- 用户总共使用积分数
    total_used decimal(10,2) default 0.00,
    -- 套餐类型    0为普通用户，1为消费用户
    plan_type integer default 0,
    -- 套餐过期时间
    plan_expire_at timestamp with time zone,
    -- 用户总消费
    paid_amount decimal(10,2) default 0.00,
    -- 记录的创建时间
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    -- 记录的更新时间
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null

);


-- 订单状态类型 stripe order status
create type order_status_type as enum ('processing', 'canceled','succeeded','requires_action','requires_capture','requires_confirmation','requires_payment_method');

-- 订单表
create table orders (
    -- 自增id
    id serial primary key,
    -- 用户id, 取auth表中id
    user_id uuid references auth.users not null,
    -- 账单id
    trade_id text,
    -- stripe顾客id
    stripe_customer_id text,
    -- 账单状态, processing, canceled, succeeded
    status order_status_type,
    -- 价格
    amount bigint,
    -- 货币
    currency text,
    -- 商品id,套餐id
    product_id text,
    -- 商品名
    product_name text,
    -- 商品描述
    product_description text,
    -- 支付时间,
    paid_time timestamp with time zone,
    -- 账单创建日期
    date timestamp with time zone,
    -- 记录的创建时间
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    -- 记录的更新时间
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
 );



/**
* trigger 新注册用户自动往users表插入一定数据
*/
-- trigger 已存在则删除
drop function if exists public.handle_new_user ();
create function public.handle_new_user()
returns trigger as
$$
declare
    final_username text;
    suffix_counter int := 1;
begin
    -- 提取邮箱前缀并去除非字母数字字符
    select regexp_replace(substring(new.email from '^[^@]+'), '[^a-z0-9]', '', 'g') into final_username;

    -- 去除所有空格部分
    final_username := replace(final_username, ' ', '');

    -- 已存在username 处理为username_1_2_3
    while exists (
        select 1 from public.users where lower(username) = lower(final_username)
    ) loop
        final_username := final_username || '_' || suffix_counter;
        suffix_counter := suffix_counter + 1;
    end loop;

    insert into public.users (id, username, avatar_url, email)
    values (
      new.id,
      final_username,
      -- 如果没有提供avatar_url，使用'默认头像URL'
      coalesce(new.raw_user_meta_data->>'avatar_url', ''),
      new.email
    );
    return new;
end;

$$
language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
    execute procedure public.handle_new_user();



```

## supabase [谷歌登录配置](https://supabase.com/docs/guides/auth/social-login/auth-google#configure-your-services-id)

## supabase [邮箱otp登录配置](https://supabase.com/docs/guides/auth/auth-email-passwordless)
