# Next.js Drizzle CRUD Generator

An automated CLI tool that generates complete CRUD (Create, Read, Update, Delete) feature scaffolding for Next.js applications using Drizzle ORM.

## Overview

This CRUD generator automatically creates all the necessary files for a complete feature module, following best practices and a clean architecture approach. It's designed to work with Next.js applications that use:

- TypeScript
- Drizzle ORM
- React Query
- Zod validation
- Tailwind CSS
- Shadcn UI components

## Features

- ✅ Generates complete feature scaffolding
- ✅ Creates API routes for REST operations
- ✅ Implements data table with sorting, filtering, and pagination
- ✅ Includes form creation with validation
- ✅ Handles create, read, update, and delete operations
- ✅ Uses a robust architecture with separation of concerns
- ✅ Follows consistent naming conventions and file organization

## Installation

1. Place the `crud-generator.js` file in your project root
2. Install the required dependencies if you haven't already:

```bash
npm install chalk slugify
```

3. Make the script executable:

```bash
chmod +x crud-generator.js
```

## Usage

Run the generator with:

```bash
node crud-generator.js
```

Follow the prompts to enter:
- Entity name (in PascalCase, singular form)

The generator will:
1. Check if a Drizzle schema already exists for the entity
2. Create one if it doesn't exist
3. Parse the schema to understand the entity fields
4. Generate all the necessary files

## Generated Structure

For a given entity (e.g., "Category"), the generator creates the following structure under `features/category/`:

```
features/category/
├── api/
│   ├── route.ts                  # API handlers for GET (list) and POST (create)
│   └── [slug]/
│       └── route.ts              # API handlers for GET, PUT and DELETE by slug
├── components/
│   ├── molecules/
│   │   └── category-form.tsx     # Form component for create/update
│   └── organisms/
│       ├── add.tsx               # Add component with modal
│       ├── columns.tsx           # Table columns configuration
│       ├── data-table-row-actions.tsx # Row actions (edit/delete)
│       ├── delete.tsx            # Delete confirmation component
│       └── edit.tsx              # Edit component with modal
├── config/
│   ├── category.key.ts           # Query keys for React Query
│   ├── category.schema.ts        # Zod validation schemas
│   └── category.type.ts          # TypeScript types
├── domain/
│   ├── category.service.ts       # Service for API communication
│   └── use-cases/
│       ├── category.use-case.ts  # Use cases implementation
│       └── index.ts              # Use cases exports
├── hooks/
│   └── use-category.ts           # React hooks for data fetching/mutations
└── pages/
    └── page.tsx                  # Main page component
```

## Integration Steps

After generating the feature:

1. **Add Routes**: Update your app router configuration to include the new routes
2. **Add to Navigation**: Add the new feature to your navigation or sidebar
3. **Run Migrations**: If you created a new schema, run Drizzle migrations to update your database

## Architecture Overview

The generator follows a clean architecture approach:

- **Config**: Contains types, schemas, and configurations
- **Domain**: Contains business logic and API services
- **Components**: UI components separated by complexity (molecules/organisms)
- **Hooks**: React hooks for data fetching and state management
- **API**: API routes for backend communication

## Customization

You can modify the generator script to adapt it to your specific project needs:

- Adjust the file paths to match your project structure
- Modify the templates to follow your coding standards
- Add additional field types and validations

## Requirements

The generator assumes your project has:

1. A Next.js App Router setup
2. Drizzle ORM configured with PostgreSQL
3. React Query for state management
4. Tailwind CSS for styling
5. Shadcn UI components

## License

MIT