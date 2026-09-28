import { useMemo, useState } from 'react'
import './App.css'

const categoryOptions = [
  'Wi-Fi / Internet',
  'Classroom',
  'Hostel',
  'Electricity',
  'Water',
  'Library',
  'Sanitation',
  'Food / Mess',
  'Transport',
  'Other',
]

const statusOptions = ['Pending', 'In Progress', 'Resolved']
const priorityOptions = ['Low', 'Medium', 'High', 'Urgent']
const departmentOptions = ['IT Support', 'Maintenance', 'Hostel Office', 'Administration', 'Security', 'Library', 'Transport', 'Catering']

const sampleStudents = [
  { id: 1, name: 'Aditi Sharma', email: 'student@college.edu', password: 'student123', studentId: 'CS-2026-104', department: 'Computer Science' },
  { id: 2, name: 'Rahul Verma', email: 'rahul@college.edu', password: 'student123', studentId: 'ME-2026-220', department: 'Mechanical' },
  { id: 3, name: 'Meera Iyer', email: 'meera@college.edu', password: 'student123', studentId: 'EC-2026-118', department: 'Electronics' },
]

const adminAccount = { name: 'Admin Team', email: 'admin@college.edu', password: 'admin123' }

const initialComplaints = [
  {
    id: 'CCI-2026001',
    title: 'Wi-Fi outage in Engineering Block',
    description: 'The internet connection is dropping repeatedly in the third-floor labs between 10:00 AM and 12:00 PM, disrupting online classes and practical work.',
    category: 'Wi-Fi / Internet',
    location: 'Engineering Block, Floor 3',
    priority: 'High',
    status: 'In Progress',
    assignedDepartment: 'IT Support',
    studentName: 'Aditi Sharma',
    studentEmail: 'student@college.edu',
    createdAt: '2026-09-18T09:15:00',
    updatedAt: '2026-09-20T11:35:00',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    remarks: 'Network team is checking access points on the third floor and replacing damaged cables.',
    history: [
      { status: 'Pending', note: 'Complaint submitted by student.', updatedBy: 'System', at: '2026-09-18T09:15:00' },
      { status: 'In Progress', note: 'IT support assigned and access points inspected.', updatedBy: 'Admin Team', at: '2026-09-20T11:35:00' },
    ],
  },
  {
    id: 'CCI-2026002',
    title: 'Water leakage in hostel washroom',
    description: 'The bathroom pipe near room B-214 is leaking continuously and creating a slippery floor. This is risky for students late at night.',
    category: 'Water',
    location: 'Girls Hostel, Block B',
    priority: 'Urgent',
    status: 'Pending',
    assignedDepartment: 'Maintenance',
    studentName: 'Meera Iyer',
    studentEmail: 'meera@college.edu',
    createdAt: '2026-09-22T18:40:00',
    updatedAt: '2026-09-22T18:40:00',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80',
    remarks: 'Awaiting site inspection and maintenance team dispatch.',
    history: [
      { status: 'Pending', note: 'Complaint submitted and forwarded to maintenance.', updatedBy: 'System', at: '2026-09-22T18:40:00' },
    ],
  },
  {
    id: 'CCI-2026003',
    title: 'Classroom fan not working',
    description: 'The ceiling fan in room 208 is not running and the room feels extremely hot during afternoon lectures.',
    category: 'Classroom',
    location: 'Room 208, Science Block',
    priority: 'Medium',
    status: 'Resolved',
    assignedDepartment: 'Maintenance',
    studentName: 'Rahul Verma',
    studentEmail: 'rahul@college.edu',
    createdAt: '2026-09-12T14:10:00',
    updatedAt: '2026-09-14T08:50:00',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80',
    remarks: 'Fan motor replaced and room tested before re-opening.',
    history: [
      { status: 'Pending', note: 'Maintenance ticket created.', updatedBy: 'System', at: '2026-09-12T14:10:00' },
      { status: 'In Progress', note: 'Technician dispatched to inspect fan.', updatedBy: 'Admin Team', at: '2026-09-13T10:00:00' },
      { status: 'Resolved', note: 'New fan motor installed and verified.', updatedBy: 'Maintenance', at: '2026-09-14T08:50:00' },
    ],
  },
  {
    id: 'CCI-2026004',
    title: 'Library study desk damaged',
    description: 'One of the reading desks near the second-floor windows is broken and unsafe for students.',
    category: 'Library',
    location: 'Main Library, Floor 2',
    priority: 'Low',
    status: 'Pending',
    assignedDepartment: 'Library',
    studentName: 'Aditi Sharma',
    studentEmail: 'student@college.edu',
    createdAt: '2026-09-25T15:20:00',
    updatedAt: '2026-09-25T15:20:00',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=900&q=80',
    remarks: 'Library supervisor has requested furniture inspection.',
    history: [
      { status: 'Pending', note: 'Desk injury risk reported by student.', updatedBy: 'System', at: '2026-09-25T15:20:00' },
    ],
  },
  {
    id: 'CCI-2026005',
    title: 'Mess food quality complaint',
    description: 'The lunch served in the mess has been repeatedly undercooked and not hygienically stored.',
    category: 'Food / Mess',
    location: 'Boys Hostel Mess',
    priority: 'High',
    status: 'In Progress',
    assignedDepartment: 'Catering',
    studentName: 'Rahul Verma',
    studentEmail: 'rahul@college.edu',
    createdAt: '2026-09-11T12:30:00',
    updatedAt: '2026-09-13T09:00:00',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
    remarks: 'Catering team is reviewing kitchen hygiene and staff rotation.',
    history: [
      { status: 'Pending', note: 'Complaint filed after repeated quality concerns.', updatedBy: 'System', at: '2026-09-11T12:30:00' },
      { status: 'In Progress', note: 'Kitchen inspection arranged with catering team.', updatedBy: 'Admin Team', at: '2026-09-13T09:00:00' },
    ],
  },
]

