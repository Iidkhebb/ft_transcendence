import { ProfileLayout } from '@/Components/profile/profileLayout'
import React, { useEffect } from 'react'
import store from '@/store/store'

export default function Profile() {
  const [profile, setProfile] = React.useState(null);

  useEffect(() => {
    setProfile(store.getState().profile.user);
  }, [])


  return (
    <ProfileLayout profile={profile}/>
  )
}
