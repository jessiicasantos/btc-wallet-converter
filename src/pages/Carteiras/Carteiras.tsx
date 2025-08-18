import CardSearch from "../../components/CardSearch/CardSearch";
import DataTable from "../../components/DataTable/DataTable";
import AddModal from "../../components/AddModal/AddModal";
import { useModal } from "../../context/ModalContext/ModalContext";
import './Carteiras.css';

const Carteiras = () => {
  const { modal, openModal } = useModal();

  return (
    <div id="Carteiras" className="container">
      <header>
        <h2>BTC Carteiras</h2>
        <button className="btn-blue add-wallet" onClick={() => openModal('add')}>Adicionar Carteira</button>
      </header>
      <CardSearch />
      <DataTable />

      {modal.type === 'add' && <AddModal />}
    </div>
  );
};

export default Carteiras;
