// export const Chatbot = async (req, res) => {
//     if (req.method !== 'POST') {
//       return res.status(405).json({ error: 'Method not allowed' });
//     }
  
//     const { queryText } = req.body;
  
//     if (!queryText || typeof queryText !== 'string') {
//       return res.status(400).json({ error: 'Invalid queryText' });
//     }
  
    // const VECTARA_API_KEY = "zqt_HoPFYxGw-uNrZ2VEGJGYLeDyQ7IW_TIkSkCnOg";
    // const CUSTOMER_ID = 511952227;
    // const CORPUS_ID = 3; 
  
//     try {
//       const vectaraRes = await fetch('https://api.vectara.io/v1/query', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'x-api-key': VECTARA_API_KEY
//         },
//         body: JSON.stringify({
//           query: [
//             {
//               query: queryText.trim(),
//               num_results: 3,
//               corpus_key: [
//                 {
//                   customer_id: CUSTOMER_ID,
//                   corpus_id: CORPUS_ID
//                 }
//               ]
//             }
//           ]
//         })
//       });
  
//       if (!vectaraRes.ok) {
//         const errorText = await vectaraRes.text();
//         return res.status(vectaraRes.status).json({ error: 'Vectara error', details: errorText });
//       }
  
//       const data = await vectaraRes.json();
//       return res.status(200).json(data);
  
//     } catch (err) {
//       console.error('Vectara fetch error:', err);
//       return res.status(500).json({ error: 'Internal server error' });
//     }
//   };





// /pages/api/chatbot.js
export const Chatbot = async (req, res) => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { queryText } = req.body;
  
    if (!queryText || typeof queryText !== 'string') {
      return res.status(400).json({ error: 'Invalid queryText' });
    }
    const VECTARA_API_KEY = "zqt_HoPFYxGw-uNrZ2VEGJGYLeDyQ7IW_TIkSkCnOg";
    const CUSTOMER_ID = 511952227;
    const CORPUS_ID = 3; 
  
    try {
      const vectaraRes = await fetch('https://api.vectara.io/v1/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': VECTARA_API_KEY
        },
        body: JSON.stringify({
          query: [
            {
              query: queryText.trim(),
              num_results: 3, // Ensure you get results
              corpus_key: [
                {
                  customer_id: CUSTOMER_ID,
                  corpus_id: CORPUS_ID
                }
              ]
            }
          ]
        })
      });
  
      if (!vectaraRes.ok) {
        const errorText = await vectaraRes.text();
        return res.status(vectaraRes.status).json({ error: 'Vectara error', details: errorText });
      }
  
      const data = await vectaraRes.json();
  
      // Check if there are responses in the responseSet
      const responses = data?.responseSet?.[0]?.response;
  
      if (responses && responses.length > 0) {
        // Return the top 3 responses with text and score
        const result = responses.map((item) => ({
          text: item.text,
          score: item.score,
        }));
  
        return res.status(200).json({ responses: result });
      } else {
        return res.status(200).json({ message: 'No relevant result found' });
      }
  
    } catch (err) {
      console.error('Vectara fetch error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  