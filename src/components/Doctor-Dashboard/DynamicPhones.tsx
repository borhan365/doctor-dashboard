import { Phone, Plus, Trash2 } from "lucide-react";

interface DynamicPhonesProps {
  phones: string[];
  onChange: (phones: string[]) => void;
  maxPhones?: number;
}

function DynamicPhones({
  phones = [""], // Initialize with one empty string by default
  onChange,
  maxPhones = 5,
}: DynamicPhonesProps) {
  const handlePhoneChange = (index: number, value: string) => {
    const newPhones = [...phones];
    newPhones[index] = value.trim();
    onChange(newPhones.filter((phone) => phone)); // Remove empty phones
  };

  const addPhone = () => {
    if (phones.length < maxPhones) {
      onChange([...phones, ""]);
    }
  };

  const removePhone = (index: number) => {
    if (phones.length > 1) {
      // Keep at least one phone field
      const newPhones = phones.filter((_, i) => i !== index);
      onChange(newPhones);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-slate-700">
          Phone Numbers <span className="text-red-500">*</span>
        </label>
        {phones.length < maxPhones && (
          <button
            type="button"
            onClick={addPhone}
            className="flex items-center gap-1 rounded-lg bg-blue-50 px-2 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100"
          >
            <Plus className="h-4 w-4" />
            Add Phone
          </button>
        )}
      </div>
      <div className="space-y-3">
        {phones.map((phone, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="relative flex-1 rounded-md">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Phone className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => handlePhoneChange(index, e.target.value)}
                className="block w-full rounded-md border border-slate-200 p-3 pl-10 text-sm focus:border-blue-500 focus:outline-0 focus:ring-0"
                placeholder="1234567890"
                required={index === 0}
                pattern="[0-9]{10,}"
              />
            </div>
            {phones.length > 1 && (
              <button
                type="button"
                onClick={() => removePhone(index)}
                className="rounded-lg p-2 text-red-500 hover:bg-red-50"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DynamicPhones;