const initialNotifications = [
  { id: 1, message: 'Wi-Fi issue in the Engineering Block is now being investigated.', type: 'info', time: '3 mins ago' },
  { id: 2, message: 'Maintenance has resolved the classroom fan complaint.', type: 'success', time: '22 mins ago' },
  { id: 3, message: 'New complaint filed from hostel security desk.', type: 'alert', time: '1 hour ago' },
]

const formatDate = (isoDate) => new Date(isoDate).toLocaleString('en-IN', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

const generateTicketId = () => {
  const date = new Date()
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const random = Math.floor(Math.random() * 900 + 100)
  return `CCI-${date.getFullYear()}${month}${day}-${random}`
}

const getStatusClass = (status) => {
  if (status === 'Resolved') return 'status-badge resolved'
  if (status === 'In Progress') return 'status-badge in-progress'
  return 'status-badge pending'
}

const getPriorityClass = (priority) => {
  if (priority === 'Urgent') return 'priority-badge urgent'
  if (priority === 'High') return 'priority-badge high'
  if (priority === 'Medium') return 'priority-badge medium'
  return 'priority-badge low'
}

function App() {
  const [studentUsers, setStudentUsers] = useState(sampleStudents)
  const [currentUser, setCurrentUser] = useState(null)
  const [authRole, setAuthRole] = useState('student')
  const [authMode, setAuthMode] = useState('login')
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '', studentId: '' })
  const [complaints, setComplaints] = useState(initialComplaints)
  const [notifications, setNotifications] = useState(initialNotifications)
  const [selectedComplaintId, setSelectedComplaintId] = useState(initialComplaints[0]?.id || '')
  const [studentView, setStudentView] = useState('dashboard')
  const [adminView, setAdminView] = useState('dashboard')
  const [studentSearch, setStudentSearch] = useState('')
  const [adminSearch, setAdminSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [complaintForm, setComplaintForm] = useState({
    title: '',
    description: '',
    category: categoryOptions[0],
    location: '',
    priority: 'Medium',
    image: '',
    imageName: '',
  })
  const [notice, setNotice] = useState({ kind: '', text: '' })
  const [adminRemark, setAdminRemark] = useState('')

  const selectedComplaint =
    complaints.find((complaint) => complaint.id === selectedComplaintId) ?? complaints[0] ?? null

  const studentComplaints = useMemo(
    () =>
      complaints.filter((complaint) => complaint.studentEmail === currentUser?.email).filter((complaint) => {
        const query = studentSearch.trim().toLowerCase()
        if (!query) return true
        return (
          complaint.id.toLowerCase().includes(query) ||
          complaint.title.toLowerCase().includes(query) ||
          complaint.category.toLowerCase().includes(query) ||
          complaint.location.toLowerCase().includes(query)
        )
      }),
    [complaints, currentUser, studentSearch],
  )

  const filteredComplaints = useMemo(
    () =>
      complaints.filter((complaint) => {
        const query = adminSearch.trim().toLowerCase()
        const matchesSearch =
          !query ||
          complaint.id.toLowerCase().includes(query) ||
          complaint.studentName.toLowerCase().includes(query) ||
          complaint.category.toLowerCase().includes(query) ||
          complaint.location.toLowerCase().includes(query)

        const matchesStatus = statusFilter === 'All' || complaint.status === statusFilter
        const matchesCategory = categoryFilter === 'All' || complaint.category === categoryFilter

        return matchesSearch && matchesStatus && matchesCategory
      }),
    [adminSearch, categoryFilter, complaints, statusFilter],
  )

  const stats = useMemo(() => {
    const total = complaints.length
    const pending = complaints.filter((complaint) => complaint.status === 'Pending').length
    const inProgress = complaints.filter((complaint) => complaint.status === 'In Progress').length
    const resolved = complaints.filter((complaint) => complaint.status === 'Resolved').length
    const byCategory = categoryOptions.map((category) => ({
      category,
      count: complaints.filter((complaint) => complaint.category === category).length,
    }))
    const monthly = [
      { month: 'Jan', value: 1 },
      { month: 'Feb', value: 2 },
      { month: 'Mar', value: 3 },
      { month: 'Apr', value: 5 },
      { month: 'May', value: 3 },
      { month: 'Jun', value: 4 },
      { month: 'Jul', value: 8 },
      { month: 'Aug', value: 7 },
      { month: 'Sep', value: 5 },
    ]

    return { total, pending, inProgress, resolved, byCategory, monthly }
  }, [complaints])

  const handleAuthSubmit = (event) => {
    event.preventDefault()
    const submittedEmail = authForm.email.trim().toLowerCase()

    if (authMode === 'login') {
      if (authRole === 'student') {
        const user = studentUsers.find(
          (existingUser) =>
            existingUser.email.toLowerCase() === submittedEmail && existingUser.password === authForm.password,
        )

        if (!user) {
          setNotice({ kind: 'error', text: 'Student login failed. Check your email and password.' })
          return
        }

        setCurrentUser(user)
        setStudentView('dashboard')
        setNotice({ kind: 'success', text: `Welcome back, ${user.name}.` })
        return
      }

      if (submittedEmail === adminAccount.email.toLowerCase() && authForm.password === adminAccount.password) {
        setCurrentUser({ ...adminAccount, role: 'admin' })
        setAdminView('dashboard')
        setNotice({ kind: 'success', text: 'Admin access granted.' })
        return
      }

      setNotice({ kind: 'error', text: 'Admin login failed. Try admin@college.edu / admin123.' })
      return
    }

    if (!authForm.name || !authForm.email || !authForm.password || !authForm.studentId) {
      setNotice({ kind: 'error', text: 'Please complete the student registration form.' })
      return
    }

    const alreadyExists = studentUsers.some(
      (existingUser) => existingUser.email.toLowerCase() === submittedEmail,
    )

    if (alreadyExists) {
      setNotice({ kind: 'error', text: 'This student email is already registered.' })
      return
    }

    const newStudent = {
      id: Date.now(),
      name: authForm.name,
      email: submittedEmail,
      password: authForm.password,
      studentId: authForm.studentId,
      department: 'Computer Science',
    }

    setStudentUsers((prev) => [newStudent, ...prev])
    setCurrentUser(newStudent)
    setStudentView('dashboard')
    setNotice({ kind: 'success', text: 'Registration successful. Your student account is ready.' })
  }

  const handleComplaintSubmit = (event) => {
    event.preventDefault()

    if (!complaintForm.title || !complaintForm.description || !complaintForm.location) {
      setNotice({ kind: 'error', text: 'Please complete all complaint details before submitting.' })
      return
    }

    const ticketId = generateTicketId()
    const newComplaint = {
      id: ticketId,
      title: complaintForm.title,
      description: complaintForm.description,
      category: complaintForm.category,
      location: complaintForm.location,
      priority: complaintForm.priority,
      status: 'Pending',
      assignedDepartment: departmentOptions[0],
      studentName: currentUser?.name || 'Student',
      studentEmail: currentUser?.email || 'student@college.edu',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      image: complaintForm.image || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
      remarks: 'Complaint submitted and routed to the assigned department.',
      history: [
        {
          status: 'Pending',
          note: 'Complaint submitted successfully by the student.',
          updatedBy: currentUser?.name || 'Student',
          at: new Date().toISOString(),
        },
      ],
    }

    setComplaints((prev) => [newComplaint, ...prev])
    setSelectedComplaintId(ticketId)
    setStudentView('my-complaints')
    setComplaintForm({
      title: '',
      description: '',
      category: categoryOptions[0],
      location: '',
      priority: 'Medium',
      image: '',
      imageName: '',
    })
    setNotifications((prev) => [
      { id: Date.now(), message: `New complaint ${ticketId} has been submitted successfully.`, type: 'success', time: 'Just now' },
      ...prev,
    ])
    setNotice({ kind: 'success', text: `Complaint ${ticketId} created successfully.` })
  }

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setComplaintForm((prev) => ({ ...prev, image: reader.result, imageName: file.name }))
    }
    reader.readAsDataURL(file)
  }

  const handleStatusChange = (complaintId, nextStatus) => {
    setComplaints((prev) =>
      prev.map((complaint) => {
        if (complaint.id !== complaintId) return complaint

        const updatedHistory = [
          ...complaint.history,
          {
            status: nextStatus,
            note: `Status changed by ${currentUser?.name || 'Admin Team'}.`,
            updatedBy: currentUser?.name || 'Admin Team',
            at: new Date().toISOString(),
          },
        ]

        return {
          ...complaint,
          status: nextStatus,
          updatedAt: new Date().toISOString(),
          remarks: `Status updated to ${nextStatus}.`,
          history: updatedHistory,
        }
      }),
    )

    setNotifications((prev) => [
      { id: Date.now(), message: `Complaint ${complaintId} marked as ${nextStatus}.`, type: 'info', time: 'Just now' },
      ...prev,
    ])
    setNotice({ kind: 'success', text: `Complaint ${complaintId} updated to ${nextStatus}.` })
  }

  const handleRemarkSubmit = () => {
    if (!adminRemark.trim() || !selectedComplaint) return

    setComplaints((prev) =>
      prev.map((complaint) => {
        if (complaint.id !== selectedComplaint.id) return complaint

        return {
          ...complaint,
          remarks: adminRemark,
          updatedAt: new Date().toISOString(),
          history: [
            ...complaint.history,
            {
              status: complaint.status,
              note: adminRemark,
              updatedBy: currentUser?.name || 'Admin Team',
              at: new Date().toISOString(),
            },
          ],
        }
      }),
    )

    setNotifications((prev) => [
      { id: Date.now(), message: `Administrative remark added to ${selectedComplaint.id}.`, type: 'info', time: 'Just now' },
      ...prev,
    ])
    setAdminRemark('')
    setNotice({ kind: 'success', text: 'Admin update recorded successfully.' })
  }

  const handleAssignDepartment = (complaintId, department) => {
    setComplaints((prev) =>
      prev.map((complaint) => {
        if (complaint.id !== complaintId) return complaint
        return { ...complaint, assignedDepartment: department, remarks: `Assigned to ${department}.` }
      }),
    )
    setNotice({ kind: 'success', text: `Complaint assigned to ${department}.` })
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setNotice({ kind: '', text: '' })
    setAuthForm({ name: '', email: '', password: '', studentId: '' })
  }

  const renderAuthScreen = () => (
    <div className="auth-page">
      <div className="auth-panel">
        <div className="auth-branding">
          <span className="brand-chip">CollegeCare</span>
          <h1>College Complaint & Issue Tracker</h1>
          <p>
            Manage student issues across campus with a secure, responsive system designed for modern college operations.
          </p>
          <div className="feature-list">
            <span>Secure login</span>
            <span>Complaint tracking</span>
            <span>Admin analytics</span>
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-tabs">
            <button type="button" className={authRole === 'student' ? 'tab active' : 'tab'} onClick={() => setAuthRole('student')}>
              Student
            </button>
            <button type="button" className={authRole === 'admin' ? 'tab active' : 'tab'} onClick={() => setAuthRole('admin')}>
              Admin
            </button>
          </div>

          <div className="auth-header">
            <h2>{authMode === 'login' ? 'Welcome back' : 'Create student account'}</h2>
            <p>{authMode === 'login' ? 'Access your portal and track complaints' : 'Register a new complaint portal account'}</p>
          </div>

          <form onSubmit={handleAuthSubmit} className="auth-form">
            {authMode === 'register' && (
              <label>
                Full name
                <input
                  type="text"
                  value={authForm.name}
                  onChange={(event) => setAuthForm((prev) => ({ ...prev, name: event.target.value }))}
                  placeholder="Enter your full name"
                />
              </label>
            )}

            <label>
              Email
              <input
                type="email"
                value={authForm.email}
                onChange={(event) => setAuthForm((prev) => ({ ...prev, email: event.target.value }))}
                placeholder={authRole === 'admin' ? 'admin@college.edu' : 'student@college.edu'}
              />
            </label>

            {authMode === 'register' && (
              <label>
                Student ID
                <input
                  type="text"
                  value={authForm.studentId}
                  onChange={(event) => setAuthForm((prev) => ({ ...prev, studentId: event.target.value }))}
                  placeholder="CS-2026-104"
                />
              </label>
            )}

            <label>
              Password
              <input
                type="password"
                value={authForm.password}
                onChange={(event) => setAuthForm((prev) => ({ ...prev, password: event.target.value }))}
                placeholder={authRole === 'admin' ? 'admin123' : 'student123'}
              />
            </label>

            {notice.text && <div className={`notice ${notice.kind}`}>{notice.text}</div>}

            <button type="submit" className="primary-btn large">
              {authMode === 'login' ? (authRole === 'admin' ? 'Enter admin portal' : 'Login to dashboard') : 'Register student'}
            </button>
          </form>

          <div className="switch-link">
            <span>{authMode === 'login' ? 'Need an account?' : 'Already registered?'}</span>
            <button type="button" onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}>
              {authMode === 'login' ? 'Register here' : 'Login here'}
            </button>
          </div>

          <div className="credential-box">
            <strong>Demo credentials</strong>
            <p>{authRole === 'admin' ? 'Email: admin@college.edu | Password: admin123' : 'Email: student@college.edu | Password: student123'}</p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderStudentPage = () => {
    const visibleStudentComplaints = studentComplaints

    return (
      <div className="portal-shell">
        <aside className="sidebar">
          <div className="brand-block">
            <div className="brand-mark">C</div>
            <div>
              <h3>CollegeCare</h3>
              <small>Student Portal</small>
            </div>
          </div>

          <nav className="nav-menu">
            {[
              { key: 'dashboard', label: 'Dashboard' },
              { key: 'raise-complaint', label: 'Raise Complaint' },
              { key: 'my-complaints', label: 'My Complaints' },
              { key: 'profile', label: 'Profile' },
            ].map((item) => (
              <button
                key={item.key}
                type="button"
                className={studentView === item.key ? 'nav-item active' : 'nav-item'}
                onClick={() => setStudentView(item.key)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button type="button" className="logout-btn" onClick={handleLogout}>Logout</button>
        </aside>

        <main className="main-panel">
          <header className="topbar">
            <div>
              <p className="eyebrow">Campus operations</p>
              <h2>Student Support Center</h2>
            </div>
            <div className="user-profile">
              <div className="notification-bell">🔔 <span>{notifications.length}</span></div>
              <div className="avatar">{currentUser?.name?.charAt(0) || 'S'}</div>
              <div>
                <strong>{currentUser?.name}</strong>
                <small>{currentUser?.studentId}</small>
              </div>
            </div>
          </header>

          {notice.text && notice.kind && <div className={`notice ${notice.kind}`}>{notice.text}</div>}

          {studentView === 'dashboard' && (
            <>
              <section className="stats-grid">
                <div className="stat-card primary">
                  <span>Total</span>
                  <strong>{studentComplaints.length}</strong>
                  <small>Submitted complaints</small>
                </div>
                <div className="stat-card warning">
                  <span>Pending</span>
                  <strong>{studentComplaints.filter((item) => item.status === 'Pending').length}</strong>
                  <small>Awaiting review</small>
                </div>
                <div className="stat-card info">
                  <span>In Progress</span>
                  <strong>{studentComplaints.filter((item) => item.status === 'In Progress').length}</strong>
                  <small>Team working</small>
                </div>
                <div className="stat-card success">
                  <span>Resolved</span>
                  <strong>{studentComplaints.filter((item) => item.status === 'Resolved').length}</strong>
                  <small>Closed issues</small>
                </div>
              </section>

              <section className="content-grid">
                <div className="panel">
                  <div className="panel-header">
                    <h3>Quick actions</h3>
                  </div>
                  <div className="quick-actions">
                    <button type="button" className="primary-btn" onClick={() => setStudentView('raise-complaint')}>New complaint</button>
                    <button type="button" className="secondary-btn" onClick={() => setStudentView('my-complaints')}>Track status</button>
                  </div>
                  <div className="mini-list">
                    {notifications.slice(0, 3).map((note) => (
                      <div key={note.id} className="mini-item">
                        <span className={`dot ${note.type}`} />
                        <div>
                          <strong>{note.message}</strong>
                          <small>{note.time}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="panel">
                  <div className="panel-header">
                    <h3>Recent activity</h3>
                  </div>
                  <div className="timeline">
                    {studentComplaints.slice(0, 4).map((complaint) => (
                      <div key={complaint.id} className="timeline-row">
                        <span className={getStatusClass(complaint.status)}>{complaint.status}</span>
                        <div>
                          <strong>{complaint.title}</strong>
                          <small>{complaint.id} • {formatDate(complaint.updatedAt)}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </>
          )}

          {studentView === 'raise-complaint' && (
            <section className="panel form-panel">
              <div className="panel-header">
                <h3>Raise a new complaint</h3>
              </div>

              <form className="complaint-form" onSubmit={handleComplaintSubmit}>
                <div className="grid-two">
                  <label>
                    Complaint title
                    <input value={complaintForm.title} onChange={(event) => setComplaintForm((prev) => ({ ...prev, title: event.target.value }))} placeholder="Broken projector in seminar hall" />
                  </label>
                  <label>
                    Category
                    <select value={complaintForm.category} onChange={(event) => setComplaintForm((prev) => ({ ...prev, category: event.target.value }))}>
                      {categoryOptions.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <label>
                  Description
                  <textarea
                    value={complaintForm.description}
                    onChange={(event) => setComplaintForm((prev) => ({ ...prev, description: event.target.value }))}
                    rows="5"
                    placeholder="Describe the issue in detail"
                  />
                </label>

                <div className="grid-two">
                  <label>
                    Location
                    <input value={complaintForm.location} onChange={(event) => setComplaintForm((prev) => ({ ...prev, location: event.target.value }))} placeholder="Main building, Room 210" />
                  </label>
                  <label>
                    Priority
                    <select value={complaintForm.priority} onChange={(event) => setComplaintForm((prev) => ({ ...prev, priority: event.target.value }))}>
                      {priorityOptions.map((priority) => (
                        <option key={priority} value={priority}>{priority}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="upload-box">
                  <span>Image attachment</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} />
                  {complaintForm.imageName && <small>{complaintForm.imageName}</small>}
                </label>

                {complaintForm.image && (
                  <div className="uploaded-preview">
                    <img src={complaintForm.image} alt="Complaint preview" />
                  </div>
                )}

                <button type="submit" className="primary-btn large">Submit complaint</button>
              </form>
            </section>
          )}

          {studentView === 'my-complaints' && (
            <section className="panel">
              <div className="panel-header space-between">
                <h3>My complaints</h3>
                <input
                  value={studentSearch}
                  onChange={(event) => setStudentSearch(event.target.value)}
                  placeholder="Search by title, ID, or location"
                  className="search-input"
                />
              </div>

              <div className="complaint-list">
                {visibleStudentComplaints.length ? (
                  visibleStudentComplaints.map((complaint) => (
                    <div key={complaint.id} className={selectedComplaintId === complaint.id ? 'complaint-card active' : 'complaint-card'} onClick={() => setSelectedComplaintId(complaint.id)}>
                      <div className="card-top">
                        <div>
                          <strong>{complaint.title}</strong>
                          <small>{complaint.id}</small>
                        </div>
                        <span className={getStatusClass(complaint.status)}>{complaint.status}</span>
                      </div>
                      <p>{complaint.description}</p>
                      <div className="meta-row">
                        <span>{complaint.category}</span>
                        <span>{complaint.location}</span>
                        <span className={getPriorityClass(complaint.priority)}>{complaint.priority}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">No complaints match your current search.</div>
                )}
              </div>

              {selectedComplaint && (
                <div className="detail-card">
                  <div className="detail-header">
                    <div>
                      <p className="eyebrow">Complaint details</p>
                      <h4>{selectedComplaint.title}</h4>
                    </div>
                    <span className={getStatusClass(selectedComplaint.status)}>{selectedComplaint.status}</span>
                  </div>

                  <div className="detail-content">
                    <div className="detail-image-box">
                      <img src={selectedComplaint.image} alt={selectedComplaint.title} />
                    </div>
                    <div className="detail-copy">
                      <p><strong>Ticket:</strong> {selectedComplaint.id}</p>
                      <p><strong>Category:</strong> {selectedComplaint.category}</p>
                      <p><strong>Location:</strong> {selectedComplaint.location}</p>
                      <p><strong>Priority:</strong> <span className={getPriorityClass(selectedComplaint.priority)}>{selectedComplaint.priority}</span></p>
                      <p><strong>Assigned to:</strong> {selectedComplaint.assignedDepartment}</p>
                      <p><strong>Submitted:</strong> {formatDate(selectedComplaint.createdAt)}</p>
                      <p className="note"><strong>Latest update:</strong> {selectedComplaint.remarks}</p>
                    </div>
                  </div>

                  <div className="history-block">
                    <h5>Update history</h5>
                    {selectedComplaint.history.map((entry, index) => (
                      <div key={`${entry.at}-${index}`} className="history-item">
                        <span className={getStatusClass(entry.status)}>{entry.status}</span>
                        <div>
                          <strong>{entry.updatedBy}</strong>
                          <small>{formatDate(entry.at)}</small>
                          <p>{entry.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {studentView === 'profile' && (
            <section className="panel profile-panel">
              <div className="panel-header">
                <h3>Student profile</h3>
              </div>
              <div className="profile-grid">
                <div className="avatar-box">{currentUser?.name?.charAt(0) || 'S'}</div>
                <div className="profile-info">
                  <p><strong>Name:</strong> {currentUser?.name}</p>
                  <p><strong>Email:</strong> {currentUser?.email}</p>
                  <p><strong>Student ID:</strong> {currentUser?.studentId}</p>
                  <p><strong>Department:</strong> {currentUser?.department}</p>
                  <p><strong>Role:</strong> Student</p>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    )
  }

  const renderAdminPage = () => (
    <div className="portal-shell admin-shell">
      <aside className="sidebar admin-sidebar">
        <div className="brand-block">
          <div className="brand-mark">A</div>
          <div>
            <h3>CollegeCare</h3>
            <small>Admin Suite</small>
          </div>
        </div>

        <nav className="nav-menu">
          {[
            { key: 'dashboard', label: 'Dashboard' },
            { key: 'complaints', label: 'All Complaints' },
            { key: 'analytics', label: 'Analytics' },
            { key: 'students', label: 'Students' },
            { key: 'profile', label: 'Profile' },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              className={adminView === item.key ? 'nav-item active' : 'nav-item'}
              onClick={() => setAdminView(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button type="button" className="logout-btn" onClick={handleLogout}>Logout</button>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">Operations overview</p>
            <h2>Administrative Dashboard</h2>
          </div>
          <div className="user-profile">
            <div className="notification-bell">🔔 <span>{notifications.length}</span></div>
            <div className="avatar alt">A</div>
            <div>
              <strong>{adminAccount.name}</strong>
              <small>Administrator</small>
            </div>
          </div>
        </header>

        {notice.text && notice.kind && <div className={`notice ${notice.kind}`}>{notice.text}</div>}

        {adminView === 'dashboard' && (
          <>
            <section className="stats-grid">
              <div className="stat-card primary">
                <span>Total complaints</span>
                <strong>{stats.total}</strong>
                <small>Across campus</small>
              </div>
              <div className="stat-card warning">
                <span>Pending</span>
                <strong>{stats.pending}</strong>
                <small>Needs action</small>
              </div>
              <div className="stat-card info">
                <span>In Progress</span>
                <strong>{stats.inProgress}</strong>
                <small>Assigned teams</small>
              </div>
              <div className="stat-card success">
                <span>Resolved</span>
                <strong>{stats.resolved}</strong>
                <small>Closed solutions</small>
              </div>
            </section>

            <section className="content-grid admin-grid">
              <div className="panel">
                <div className="panel-header">
                  <h3>Recent issues</h3>
                </div>
                <div className="table-list">
                  {complaints.slice(0, 5).map((complaint) => (
                    <div key={complaint.id} className="table-row" onClick={() => setSelectedComplaintId(complaint.id)}>
                      <div>
                        <strong>{complaint.id}</strong>
                        <small>{complaint.category}</small>
                      </div>
                      <span className={getStatusClass(complaint.status)}>{complaint.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="panel">
                <div className="panel-header">
                  <h3>Notification feed</h3>
                </div>
                <div className="mini-list">
                  {notifications.map((note) => (
                    <div key={note.id} className="mini-item">
                      <span className={`dot ${note.type}`} />
                      <div>
                        <strong>{note.message}</strong>
                        <small>{note.time}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {adminView === 'complaints' && (
          <section className="panel">
            <div className="panel-header space-between">
              <h3>Complaint queue</h3>
              <div className="filter-row">
                <input
                  value={adminSearch}
                  onChange={(event) => setAdminSearch(event.target.value)}
                  placeholder="Search complaint, student, or place"
                  className="search-input"
                />
                <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                  <option value="All">All statuses</option>
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
                  <option value="All">All categories</option>
                  {categoryOptions.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="admin-grid">
              <div className="complaint-table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Ticket</th>
                      <th>Student</th>
                      <th>Location</th>
                      <th>Status</th>
                      <th>Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredComplaints.map((complaint) => (
                      <tr
                        key={complaint.id}
                        className={selectedComplaintId === complaint.id ? 'selected' : ''}
                        onClick={() => setSelectedComplaintId(complaint.id)}
                      >
                        <td>{complaint.id}</td>
                        <td>{complaint.studentName}</td>
                        <td>{complaint.location}</td>
                        <td><span className={getStatusClass(complaint.status)}>{complaint.status}</span></td>
                        <td><span className={getPriorityClass(complaint.priority)}>{complaint.priority}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {selectedComplaint && (
                <div className="admin-detail panel-surface">
                  <div className="detail-header">
                    <div>
                      <p className="eyebrow">Issue record</p>
                      <h4>{selectedComplaint.title}</h4>
                    </div>
                    <span className={getStatusClass(selectedComplaint.status)}>{selectedComplaint.status}</span>
                  </div>

                  <div className="detail-content compact">
                    <div className="detail-image-box small">
                      <img src={selectedComplaint.image} alt={selectedComplaint.title} />
                    </div>
                    <div className="detail-copy">
                      <p><strong>Student:</strong> {selectedComplaint.studentName}</p>
                      <p><strong>Ticket:</strong> {selectedComplaint.id}</p>
                      <p><strong>Category:</strong> {selectedComplaint.category}</p>
                      <p><strong>Department:</strong> {selectedComplaint.assignedDepartment}</p>
                      <p><strong>Priority:</strong> <span className={getPriorityClass(selectedComplaint.priority)}>{selectedComplaint.priority}</span></p>
                      <p><strong>Submitted:</strong> {formatDate(selectedComplaint.createdAt)}</p>
                    </div>
                  </div>

                  <textarea
                    value={adminRemark}
                    onChange={(event) => setAdminRemark(event.target.value)}
                    rows="3"
                    placeholder="Add admin remark or update note"
                  />

                  <div className="admin-actions">
                    <select
                      value={selectedComplaint.status}
                      onChange={(event) => handleStatusChange(selectedComplaint.id, event.target.value)}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>

                    <select
                      value={selectedComplaint.assignedDepartment}
                      onChange={(event) => handleAssignDepartment(selectedComplaint.id, event.target.value)}
                    >
                      {departmentOptions.map((department) => (
                        <option key={department} value={department}>{department}</option>
                      ))}
                    </select>

                    <button type="button" className="primary-btn" onClick={handleRemarkSubmit}>Save remark</button>
                    <button
                      type="button"
                      className="danger-btn"
                      onClick={() => {
                        if (window.confirm('Archive this complaint?')) {
                          setComplaints((prev) => prev.filter((complaint) => complaint.id !== selectedComplaint.id))
                          setNotice({ kind: 'success', text: 'Complaint archived.' })
                        }
                      }}
                    >
                      Archive
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {adminView === 'analytics' && (
          <section className="panel analytics-panel">
            <div className="panel-header">
              <h3>Analytics Dashboard</h3>
            </div>

            <div className="analytics-grid">
              <div className="metric-card">
                <span>Resolution rate</span>
                <strong>{Math.round((stats.resolved / Math.max(stats.total, 1)) * 100)}%</strong>
              </div>
              <div className="metric-card">
                <span>Avg. resolution</span>
                <strong>4.8 days</strong>
              </div>
              <div className="metric-card">
                <span>Active categories</span>
                <strong>{stats.byCategory.filter((item) => item.count > 0).length}</strong>
              </div>
            </div>

            <div className="chart-grid">
              <div className="chart-card">
                <h4>Complaints by category</h4>
                <div className="bar-group">
                  {stats.byCategory.map((item) => (
                    <div key={item.category} className="bar-row">
                      <span>{item.category}</span>
                      <div className="bar-track">
                        <div className="bar-fill" style={{ width: `${(item.count / Math.max(stats.total, 1)) * 100}%` }} />
                      </div>
                      <strong>{item.count}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="chart-card">
                <h4>Category split</h4>
                <div className="donut-chart">
                  <div
                    className="donut"
                    style={{
                      background: `conic-gradient(#3b82f6 0 32%, #60a5fa 32% 50%, #22c55e 50% 68%, #f59e0b 68% 82%, #8b5cf6 82% 100%)`,
                    }}
                  >
                    <span>{stats.total}</span>
                  </div>
                </div>
                <div className="legend">
                  <span><i className="legend-dot blue" />Wi-Fi</span>
                  <span><i className="legend-dot cyan" />Classroom</span>
                  <span><i className="legend-dot green" />Water</span>
                </div>
              </div>
            </div>

            <div className="chart-card full-width">
              <h4>Monthly complaints trend</h4>
              <div className="line-chart">
                {stats.monthly.map((month) => (
                  <div key={month.month} className="line-item">
                    <div className="line-column" style={{ height: `${month.value * 18}px` }} />
                    <span>{month.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {adminView === 'students' && (
          <section className="panel">
            <div className="panel-header">
              <h3>Registered students</h3>
            </div>
            <div className="student-grid">
              {studentUsers.map((student) => (
                <div key={student.id} className="student-card">
                  <div className="avatar large">{student.name.charAt(0)}</div>
                  <h4>{student.name}</h4>
                  <p>{student.studentId}</p>
                  <p>{student.department}</p>
                  <small>{student.email}</small>
                </div>
              ))}
            </div>
          </section>
        )}

        {adminView === 'profile' && (
          <section className="panel profile-panel">
            <div className="panel-header">
              <h3>Admin profile</h3>
            </div>
            <div className="profile-grid">
              <div className="avatar-box alt">A</div>
              <div className="profile-info">
                <p><strong>Name:</strong> {adminAccount.name}</p>
                <p><strong>Email:</strong> {adminAccount.email}</p>
                <p><strong>Role:</strong> Administrator</p>
                <p><strong>Campus access:</strong> Full complaint management</p>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )

  return currentUser ? (currentUser.role === 'admin' ? renderAdminPage() : renderStudentPage()) : renderAuthScreen()
}

export default App
