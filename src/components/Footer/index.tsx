import {
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import HealthaIcon from "../HealthaIcon";
import FooterNewsletter from "./FooterNewsletter";

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-slate-300">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-6">
            <HealthaIcon />
            <p className="text-sm leading-relaxed text-slate-400">
              Bangladesh&apos;s leading premium healthcare directory for doctors
              and hospitals. Explore the best prices health packages, diagnostic
              tests, and services.
            </p>
            <div className="flex space-x-5">
              <Link
                href="#"
                className="transition-colors duration-300 hover:text-blue-400"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="transition-colors duration-300 hover:text-blue-400"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="transition-colors duration-300 hover:text-pink-400"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="transition-colors duration-300 hover:text-blue-400"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about-us"
                  className="group flex items-center transition-colors duration-300 hover:text-white"
                >
                  <ArrowRight className="-ml-6 mr-2 h-4 w-4 opacity-0 transition-all duration-300 group-hover:ml-0 group-hover:opacity-100" />
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="group flex items-center transition-colors duration-300 hover:text-white"
                >
                  <ArrowRight className="-ml-6 mr-2 h-4 w-4 opacity-0 transition-all duration-300 group-hover:ml-0 group-hover:opacity-100" />
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="group flex items-center transition-colors duration-300 hover:text-white"
                >
                  <ArrowRight className="-ml-6 mr-2 h-4 w-4 opacity-0 transition-all duration-300 group-hover:ml-0 group-hover:opacity-100" />
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="group flex items-center transition-colors duration-300 hover:text-white"
                >
                  <ArrowRight className="-ml-6 mr-2 h-4 w-4 opacity-0 transition-all duration-300 group-hover:ml-0 group-hover:opacity-100" />
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-white">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/hospital-solutions"
                  className="group flex items-center transition-colors duration-300 hover:text-white"
                >
                  <ArrowRight className="-ml-6 mr-2 h-4 w-4 opacity-0 transition-all duration-300 group-hover:ml-0 group-hover:opacity-100" />
                  Hospital Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="/hospital-solutions/digital-marketing"
                  className="group flex items-center transition-colors duration-300 hover:text-white"
                >
                  <ArrowRight className="-ml-6 mr-2 h-4 w-4 opacity-0 transition-all duration-300 group-hover:ml-0 group-hover:opacity-100" />
                  Hospital Digital Marketing
                </Link>
              </li>
              <li>
                <Link
                  href="/hospital-solutions/website-development"
                  className="group flex items-center transition-colors duration-300 hover:text-white"
                >
                  <ArrowRight className="-ml-6 mr-2 h-4 w-4 opacity-0 transition-all duration-300 group-hover:ml-0 group-hover:opacity-100" />
                  Hospital Website Development
                </Link>
              </li>
              <li>
                <Link
                  href="/hospital-solutions/digital-marketing"
                  className="group flex items-center transition-colors duration-300 hover:text-white"
                >
                  <ArrowRight className="-ml-6 mr-2 h-4 w-4 opacity-0 transition-all duration-300 group-hover:ml-0 group-hover:opacity-100" />
                  Hospital Digital Marketing
                </Link>
              </li>
              <li>
                <Link
                  href="/ads"
                  className="group flex items-center transition-colors duration-300 hover:text-white"
                >
                  <ArrowRight className="-ml-6 mr-2 h-4 w-4 opacity-0 transition-all duration-300 group-hover:ml-0 group-hover:opacity-100" />
                  Advertising with Healtha
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <FooterNewsletter />
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 items-center border-t border-slate-800/50 pt-8 text-sm md:flex md:justify-between">
          <p className="text-slate-400">
            &copy; {new Date().getFullYear()} Modern CMS. All rights reserved.
          </p>
          <div className="mt-4 space-x-6 md:mt-0">
            <Link
              href="/privacy"
              className="text-slate-400 transition-colors duration-300 hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-slate-400 transition-colors duration-300 hover:text-white"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
