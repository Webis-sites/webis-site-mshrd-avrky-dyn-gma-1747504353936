'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCheck } from 'react-icons/fa';

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'נא להזין שם מלא';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'נא להזין מספר טלפון';
    } else if (!/^0\d{8,9}$/.test(formData.phone)) {
      newErrors.phone = 'נא להזין מספר טלפון תקין';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'נא להזין כתובת אימייל';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'נא להזין כתובת אימייל תקינה';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'נא להזין הודעה';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          phone: '',
          email: '',
          message: '',
        });
      }, 3000);
    }
  };

  return (
    <section id="contact" dir="rtl" className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 text-right">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2 text-gray-800" style={{ fontFamily: 'Rubik, sans-serif' }}>
            <span className="text-[#4ECDC4]">צור</span> <span className="text-[#FF6B6B]">קשר</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            אנחנו כאן לענות על כל שאלה. השאירו פרטים ונחזור אליכם בהקדם.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="backdrop-blur-md bg-white/80 p-8 rounded-xl shadow-lg border border-gray-200/50 relative overflow-hidden"
            >
              {isSubmitted ? (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center h-full py-10"
                >
                  <div className="w-16 h-16 bg-[#4ECDC4] rounded-full flex items-center justify-center mb-4">
                    <FaCheck className="text-white text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">תודה רבה!</h3>
                  <p className="text-gray-600 text-center">פנייתך התקבלה בהצלחה. ניצור איתך קשר בהקדם.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative">
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">שם מלא</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white/50 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] transition`}
                      placeholder="הזן את שמך המלא"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div className="relative">
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">טלפון</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white/50 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] transition`}
                      placeholder="הזן את מספר הטלפון שלך"
                      dir="ltr"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  <div className="relative">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">אימייל</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white/50 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] transition`}
                      placeholder="הזן את כתובת האימייל שלך"
                      dir="ltr"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div className="relative">
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">הודעה</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className={`w-full px-4 py-3 bg-white/50 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] transition`}
                      placeholder="כתוב את הודעתך כאן..."
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 px-6 bg-[#FF6B6B] hover:bg-[#ff5252] text-white font-bold rounded-lg shadow-md transition-all duration-300 flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : 'קבע תור עכשיו'}
                  </motion.button>
                </form>
              )}
              
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-[#4ECDC4]/20"></div>
              <div className="absolute -bottom-8 -left-8 w-16 h-16 rounded-full bg-[#FF6B6B]/20"></div>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div className="order-1 lg:order-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="backdrop-blur-md bg-white/80 p-8 rounded-xl shadow-lg border border-gray-200/50 h-full"
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-800">פרטי התקשרות</h3>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#4ECDC4]/10 rounded-full flex items-center justify-center ml-4">
                    <FaPhone className="text-[#4ECDC4]" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">טלפון</p>
                    <p className="font-medium text-gray-800">03-1234567</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#4ECDC4]/10 rounded-full flex items-center justify-center ml-4">
                    <FaEnvelope className="text-[#4ECDC4]" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">אימייל</p>
                    <p className="font-medium text-gray-800" dir="ltr">info@gamma-law.co.il</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#4ECDC4]/10 rounded-full flex items-center justify-center ml-4">
                    <FaMapMarkerAlt className="text-[#4ECDC4]" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">כתובת</p>
                    <p className="font-medium text-gray-800">רחוב רוטשילד 123, תל אביב</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <div className="rounded-xl overflow-hidden shadow-lg h-64 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1577415124269-fc1140a69e91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                    alt="מפת המשרד" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#4ECDC4]/10 flex items-center justify-center">
                    <div className="bg-white/90 px-4 py-2 rounded-lg shadow-md">
                      <p className="font-medium text-gray-800">משרד עורכי דין גמא</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2 text-center">שעות פעילות: א'-ה' 9:00-18:00</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;