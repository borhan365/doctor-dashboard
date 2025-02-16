interface SubTitleBoxProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
}

function SubTitleBox({ label = "SubTitle", value, onChange }: SubTitleBoxProps) {
  return (
    <>
      <label
        htmlFor="subTitle"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>
      <input
        type="text"
        id="subTitle"
        name="subTitle"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-8 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white mt-2"
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    </>
  );
}

export default SubTitleBox;
