import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 90vh;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {
  const location = useLocation();
//  const id = location.pathname.split("/")[2];

 

  const[title, setTitle] = useState();

  const [color, setColor] = useState("");
  const [allColors, setAllColors] = useState("")
  const [size, setSize] = useState("");
  const [allSizes, setAllSizes] = useState('')


  const [product, setProduct] = useState({
    id:"",
    image: '',
    title: '',
    idItem: '',
    color: '',
    size: [],
    price: 0,
  });
  
  const[description, setDescription] = useState()

  

  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();



  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get("id");
      
  useEffect(() => {
        fetch(`http://localhost:5001/api/products/find/${id}`)
        .then(response => response.json())
        .then(res => {
      setTitle(res.title);
      setAllColors(res.color);
      setAllSizes(res.size);
      

      console.log(res.color);
      console.log(res.size);
      
      setProduct(prevProduct => ({
        ...prevProduct,
        id:res._id,
        size:res.size,
        title: res.title,
        image: res.img,
        description: res.description,
        color: res.color,
        price: res.price,
       
        
      }));
      // setColor(res.color);
      // setSize(res.size);
    console.log("s"+product.description);
      console.log("sizee"+product.size);
     
     
    })
    .catch(error => {
      console.error(error);
    });
  }, []);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    dispatch(
      addProduct({ ...product, quantity, color, size })
    );
    console.log(product)
  };
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
          <Image src={product.image}/>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.description}</Desc>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
            <FilterTitle>Color</FilterTitle>
{Array.isArray(allColors) && allColors.map((c) => (
  <FilterColor color={c} key={c} onClick={() => setColor(c)} />
))}
</Filter>

            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize >
              {Array.isArray(allSizes) && allSizes.map((s) => (
  <FilterSizeOption key={s} onClick={()=>setSize(s)}>{s}</FilterSizeOption>
))}

              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
