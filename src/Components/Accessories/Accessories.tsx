import React from 'react'
import { useFetchData } from '../../Hook/useFeatchData'

export const Accessories = () => {
    const {data} = useFetchData()
    console.log(data)
  return (
    <div>Accessories</div>
  )
}
