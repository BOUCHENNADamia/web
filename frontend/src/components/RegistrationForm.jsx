import { useState } from 'react';
import { apiRequest } from '../api.js';

export default function RegistrationForm({ courses, onRegisterSuccess }) {
  const [values, setValues]     = useState({ name: '', phone: '', email: '', courseID: '', comments: '' });
  const [errors, setErrors]     = useState({});
  const [submitting, setSubmit] = useState(false);
  const [globalErr, setGlobal]  = useState('');
  const [success, setSuccess]   = useState(false);

  function validate(field, val) {
    if (['name', 'phone', 'email', 'courseID'].includes(field) && !val.trim())
      return 'This field is required.';
    if (field === 'email' && val.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()))
      return 'Please enter a valid email address.';
    if (field === 'phone' && val.trim() && !/^[\d\s+\-()[\]]{6,20}$/.test(val.trim()))
      return 'Please enter a valid phone number.';
    return '';
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setValues(v => ({ ...v, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: validate(name, value) }));
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    setErrors(er => ({ ...er, [name]: validate(name, value) }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};
    ['name', 'phone', 'email', 'courseID'].forEach(f => {
      const msg = validate(f, values[f]);
      if (msg) newErrors[f] = msg;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    setSubmit(true);
    setGlobal('');
    try {
      await apiRequest('register.php', {
        name: values.name, phone: values.phone, email: values.email,
        courseID: Number(values.courseID), comments: values.comments
      });
      setSuccess(true);
      onRegisterSuccess();
    } catch (err) {
      setGlobal(err instanceof TypeError
        ? 'Cannot reach the database server. Is XAMPP running?'
        : err.message);
    } finally {
      setSubmit(false);
    }
  }

  if (success) return (
    <div className="form-success" aria-live="polite">
      <h3>Registration Submitted</h3>
      <p>Thank you for your interest in the HWUM Summer Programme 2027. Your information has been saved to our database. You will receive a confirmation email from Suzanne Vilchez shortly.</p>
      <br />
      <button className="btn btn-dark" style={{ margin: '0 auto' }}
              onClick={() => { setSuccess(false); setValues({ name: '', phone: '', email: '', courseID: '', comments: '' }); }}>
        Register Another Student
      </button>
    </div>
  );

  return (
    <form id="regForm" noValidate aria-label="Summer Programme registration form" onSubmit={handleSubmit}>
      <h3>Registration Form</h3>
      <p>All fields marked <span style={{ color: 'var(--accent2)' }}>*</span> are required.</p>

      <div className="form-group">
        <label htmlFor="fname">Full Name <span>*</span></label>
        <input type="text" id="fname" name="name" className={`form-control${errors.name ? ' error' : ''}`}
               placeholder="e.g. Sophie Martin" required autoComplete="name"
               value={values.name} onChange={handleChange} onBlur={handleBlur} />
        {errors.name && <span className="error-msg show" role="alert">{errors.name}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="fphone">Contact Number <span>*</span></label>
          <input type="tel" id="fphone" name="phone" className={`form-control${errors.phone ? ' error' : ''}`}
                 placeholder="+33 6 12 34 56 78" required autoComplete="tel"
                 value={values.phone} onChange={handleChange} onBlur={handleBlur} />
          {errors.phone && <span className="error-msg show" role="alert">{errors.phone}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="femail">Email Address <span>*</span></label>
          <input type="email" id="femail" name="email" className={`form-control${errors.email ? ' error' : ''}`}
                 placeholder="you@esiea.fr" required autoComplete="email"
                 value={values.email} onChange={handleChange} onBlur={handleBlur} />
          {errors.email && <span className="error-msg show" role="alert">{errors.email}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="fcourse">Preferred Course <span>*</span></label>
        <select id="fcourse" name="courseID" className={`form-control${errors.courseID ? ' error' : ''}`} required
                value={values.courseID} onChange={handleChange} onBlur={handleBlur}>
          <option value="" disabled>— Select a course —</option>
          {courses.map(c => (
            <option key={c.courseID} value={c.courseID}>{c.courseName} ({c.courseCode})</option>
          ))}
        </select>
        {errors.courseID && <span className="error-msg show" role="alert">{errors.courseID}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="fcomments">Additional Comments</label>
        <textarea id="fcomments" name="comments" className="form-control"
                  placeholder="Any questions, dietary requirements, or additional information…"
                  value={values.comments} onChange={handleChange} />
      </div>

      {globalErr && <span className="error-msg show" role="alert">{globalErr}</span>}
      <button type="submit" className="btn btn-dark btn-primary form-submit" disabled={submitting}>
        {submitting ? 'Submitting…' : 'Submit Registration →'}
      </button>
    </form>
  );
}
