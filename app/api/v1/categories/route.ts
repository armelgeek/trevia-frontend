import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { createSearchParams } from '@/shared/domain/base.search-param';
import { createCategory, getCategories } from '@/features/category/domain/use-cases';

export async function GET(request: NextRequest) {
   const searchParams = createSearchParams();
   const filter = searchParams.load(request);
  const data = await getCategories(filter);

  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/agent/create:
 *   post:
 *     summary: Creates a Langbase Pipe (Support Agent)
 *     description: Creates a new Langbase Pipe (agent) with a name derived from the user ID.
 *     tags:
 *       - Agents
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The unique ID of the user for whom to create the agent/pipe. This will be used as the pipe name.
 *                 example: "e1f23b9b-d89a-4aa7-8a44-bcecaadca679"
 *     responses:
 *       201:
 *         description: Pipe (Agent) created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Pipe 'e1f23b9b-d89a-4aa7-8a44-bcecaadca679' created successfully.
 *                 pipe:
 *                   type: object # Adjust based on actual Langbase response structure
 *       400:
 *         description: Bad Request (e.g., missing userId).
 *       409:
 *         description: Pipe with the specified name (userId) already exists.
 *       500:
 *         description: Internal Server Error or Langbase API error.
 */

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const data = await createCategory(body);

  return NextResponse.json(data);
}
