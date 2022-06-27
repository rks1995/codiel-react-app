import styles from '../styles/settings.module.css'
import { useAuth } from '../hooks'
import { useState } from 'react'

const Settings = () => {
  const auth = useAuth()

  const [name, setName] = useState(auth.user.name)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [saveForm, setSaveForm] = useState(false)
  const [editMode, setEditMode] = useState(false)

  const updateProfile = () => {}

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src='https://cdn-icons-png.flaticon.com/512/4825/4825044.png'
          alt='profile'
        />
      </div>
      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{auth.user?.email}</div>
      </div>
      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        {editMode ? (
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <div className={styles.fieldValue}>{auth.user?.name}</div>
        )}
      </div>
      {editMode && (
        <>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Password</div>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Confirm Password</div>
            <input
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </>
      )}
      <div className={styles.btnGrp}>
        {editMode ? (
          <>
            <button
              className={`button ${styles.saveBtn}`}
              onClick={updateProfile}
            >
              {saveForm ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={() => setEditMode(false)}
              className={`button ${styles.goBack}`}
            >
              Go Back
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className={`button ${styles.editBtn}`}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  )
}

export default Settings
