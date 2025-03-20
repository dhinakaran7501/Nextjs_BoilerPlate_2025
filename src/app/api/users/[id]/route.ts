import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  const user = {
    id: parseInt(id),
    name: "John Doe",
    email: "john@example.com",
  };

  return Response.json(user);
}
