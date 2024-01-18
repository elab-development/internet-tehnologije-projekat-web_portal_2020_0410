import React from 'react'

export const Quote = () => {

    
  const [quote, setQuote] = useState("")

    useEffect(()=>{
        async function func(){
          const requestOption = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          }
        
          const res = await fetch("http://localhost:8000/quotes", requestOption);
          if(!response.ok){
            console.log(response)
          }
          const dat = await res.json()
          console.log(dat[0].quote)
  
          setQuote(dat[0].quote)
  
        }
        func()
      }, [token])

  return (
    <Text>{quote}</Text>
  )
}
