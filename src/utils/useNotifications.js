import React, { useEffect, useState } from 'react'
import { getRandomInt, isSafari } from './helpers'

const icon = 'https://strong-posture.web.app/assets/slouch.b681574f.svg'

const reminderVariants = [
  { text: 'Just remind you', body: 'Keep your posture correctly bruh' },
  { text: 'Straighten up', body: 'Your posture not correct' },
  { text: 'brooo', body: "Don't forget about posture" },
  { text: 'Straighten up', body: 'Your posture not correct' },
  { text: 'Common!', body: 'PPPOOOSSSSTTUUURRREEE' },
]

const registerServiceWorker = async () => {
  const swRegistration = await navigator.serviceWorker.register(
    'serviceWorker.js',
    { scope: '../../public/' }
  ) //notice the file name
  return swRegistration
}

const useNotifications = (isSwEnabled) => {
  const [swRegistration, setSwRegistration] = useState(undefined)

  useEffect(async () => {
    if (isSwEnabled) {
      const registration = await registerServiceWorker()
      setSwRegistration(registration)
      console.log(registration)
    }
  }, [])

  const requestPermission = async () => {
    return new Promise((resolve, reject) => {
      if (!isSafari) {
        Notification.requestPermission().then((permission) =>
          resolve(permission)
        )
      } else {
        if(!('Notification' in window)) reject(false) 
        Notification.requestPermission((permission) => {
          resolve(permission)
        })
      }
    })
  }

  const getPermission = () => Notification.permission

  const showNotification = (title, options) => {
    if (isSwEnabled && swRegistration && swRegistration.showNotification) {
      return swRegistration.showNotification(title, options)
    } else return new Notification(title, options)
  }

  const notify = async (text, body) => {
    if (!('Notification' in window)) {
      // alert('This browser does not support desktop notification')
      return
    }
    // Проверка разрешения на отправку уведомлений
    else if (getPermission() === 'granted') {
      // Если разрешено, то создаём уведомление
      showNotification(text, { body, icon })
    }
    // В противном случае, запрашиваем разрешение
    else if (getPermission() !== 'denied') {
      const permission = await requestPermission()
      if (permission === 'granted') {
        showNotification(text, { body, icon })
      }
    }
    
  }

  const notifySw = (title, body) => {
    const options = {
      body,
    }
    swRegistration.showNotification(title, options)
  }

  const remind = () => {
    const idx = getRandomInt(reminderVariants.length - 1)
    const notification = reminderVariants[idx]
    notify(notification.text, notification.body)
  }

  return [notify, remind, requestPermission, getPermission, notifySw]
}

export default useNotifications
