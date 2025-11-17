import React,  { useState, useEffect } from 'react';
import { BookOpen, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
      const [activeModal, setActiveModal] = useState(null);
  const navigate = useNavigate();
  
  // Fixed Home navigation
  const handleHomeClick = () => {
    if (window.location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Fixed About navigation
  const handleAboutClick = () => {


    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const aboutSection = document.getElementById('about-section');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: window.innerHeight * 2, behavior: 'smooth' });
        }
      }, 300);
    } else {
      const aboutSection = document.getElementById('about-section');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: window.innerHeight * 2, behavior: 'smooth' });
      }
    }
  };

  const privacy= `This Privacy Policy describes how Gronik ("we," "us," or "our") collects, uses, protects, and discloses your Personal Information when you visit or interact with the website https://dev.gronik.in/ (the "Service").

By using our Service, you agree to the collection and use of your information in accordance with this policy.

1. Important Note on Development Site
Please be aware that https://dev.gronik.in/ is designated as a development or testing environment. While we maintain security standards, users should exercise caution as the site's data structure and functionality may change frequently.

2. Information We Collect
We collect information necessary to process transactions (if applicable), manage accounts, and monitor site performance.

A. Personal Information You Provide (Order & Account Data)
We collect Personal Identifiable Information (PII) when you register an account, make a purchase, or submit an inquiry:

Contact Details: Your name, email address, and phone number.

Shipping & Billing Address: Your physical address (if purchasing physical goods).

Payment Information: Details required to process your transaction. Note: This sensitive data is handled securely by third-party payment gateways and is not stored directly on our servers.

Account Data: Your username and encrypted password (if you create an account).

B. Usage Data and Tracking Technologies
When you browse the Service, we automatically collect non-personal data related to your activity ("Usage Data"):

Log Data: Your IP address, browser type, operating system, pages viewed, and time spent on the Service.

Cookies: We use cookies to enable shopping cart functionality, maintain user sessions, and analyze site traffic. You can choose to disable cookies through your browser settings.

3. How We Use Your Information
We use the collected information for the following purposes:

Fulfilling Orders: To process your payment, arrange for shipping, and communicate with you about your order status.

Customer Service: To respond to your inquiries, questions, and support requests received via email.

Testing and Development: To analyze user interaction and site stability for the purpose of improving the final production version of our Service.

Security and Improvement: To screen orders for potential risk or fraud and to generate analytics about customer behavior.

4. Sharing and Disclosure of Information
We do not sell or rent your Personal Information. We share your information only as necessary to operate our business or fulfill legal obligations:

Service Providers: We share necessary data with trusted third parties who perform essential functions on our behalf (e.g., Shipping Carriers, Payment Processors, Analytics Providers).

Internal Testing: Data may be used internally by our development teams for testing and troubleshooting purposes related to preparing the live site.

Legal Compliance: We may disclose your information if legally required to do so by a court order, government authority, or to protect our rights and safety.

5. Data Security and Retention
Security: We implement a variety of industry-standard security measures to maintain the safety and confidentiality of your Personal Information.

Retention: We retain your Order Information and account data for as long as necessary to fulfill the purposes outlined in this policy and to comply with legal obligations.

6. Contact Us
For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us:

Email: Gronikonline@gmail.com`


