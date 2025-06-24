import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle, AlertCircle, BookOpen, Users, Award, Globe } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      info: "connect@gronik.online",
      description: "Send us an email anytime",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: MessageCircle,
      title: "Telegram",
      info: "@GronikBooks",
      description: "Chat with us on Telegram",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Clock,
      title: "Response Time",
      info: "Within 24 hours",
      description: "We reply quickly",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Globe,
      title: "Global Reach",
      info: "Worldwide Service",
      description: "Available everywhere",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gronik-bg">
      {/* Hero Section */}
      <section className="relative py-16 md:py-32 bg-gradient-to-br from-gronik-primary via-gronik-bg to-gronik-secondary overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gronik-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gronik-secondary rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gronik-accent to-gronik-secondary rounded-2xl mb-6 md:mb-8 shadow-2xl">
              <Mail className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6">
              <span className="bg-gradient-to-r from-gronik-light via-gronik-accent to-gronik-secondary bg-clip-text text-transparent">
                Contact Us
              </span>
            </h1>
            <p className="text-base md:text-xl lg:text-2xl text-gronik-light/80 max-w-3xl mx-auto leading-relaxed px-4">
              Have questions about our premium e-books? Need help with your order? 
              <br className="hidden md:block" />
              We're here to help you on your reading journey.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-gronik-bg via-gronik-primary/20 to-gronik-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Contact Information */}
            <div className="space-y-6 md:space-y-8">
              <div className="bg-gronik-primary/60 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gronik-secondary/30 shadow-2xl">
                <h2 className="text-2xl md:text-3xl font-bold text-gronik-light mb-4 md:mb-6">Let's Connect</h2>
                <p className="text-gronik-light/80 mb-6 md:mb-8 leading-relaxed text-sm md:text-lg">
                  We love hearing from our readers! Whether you have questions, feedback, or just want to share your reading experience, don't hesitate to reach out.
                </p>
                
                {/* Mobile: 2x2 Grid, Desktop: Same as before */}
                <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                  {contactInfo.map((item, index) => (
                    <div 
                      key={index}
                      className="flex flex-col items-center text-center p-5 md:p-6 bg-gronik-shadow/30 rounded-xl md:rounded-2xl border border-gronik-secondary/20 hover:border-gronik-accent/40 transition-all duration-300 group hover:transform hover:scale-105 min-h-[120px] md:min-h-auto"
                    >
                      <div className={`w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br ${item.color} rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 mb-3 md:mb-4 flex-shrink-0`}>
                        <item.icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                      </div>
                      <div className="flex flex-col items-center space-y-1">
                        <h4 className="font-bold text-gronik-light text-sm md:text-base leading-tight">{item.title}</h4>
                        <p className="text-gronik-accent font-medium text-xs md:text-base leading-tight">{item.info}</p>
                        <p className="text-gronik-light/60 text-xs md:text-sm hidden md:block">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form - More compact on mobile */}
            <div className="bg-gronik-primary/60 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gronik-secondary/30 relative shadow-2xl">
              <h2 className="text-2xl md:text-3xl font-bold text-gronik-light mb-6 md:mb-8 text-center">Send us a Message</h2>
              
              {submitStatus && (
                <div className={`mb-4 md:mb-6 p-3 md:p-4 rounded-xl flex items-center space-x-3 text-sm md:text-base ${
                  submitStatus === 'success' 
                    ? 'bg-green-500/20 border border-green-500/30 text-green-400' 
                    : 'bg-red-500/20 border border-red-500/30 text-red-400'
                }`}>
                  {submitStatus === 'success' ? (
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 md:w-5 md:h-5" />
                  )}
                  <span>
                    {submitStatus === 'success' 
                      ? 'Message sent successfully! We\'ll get back to you soon.' 
                      : 'Failed to send message. Please try again.'}
                  </span>
                </div>
              )}

              <div className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-gronik-light font-medium mb-2 md:mb-3 text-sm md:text-base">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gronik-shadow/50 border border-gronik-secondary/30 rounded-xl px-3 py-3 md:px-4 md:py-4 text-gronik-light placeholder-gronik-light/50 focus:outline-none focus:border-gronik-accent/60 focus:ring-2 focus:ring-gronik-accent/20 transition-all duration-200 text-sm md:text-base"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-gronik-light font-medium mb-2 md:mb-3 text-sm md:text-base">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gronik-shadow/50 border border-gronik-secondary/30 rounded-xl px-3 py-3 md:px-4 md:py-4 text-gronik-light placeholder-gronik-light/50 focus:outline-none focus:border-gronik-accent/60 focus:ring-2 focus:ring-gronik-accent/20 transition-all duration-200 text-sm md:text-base"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gronik-light font-medium mb-2 md:mb-3 text-sm md:text-base">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gronik-shadow/50 border border-gronik-secondary/30 rounded-xl px-3 py-3 md:px-4 md:py-4 text-gronik-light placeholder-gronik-light/50 focus:outline-none focus:border-gronik-accent/60 focus:ring-2 focus:ring-gronik-accent/20 transition-all duration-200 text-sm md:text-base"
                    placeholder="What can we help you with?"
                  />
                </div>
                
                <div>
                  <label className="block text-gronik-light font-medium mb-2 md:mb-3 text-sm md:text-base">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full bg-gronik-shadow/50 border border-gronik-secondary/30 rounded-xl px-3 py-3 md:px-4 md:py-4 text-gronik-light placeholder-gronik-light/50 focus:outline-none focus:border-gronik-accent/60 focus:ring-2 focus:ring-gronik-accent/20 transition-all duration-200 resize-none text-sm md:text-base"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-gronik-accent to-gronik-secondary hover:from-gronik-secondary hover:to-gronik-accent text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-gronik-accent/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3 text-sm md:text-base"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 md:w-5 md:h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - More compact on mobile */}
      <section className="py-12 md:py-20 bg-gronik-primary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-6">
              <span className="bg-gradient-to-r from-gronik-light to-gronik-accent bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h2>
            <p className="text-base md:text-xl text-gronik-light/80">Quick answers to common questions</p>
          </div>

          <div className="space-y-4 md:space-y-6">
            {[
              {
                question: "How do I access my purchased books?",
                answer: "Once you purchase a book, it will be available in your personal library. You can access it anytime by logging into your account and visiting the 'My Library' section."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, debit cards, and digital payment methods through our secure payment gateway powered by Stripe."
              },
              {
                question: "Can I download books for offline reading?",
                answer: "Yes! All purchased books can be downloaded for offline reading. You can access them anytime, even without an internet connection."
              },
              {
                question: "Do you offer refunds?",
                answer: "We offer a 7-day money-back guarantee. If you're not satisfied with your purchase, contact us within 7 days for a full refund."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gronik-shadow/30 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-gronik-secondary/20">
                <h3 className="text-base md:text-lg font-bold text-gronik-light mb-2 md:mb-3">{faq.question}</h3>
                <p className="text-gronik-light/80 leading-relaxed text-sm md:text-base">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;