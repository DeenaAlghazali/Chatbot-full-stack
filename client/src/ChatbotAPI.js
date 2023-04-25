import axios from "axios";
import parse from "html-react-parser";
const API = {

  GetChatbotResponse: async (message) => { 
    return new Promise(function (resolve, reject) {
      // setTimeout(function () {
        axios.post(`/`, { message }).then(({ data }) => {
          let message = data.data[0].message;
          let meals = data.data[0]?.meals;
          let totalPrice = data.data[0]?.totalPrice;
          let newMessage = `${message} `;
          meals?.forEach((meal) => {
            newMessage += `<br>${meal.name} ${meal.price} 
            ${totalPrice ? `${meal?.quantity} ${meal?.total}` : ""} `;
          });
          newMessage += `${totalPrice ? `<br>${totalPrice} ` : ""}`;

          resolve(parse(newMessage));
        });
      // }, 2000);
    });
  },
};

export default API;
