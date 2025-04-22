const API_URL = "https://jsonplaceholder.typicode.com/posts";

export async function getAllPosts() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function delPost(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
