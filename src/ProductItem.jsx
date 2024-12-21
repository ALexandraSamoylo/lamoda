import React from 'react';
import styles from './ProductApp.module.scss';

const ProductItem = ({ product }) => {
    return (
        <li className={styles.productItem}>
            <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
            <div className={styles.productContent}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Color: {product.color}</p> {}
                <p>Price: ${product.price}</p> {}
                <p>Rate: {product.rating}</p>
            </div>
        </li>
    );
};

export default ProductItem;
