This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, start postgres on your local Docker:
`docker run -p 5432:5432 -e POSTGRES_HOST_AUTH_METHOD=trust postgres`

Second, create a `.env.development.local` file. See `env.sample`

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deployment

```
gcloud run deploy the-strength-solution-web \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-secrets "POSTGRES_URL=POSTGRES_URL:latest,NEXTAUTH_SECRET=NEXTAUTH_SECRET:latest,GOOGLE_CLIENT_ID=GOOGLE_CLIENT_ID:latest,GOOGLE_CLIENT_SECRET=GOOGLE_CLIENT_SECRET:latest,FACEBOOK_CLIENT_ID=FACEBOOK_CLIENT_ID:latest,FACEBOOK_CLIENT_SECRET=FACEBOOK_CLIENT_SECRET:latest"
```

## Migrations

How to create a migration: `npx prisma migrate dev --name nameOfMigration`

If you make changes to the prisma schema, you should regenerate the prisma client: `npx prisma generate`

How to seed the db: `npx prisma db seed`
