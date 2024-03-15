### Proof of Personhood Grants Distribution Platform

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Copy the `.env.example` file to `.env`.

Make sure you have docker installed on your machine. If you don't have it installed, you can download it [here](https://www.docker.com/products/docker-desktop).

Then run the following command to start a local postgres database:

```bash
docker-compose up -d
```

Otherwise you can use any postgres database you have access to. Just make sure to update the `.env` file with the correct database url.

You will also need to setup github oauth for authentication. You can do that [here](https://github.com/settings/developers)
Set callback url to `http://localhost:3000/api/auth/callback/github` and set the client id and client secret in the `.env` file.

Then to start a local server run:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## Repo structure

All of the app code is in the `src` directory.

The `app` directory contains the routes for the app.  
The `app/api` directory contains the endpoints that are publicly available under `/api/*` address.  
The `app/components/ui` directory contains the reusable components that are used to build the app.  
The `app/components/icons` directory contains the svg icons that are used in the app.  
The `app/images` directory contains the images used in the project.
The `app/drizzle` directory contains the code that interacts with the database.  
The `app/lib` directory contains all the utils that are used in multiple places.

The `tests/e2e` directory contains the end to end tests for the app written in playwright.  
The `tests/unit` directory contains the unit tests for the app written in vitest.

The `stories` directory contains the stories for the components in the app written in storybook.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/)
