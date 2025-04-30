// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import EmployeeList from "../../components/EmployeeList";
import { Employee } from "../../types/employee";

export default function Page() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  // Fetch employee list from API
  const fetchEmployees = async () => {
    try {
      const res = await fetch("/api/employees");
      const data = await res.json();
      setEmployees(data);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Add employee
  const handleAddEmployee = async (employeeData: Employee) => {
    try {
      const res = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employeeData),
      });

      if (res.ok) {
        await fetchEmployees(); // refresh list after insert
      } else {
        const error = await res.text();
        console.error("Failed to add employee:", error);
      }
    } catch (err) {
      console.error("Error adding employee:", err);
    }
  };

  // Delete employee
  const handleDeleteEmployee = async (id: string) => {
    try {
      const res = await fetch(`/api/employees/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await fetchEmployees(); // refresh list after delete
      } else {
        console.error("Failed to delete employee");
      }
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Employee Management</h1>
      <EmployeeList
        employees={employees}
        onDelete={handleDeleteEmployee}
        onSubmit={handleAddEmployee}
      />
    </div>
  );
}
