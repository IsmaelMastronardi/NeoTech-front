/* eslint-disable no-unused-vars */
import { useState } from 'react';
import ItemList from '../components/itemList';
import CategoriesMenu from '../components/categoriesMenu';
import FilterMenu from '../components/filtersMenu';

const Home = () => (
  <>
    <div className="flex flex-row gap-10 mb-10">
      <CategoriesMenu />
      <FilterMenu />
    </div>
    <div>
      <ItemList />
    </div>
  </>
);

export default Home;
