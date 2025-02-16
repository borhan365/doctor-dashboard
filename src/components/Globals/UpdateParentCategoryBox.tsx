import { Select } from "antd";
import type { DefaultOptionType } from "antd/es/select";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoIosArrowDown } from "react-icons/io";

interface ParentCategoryBoxProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

interface Category {
  id: string;
  title: string;
  subCategories?: Category[];
}

export default function UpdateParentCategoryBox({
  value,
  onChange,
}: ParentCategoryBoxProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/articles/categories`);
      setCategories(response.data.categories);
    } catch (err: any) {
      console.error("Error fetching categories:", err);
      setError(err.message || "An error occurred while fetching categories");
      toast.error(err.message || "An error occurred while fetching categories");
    } finally {
      setLoading(false);
    }
  };

  console.log("value", value);
  console.log("categories", categories);

  useEffect(() => {
    fetchCategories();
  }, []);

  const transformCategoriesToTreeData = (
    categories: Category[],
  ): DefaultOptionType[] => {
    return categories.map((category) => ({
      label: category.title,
      value: category.id,
      key: category.id,
      children: category.subCategories
        ? transformCategoriesToTreeData(category.subCategories)
        : undefined,
    }));
  };

  const treeData = transformCategoriesToTreeData(categories);

  return (
    <div className="rounded border border-slate-200 bg-white p-4">
      <h2 className="mb-3 font-medium text-black">Parent Categories</h2>
      <Select
        options={treeData}
        value={value}
        onChange={(newValue) => {
          onChange(newValue);
        }}
        className="custom-antd-input w-full"
        placeholder="Select parent category"
        showSearch
        allowClear
        loading={loading}
        disabled={loading}
        suffixIcon={<IoIosArrowDown />}
        filterOption={(input, option) => {
          if (!option?.label) return false;
          return (option.label as string)
            .toLowerCase()
            .includes(input.toLowerCase());
        }}
      />
    </div>
  );
}