const tnc=` 
Welcome to Gronik! These Terms and Conditions govern your access to and use of our website and all associated services, products, content, and features (the "Service").

By accessing or using the Service, you confirm that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree with any part of these Terms, you must not use the Service.

1. General Conditions and Acceptance
1.1 Eligibility
By using the Service, you represent that you are at least 18 years of age or the age of legal majority in your jurisdiction and are legally capable of entering into a binding contract.

1.2 Changes to Terms
We reserve the right, at our sole discretion, to update, change, or replace any part of these Terms at any time. We will post the revised Terms on the Service with an updated "Last Updated" date. Your continued use of the Service after the posting of any changes constitutes your acceptance of the new Terms.

1.3 Service Nature
You acknowledge that this website may be a development or testing environment. While we strive for stability, the service may occasionally be unavailable, contain errors, or undergo unexpected changes.

2. Products, Services, and Orders
2.1 Product Description and Pricing
We strive to be accurate in the description and pricing of our offerings. However, we do not guarantee that product descriptions, specifications, or pricing are entirely accurate, complete, reliable, or error-free. All prices are subject to change without notice.

2.2 Order Acceptance
Your submission of an order constitutes an offer to purchase. We reserve the right to accept or reject this offer for any reason, including stock limitations, payment failure, or suspicion of fraudulent activity. Order acceptance is finalized upon our written confirmation (e.g., shipment or service commencement).

2.3 Returns and Refunds
We do not offer any kind of refund due to nature of business.

3. User Accounts and Responsibility
3.1 Account Security
If you create an account, you are responsible for maintaining the confidentiality of your password and for all activities that occur under your account. You must notify us immediately of any suspected unauthorized use.

3.2 Prohibited Conduct
You are prohibited from using the Service: (a) for any fraudulent or illegal purpose; (b) to violate any regulations, rules, or laws; (c) to infringe upon the intellectual property rights of others; (d) to upload or transmit viruses or malicious code; or (e) to interfere with the security features of the Service.

4. Intellectual Property
The Service, its original Content, features, functionality, design elements, logos, and all digital assets are and will remain the exclusive property of Gronik or its licensors. You may not use any trademark, logo, or content without our express written permission.

5. Disclaimer and Limitation of Liability
5.1 Disclaimer of Warranties
The Service and all products delivered to you are provided "AS IS" and "AS AVAILABLE," without any warranties of any kind, express or implied, including warranties of merchantability, fitness for a particular purpose, or non-infringement.

5.2 Limitation of Liability
In no case shall we, our employees, or affiliates be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages arising from your use of any of the Service or any products procured using the Service. Our liability is strictly limited to the amount paid by you for the specific product or service in question.

6. Governing Law and Contact
6.1 Governing Law
These Terms shall be governed by and construed in accordance with the laws of India.
This Website is managed by Kanneboina Sriharsh Yadav

6.2 Contact Information
Questions about these Terms and Conditions should be directed to us at: Email: Gronikonline@gmail.com
`


  return (
    <>
    <footer className="bg-[#2D1B3D] backdrop-blur-md border-t border-gronik-secondary/20 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="w-20 h-8 xs:w-22 xs:h-9 sm:w-24 sm:h-10 md:w-28 md:h-11 lg:w-32 lg:h-12 flex items-center justify-center mb-6 sm:mb-8">
              <img 
                src="/images/logo.png" 
                alt="Gronik Logo"
                className="w-full h-full object-contain max-w-full max-h-full"
              />
            </div>
            <p className="text-gronik-light/80 mb-4 sm:mb-6 max-w-md text-base sm:text-lg leading-relaxed">
              Elysium Ebooks - Read more. Learn more. Achieve more. 
            </p>
            <p className="text-gronik-light/60 mb-4 sm:mb-6 max-w-md text-sm sm:text-base">
              Transform your mind with our premium collection of digital books and unlock your potential.
            </p>
            <div className="flex flex-wrap gap-3 sm:space-x-4 sm:gap-0">
              <a href="#" className="bg-gronik-secondary/20 text-gronik-light border border-gronik-secondary/30 rounded-lg px-4 py-2 sm:p-3 text-sm sm:text-base font-medium footer-social-btn youtube-btn">YouTube</a>
              <a href="#" className="bg-gronik-secondary/20 text-gronik-light border border-gronik-secondary/30 rounded-lg px-4 py-2 sm:p-3 text-sm sm:text-base font-medium footer-social-btn instagram-btn">Instagram</a>
              <a href="#" className="bg-gronik-secondary/20 text-gronik-light border border-gronik-secondary/30 rounded-lg px-4 py-2 sm:p-3 text-sm sm:text-base font-medium footer-social-btn twitter-btn">Twitter</a>
            </div>

            <div className='flex flex-row gap-8 mt-4'>
            <button
                  onClick={() => setActiveModal("terms")}
                  className="text-white underline cursor-pointer"
                >
                  Terms and Conditions
                </button>
            <button
                onClick={() => setActiveModal("privacy")}
                className="text-white underline cursor-pointer"
              >
                Privacy Policy
              </button>
              </div>


          

          </div>
          
          {/* Mobile: Quick Links and Connect With Us side by side */}
          <div className="col-span-1 grid grid-cols-2 gap-6 md:col-span-2 md:grid-cols-2 md:gap-8">
            <div>
              <h4 className="font-bold text-gronik-light mb-4 sm:mb-6 text-base sm:text-lg">Quick Links</h4>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <button 
                    onClick={handleHomeClick} 
                    className="text-gronik-light/70 hover:text-gronik-accent transition-all duration-300 ease-in-out flex items-center space-x-2 group text-sm sm:text-base bg-transparent border-0 outline-none cursor-pointer w-full text-left p-0"
                  >
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gronik-accent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out transform group-hover:scale-110"></span>
                    <span className="transition-all duration-300 ease-in-out">Home</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/library')} 
                    className="text-gronik-light/70 hover:text-gronik-accent transition-all duration-300 ease-in-out flex items-center space-x-2 group text-sm sm:text-base bg-transparent border-0 outline-none cursor-pointer w-full text-left p-0"
                  >
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gronik-accent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out transform group-hover:scale-110"></span>
                    <span className="transition-all duration-300 ease-in-out">Library</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={handleAboutClick} 
                    className="text-gronik-light/70 hover:text-gronik-accent transition-all duration-300 ease-in-out flex items-center space-x-2 group text-sm sm:text-base bg-transparent border-0 outline-none cursor-pointer w-full text-left p-0"
                  >
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gronik-accent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out transform group-hover:scale-110"></span>
                    <span className="transition-all duration-300 ease-in-out">About</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/contact')} 
                    className="text-gronik-light/70 hover:text-gronik-accent transition-all duration-300 ease-in-out flex items-center space-x-2 group text-sm sm:text-base bg-transparent border-0 outline-none cursor-pointer w-full text-left p-0"
                  >
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gronik-accent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out transform group-hover:scale-110"></span>
                    <span className="transition-all duration-300 ease-in-out">Contact</span>
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-gronik-light mb-4 sm:mb-6 text-base sm:text-lg">Connect With Us</h4>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-2 sm:space-x-3 text-gronik-light/70 hover:text-gronik-accent transition-all duration-300 ease-in-out group cursor-pointer">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gronik-secondary/20 group-hover:bg-gronik-accent/20 rounded-lg flex items-center justify-center border border-gronik-secondary/30 group-hover:border-gronik-accent/50 transition-all duration-300 ease-in-out transform group-hover:scale-105">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ease-in-out" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm transition-all duration-300 ease-in-out">Connect@elysium.online</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 text-gronik-light/70 hover:text-gronik-accent transition-all duration-300 ease-in-out group cursor-pointer">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gronik-secondary/20 group-hover:bg-gronik-accent/20 rounded-lg flex items-center justify-center border border-gronik-secondary/30 group-hover:border-gronik-accent/50 transition-all duration-300 ease-in-out transform group-hover:scale-105">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ease-in-out" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm transition-all duration-300 ease-in-out">On Telegram</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gronik-secondary/20 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <p className="text-gronik-light/60 text-center md:text-left text-sm sm:text-base">
              &copy; 2024 Gronik. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 text-gronik-light/60 text-sm sm:text-base">
              <span>Made with</span>
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 fill-current animate-pulse" />
              <span>for book lovers</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-social-btn {
          background: rgba(155, 123, 184, 0.12);
          color: #e0d7f7;
          border: 1.5px solid rgba(155, 123, 184, 0.3);
          border-radius: 0.5rem;
          padding: 0.5rem 1.25rem;
          font-size: 1rem;
          font-weight: 500;
          transition: all 0.3s ease-in-out;
          display: inline-block;
          margin-right: 0.5rem;
        }
        .footer-social-btn:last-child { 
          margin-right: 0; 
        }
        .footer-social-btn.youtube-btn:hover, 
        .footer-social-btn.youtube-btn:focus {
          color: #ff4d4f;
          transform: translateY(-2px);
        }
        .footer-social-btn.instagram-btn:hover, 
        .footer-social-btn.instagram-btn:focus {
          color: #e1306c;
          transform: translateY(-2px);
        }
        .footer-social-btn.twitter-btn:hover, 
        .footer-social-btn.twitter-btn:focus {
          color: #1da1f2;
          transform: translateY(-2px);
        }
        
        @media (max-width: 640px) {
          .footer-social-btn {
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
          }
        }

        .custom-scroll::-webkit-scrollbar {
          width: 10px;
        }

        .custom-scroll::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }

        .custom-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #a076cc, #6a3dad);
          border-radius: 10px;
          border: 2px solid rgba(255,255,255,0.15);
        }

        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #b991e6, #8450ca);
        }
        
        .custom-scroll {
          scroll-behavior: smooth;
        }

        .custom-scroll::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,0.25);
            backdrop-filter: blur(4px);
            border-radius: 12px;
            box-shadow: 0 0 6px rgba(200,150,255,0.4);
          }


      `}</style>




    </footer>
    

        {activeModal && (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">

      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={() => setActiveModal(null)}
      />

      <div
        className="relative bg-[#2D1B3D]/95 border border-white/10 
        shadow-xl rounded-2xl p-6 w-[90vw] sm:w-[75vw] md:w-[60vw] lg:w-[65vw]
        h-[80vh] overflow-y-auto custom-scroll">

        <button
          className="absolute top-3 right-3 text-white/70 hover:text-white"
          onClick={() => setActiveModal(null)}
        >
          ✕
        </button>

        <h2
            className="text-center text-[16px] sm:text-[14px] md:text-[16px] lg:text-[20px] xl:text-[28px] 
                      font-extrabold leading-tight mb-1 text-white"
          >
            {activeModal === "terms" ? "Terms & Conditions" : "Privacy Policy"}
          </h2>


        <div className="text-white/80 whitespace-pre-line space-y-4 leading-relaxed pr-2 mt-6">
          <p>
            <p>
              {activeModal === "terms" ? tnc : privacy}
            </p>

          </p>
          
        </div>

      </div>
    </div>
  )}
</>

  );
};

export default Footer;
