import Link from 'next/link'

interface FooterProps {
  websiteName: string
  links: string[]
}

export default function Footer({ websiteName, links }: FooterProps) {
  const currentYear = new Date().getFullYear()
  const defaultLinks = ['Home', 'About', 'Services', 'Contact']
  const footerLinks = links.length > 0 ? links : defaultLinks

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4">{websiteName}</h3>
            <p className="text-gray-400 text-sm">
              Building innovative solutions for your business needs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link}>
                  <Link
                    href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>contact@{websiteName.toLowerCase().replace(/\s+/g, '-')}.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Business Street</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} {websiteName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
