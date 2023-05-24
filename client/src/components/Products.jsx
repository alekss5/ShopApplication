import { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";
import { Search} from "@material-ui/icons";
import { mobile } from "../responsive";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  width:140px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;



const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // useEffect(() => {
  //   const getProducts = async () => {
  //     try {
  //       const res = await axios.get(
  //         cat
  //           ? `http://localhost:5001/api/products/search?term=${cat}`
  //           : "http://localhost:5001/api/products"
  //       );
  //       setProducts(res.data);
  //     } catch (err) {}
  //   };
  //   getProducts();
  // }, [cat]);
   useEffect(() => {
    const getProducts = async () => {
      try {
        if (searchTerm!==""){
          const response = await axios.get(`http://localhost:5001/api/products/search?term=${searchTerm}`);
          setProducts(response.data);
        }
        else{
          const response = await axios.get(`http://localhost:5001/api/products`);
         setProducts(response.data);
        }
      }
      catch (err) {}
    };
    getProducts();
  }, [searchTerm]);


  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <>
      <SearchContainer>
      <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
       
    <Container>
      {cat
        ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
        : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item.id} />)}
    </Container>
    </>
  );
};

export default Products;
