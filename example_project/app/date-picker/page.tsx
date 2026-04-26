'use client'
import DatePicker from '@/src/components/DatePicker'

const page = () => {
  return (
      <div>
      <DatePicker onApply={(date) => console.log(date)} />
    </div>
  )
}

export default page