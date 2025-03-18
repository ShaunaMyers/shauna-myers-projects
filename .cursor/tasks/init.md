# Fullstack Blog: Next.js + Supabase + Shadcn UI

This file outlines a set of detailed tasks for building a personal fullstack blog using Next.js, Supabase, and Shadcn UI/Tailwind for styling.

Run through each task step by step. After completing each task, mark it as completed with an `[x]` and commit your changes. If you need more detail about a task, gather relevant files and pass the FULL file to the research agent.

Suggested prompt to use with the cursor agent:

```txt
Go through each task in the .cursor-tasks file. After you complete each task, update the file to check off any task. Run builds and commits after each task. Continue with each task until you have checked off each one. After each story, do not take a screenshot. If you need more detail about a task, you can gather relevant files and pass the FULL file to the research agent.
```

## 1. Project Setup

1. [x] **Set up the Supabase client**

   - [x] Create a `src/lib/supabase.ts` file to initialize the Supabase client:
   - [x] Verify the environment variables are correctly set in `.env.local`

2. [x] **Create database types for TypeScript**

   - [x] Create `src/lib/database.ts` file with the type definitions based on our schema:

3. [x] **Create utility functions for data fetching**
   - [x] Create `src/lib/api.ts` with functions to interact with Supabase: getAllPosts, getPostBySlug and getAllCategories

## 2. Set Up Shadcn UI Components

1. [x] **Install and configure Shadcn UI**

   - [x] Run the following commands to set up Shadcn UI:
     ```bash
     npm install @shadcn/ui
     npx shadcn-ui init
     ```
   - [x] When prompted, select the following options:
     - Style: Default
     - Base color: Neutral
     - Global CSS: src/app/globals.css
     - CSS variables: Yes
     - React Server Components: Yes
     - Tailwind CSS config: tailwind.config.js
     - Components directory: src/components
     - Utility directory: src/lib/utils

2. [x] **Install necessary Shadcn UI components**

   - [x] Install the card component
   - [x] Install the button component
   - [x] Install other necessary components:
     ```bash
     npx shadcn-ui add avatar
     npx shadcn-ui add badge
     npx shadcn-ui add separator
     ```

3. [x] **Set up global styles**
   - [x] Update `src/app/globals.css` to include your custom styling as needed

## 3. Create Blog UI Components

1. [x] **Create a markdown renderer component**

   - [x] Install necessary packages:
     ```bash
     npm install react-markdown rehype-raw rehype-sanitize remark-gfm
     ```
   - [x] Create `src/components/blog/markdown-renderer.tsx` to render markdown content

2. [x] **Create a blog post card component**

   - [x] Create `src/components/blog/post-card.tsx` to render a blog post card

3. [x] **Create blog post grid component**

   - [x] Create `src/components/blog/post-grid.tsx`

4. [x] **Create a blog post header component**
   - [x] Create `src/components/blog/post-header.tsx`

## 4. Implement Blog Pages

1. [x] **Create the blog listing page**

   - [x] Create `src/app/blog/page.tsx` to display all blog posts

2. [x] **Create the blog post detail page**

   - [x] Create `src/app/blog/[slug]/page.tsx` to display a single blog post

3. [x] **Create a Not Found page**
   - [x] Create `src/app/blog/not-found.tsx`

## 5. Update the Homepage

1. [x] **Update the homepage to showcase recent blog posts**
   - [x] Update `src/app/page.tsx`

## 6. Create Layout and Navigation

1. [x] **Update the root layout**
   - [x] Update `src/app/layout.tsx`

## 7. Configure Database and Create Initial Content

1. [x] **Set up Supabase database**

   - [x] Create a new Supabase project if you haven't already
   - [x] Run the SQL setup script in the Supabase SQL editor

2. [x] **Add initial seed data**
   - [x] Create seed data for categories
   - [x] Create seed data for a sample blog post

## 8. Finalize and Test

1. [x] **Update project metadata**

   - [x] Update the title, description, and other metadata in `src/app/layout.tsx`

2. [x] **Add responsive styling improvements**

   - [x] Test all pages on different screen sizes
   - [x] Ensure proper spacing and layout on mobile devices

3. [ ] **Test blog functionality**

   - [ ] Verify that the blog listing page shows all published posts
   - [ ] Verify that the blog post detail page correctly renders markdown content
   - [ ] Ensure that images load correctly
   - [ ] Check that categories are displayed correctly

4. [ ] **Deploy the blog**
   - [ ] Deploy to Vercel or another hosting platform that supports Next.js
   - [ ] Set up the environment variables on the hosting platform
