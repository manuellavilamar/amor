# Nosso Calendário de Amor

Um calendário do ano inteiro onde cada dia guarda uma mensagem de amor. Feito para dois: ele escreve para ela, ela escreve para ele. Tudo em marsala.

## O que tem

- Calendário completo dos 12 meses (navegue entre anos)
- Cada dia pode ter uma mensagem de cada um
- **Dias futuros estão bloqueados** — só dá pra escrever quando o dia chega
- Seletor de pessoa (Ele / Ela) — os nomes são personalizáveis
- Sincronização entre os dois via Google Sheets (grátis, sem programar)
- Funciona também no modo local (sem sincronização)
- Backup em arquivo JSON

## Como publicar no GitHub (5 minutos)

1. Crie uma conta no [github.com](https://github.com) (se não tiver).
2. Crie um repositório novo, por exemplo `nosso-calendario` — pode ser **público** (necessário para o GitHub Pages gratuito).
3. Faça upload do arquivo `index.html` para a raiz do repositório (botão "Add file" → "Upload files").
4. No repositório, vá em **Settings → Pages**.
5. Em "Source", escolha `Deploy from a branch`, branch `main`, pasta `/ (root)`, e clique em **Save**.
6. Aguarde 1–2 minutos. O link do seu site aparecerá no topo da página do Pages, no formato:
   `https://SEU-USUARIO.github.io/nosso-calendario/`
7. Envie esse link para sua namorada.

## Como ativar a sincronização (para os dois verem as mensagens)

Sem sincronização, cada um só vê as próprias mensagens no próprio navegador. Para compartilhar:

1. Abra o [Google Sheets](https://sheets.google.com) e crie uma planilha nova (ex: "Mensagens do Amor").
2. Menu **Extensões → Apps Script**.
3. Apague o código padrão e cole todo o conteúdo do arquivo `sincronizador.gs`.
4. Salve (ícone de disquete) — dê qualquer nome ao projeto.
5. Clique em **Implantar → Nova implantação**.
6. Clique na engrenagem e escolha **Aplicativo da Web**.
   - **Executar como:** Eu (seu email)
   - **Quem pode acessar:** Qualquer pessoa
7. Clique em **Implantar**. Vai pedir autorização — autorize (é o seu próprio script).
8. Copie a **URL do aplicativo da Web** (começa com `https://script.google.com/macros/s/...`).
9. No site, clique na engrenagem (canto superior) → cole a URL em "URL do seu banco de mensagens" → **Conectar e sincronizar**.
10. Repita o passo 9 no navegador da sua namorada (a mesma URL).

Pronto! Quando um escrever, a outra pessoa vê em até 30 segundos.

## Como usar

- No topo, selecione se você é **Ele** ou **Ela** (os nomes podem ser trocados na engrenagem).
- Clique em qualquer dia que já passou ou no dia de hoje.
- Escreva sua mensagem e clique em **Salvar mensagem**. Corações vão flutuar.
- Dias futuros têm cadeado — abrem automaticamente quando a data chegar.
- Dias com mensagem ganham uma bolinha dourada embaixo. Se ambos escreveram, a bolinha é maior e marsala+dourada.

## Dicas

- Quer mudar a cor? É só procurar `--marsala:#7B2D43;` no topo do `index.html` e trocar o valor.
- O ano é automático (ano atual). Use as setinhas ao lado do ano para ver anos anteriores.
- Faça backup de vez em quando: engrenagem → Exportar mensagens.
