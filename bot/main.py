import os
import json
import asyncio
from aiogram import Bot, Dispatcher, types, F
from aiogram.filters import CommandStart
from aiogram.types import WebAppInfo, InlineKeyboardMarkup, InlineKeyboardButton
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

TOKEN = os.getenv("API_TOKEN")
ADMIN_ID = os.getenv("ADMIN_ID")
CHANNEL_ID = os.getenv("CHANNEL_ID")
WEBAPP_URL = os.getenv("WEBAPP_URL")

bot = Bot(token=TOKEN)
dp = Dispatcher()

@dp.message(CommandStart())
async def start(message: types.Message):
    """Handler for /start command"""
    keyboard = InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(
            text="Do'konni ochish 🛍️", 
            web_app=WebAppInfo(url=WEBAPP_URL)
        )]
    ])
    
    welcome_text = (
        "Assalomu alaykum! **Yufor uz** botiga xush kelibsiz. ✨\n\n"
        "Bu yerda siz o'zingizga mos tibbiy kiyimlarni tanlashingiz va buyurtma berishingiz mumkin.\n"
        "Do'konni ochish uchun pastdagi tugmani bosing."
    )
    
    await message.answer(welcome_text, reply_markup=keyboard, parse_mode="Markdown")

@dp.message(F.web_app_data)
async def handle_webapp_data(message: types.Message):
    """Handler for WebApp data reception"""
    try:
        data = json.loads(message.web_app_data.data)
        
        # Order details for the user
        user_text = (
            "✅ **Buyurtmangiz qabul qilindi!**\n\n"
            f"👤 Ism: {data['user']['name']}\n"
            f"📞 Tel: {data['user']['phone']}\n"
            f"💰 Jami summa: {data['totalPrice']:,} so'm\n\n"
            "Tez orada mutaxassislarimiz siz bilan bog'lanishadi. Rahmat!"
        )
        await message.answer(user_text, parse_mode="Markdown")
        
        # Forward to channel in JSON format as requested
        # We wrap it in a code block for better visibility in Telegram
        order_json = json.dumps(data, indent=2, ensure_ascii=False)
        channel_message = f"🆕 **Yangi Buyurtma**\n\n```json\n{order_json}\n```"
        
        await bot.send_message(chat_id=CHANNEL_ID, text=channel_message, parse_mode="MarkdownV2")
        
    except Exception as e:
        print(f"Error handling data: {e}")
        await message.answer("Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.")

async def main():
    print("Bot ishga tushdi...")
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
