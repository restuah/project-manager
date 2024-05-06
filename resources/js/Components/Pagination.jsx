import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
  return (
    <nav className="text-center mt-4">
      {links.map((link) => (
        <Link
          preserveScroll
          key={link.label}
          href={link.url || ""}
          className={
            "inline-block p-3 rounded-md text-xs hover:bg-blue-200" +
            (link.active ? "none bg-blue-500 text-gray-200" : "") +
            (!link.url ? "none !text-gray-500 cursor-not-allowed" : "")
          }
          dangerouslySetInnerHTML={{ __html: link.label }}
        ></Link>
      ))}
    </nav>
  );
}
