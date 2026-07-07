import { Link } from 'react-router-dom'
import { ROUTES } from '../Routes/Routes'

const Footer = () => {
  return (
    <footer
      id="site-footer"
      role="contentinfo"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-700 bg-slate-950 text-slate-300 shadow-[0_-4px_24px_rgba(15,23,42,0.25)]"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="text-sm">© {new Date().getFullYear()} HireNex. All rights reserved.</p>
        <nav aria-label="Legal" className="flex flex-wrap gap-4 text-sm font-medium">
          <Link to={ROUTES.PRIVACY_POLICY} className="transition hover:text-white">
            Privacy Policy
          </Link>
          <Link to={ROUTES.TERMS_AND_CONDITIONS} className="transition hover:text-white">
            Terms & Conditions
          </Link>
          <Link to={ROUTES.CONTACT} className="transition hover:text-white">
            Contact Us
          </Link>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
