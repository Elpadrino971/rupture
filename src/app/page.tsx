import Link from 'next/link';

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-6 md:p-24 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-calm-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-4xl w-full text-center space-y-12 relative z-10">
        {/* Hero Section */}
        <div className="space-y-6 animate-slide-down">
          {/* Shield icon with glow */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl shadow-glow mb-4">
            <span className="text-4xl">🛡️</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-neutral-900 leading-tight tracking-tight">
            L'app qui t'aide à{' '}
            <span className="gradient-text">tourner la page</span>
          </h1>
          <p className="text-2xl md:text-3xl text-neutral-600 font-light">
            Pas à rouvrir des plaies.
          </p>
        </div>

        {/* Description Card */}
        <div className="card p-10 space-y-6 animate-scale-in" style={{ animationDelay: '0.2s' }}>
          <p className="text-xl text-neutral-700 leading-relaxed max-w-2xl mx-auto">
            Un coach IA qui te protège de tes impulsions, t'aide à comprendre ta rupture
            et te guide vers la reconstruction.
          </p>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 pt-6">
            <div className="group p-6 bg-gradient-to-br from-calm-50 to-calm-100 rounded-2xl border-2 border-transparent hover:border-primary-300 transition-all duration-300 hover:-translate-y-1">
              <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-300">🛡️</div>
              <h3 className="font-bold text-neutral-900 mb-2 text-lg">Anti-rechute</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Bloque les comportements impulsifs avant qu'ils ne t'affectent
              </p>
            </div>

            <div className="group p-6 bg-gradient-to-br from-calm-50 to-calm-100 rounded-2xl border-2 border-transparent hover:border-primary-300 transition-all duration-300 hover:-translate-y-1" style={{ animationDelay: '0.1s' }}>
              <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-300">🧠</div>
              <h3 className="font-bold text-neutral-900 mb-2 text-lg">Clarté mentale</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Comprends objectivement ce qui s'est réellement passé
              </p>
            </div>

            <div className="group p-6 bg-gradient-to-br from-calm-50 to-calm-100 rounded-2xl border-2 border-transparent hover:border-primary-300 transition-all duration-300 hover:-translate-y-1" style={{ animationDelay: '0.2s' }}>
              <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-300">🌱</div>
              <h3 className="font-bold text-neutral-900 mb-2 text-lg">Reconstruction</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Un plan personnalisé pour avancer jour après jour
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <Link
            href="/onboarding"
            className="btn-primary inline-block w-full md:w-auto"
          >
            Commencer maintenant
            <span className="ml-2 inline-block transform group-hover:translate-x-1 transition-transform">→</span>
          </Link>

          <div className="flex items-center justify-center gap-6 text-sm text-neutral-500">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Sans engagement</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>100% confidentiel</span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="pt-8 border-t border-neutral-200 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="inline-flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-left max-w-2xl">
            <span className="text-xl flex-shrink-0">⚠️</span>
            <p className="text-xs text-amber-800 leading-relaxed">
              Cette application ne t'aide pas à reprendre contact ou à influencer autrui.
              Elle protège ta stabilité émotionnelle et t'aide à avancer sainement.
            </p>
          </div>
        </div>

        {/* Social Proof / Stats */}
        <div className="grid grid-cols-3 gap-8 pt-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">100%</div>
            <div className="text-sm text-neutral-600 mt-1">Éthique</div>
          </div>
          <div className="text-center border-x border-neutral-200">
            <div className="text-3xl font-bold text-primary-600">24/7</div>
            <div className="text-sm text-neutral-600 mt-1">Disponible</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">0</div>
            <div className="text-sm text-neutral-600 mt-1">Jugement</div>
          </div>
        </div>
      </div>
    </main>
  );
}
