import { useParams } from "react-router-dom";

function ProductDetails() {

    const {id} = useParams();

    return (
        <div>This is the product details page for id: {id}</div>
    );
}

export default ProductDetails;