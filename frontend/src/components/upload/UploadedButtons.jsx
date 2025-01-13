import { useUploadContext } from '../../contexts/UploadContext.jsx'

const UploadedButtons = () => {
  const { setActive } = useUploadContext();

  const handleAdd = () => {
    console.log('Added to closet')
  }
  const handleExit = () => {
    setActive(false)
    console.log('Exit')
  }

  return (
    <section className={'uploaded__buttons'}>
      <button onClick={handleAdd}>Agregar Prenda</button>
      <button onClick={handleExit}>X</button>
    </section>
  )
}

export default UploadedButtons