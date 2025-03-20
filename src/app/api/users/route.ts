import { NextRequest } from "next/server";

export async function GET() {
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ];

  return Response.json(users);
}

export async function POST(request: NextRequest) {
  const user = await request.json();

  return new Response(JSON.stringify(user), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
