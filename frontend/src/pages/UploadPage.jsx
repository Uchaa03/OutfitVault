import UploadLayout from '../layouts/UploadLayout.jsx'
import UploadedItemCard from '../components/upload/UploadedItemCard.jsx'


const UploadPage = () => {

  return (
    <section className= 'upload'>
      <UploadLayout />
      <UploadedItemCard/>
    </section>
  )
}

export default UploadPage