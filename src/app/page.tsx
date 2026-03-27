/* EZLY App Dashboard - Contractor CRM */
import ContractorCRM from '../components/ContractorCRM';
import ContractorPipeline from '../components/ContractorPipeline';
import VettingEngine from '../components/VettingEngine';

export default function EzlyDashboard() {
  // Simulate user session/role check
  const user = { name: 'Brian', role: 'Contractor' };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-purple-900">Ezly Operations Desk</h1>
            <div className="flex items-center gap-4">
                {user.role === 'Contractor' && (
                    <a href="https://prolink-ezly.vercel.app/dashboard" className="text-purple-700 font-bold hover:underline">← Go to Prolink</a>
                )}
                <div className="text-sm font-medium text-purple-700 bg-purple-100 px-4 py-2 rounded-lg">
                    586 Total Contractors
                </div>
            </div>
        </header>

        <section id="operations">
          {/* Operations content here */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
            <h2 className="text-xl font-bold mb-2">Operations Summary</h2>
            <p className="text-gray-600">This area now focuses exclusively on project and operational management.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
