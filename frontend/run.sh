#!/bin/bash

# اسکریپت راه‌اندازی Frontend

echo "🚀 در حال راه‌اندازی Frontend..."

# بررسی نصب Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js نصب نیست. لطفاً ابتدا Node.js را نصب کنید."
    exit 1
fi

# نصب وابستگی‌ها
if [ ! -d "node_modules" ]; then
    echo "📦 نصب وابستگی‌ها..."
    npm install
fi

# بررسی فایل .env.local
if [ ! -f ".env.local" ]; then
    echo "⚠️  فایل .env.local یافت نشد. کپی از .env.local.example..."
    cp .env.local.example .env.local
fi

# اجرای سرور توسعه
echo "🎯 اجرای سرور Next.js..."
npm run dev
