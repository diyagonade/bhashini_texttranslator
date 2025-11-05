import { Users, Globe, Zap, Shield } from 'lucide-react';

export function StatsSection() {
  const features = [
    {
      icon: Users,
      title: 'Digital Inclusion',
      description: 'Empowering millions to access internet in their native language',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      icon: Globe,
      title: '22+ Languages',
      description: 'Covering all scheduled Indian languages and tribal dialects',
      color: 'from-green-500 to-emerald-600',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Real-time translation with sub-200ms response time',
      color: 'from-orange-500 to-red-600',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Government-backed secure infrastructure for data privacy',
      color: 'from-purple-500 to-pink-600',
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature) => {
        const Icon = feature.icon;
        return (
          <div
            key={feature.title}
            className="group p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300"
          >
            <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        );
      })}
    </div>
  );
}