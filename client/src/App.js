import api from "./api/Api"
import { useEffect } from 'react'

async function getUser(data = null) {
  return await api.get('/getUser')
}
function App() {
  useEffect(() => {
    return async () => {
      let response = await getUser();
      console.log(`😱 😓 😒 ~ file: App.js:13 ~ return ~ response:`, response)
    }
  }, [])

  return (
    <div>
      <h1>Response from client</h1>
    </div>
  );
}

export default App;
