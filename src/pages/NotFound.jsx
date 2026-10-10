import { Link } from "react-router-dom";

export default function NotFound() {
  return <section className="not-found"><span>404</span><h1>Page not found</h1><p>We couldn't find that page.</p><Link className="button button-primary" to="/">Return home</Link></section>;
}