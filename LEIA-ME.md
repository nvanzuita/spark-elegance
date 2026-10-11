# Atualização do site Bruna Beauty

## Como aplicar
1. Faça uma branch nova: `git checkout -b feat/idiomas-e-correcoes`
2. Copie o conteúdo desta pasta por cima do projeto (as pastas têm a mesma estrutura; confirme "substituir").
3. **Apague** estes ficheiros do projeto:
   - `src/hooks/UseVideoProgress.ts` (código morto da Academy / Firebase)
   - `bun.lockb` (fica só o npm; se preferir Bun, apague antes o `package-lock.json`)
   - `public/favicon.PNG` e `public/placeholder.PNG` (substituídos pelos novos ícones / sem uso)
4. Na pasta do projeto: `npm install` (atualiza o `package-lock.json` sem as dependências removidas) e depois `npm run dev`.
5. Teste: troca de idioma (PT/EN/FR/ES), menu mobile, botões de reserva. Se estiver tudo certo: `git add -A` e `git commit`.

## O que mudou
- Idiomas: PT (base), EN, FR, ES. Textos em `src/i18n/translations.ts`. O título "Luxury Aesthetic Experience" mantém-se em inglês em todos.
- Contactos e links num só ficheiro: `src/lib/siteConfig.ts` (WhatsApp 351931920081; link do Fresha marcado com TODO).
- Navbar: links corrigidos, ícone da Academy (desktop e mobile), menu mobile corrigido, seletor de idioma.
- Título da página deixa de ser sobrescrito por "Serviços | ..." / "Mentorias | ...".
- Favicon e imagem de partilha com o novo logo; canonical, og:url, lang pt-PT, sitemap.xml.
- Fontes passam de `@import` (CSS) para `<link>` com preconnect.
- Removidos: código Firebase e dependências sem uso (firebase, jspdf, jspdf-autotable, qrcode, cloudinary-core, @tailwindcss/postcss).
