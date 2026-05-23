export default function ValueProp() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="bg-gray-900 rounded-3xl px-10 py-16 lg:px-20 lg:py-20 text-white">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4 block">
                Why it matters
              </span>
              <h2 className="text-4xl font-bold text-white leading-tight mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                5.66 billion people are on social media.<br />
                <span className="text-gray-400">Are they finding <em>you</em>?</span>
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                The digital landscape is crowded. Attention is fleeting. Yet the businesses that grow consistently aren't the loudest — they're the clearest.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Wabital helps you become the brand that is <strong className="text-white">clearly understood</strong>, <strong className="text-white">genuinely trusted</strong>, and <strong className="text-white">long remembered</strong> — across languages and cultures.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {[
                { value: '5.66B', label: 'Active social media users' },
                { value: '3', label: 'Languages: EN, JP, ES' },
                { value: '∞', label: 'Possibilities with the right strategy' },
                { value: '1', label: 'Brand story worth telling' },
              ].map((item) => (
                <div key={item.label} className="bg-white/10 rounded-2xl p-6 border border-white/10">
                  <div className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {item.value}
                  </div>
                  <div className="text-sm text-gray-400 leading-snug">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
