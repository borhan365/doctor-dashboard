import {
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import FooterNewsletter from "./FooterNewsletter";

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-slate-300">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="block flex-shrink-0">
              <span className="text-2xl font-bold text-white">
                Healtha<span className="text-teal-500">.</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Modern CMS solution built with Next.js, offering superior
              performance, scalability, and a user-friendly interface for
              content management.
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
                  href="/for-doctors"
                  className="group flex items-center transition-colors duration-300 hover:text-white"
                >
                  <ArrowRight className="-ml-6 mr-2 h-4 w-4 opacity-0 transition-all duration-300 group-hover:ml-0 group-hover:opacity-100" />
                  For Doctors
                </Link>
              </li>
              <li>
                <Link
                  href="/digital-solutions/doctor"
                  className="group flex items-center transition-colors duration-300 hover:text-white"
                >
                  <ArrowRight className="-ml-6 mr-2 h-4 w-4 opacity-0 transition-all duration-300 group-hover:ml-0 group-hover:opacity-100" />
                  Doctor Digital Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="/digital-solutions/doctor/website-development"
                  className="group flex items-center transition-colors duration-300 hover:text-white"
                >
                  <ArrowRight className="-ml-6 mr-2 h-4 w-4 opacity-0 transition-all duration-300 group-hover:ml-0 group-hover:opacity-100" />
                  Doctor Website Development
                </Link>
              </li>
              <li>
                <Link
                  href="/digital-solutions/doctor/digital-marketing"
                  className="group flex items-center transition-colors duration-300 hover:text-white"
                >
                  <ArrowRight className="-ml-6 mr-2 h-4 w-4 opacity-0 transition-all duration-300 group-hover:ml-0 group-hover:opacity-100" />
                  Doctor Digital Marketing
                </Link>
              </li>
              <li>
                <Link
                  href="/digital-solutions/doctor/prescription-management-software"
                  className="group flex items-center transition-colors duration-300 hover:text-white"
                >
                  <ArrowRight className="-ml-6 mr-2 h-4 w-4 opacity-0 transition-all duration-300 group-hover:ml-0 group-hover:opacity-100" />
                  Doctor Prescription Management Software
                </Link>
              </li>
              <li>
                <Link
                  href="/for-doctors/ads"
                  className="group flex items-center transition-colors duration-300 hover:text-white"
                >
                  <ArrowRight className="-ml-6 mr-2 h-4 w-4 opacity-0 transition-all duration-300 group-hover:ml-0 group-hover:opacity-100" />
                  Ads
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
