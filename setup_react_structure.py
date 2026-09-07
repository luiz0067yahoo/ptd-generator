import os

os.makedirs('src/assets', exist_ok=True)
os.makedirs('src/styles', exist_ok=True)
os.makedirs('src/services', exist_ok=True)
os.makedirs('src/components/steps', exist_ok=True)

with open('logo_b64.txt', 'r', encoding='utf-8') as f:
    b64 = f.read().strip()

with open('src/assets/logoSenac.js', 'w', encoding='utf-8') as out:
    out.write(f'export const SENAC_LOGO_BASE64 = "{b64}";\n')

print('Directory structure and logoSenac.js created successfully!')
