
import axios from "axios";
const deletItem = async (id) => {
    try {
      const response = await axios.delete(`https://backend.touchtechco.com/gen?coll=wishlist`, {data: id });
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

const deleteIt = (List,productId)=>{
    console.log(List,productId)
    const  myproduct= List.find((item)=>item.productId === productId)
    console.log(myproduct)
    deletItem(myproduct.id).then((response) => {
        console.log(response)
      });

}
export {deleteIt}