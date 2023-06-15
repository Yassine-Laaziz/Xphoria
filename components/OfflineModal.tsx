'use client'

import React, { useState, useEffect } from 'react'
import Modal from './Modal'

export default function OfflineModal() {
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine)

  useEffect(() => {
    window.addEventListener('offline', () => setIsOffline(true))
    window.addEventListener('online', () => setIsOffline(false))

    return () => {
      window.removeEventListener('offline', () => setIsOffline(true))
      window.removeEventListener('online', () => setIsOffline(false))
    }
  }, [])

  return (
    <Modal
      open={isOffline}
      setOpen={() => {}}
    >
      <div className='bg-black text-lg font-bold text-emerald-700'>
        <h2>You are currently offline</h2>
        <p>Please check your internet connection and try again.</p>
      </div>
    </Modal>
  )
}
