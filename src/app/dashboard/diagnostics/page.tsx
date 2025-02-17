"use client";

import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Loader2, Search, Trash2, Edit2, Edit } from "lucide-react";
import { useState } from "react";
import { Drawer, Form, Input, InputNumber, Select, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Image from "next/image";

interface Diagnostic {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  status: "available" | "unavailable";
  turnaroundTime: string;
  sampleType: string;
  reportFormat: string;
  featuredImage?: string;
}

// Mock data
const initialDiagnostics: Diagnostic[] = [
  {
    id: "1",
    name: "2D Echo",
    price: 1500,
    description: "Two-dimensional echocardiography examination",
    category: "Cardiology",
    status: "available",
    turnaroundTime: "1-2 hours", 
    sampleType: "Non-invasive",
    reportFormat: "Digital + Print",
    featuredImage: "https://hdclbd.com/Images/uploads/diagnostic-dpt-img/img_diagnostic_dpt_202014163645_Laboratory_hdclbd_dpt.jpg"
  },
  {
    id: "2",
    name: "3D Echo",
    price: 1000,
    description: "Three-dimensional echocardiography examination",
    category: "Cardiology",
    status: "available",
    turnaroundTime: "1-2 hours", 
    sampleType: "Non-invasive",
    reportFormat: "Digital + Print",
    featuredImage: "https://www.praavahealth.com/media-images/vYLbJCJlLtRIHt0sgDhP88J2kbQ=/14/fill-844x557-c0%7Cformat-webp/Rectangle_7051_1_0W1aiuN.png"
  },
  {
    id: "3",
    name: "CT Scan",
    price: 1000,
    description: "Computerized tomography scan",
    category: "Radiology",
    status: "available",
    turnaroundTime: "1-2 hours", 
    sampleType: "Non-invasive",
    reportFormat: "Digital + Print",
    featuredImage: "https://www.praavahealth.com/media-images/vYLbJCJlLtRIHt0sgDhP88J2kbQ=/14/fill-844x557-c0%7Cformat-webp/Rectangle_7051_1_0W1aiuN.png"
  },
  {
    id: "4",
    name: "MRI",
    price: 1000,
    description: "Magnetic resonance imaging",
    category: "Radiology",
    status: "available",
    turnaroundTime: "1-2 hours", 
    sampleType: "Non-invasive",
    reportFormat: "Digital + Print",
    featuredImage: "https://www.praavahealth.com/media-images/vYLbJCJlLtRIHt0sgDhP88J2kbQ=/14/fill-844x557-c0%7Cformat-webp/Rectangle_7051_1_0W1aiuN.png"
  },
  {
    id: "5",
    name: "Ultrasound",
    price: 1000,
    description: "Ultrasound examination",
    category: "Radiology",
    status: "available",
    turnaroundTime: "1-2 hours", 
    sampleType: "Non-invasive",
    reportFormat: "Digital + Print",
    featuredImage: "https://www.praavahealth.com/media-images/vYLbJCJlLtRIHt0sgDhP88J2kbQ=/14/fill-844x557-c0%7Cformat-webp/Rectangle_7051_1_0W1aiuN.png"
  }
];

function Diagnostics() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editingDiagnostic, setEditingDiagnostic] = useState<Diagnostic | null>(null);
  const [diagnosticsList, setDiagnosticsList] = useState(initialDiagnostics);
  const [form] = Form.useForm();
  const itemsPerPage = 5;

  const { data: diagnostics, isLoading } = useQuery({
    queryKey: ["diagnostics"],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return diagnosticsList;
    },
  });

  const handleCreate = (values: Omit<Diagnostic, "id">) => {
    const newDiagnostic = {
      ...values,
      id: Math.random().toString(36).substr(2, 9),
    };
    setDiagnosticsList(prev => [...prev, newDiagnostic]);
    message.success("Diagnostic created successfully");
    setDrawerVisible(false);
    form.resetFields();
  };

  const handleUpdate = (values: Diagnostic) => {
    setDiagnosticsList(prev => 
      prev.map(item => item.id === editingDiagnostic?.id ? { ...values, id: item.id } : item)
    );
    message.success("Diagnostic updated successfully");
    setDrawerVisible(false);
    setEditingDiagnostic(null);
    form.resetFields();
  };

  const handleDelete = (id: string) => {
    setDiagnosticsList(prev => prev.filter(item => item.id !== id));
    message.success("Diagnostic deleted successfully");
  };

  const categories = ["All", ...Array.from(new Set(diagnostics?.map(d => d.category) || []))];

  const filteredDiagnostics = diagnostics?.filter(diagnostic => {
    const matchesSearch = diagnostic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      diagnostic.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || diagnostic.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  const totalPages = Math.ceil(filteredDiagnostics.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDiagnostics = filteredDiagnostics.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handleEdit = (diagnostic: Diagnostic) => {
    setEditingDiagnostic(diagnostic);
    form.setFieldsValue(diagnostic);
    setDrawerVisible(true);
  };

  const handleSubmit = (values: any) => {
    if (editingDiagnostic) {
      handleUpdate({ ...values, id: editingDiagnostic.id });
    } else {
      handleCreate(values);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Diagnostic Tests</h1>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <div className="relative">
            <input
              type="text"
              placeholder="Search diagnostics..."
              className="rounded-lg border border-slate-300 pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
          </div>
          <PrimaryButton text="Add Diagnostic" onClick={() => setDrawerVisible(true)} />
        </div>
      </div>

      {isLoading ? (
        <div className="flex h-[50vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      ) : paginatedDiagnostics.length === 0 ? (
        <div className="flex h-[50vh] items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-medium text-slate-900">No diagnostics found</p>
            <p className="mt-1 text-sm text-slate-500">
              {searchTerm || selectedCategory !== "All" 
                ? "Try adjusting your search or filter criteria"
                : "Start by adding a new diagnostic test"}
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="rounded-lg border border-slate-100 bg-white shadow-sm p-4">
            <div className="overflow-x-auto">
              <table className="w-full border border-slate-100">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-6 py-3 text-left text-base font-medium text-slate-700">Name</th>
                    <th className="px-6 py-3 text-left text-base font-medium text-slate-700">Category</th>
                    <th className="px-6 py-3 text-left text-base font-medium text-slate-700">Price</th>
                    <th className="px-6 py-3 text-left text-base font-medium text-slate-700">Status</th>
                    <th className="px-6 py-3 text-left text-base font-medium text-slate-700">Turnaround Time</th>
                    <th className="px-6 py-3 text-left text-base font-medium text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {paginatedDiagnostics.map((diagnostic) => (
                    <tr key={diagnostic.id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {diagnostic.featuredImage ? (
                            <Image
                              src={diagnostic.featuredImage}
                              alt={diagnostic.name}
                              width={40}
                              height={40}
                              className="mr-3 rounded-md object-cover"
                            />
                          ) : (
                            <div className="mr-3 h-10 w-10 rounded-md bg-slate-100 flex items-center justify-center">
                              <span className="text-slate-400 text-xs">No image</span>
                            </div>
                          )}
                          <div>
                            <div className="font-medium text-slate-900">{diagnostic.name}</div>
                            <div className="text-sm text-slate-500">{diagnostic.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-base text-slate-600">{diagnostic.category}</td>
                      <td className="px-6 py-4 text-base text-slate-600">${diagnostic.price}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex rounded-full px-3 py-1 capitalize text-sm font-medium ${
                          diagnostic.status === "available" 
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-600"
                        }`}>
                          {diagnostic.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-base text-slate-600">{diagnostic.turnaroundTime}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(diagnostic)}
                            className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(diagnostic.id)}
                            className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredDiagnostics.length)} of {filteredDiagnostics.length} results
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="inline-flex items-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="inline-flex items-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
                <ChevronRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        </>
      )}

      <Drawer
        title={editingDiagnostic ? "Edit Diagnostic" : "Add New Diagnostic"}
        placement="right"
        width={500}
        onClose={() => {
          setDrawerVisible(false);
          setEditingDiagnostic(null);
          form.resetFields();
        }}
        open={drawerVisible}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="featuredImage"
            label="Featured Image"
          >
            <Upload
              listType="picture-card"
              maxCount={1}
              beforeUpload={() => false}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter the name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter the description' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select the category' }]}
          >
            <Select>
              {categories.filter(cat => cat !== "All").map(category => (
                <Select.Option key={category} value={category}>
                  {category}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please enter the price' }]}
          >
            <InputNumber
              min={0}
              prefix="$"
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select the status' }]}
          >
            <Select>
              <Select.Option value="available">Available</Select.Option>
              <Select.Option value="unavailable">Unavailable</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="turnaroundTime"
            label="Turnaround Time"
            rules={[{ required: true, message: 'Please enter the turnaround time' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="sampleType"
            label="Sample Type"
            rules={[{ required: true, message: 'Please enter the sample type' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="reportFormat"
            label="Report Format"
            rules={[{ required: true, message: 'Please enter the report format' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <PrimaryButton
              text={editingDiagnostic ? "Update Diagnostic" : "Create Diagnostic"}
              type="submit"
              className="w-full"
            />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}

export default Diagnostics;