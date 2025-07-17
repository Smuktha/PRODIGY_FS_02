'use client';
import { useState } from 'react';
import { Employee } from "../types/employee";
interface EmployeeFormProps {
  onSubmit: (employeeData: Employee) => Promise<void>;
}
const EmployeeForm: React.FC<EmployeeFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !position || !salary) {
      alert('All fields are required.');
      return;
    }
    const newEmployee: Employee = {
      name,
      email,
      position,
      salary: parseFloat(salary)
    };

    await onSubmit(newEmployee);

    setName('');
    setEmail('');
    setPosition('');
    setSalary('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
  
      <input
      
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="w-full border p-2 rounded text-black"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full border p-2 rounded text-black"
      />
      <input
        type="text"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        placeholder="Position"
        className="w-full border p-2 rounded text-black"
      />
      <input
        type="number"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        placeholder="Salary"
        className="w-full border p-2 rounded text-black"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default EmployeeForm;
