interface DateBoxProps {
  value: Date | string | null;
  onChange: (value: string) => void;
  label?: string;
}

const DateBox: React.FC<DateBoxProps> = ({
  value,
  onChange,
  label = "Publish Date",
}) => {
  // Convert the date value to YYYY-MM-DD format for the input
  const formatDateForInput = (date: Date | string | null): string => {
    if (!date) return "";

    try {
      const d = new Date(date);
      // Check if date is valid
      if (isNaN(d.getTime())) {
        return "";
      }
      return d.toISOString().split("T")[0];
    } catch (error) {
      console.error("Error formatting date:", error);
      return "";
    }
  };

  return (
    <div className="relative rounded-md border border-slate-200 p-4">
      <label
        htmlFor="createdAt"
        className="mb-2.5 block text-sm font-medium text-black dark:text-white"
      >
        {label}
      </label>
      <input
        id="createdAt"
        type="date"
        className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-4 pr-4 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        value={formatDateForInput(value)}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default DateBox;
