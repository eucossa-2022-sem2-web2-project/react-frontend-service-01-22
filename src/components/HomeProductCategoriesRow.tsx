/**
 * @ Author: Felix Orinda
 * @ Create Time: 2022-11-10 13:55:28
 * @ Modified by: Felix Orinda
 * @ Modified time: 2022-11-19 14:55:52
 * @ Description:
 */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HomeproductItem from './HomeProductItem';
import { Link } from 'react-router-dom';
import React from 'react';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { ProductEntityType, ProductcategoryType } from '../types';

const HomeProductCategoriesRow = ({
	category,
	products
}: {
	category: ProductcategoryType;
	products: ProductEntityType[];
}) => {
	const [filteredProducts, setFilteredProducts] = React.useState<
		ProductEntityType[]
	>([]);
	const [categoryName, setCategoryName] = React.useState<string>('');

	React.useEffect(() => {
		setCategoryName(category.name);
		if (products.length) {
			const filtered = products.filter((product) => {
				
				return product.category === category._id;
			});
			setFilteredProducts(filtered);
		}
	}, [products, category]);

	return filteredProducts.length > 0 ? (
		<div className="shadow-lg">
			<div className="flex items-center py-1 sm:py-4 px-6 text-black bg-orange-300 rounded-sm justify-between">
				<h2 className="text-md font-medium capitalize flex items-center">
					Categories
					<FontAwesomeIcon icon={faChevronRight} className="text-[10px]" />
					{categoryName}
				</h2>
				<Link
					to={`/categories?category=${categoryName}`}
					className="flex items-center gap-1 hover:text-white"
				>
					View All{' '}
					<FontAwesomeIcon icon={faChevronRight} className="text-[10px]" />
				</Link>
			</div>
			<div className="w-full  md:p-4 grid grid-cols xs:grid-cols-2 sm:grid-cols-3  md:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-2">
				{filteredProducts.slice(0, 4).map((product) => (
					<HomeproductItem key={product.name} {...product} />
				))}
			</div>
		</div>
	) : (
		<></>
	);
};

export default HomeProductCategoriesRow;
