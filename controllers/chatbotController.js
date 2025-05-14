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
  const MIN_SCORE_THRESHOLD = 0.7;

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
            num_results: 3, // increased for better chances of match
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
      return res.status(vectaraRes.status).json({
        error: 'Vectara error',
        details: errorText
      });
    }

    const data = await vectaraRes.json();
    const responses = data?.responseSet?.[0]?.response;

    if (responses && responses.length > 0) {
      const filteredResponses = responses
        .filter((item) =>
          item.score >= MIN_SCORE_THRESHOLD &&
          item.text &&
          item.text.length > 20 && // avoid very short or vague responses
          !item.text.toLowerCase().includes("i don't know") &&
          !item.text.toLowerCase().includes("no information") &&
          !item.text.toLowerCase().includes("unable to")
        )
        .map((item) => ({
          text: item.text,
          score: item.score,
        }));

      if (filteredResponses.length > 0) {
        return res.status(200).json({ responses: filteredResponses });
      } else {
        return res.status(200).json({ message: 'No relevant information found.' });
      }
    } else {
      return res.status(200).json({ message: 'No results returned from Vectara.' });
    }

  } catch (err) {
    console.error('Vectara fetch error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default Chatbot;

  