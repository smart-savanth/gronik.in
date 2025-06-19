import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="py-16 lg:py-24 bg-gradient-to-b from-gronik-bg to-gronik-primary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-64 h-64 bg-gronik-accent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-gronik-secondary rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gronik-accent bg-clip-text text-transparent">
                Our concept and work ethic
              </span>
            </h2>
          </div>

          {/* Content */}
          <div className="bg-gronik-shadow/30 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-gronik-accent/20 hover:border-gronik-accent/40 transition-all duration-300">
            <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
              <p className="text-lg lg:text-xl text-gronik-light/90 leading-relaxed">
                <span className="text-gronik-accent font-semibold">We didn't build Gronik to just sell eBooks.</span> We built it because real growth is disappearing. 
                In a world of scrolls, reels, and surface-level advice, people have stopped thinking deeply. 
                Shortcuts replaced learning. Hype replaced clarity.
              </p>

              <p className="text-lg lg:text-xl text-gronik-light/90 leading-relaxed">
                <span className="text-gronik-accent font-semibold">Gronik is for those who are done with that.</span> Here, you won't find fluff or fake motivation. 
                You'll find tested guides that actually help you grow — in mindset, fitness, finance, and life. 
                Every guide is built from real experience. Every word is written to move you forward.
              </p>

              <p className="text-lg lg:text-xl text-gronik-light/90 leading-relaxed">
                If you're serious about becoming better — not just sounding smart or feeling inspired — 
                <span className="text-gronik-accent font-semibold"> Welcome to Gronik.</span> 
                A space for those who are ready to grow for real. We believe in substance over sensation, 
                depth over distraction, and authentic transformation over temporary inspiration.
              </p>

              <p className="text-lg lg:text-xl text-gronik-light/90 leading-relaxed">
                Our carefully curated collection isn't just about reading — it's about implementing. 
                Each resource is selected for its proven ability to create lasting change in your life. 
                <span className="text-gronik-accent font-semibold"> This is where serious growth begins.</span>
              </p>

              {/* Call to Action */}
              <div className="pt-6 lg:pt-8">
                <div className="bg-gradient-to-r from-gronik-accent/20 to-gronik-secondary/20 rounded-2xl p-6 lg:p-8 border border-gronik-accent/30">
                  <p className="text-xl lg:text-2xl text-white font-semibold text-center">
                    Start exploring today — your next great read is just a click away.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-12 lg:mt-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-gronik-accent to-gronik-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Vast Collection</h3>
              <p className="text-gronik-light/80 text-sm">Access thousands of books across all genres</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-gronik-accent to-gronik-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Instant Access</h3>
              <p className="text-gronik-light/80 text-sm">Read anywhere, anytime on any device</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-gronik-accent to-gronik-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Premium Quality</h3>
              <p className="text-gronik-light/80 text-sm">Curated selection of high-quality content</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;