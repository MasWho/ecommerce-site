import ProductDetail from "../components/ProductDetail/ProductDetail";

const ProductDetailPage = ({match}) => {
  return <ProductDetail category={match.params.category} id={match.params.id}/>;
};

export default ProductDetailPage;