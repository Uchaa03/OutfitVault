import UploadedInfo from './UploadedInfo.jsx'
import { useUploadContext } from '../../contexts/UploadContext.jsx'


const UploadedItemCard = () => {
  const { photoUrl, active } = useUploadContext();

  // Conditionally set the display style based on active state
  const isActive = active ? 'card--active' : 'card--inactive';

  return (
    <section className={`card ${isActive}`}>
      <img src={photoUrl} alt="uploaded" className={'card__image'} />
      <UploadedInfo />
    </section>
  );
};

export default UploadedItemCard;
