import React from 'react';
import styles from './ProductApp.module.scss';

const ProductFilters = ({ filters, updateFilter, setSortOption }) => {
    return (
        <div className={styles.filterContainer}>
            <h2>Filters</h2>
            <div className={styles.searchBarContainer}>
                <input
                    type="text"
                    value={filters.searchQuery}
                    onChange={(e) => updateFilter('searchQuery', e.target.value)}
                    placeholder="Search name or describe..."
                    className={styles.searchBar}
                />
            </div>
            <div className={styles.colorFilters}>
                <h3>Color</h3>
                {['red', 'blue', 'green', 'yellow', 'black'].map((color) => (
                    <label key={color}>
                        <input
                            type="checkbox"
                            checked={filters.selectedColors.has(color)}
                            onChange={() => updateFilter('selectedColors', color)}
                        />
                        {color}
                    </label>
                ))}
            </div>
            <div className={styles.priceRange}>
                <h3>Price</h3>
                <input
                    type="number"
                    placeholder="Мин"
                    value={filters.priceRange.min}
                    onChange={(e) =>
                        updateFilter('priceRange', { ...filters.priceRange, min: +e.target.value })
                    }
                />
                <input
                    type="number"
                    placeholder="Макс"
                    value={filters.priceRange.max}
                    onChange={(e) =>
                        updateFilter('priceRange', { ...filters.priceRange, max: +e.target.value })
                    }
                />
            </div>
            <div className={styles.sortOptions}>
                <h3>Sort</h3>
                <select onChange={(e) => setSortOption(e.target.value)}>
                    <option value="lowToHigh">Cheap first</option>
                    <option value="highToLow">Expensive first</option>
                    <option value="popular">Popular first</option>
                </select>
            </div>
        </div>
    );
};

export default ProductFilters;
