export async function loader({ params }) {
  const response = await fetch(`http://localhost:8000/resources/${params.id}`);
  const data = await response.json();
  return data;
}

export const API_KEY =
  '4b1cb05655169f90b17da003062c658c84b2c164e2c3c929d235d3b034469d836058297bc4f5a7072bc2ff99e5e22e19470ee88bb4dd3e3753da129b86cc3ecc67a9959ad29afde9b08f1d2e15bc25cdd900d2303fddd0c3596abd4e120f0820d0d2b912204bed32987d207e3ece55fa05406049f7e7665456dccae83dbcf617';

export const AUTH_TOKEN = 'authToken';
