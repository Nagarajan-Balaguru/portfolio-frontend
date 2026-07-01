import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { sendContact } from '../services/api';
import { useProfile } from '../hooks/usePortfolioData';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [apiErrors, setApiErrors] = useState({});
  const { data: profile } = useProfile();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setStatus('');
    setApiErrors({});
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) { setStatus('name'); return; }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setStatus('email'); return;
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      setStatus('message'); return;
    }

    setStatus('sending');
    try {
      await sendContact(form);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      const errors = err.response?.data?.errors;
      if (errors) setApiErrors(errors);
      setStatus('error');
    }
  };

  return (
    <section ref={ref} className="py-24 px-6" style={{ backgroundColor: '#161b22' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold">
            Get In <span className="text-[#3fb950]">Touch</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-white text-xl font-semibold mb-3">
              Let's work together
            </h3>
            <p className="text-[#8b949e] leading-relaxed mb-8">
              I'm currently open to new opportunities. Whether you have a
              project in mind, a question, or just want to say hi — my
              inbox is always open!
            </p>

            <div className="flex flex-col gap-4">
                  {[
                    { icon: '✉️', label: 'Email', value: profile?.email || 'nnnagarajan16@gmail.com' },
                    { icon: '📞', label: 'Phone', value: profile?.phone || '+91 9003312426' },
                    { icon: '📍', label: 'Location', value: profile?.location || 'Chennai, Tamil Nadu, India' },
                    { icon: '💼', label: 'Status', value: 'Open to work' },
                  ].map(item => (
                <div
                  key={item.label}
                  className="card rounded-xl p-4 flex items-center gap-4"
                >
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <p className="text-[#8b949e] text-xs">{item.label}</p>
                    <p className="text-white text-sm font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Response time note */}
            <div className="mt-6 p-4 rounded-xl border border-[#21262d] bg-[#0d1117]">
              <p className="text-[#8b949e] text-xs font-mono">
                ⚡ Average response time: within 24 hours
              </p>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="card rounded-xl p-6"
          >
            <div className="flex flex-col gap-4">

              {/* Name */}
              <div>
                <label className="text-[#8b949e] text-xs mb-1.5 block">
                  Your Name <span className="text-red-400">*</span>
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Nagarajan Balaguru"
                  className={`input-field ${
                    status === 'name' || apiErrors.name
                      ? 'border-red-500'
                      : ''
                  }`}
                />
                {(status === 'name' || apiErrors.name) && (
                  <p className="text-red-400 text-xs mt-1">
                    ✗ {apiErrors.name || 'Please enter your name.'}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="text-[#8b949e] text-xs mb-1.5 block">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="nagarajan@example.com"
                  className={`input-field ${
                    status === 'email' || apiErrors.email
                      ? 'border-red-500'
                      : ''
                  }`}
                />
                {(status === 'email' || apiErrors.email) && (
                  <p className="text-red-400 text-xs mt-1">
                    ✗ {apiErrors.email || 'Please enter a valid email address.'}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="text-[#8b949e] text-xs mb-1.5 block">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or opportunity..."
                  rows={5}
                  className={`input-field resize-none ${
                    status === 'message' || apiErrors.message
                      ? 'border-red-500'
                      : ''
                  }`}
                />
                <div className="flex justify-between items-center mt-1">
                  {(status === 'message' || apiErrors.message) ? (
                    <p className="text-red-400 text-xs">
                      ✗ {apiErrors.message || 'Message must be at least 10 characters.'}
                    </p>
                  ) : (
                    <span />
                  )}
                  <p className={`text-xs ml-auto ${
                    form.message.length < 10
                      ? 'text-[#484f58]'
                      : 'text-[#3fb950]'
                  }`}>
                    {form.message.length}/1000
                  </p>
                </div>
              </div>

              {/* Submit button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleSubmit}
                disabled={status === 'sending'}
                className="btn-primary w-full disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {status === 'sending' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Message →'
                )}
              </motion.button>

              {/* Success message */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[#3fb950] text-sm text-center bg-[#1f2d1f] border border-[#2d4a2d] rounded-lg p-3"
                >
                  ✓ Message sent! I'll get back to you soon. 🎉
                </motion.div>
              )}

              {/* Error message */}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm text-center bg-red-900/20 border border-red-800 rounded-lg p-3"
                >
                  ✗ Something went wrong. Please try again.
                </motion.div>
              )}

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}