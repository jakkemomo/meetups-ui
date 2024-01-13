# meetups-ui
Frontend for Meetups app

## Before starting:


------

## Tech stack: React + TypeScript + Vite

------

## Running locally

1. Install dependencies

```bash
npm install
```

2. Copy `.env.example` to `.env` anf fill `.env.`.

```bash
cp .env.example .env.local
```
3. Fill up `.env` using documentation in Clickup.

4. Start Vite development server

```bash
npm run dev
```

```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
