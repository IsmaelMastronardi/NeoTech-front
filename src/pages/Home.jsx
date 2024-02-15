import ItemList from '../components/itemList';
import CategoriesMenu from '../components/categoriesMenu';

const Home = () => (
  <section>
    <div className="mt-14 bg-ym-blue">
      <div className="flex flex-row">
        <CategoriesMenu />
      </div>
      <div>
        <ItemList />
      </div>
    </div>

  </section>
);

export default Home;
