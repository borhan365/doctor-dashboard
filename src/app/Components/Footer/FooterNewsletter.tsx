"use client";

import { Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";

function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [retryAfter, setRetryAfter] = useState<number | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Helper function to check if retry time has passed
  const isRetryDisabled = () => {
    return retryAfter ? Date.now() < retryAfter : false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/newsletters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.status === 429) {
        const reset = response.headers.get("Retry-After");
        if (reset) {
          setRetryAfter(Date.now() + parseInt(reset) * 1000);
        }
        throw new Error(data.error || "Too many attempts. Please try again later.");
      }

      if (data.alreadySubscribed) {
        setIsSubscribed(true);
        throw new Error("This email is already subscribed to our newsletter");
      }

      if (!response.ok) {
        throw new Error(data.error || "Subscription failed");
      }

      toast.success("Please check your email to confirm subscription");
      setEmail("");
      setRetryAfter(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Subscription failed");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = loading || isRetryDisabled();

  return (
    <div>
      <h3 className="mb-6 text-lg font-bold text-white">Stay Updated</h3>
      <p className="mb-6 text-sm text-slate-400">
        Subscribe to our newsletter for updates and tips.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="rounded-lg bg-slate-800/50 px-4 py-3 text-white transition-all duration-300 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isDisabled}
          />
          <button
            type="submit"
            disabled={isDisabled}
            className="group flex items-center justify-center space-x-2 rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors duration-300 hover:bg-blue-700 disabled:opacity-50"
          >
            <span>{loading ? "Subscribing..." : "Subscribe"}</span>
            <Mail className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          {isSubscribed && (
            <p className="text-sm text-slate-400">
              Already subscribed?{" "}
              <Link
                href="/newsletter/unsubscribe"
                className="text-blue-400 hover:text-blue-300"
              >
                Unsubscribe here
              </Link>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default FooterNewsletter;
