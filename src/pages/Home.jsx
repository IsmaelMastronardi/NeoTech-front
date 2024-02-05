import ItemList from '../components/itemList';
import CategoriesMenu from '../components/categoriesMenu';

const Home = () => (
  <>
    <div className="bg-orange-200">
      <div className="flex flex-row gap-10 mb-10">
        <CategoriesMenu />
      </div>
      <div>
        <ItemList />
      </div>
    </div>

  </>
);

export default Home;
