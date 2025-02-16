import { Select } from "antd";
import axios from "axios";
import { ChevronDown, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoIosArrowDown } from "react-icons/io";

const { Option } = Select;

interface Author {
  id: string;
  name: string;
}

interface AuthorBoxProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

export default function AuthorBox({ value, onChange }: AuthorBoxProps) {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch users from API
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/users`);

      const publishedUsers = response?.data
        .filter((user: any) => user.status === "ACTIVE")
        .map((user: any) => ({
          id: user.id,
          name: user.name,
        }));

      setAuthors(publishedUsers);
    } catch (err: any) {
      console.error("Error fetching users:", err);
      setError(err.message || "An error occurred while fetching users");
      toast.error(err.message || "An error occurred while fetching users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Find the current author's name
  const currentAuthor = authors.find(
    (author) => author.id === value,
  );

  return (
    <div className="rounded border border-slate-200 bg-white">
      {loading ? (
        <div className="mb-2 block text-base font-medium text-gray-700">
          Loading...
        </div>
      ) : (
        <>
          <div className="p-4">
            <label
              htmlFor="author"
              className="mb-2 block text-base font-medium text-gray-700"
            >
              Author
            </label>
            <Select
              showSearch
              value={currentAuthor ? currentAuthor.name : undefined}
              onChange={(_, option) => {
                const selectedId = option
                  ? (option as any).key
                  : null;
                onChange(selectedId);
              }}
              className="custom-antd-input w-full"
              placeholder="Select author"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.children as unknown as string)
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              allowClear
              suffixIcon={<IoIosArrowDown size={20} />}
            >
              {authors?.map((author) => (
                <Option key={author.id} value={author.id}>
                  {author.name}
                </Option>
              ))}
            </Select>

            <Link href="/new-user">
              <button className="mt-4 flex items-center space-x-1 text-sm font-medium text-blue-600">
                <Plus size={16} />
                <span>Add New Author</span>
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

{/* <Select
  suffixIcon={<ChevronDown className="h-4 w-4" />}
  placeholder="Select users"
  className="w-full"
  optionLabelProp="label"
  options={authors.map((author) => ({
    label: author.name,
    value: author.id,
    option: <UserOption author={author} />,
  }))}
  optionRender={(option) => option.data.option}
  tagRender={(props) => {
    const author = authors.find((a) => a.id === props.value);
    if (!author) return null;

    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300">
        {author.avatar ? (
          <Image
            src={author.avatar}
            alt={author.name}
            width={16}
            height={16}
            className="rounded-full w-full h-full"
          />
        ) : (
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600 dark:bg-blue-800 dark:text-blue-400">
            {author.name.charAt(0)}
          </span>
        )}
        {author.name}
        <button
          className="ml-1 hover:text-blue-800"
          onClick={() => props.onClose()}
        >
          ×
        </button>
      </span>
    );
  }}
/> */}
