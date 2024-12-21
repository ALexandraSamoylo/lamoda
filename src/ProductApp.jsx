import React, { useState } from 'react';
import ProductFilters from './ProductFilters';
import ProductItem from './ProductItem';
import styles from './ProductApp.module.scss';
import { Chance } from 'chance';

const chance = new Chance();

const ProductApp = () => {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({
        searchQuery: '',
        selectedColors: new Set(),
        priceRange: { min: 10, max: 9999 },
    });
    const [sortOption, setSortOption] = useState('lowToHigh');

    const updateFilter = (filterName, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterName]:
                filterName === 'selectedColors'
                    ? toggleColorFilter(value, prevFilters.selectedColors)
                    : value,
        }));
    };

    const toggleColorFilter = (color, selectedColors) => {
        const newColors = new Set(selectedColors);
        if (newColors.has(color)) {
            newColors.delete(color);
        } else {
            newColors.add(color);
        }
        return newColors;
    };

    const applyFilters = (products) => {
        const { searchQuery, selectedColors, priceRange } = filters;

        return products.filter((product) => {
            const matchesSearch =
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesColor = selectedColors.size === 0 || selectedColors.has(product.color);
            const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;

            return matchesSearch && matchesColor && matchesPrice;
        });
    };

    const sortedProducts = applyFilters(products).sort((a, b) => {
        if (sortOption === 'lowToHigh') return a.price - b.price;
        if (sortOption === 'highToLow') return b.price - a.price;
        if (sortOption === 'popular') return b.rating - a.rating;
        return 0;
    });

    const handleGenerateProducts = () => {
        const colors = ['red', 'blue', 'green', 'yellow', 'black'];
        const categories = ['electronics', 'fashion', 'home', 'sports', 'books'];
        const newProducts = Array.from({ length: 1000 }, (_, i) => ({
            id: Date.now() + i,
            name: chance.word(),
            description: chance.sentence(),
            color: colors[chance.integer({ min: 0, max: colors.length - 1 })],
            category: categories[chance.integer({ min: 0, max: categories.length - 1 })],
            price: chance.integer({ min: 10, max: 9999 }),
            rating: parseFloat(chance.floating({ min: 0, max: 5 }).toFixed(1)),
            imageUrl: `/images.jpg`,
        }));

        setProducts((prevProducts) => [...prevProducts, ...newProducts]);
    };

    return (
        <div className={styles.productApp}>
            <ProductFilters
                filters={filters}
                updateFilter={updateFilter}
                setSortOption={setSortOption}
            />
            <div className={styles.productArea}>
                <ul className={styles.productList}>
                    {sortedProducts.length ? (
                        sortedProducts.map((product) => (
                            <ProductItem key={product.id} product={product} />
                        ))
                    ) : (
                        <div>По вашему запросу ничего не найдено</div>
                    )}
                </ul>
                <button onClick={handleGenerateProducts} className={styles.generateButton}>
                    Сгенерировать 1000 продуктов
                </button>
            </div>
        </div>
    );
};

export default ProductApp;
