import UploadedInfo from './UploadedInfo.jsx'
import { useUploadContext } from '../../contexts/UploadContext.jsx'


const UploadedItemCard = () => {
  const { photoUrl, active } = useUploadContext();

  // Conditionally set the display style based on active state
  const cardClass = active ? 'active-card' : 'inactive-card';

  return (
    <section className={`uploaded-photo-card ${cardClass}`}>
      <img src={photoUrl} alt="uploaded" className={'uploaded-photo__image'} />
      <UploadedInfo />
    </section>
  );
};

export default UploadedItemCard;
