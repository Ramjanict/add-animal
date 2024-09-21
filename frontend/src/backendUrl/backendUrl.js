const backendUrl = "https://animal-nu-flax.vercel.app";

const Apisummary = {
  upload: {
    url: `${backendUrl}/api/upload-animal`,
    method: "post",
  },
  addCategory: {
    url: `${backendUrl}/api/add-category`,
    method: "post",
  },
  allCategory: {
    url: `${backendUrl}/api/all-category`,
    method: "get",
  },
};
export default Apisummary;
