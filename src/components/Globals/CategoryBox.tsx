import axios from "axios";
import { Search } from "lucide-react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

interface Category {
  id: number;
  title: string;
  bnTitle: string | null;
  subCategories: Category[];
  parentId?: number | null;
}

interface CategoryBoxProps {
  selectedCategories: number[];
  onCategoryChange: (categories: number[]) => void;
  required?: boolean;
  errorMessage?: string;
}

const CategoryBox = memo(
  ({
    selectedCategories = [],
    onCategoryChange,
    required = false,
    errorMessage,
  }: CategoryBoxProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Memoize fetchCategories with data transformation
    const fetchCategories = useCallback(async () => {
      if (categories.length > 0) return;

      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("/api/articles/categories");
        if (!response.data || !Array.isArray(response.data)) {
          throw new Error("Invalid response format");
        }

        // Filter out categories that are already included as subcategories
        const allSubCategoryIds = new Set(
          response.data
            .flatMap((cat) => cat.subCategories)
            .map((subCat) => subCat.id),
        );

        const filteredData = response.data.filter(
          (category) => !allSubCategoryIds.has(category.id),
        );

        setCategories(filteredData);
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "Failed to fetch categories";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    }, [categories.length]);

    useEffect(() => {
      fetchCategories();
    }, [fetchCategories]);

    // Memoize handleCategoryChange
    const handleCategoryChange = useCallback(
      (categoryId: number) => {
        const updatedCategories = selectedCategories.includes(categoryId)
          ? selectedCategories.filter((id) => id !== categoryId)
          : [...selectedCategories, categoryId];
        onCategoryChange(updatedCategories);
      },
      [selectedCategories, onCategoryChange],
    );

    // Memoize filteredCategories to only include parent categories
    const filteredCategories = useMemo(
      () =>
        categories.filter(
          (category) =>
            category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.bnTitle
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            category.subCategories.some(
              (sub) =>
                sub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                sub.bnTitle?.toLowerCase().includes(searchTerm.toLowerCase()),
            ),
        ),
      [categories, searchTerm],
    );

    // Memoize renderCategory with nested subcategories
    const renderCategory = useCallback(
      (category: Category) => (
        <div key={category.id} className="mb-2">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedCategories?.includes(category.id)}
              onChange={() => handleCategoryChange(category.id)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label className="cursor-pointer">
              <span>{category.title}</span>
              {category.bnTitle && (
                <span className="ml-1 text-gray-500">({category.bnTitle})</span>
              )}
            </label>
          </div>
          {category.subCategories.length > 0 && (
            <div className="ml-6 mt-1 space-y-1 border-l border-gray-200 pl-2">
              {category.subCategories.map((sub) => (
                <div key={sub.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories?.includes(sub.id)}
                    onChange={() => handleCategoryChange(sub.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label className="cursor-pointer">
                    <span>{sub.title}</span>
                    {sub.bnTitle && (
                      <span className="ml-1 text-gray-500">
                        ({sub.bnTitle})
                      </span>
                    )}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      ),
      [selectedCategories, handleCategoryChange],
    );

    console.log(filteredCategories);

    return (
      <div
        className={`rounded border bg-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
          errorMessage ? "border-red-500" : "border-slate-200"
        }`}
      >
        <div className="p-4">
          <label
            htmlFor="category"
            className="mb-2 block text-base font-medium text-gray-700"
          >
            Category
          </label>
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search category..."
              className="w-full rounded-md border p-2 pr-8 focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              size={18}
              className="absolute right-2 top-2.5 text-gray-400"
            />
          </div>
          {loading ? (
            <div className="py-4 text-center">Loading categories...</div>
          ) : error ? (
            <div className="py-4 text-center text-red-500">{error}</div>
          ) : ( 
            <>
              <div className="max-h-60 space-y-2 overflow-y-auto">
                {filteredCategories.length > 0 ? (
                  filteredCategories.map(renderCategory)
                ) : (
                  <div className="py-2 text-center text-gray-500">
                    No categories found
                  </div>
                )}
              </div>
              {errorMessage && (
                <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
              )}
            </>
          )}
        </div>
      </div>
    );
  },
);

CategoryBox.displayName = "CategoryBox";

export default CategoryBox;
