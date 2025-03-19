import { Mail, Plus, Trash2 } from "lucide-react";

interface DynamicEmailsProps {
  emails: string[];
  onChange: (emails: string[]) => void;
  maxEmails?: number;
}

function DynamicEmails({
  emails = [""], // Initialize with one empty string by default
  onChange,
  maxEmails = 5,
}: DynamicEmailsProps) {
  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index] = value.trim();
    onChange(newEmails.filter((email) => email)); // Remove empty emails
  };

  const addEmail = () => {
    if (emails.length < maxEmails) {
      onChange([...emails, ""]);
    }
  };

  const removeEmail = (index: number) => {
    if (emails.length > 1) {
      // Keep at least one email field
      const newEmails = emails.filter((_, i) => i !== index);
      onChange(newEmails);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-slate-700">
          Email Addresses <span className="text-red-500">*</span>
        </label>
        {emails.length < maxEmails && (
          <button
            type="button"
            onClick={addEmail}
            className="flex items-center gap-1 rounded-lg bg-blue-50 px-2 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100"
          >
            <Plus className="h-4 w-4" />
            Add Email
          </button>
        )}
      </div>
      <div className="space-y-3">
        {emails.map((email, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="relative flex-1 rounded-md">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(index, e.target.value)}
                className="block w-full rounded-md border border-slate-200 p-3 pl-10 text-sm focus:border-blue-500 focus:outline-0 focus:ring-0"
                placeholder="doctor@example.com"
                required={index === 0}
              />
            </div>
            {emails.length > 1 && (
              <button
                type="button"
                onClick={() => removeEmail(index)}
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

export default DynamicEmails;
