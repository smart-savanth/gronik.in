import React from 'react';


const  PrivacyPolicy =()=>{
return(
    <section id="about" className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-gronik-bg to-gronik-primary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-32 h-32 sm:w-64 sm:h-64 bg-gronik-accent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 sm:w-48 sm:h-48 bg-gronik-secondary rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-white to-gronik-accent bg-clip-text text-transparent">
               Privacy Policy
              </span>
            </h2>
          </div>
          </div>
          </div>
    </section>
);
}

export default PrivacyPolicy