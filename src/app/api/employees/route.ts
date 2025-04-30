// app/api/employees/route.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const employees = await prisma.employee.findMany();
    return new Response(JSON.stringify(employees), { status: 200 });
  } catch {
    return new Response("Error fetching employees", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, email, position, salary } = await req.json();

    if (!name || !email || !position || !salary) {
      return new Response("Missing required fields", { status: 400 });
    }

    const newEmployee = await prisma.employee.create({
      data: { name, email, position, salary },
    });

    return new Response(JSON.stringify(newEmployee), { status: 201 });
  } catch {
    return new Response("Error creating employee", { status: 500 });
  }
}
