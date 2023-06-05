// Server side Code
const axios = require("axios");
const mainURL = "https://api.hubapi.com/crm/v3/schemas/2-7412930?archived=false"; // Delete URL
const mainURL2 = "https://api.hubapi.com/crm/v3/schemas"; // Create URL
const ACCESS_TOKEN = "pat-na1-dd719c55-fb7";


const data = {
  labels: {
    singular: "Video",
    plural: "Videos",
  },
  requiredProperties: ["path", "title"],
  searchableProperties: ["title"],
  properties: [
    {
      name: "path",
      label: "Path",
      isPrimaryDisplayLabel: true,
      hasUniqueValue: true,
      type: "string",
      fieldType: "text",
    },
    {
      name: "title",
      label: "Title",
      hasUniqueValue: false,
      type: "string",
      fieldType: "text",
    },
  ],
  associatedObjects: ["CONTACT"],
  name: "videos",
  primaryDisplayProperty: "title",
};

exports.main = (context, sendResponse) => {
  console.log("HI");

  var config = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    data: data,
  };
  axios(mainURL2, config)
    .then(function (response) {
      console.log(JSON.stringify(response));
      sendResponse({ body: response, statusCode: 200 });
    })
    .catch(function (error) {
     console.log(JSON.stringify(error.message));
     sendResponse({ body: error , statusCode: 500 });
    });
};

// Client Side Code
// <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
const config = {
  url: "/_hcms/api/createVideoObject",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};
console.log("hi");
axios(config)
  .then((res) => {
    console.log(res.data);
    console.log("hi 2");
  })
  .catch((err) => console.log(err));
