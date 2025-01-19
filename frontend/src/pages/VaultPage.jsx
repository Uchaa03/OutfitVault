import VaultLayout from '../layouts/page_layouts/VaultLayout.jsx';
import FiltersMenu from '../components/vault/FiltersMenu/FiltersMenu.jsx';


const VaultPage = () => {
  return (
      <section className={'vault'}>
        <VaultLayout />
        <FiltersMenu />
      </section>
  )
}

export default VaultPage;