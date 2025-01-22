import UploadedButtons from './UploadedButtons.jsx'
import { useUploadContext } from '../../context/UploadContext.jsx'


const UploadedInfo = () => {
  const { item } = useUploadContext();
  const { name, color, category, style } = item;

  return (
    <section className={'card__info'}>
      <h2>{name}</h2>
      <p>Color: {color}</p>
      <p>Categoría: {category}</p>
      <p>Estilo: {style}</p>
      <UploadedButtons/>
    </section>
  )
}

export default UploadedInfo