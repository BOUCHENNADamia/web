import { useState, useEffect, useRef, useCallback } from 'react';
import { apiRequest } from '../api.js';
import { COURSE_BADGES, STAT_LABELS } from '../data.js';

export default function AdminPanel({ courses, refreshKey, onCoursesLoaded }) {
  const [rows, setRows]         = useState([]);
  const [stats, setStats]       = useState([]);
  const [total, setTotal]       = useState(0);
  const [filterCourse, setFC]   = useState('all');
  const [search, setSearch]     = useState('');
  const [dbError, setDbError]   = useState('');
  const searchTimer = useRef(null);
  const coursesLoadedRef = useRef(false);

  const load = useCallback(async () => {
    const params = new URLSearchParams();
    if (filterCourse !== 'all') params.set('course', filterCourse);
    if (search.trim()) params.set('search', search.trim());
    try {
      const data = await apiRequest('registrations.php?' + params.toString());
      setRows(data.registrations);
      setStats(data.stats);
      setTotal(data.total);
      setDbError('');
      if (!coursesLoadedRef.current && data.courses.length > 0) {
        coursesLoadedRef.current = true;
        onCoursesLoaded(data.courses);
      }
    } catch (err) {
      setDbError(err instanceof TypeError
        ? 'Database offline — Start Apache and MySQL in XAMPP, import database.sql, then open via http://localhost/'
        : 'Database error — ' + err.message);
      setRows([]);
    }
  }, [filterCourse, search, onCoursesLoaded]);

  useEffect(() => { load(); }, [load, refreshKey]);

  function handleSearchChange(e) {
    const val = e.target.value;
    setSearch(val);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(load, 300);
  }

  async function handleDelete(id) {
    if (!confirm('Remove this registration from the database?')) return;
    try {
      await apiRequest('delete.php', { id });
      load();
    } catch (err) {
      setDbError('Delete error — ' + err.message);
    }
  }

  function exportCSV() {
    if (!rows.length) { alert('No registrations to export.'); return; }
    const q = v => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const header = ['ID', 'Name', 'Phone', 'Email', 'Course', 'Comments', 'Date'];
    const body   = rows.map(r => [
      r.regID, q(r.fullName), q(r.phone), q(r.email),
      q(r.courseName), q(r.comments),
      new Date(r.regDate.replace(' ', 'T')).toLocaleDateString('en-GB')
    ]);
    const csv  = [header, ...body].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = Object.assign(document.createElement('a'), { href: url, download: 'hwum_registrations.csv' });
    a.click(); URL.revokeObjectURL(url);
  }

  return (
    <section id="admin" className="section-wrap" aria-label="Registration Database">
      <div className="container">
        <span className="section-label reveal">06 &mdash; Database</span>
        <h2 className="section-title reveal">Registration Database</h2>
        <p className="section-desc reveal">
          All submitted registrations are stored in a MySQL database (<code>hwum_summer</code>) queried through PHP and SQL.
          They can be filtered by course, searched by name or email, and exported as CSV.
        </p>

        {dbError && <div className="db-status" role="alert">{dbError}</div>}

        <div className="stats-bar reveal" aria-label="Registration statistics">
          <div className="stat-pill"><strong>{total}</strong>Total Registrations</div>
          {stats.map(s => (
            <div key={s.courseCode} className="stat-pill">
              <strong>{s.total}</strong>{STAT_LABELS[s.courseCode] || s.courseName}
            </div>
          ))}
        </div>

        <div className="admin-header reveal">
          <div className="admin-filters" role="group" aria-label="Filter registrations">
            <label htmlFor="filterCourse">Filter by course:</label>
            <select id="filterCourse" value={filterCourse} onChange={e => setFC(e.target.value)}>
              <option value="all">All Courses</option>
              {courses.map(c => (
                <option key={c.courseID} value={c.courseID}>{c.courseName}</option>
              ))}
            </select>
            <input type="search" className="admin-search"
                   placeholder="Search name or email…"
                   value={search} onChange={handleSearchChange}
                   aria-label="Search registrations" />
          </div>
          <button className="export-btn" onClick={exportCSV}>Export CSV</button>
        </div>

        <div className="table-wrap reveal" role="region" aria-label="Registrations table" aria-live="polite">
          <table>
            <thead>
              <tr>
                <th scope="col">Full Name</th>
                <th scope="col">Phone</th>
                <th scope="col">Email</th>
                <th scope="col">Course</th>
                <th scope="col">Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr><td colSpan={6} className="table-empty">
                  <p>{dbError ? 'Database not connected.' : (total === 0
                    ? 'Registrations will appear here once students submit the form.'
                    : 'No registrations match your filters.')}</p>
                </td></tr>
              ) : rows.map(r => {
                const date  = new Date(r.regDate.replace(' ', 'T')).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
                const badge = COURSE_BADGES[r.courseCode] || '';
                return (
                  <tr key={r.regID}>
                    <td>{r.fullName}</td>
                    <td>{r.phone}</td>
                    <td><a href={`mailto:${r.email}`}>{r.email}</a></td>
                    <td><span className={`course-badge ${badge}`}>{r.courseName}</span></td>
                    <td>{date}</td>
                    <td><button className="delete-btn" onClick={() => handleDelete(r.regID)}>Delete</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
