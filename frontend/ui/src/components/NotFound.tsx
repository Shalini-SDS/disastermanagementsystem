import { Link } from 'react-router';
import { AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';

export function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      <div className="text-center">
        <AlertTriangle className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-2 text-slate-100">404 - Page Not Found</h1>
        <p className="text-slate-400 mb-8">The page you're looking for doesn't exist.</p>
        <Link to="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    </div>
  );
}
