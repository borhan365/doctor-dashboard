interface Invoice {
  id: string;
  name: string;
  avatar: string;
  amount: number;
  date: string;
}

export function RecentInvoices({ invoices }: { invoices: Invoice[] }) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-slate-800">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Recent Invoices
        </h2>
        <button className="text-sm font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="flex flex-col gap-4 rounded-lg border border-slate-100 p-4 transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/50 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-4">
              {invoice.avatar ? (
                <img
                  src={invoice.avatar}
                  alt={invoice.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400">
                  {invoice.name.charAt(0)}
                </div>
              )}
              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  {invoice.name}
                </p>
                <p className="text-xs font-medium text-blue-500 dark:text-blue-400">
                  #{invoice.id}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="text-right">
                <p className="font-medium text-slate-900 dark:text-white">
                  ${invoice.amount.toLocaleString()}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {invoice.date}
                </p>
              </div>

              <button className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 dark:text-slate-500 dark:hover:bg-slate-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
