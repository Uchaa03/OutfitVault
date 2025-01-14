import UploadLayout from '../layouts/page_layouts/UploadLayout.jsx'
import UploadedItemCard from '../components/upload/UploadedItemCard.jsx'


const UploadPage = () => {

  return (
    <main className={'upload'}>
      <UploadLayout />
      <UploadedItemCard/>
    </main>
  )
}

export default UploadPage