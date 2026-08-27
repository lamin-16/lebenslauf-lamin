from PIL import Image, ImageDraw, ImageFont

# تحميل الأيقونة الذهبية
icon = Image.open('public/og-gold.png').convert('RGBA')
icon = icon.resize((400, 400), Image.LANCZOS)

# خلفية كحلية
bg = Image.new('RGB', (1200, 630), '#0f1b3d')
bg.paste(icon, (100, 115), icon)

draw = ImageDraw.Draw(bg)

# تحميل خطوط (إن لم تتوفر نستخدم الافتراضي)
try:
    font_big = ImageFont.truetype('DejaVuSans-Bold.ttf', 64)
    font_medium = ImageFont.truetype('DejaVuSans-Bold.ttf', 56)
    font_small = ImageFont.truetype('DejaVuSans.ttf', 36)
except:
    font_big = ImageFont.load_default()
    font_medium = ImageFont.load_default()
    font_small = ImageFont.load_default()

draw.text((560, 200), 'Kostenloser', fill='white', font=font_big)
draw.text((560, 290), 'tabellarischer Lebenslauf', fill='#d4af37', font=font_medium)
draw.text((560, 370), 'in 3 Schritten – PDF downloaden', fill='#e5e7eb', font=font_small)

bg.save('public/og-image.jpg', quality=95)
print('OG image created with Pillow')
