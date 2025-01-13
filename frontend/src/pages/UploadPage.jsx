import UploadSection from '../components/upload/UploadSection.jsx'
import UploadedItemCard from '../components/upload/UploadedItemCard.jsx'
import { useState } from 'react'


const UploadPage = () => {
  const testPhoto = '/assets/img/stock_item_image.png'

  const [active, setActive] = useState(true)

  return (
    <section className={'upload'}>
      <UploadSection />
      <UploadedItemCard
      active={active}
      setActive={setActive}
      photo={testPhoto}
      />
    </section>
  )
}

export default UploadPage