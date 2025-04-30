'use client';

import { useEffect, useState } from "react";
import EmployeeForm from "./EmployeeForm";
import { Employee } from "../types/employee";

interface EmployeeListProps {
  employees: Employee[];
  onDelete: (id: string) => Promise<void>;
  onSubmit: (employeeData: Employee) => Promise<void>;
}

const EmployeeList: React.FC<EmployeeListProps> = ({
  employees = [],
  onDelete,
  onSubmit
}) => {
  const [employeeList, setEmployeeList] = useState<Employee[]>(employees);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedEmployee, setEditedEmployee] = useState<Partial<Employee>>({});

  const handleSubmit = async (employeeData: Employee) => {
    if (onSubmit) {
      await onSubmit(employeeData);
    } else {
      console.error("onSubmit is not defined!");
    }
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id) {
      console.error("Employee ID is undefined");
      return;
    }
    await onDelete(id);
    setEmployeeList((prev) => prev.filter((emp) => emp.id !== id));
  };

  const handleEditClick = (employee: Employee) => {
    setEditingId(employee.id ?? null);

    setEditedEmployee({ ...employee });
  };

  const handleEditChange = (field: keyof Employee, value: string) => {
    setEditedEmployee((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!editingId || !editedEmployee) return;
  
    const updatedEmployee: Employee = {
      id: editingId,
      name: editedEmployee.name || '',
      email: editedEmployee.email || '',
      position: editedEmployee.position || '',
      salary: Number(editedEmployee.salary) || 0,
    };
  
    await onSubmit(updatedEmployee);
  
    setEmployeeList((prevList) =>
      prevList.map((emp) => (emp.id === editingId ? updatedEmployee : emp))
    );
  
    setEditingId(null);
    setEditedEmployee({});
  };
  

  useEffect(() => {
    setEmployeeList(employees);
  }, [employees]);

  return (
    <div className="p-4 border rounded-md shadow-md bg-white">
      <EmployeeForm onSubmit={handleSubmit} />
      <ul className="mt-4 space-y-4">
        {employeeList.length > 0 ? (
          employeeList.map((employee) => (
            <li key={employee.id} className="border p-4 rounded-md bg-white dark:bg-gray-800">
              {editingId === employee.id ? (
                <>
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      value={editedEmployee.name || ''}
                      onChange={(e) => handleEditChange('name', e.target.value)}
                      className="text-gray-900 dark:text-white"
                    />
                    <input
                      type="text"
                      value={editedEmployee.email || ''}
                      onChange={(e) => handleEditChange('email', e.target.value)}
                      className="text-gray-900 dark:text-white"
                    />
                    <input
                      type="text"
                      value={editedEmployee.position || ''}
                      onChange={(e) => handleEditChange('position', e.target.value)}
                      className="text-gray-900 dark:text-white"
                    />
                    <input
                      type="number"
                      value={editedEmployee.salary || ''}
                      onChange={(e) => handleEditChange('salary', e.target.value)}
                      className="text-gray-900 dark:text-white"
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={handleSave}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-gray-900 dark:text-white"><strong>Name:</strong> {employee.name}</p>
                  <p className="text-gray-900 dark:text-white"><strong>Email:</strong> {employee.email}</p>
                  <p className="text-gray-900 dark:text-white"><strong>Position:</strong> {employee.position}</p>
                  <p className="text-gray-900 dark:text-white"><strong>Salary:</strong> ₹{employee.salary}</p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleEditClick(employee)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(employee.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))
        ) : (
          <p className="text-gray-600">No employees available.</p>
        )}
      </ul>
    </div>
  );
};

export default EmployeeList;
