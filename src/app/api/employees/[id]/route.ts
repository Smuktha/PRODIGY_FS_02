import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

// UPDATE employee
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const { name, email, position, salary } = await req.json();

    const updatedEmployee = await prisma.employee.update({
      where: { id },
      data: { name, email, position, salary },
    });

    return new Response(JSON.stringify(updatedEmployee), { status: 200 });
  } catch (error) {
    return new Response("Failed to update employee", { status: 500 });
  }
}

// DELETE employee
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;

    const deletedEmployee = await prisma.employee.delete({
      where: { id },
    });

    return new Response(JSON.stringify(deletedEmployee), { status: 200 });
  } catch (error) {
    return new Response("Failed to delete employee", { status: 500 });
  }
}
