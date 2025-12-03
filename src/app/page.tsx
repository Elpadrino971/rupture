import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Hero Section */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 leading-tight">
            L'app qui t'aide à{' '}
            <span className="text-primary-600">tourner la page</span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-600 font-light">
            Pas à rouvrir des plaies.
          </p>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-4">
          <p className="text-lg text-neutral-700 leading-relaxed">
            Un coach IA qui te protège de tes impulsions, t'aide à comprendre ta rupture
            et te guide vers la reconstruction.
          </p>

          <div className="grid md:grid-cols-3 gap-4 pt-4">
            <div className="p-4 bg-calm-50 rounded-lg">
              <div className="text-3xl mb-2">🛡️</div>
              <h3 className="font-semibold text-neutral-900 mb-1">Anti-rechute</h3>
              <p className="text-sm text-neutral-600">
                Bloque les comportements impulsifs
              </p>
            </div>

            <div className="p-4 bg-calm-50 rounded-lg">
              <div className="text-3xl mb-2">🧠</div>
              <h3 className="font-semibold text-neutral-900 mb-1">Clarté mentale</h3>
              <p className="text-sm text-neutral-600">
                Comprends ce qui s'est réellement passé
              </p>
            </div>

            <div className="p-4 bg-calm-50 rounded-lg">
              <div className="text-3xl mb-2">🌱</div>
              <h3 className="font-semibold text-neutral-900 mb-1">Reconstruction</h3>
              <p className="text-sm text-neutral-600">
                Un plan personnalisé jour après jour
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-4">
          <Link
            href="/onboarding"
            className="inline-block w-full md:w-auto px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Commencer maintenant
          </Link>

          <p className="text-sm text-neutral-500">
            Sans engagement • Totalement confidentiel
          </p>
        </div>

        {/* Disclaimer */}
        <div className="pt-8 border-t border-neutral-200">
          <p className="text-xs text-neutral-500 leading-relaxed">
            ⚠️ Cette application ne t'aide pas à reprendre contact ou à influencer autrui.
            Elle protège ta stabilité émotionnelle et t'aide à avancer sainement.
          </p>
        </div>
      </div>
    </main>
  );
}
