import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik';

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3001/api/employee/all");
      setEmployees(response.data);
    } catch (error) {
      console.error("Failed to fetch employees", error);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await axios.post("http://127.0.0.1:3001/api/employee/create", values);
      setAlertInfo({
        show: true,
        message: "Employee created successfully!",
        type: "success",
      });
      fetchEmployees();
      resetForm();
    } catch (error) {
      setAlertInfo({
        show: true,
        message: "Failed to create employee",
        type: "error",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:3001/api/employee/delete/${id}`);
      setAlertInfo({
        show: true,
        message: "Employee deleted successfully!",
        type: "success",
      });
      const newEmployees = employees.filter((employee) => employee.id !== id);
      setEmployees(newEmployees);
    } catch (error) {
      setAlertInfo({
        show: true,
        message: "Failed to delete employee",
        type: "error",
      });
    }
  };

  useEffect(() => {
    let timer;
    if (alertInfo.show) {
      timer = setTimeout(() => {
        setAlertInfo({ ...alertInfo, show: false });
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [alertInfo]);

  return (
    <div
      style={{
        backgroundColor: '#F5F5DC', // cream color
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
      }}
    >
      <h1 className="text-xl font-bold mb-6">New Employee</h1>
      <Formik
        initialValues={{
          name: "",
          date_of_birth: "",
          department: "",
          address: "",
          contact_number: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Required";
          }
          if (!values.date_of_birth) {
            errors.date_of_birth = "Required";
          }
          if (!values.department) {
            errors.department = "Required";
          }
          if (!values.address) {
            errors.address = "Required";
          }
          if (!values.contact_number) {
            errors.contact_number = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
      >
        {({ values, errors, touched }) => (
          <Form>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Enter the employee name</label>
              <Field type="text" name="name" className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
              {errors.name && touched.name && <div className="text-red-500">{errors.name}</div>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Date of Birth</label>
              <Field type="date" name="date_of_birth" className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
              {errors.date_of_birth && touched.date_of_birth && <div className="text-red-500">{errors.date_of_birth}</div>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Select Department</label>
              <Field name="department" as="select" className="shadow border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline">
                <option value="">Select Department</option>
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Finance">Finance</option>
              </Field>
              {errors.department && touched.department && <div className="text-red-500">{errors.department}</div>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Address</label>
              <Field type="text" name="address" className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
              {errors.address && touched.address && <div className="text-red-500">{errors.address}</div>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Contact Number</label>
              <Field type="tel" name="contact_number" className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
              {errors.contact_number && touched.contact_number && <div className="text-red-500">{errors.contact_number}</div>}
            </div>
            <button type="submit" className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:translate-y-1 hover:shadow-lg">
              Save
            </button>
          </Form>
        )}
      </Formik>
      {alertInfo.show && (
        <div
          className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-2 py-2 rounded text-white ${
            alertInfo.type === "error" ? "bg-red-500" : "bg-green-700"
          }`}
        >
          {alertInfo.message}
        </div>
      )}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Employees</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-2 py-2 text-left">Name</th>
                <th className="px-2 py-2 text-left">Date of Birth</th>
                <th className="px-2 py-2 text-left">Department</th>
                <th className="px-2 py-2 text-left">Address</th>
                <th className="px-2 py-2 text-left">Contact Number</th>
                <th className="px-2 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="m-2">
                  <td className="px-2 py-2 md:px-2 md:py-4">{employee.name}</td>
                  <td className="px-2 py-2 md:px-2 md:py-4">{employee.date_of_birth}</td>
                  <td className="px-2 py-2 md:px-2 md:py-4">{employee.department}</td>
                  <td className="px-2 py-2 md:px-2 md:py-4">{employee.address}</td>
                  <td className="px-2 py-2 md:px-2 md:py-4">{employee.contact_number}</td>
                  <td className="px-2 py-2 md:px-2 md:py-4">
                    <button
                      onClick={() => handleDelete(employee.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-1 rounded focus:outline-none focus:shadow-outline transition-transform transform hover:translate-y-1 hover:shadow-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employee;