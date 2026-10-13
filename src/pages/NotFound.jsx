import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Compass, Mail } from 'lucide-react';
import Badge from '../components/common/Badge';

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[80vh] px-4 py-24 relative text-center">
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

      <div className="relative max-w-lg space-y-6">
        <Badge variant="primary">404 — Endpoint Not Found</Badge>

        <h1 className="font-display text-5xl sm:text-7xl font-extrabold tracking-tight text-white">
          Lost in the <span className="text-gradient-red">cluster.</span>
        </h1>

        <p className="text-base text-gray-400 max-w-md mx-auto leading-relaxed">
          The requested URL path does not exist on our servers. Let's redirect you back to active systems.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link to="/" className="btn-primary group text-xs">
            <Home className="h-4 w-4 mr-1" />
            <span>Return to Home</span>
          </Link>

          <Link to="/services" className="btn-secondary text-xs">
            <Compass className="h-4 w-4 mr-1" />
            <span>Browse Services</span>
          </Link>

          <Link to="/contact" className="btn-secondary text-xs">
            <Mail className="h-4 w-4 mr-1" />
            <span>Contact Support</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
